const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;

const users = {
  admin: 'admin',
  user: 'password'
};

const sessions = new Set();

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && sessions.has(token)) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.use(express.static('public', { index: false }));

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    res.json({ success: false, message: 'Username already exists' });
  } else if (username.length < 3) {
    res.json({ success: false, message: 'Username must be at least 3 characters' });
  } else if (password.length < 4) {
    res.json({ success: false, message: 'Password must be at least 4 characters' });
  } else {
    users[username] = password;
    res.json({ success: true });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    const token = Math.random().toString(36).substr(2);
    sessions.add(token);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization;
  sessions.delete(token);
  res.json({ success: true });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

const buses = {
  'B101': { id: 'B101', route: 'Route 1', lat: 28.6139, lng: 77.2090, speed: 40 },
  'B102': { id: 'B102', route: 'Route 2', lat: 28.6229, lng: 77.2195, speed: 35 },
  'B103': { id: 'B103', route: 'Route 3', lat: 28.6339, lng: 77.2290, speed: 45 }
};

app.post('/api/update-location', (req, res) => {
  const { busId, lat, lng, speed } = req.body;
  if (buses[busId]) {
    buses[busId].lat = lat;
    buses[busId].lng = lng;
    buses[busId].speed = speed || buses[busId].speed;
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'update', buses: Object.values(buses) }));
      }
    });
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Bus not found' });
  }
});

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type: 'init', buses: Object.values(buses) }));

  ws.on('close', () => console.log('Client disconnected'));
});

if (process.env.DEMO_MODE === 'true') {
  function updateBusLocations() {
    Object.keys(buses).forEach(busId => {
      buses[busId].lat += (Math.random() - 0.5) * 0.002;
      buses[busId].lng += (Math.random() - 0.5) * 0.002;
    });

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'update', buses: Object.values(buses) }));
      }
    });
  }
  setInterval(updateBusLocations, 3000);
  console.log('Running in DEMO mode with simulated GPS');
} else {
  console.log('Running in REAL mode - waiting for GPS data via API');
}

app.get('/api/buses', (req, res) => {
  res.json(Object.values(buses));
});
