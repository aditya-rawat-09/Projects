# Real GPS Tracking Setup

## Option 1: Use Your Phone's GPS (Easiest)

1. Start server in REAL mode:
```bash
node server.js
```

2. Open `gps-simulator.html` on your phone's browser
3. Allow location permissions
4. Click "Track as Bus B101" (or B102/B103)
5. Open `http://YOUR_COMPUTER_IP:3000` to see real tracking

## Option 2: Mobile App Integration

Install GPS tracking app on driver's phone that sends data to:
```
POST http://your-server:3000/api/update-location
{
  "busId": "B101",
  "lat": 28.6139,
  "lng": 77.2090,
  "speed": 45
}
```

## Option 3: Hardware GPS Device

Use GPS tracker device (like GT06N) that sends data via:
- GPRS/4G to your server
- Parse NMEA sentences
- Forward to the API endpoint

## Testing Real GPS

**Demo Mode (Simulated):**
```bash
set DEMO_MODE=true
node server.js
```

**Real Mode (Actual GPS):**
```bash
node server.js
```

## Production Setup

For real deployment:
1. Deploy server to cloud (AWS/Heroku)
2. Install GPS app on bus driver phones
3. Configure app to send location every 5-10 seconds
4. Use HTTPS for security
5. Add authentication tokens
