const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  socket.on('send-location', (data) => {
    io.emit('receive-location', { id: socket.id, ...data });
  });

  socket.on('disconnect', () => {
    io.emit('user-disconnected', socket.id);
  });
});

server.listen(3002, () => {
  console.log('Server running on http://localhost:3002');
});
