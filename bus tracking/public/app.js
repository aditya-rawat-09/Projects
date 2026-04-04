const map = L.map('map', {
  zoomControl: false
}).setView([28.6139, 77.2090], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap, © CARTO',
  maxZoom: 19
}).addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);

const busMarkers = {};
const busIcon = L.divIcon({
  className: 'bus-marker',
  html: `<div style="
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);
    border: 3px solid white;
    animation: bounce 2s infinite;
  ">🚌</div>`,
  iconSize: [50, 50]
});

const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'init' || data.type === 'update') {
    updateBuses(data.buses);
  }
};

ws.onerror = () => console.error('WebSocket error');
ws.onclose = () => console.log('WebSocket closed');

function logout() {
  const token = localStorage.getItem('authToken');
  fetch('/api/logout', {
    method: 'POST',
    headers: { 'Authorization': token }
  }).finally(() => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  });
}

function updateBuses(buses) {
  const busList = document.getElementById('busList');
  busList.innerHTML = '';
  
  document.getElementById('busCount').textContent = buses.length;
  document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString();

  buses.forEach(bus => {
    if (!busMarkers[bus.id]) {
      busMarkers[bus.id] = L.marker([bus.lat, bus.lng], { icon: busIcon })
        .addTo(map)
        .bindPopup(`
          <div style="padding: 10px; font-family: Inter, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #667eea; font-size: 1.1rem;">🚌 ${bus.id}</h3>
            <p style="margin: 4px 0; color: #666;"><strong>Route:</strong> ${bus.route}</p>
            <p style="margin: 4px 0; color: #666;"><strong>Speed:</strong> ${bus.speed} km/h</p>
            <p style="margin: 4px 0; color: #666; font-size: 0.85rem;">Lat: ${bus.lat.toFixed(4)}, Lng: ${bus.lng.toFixed(4)}</p>
          </div>
        `);
    } else {
      busMarkers[bus.id].setLatLng([bus.lat, bus.lng]);
      busMarkers[bus.id].setPopupContent(`
        <div style="padding: 10px; font-family: Inter, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #667eea; font-size: 1.1rem;">🚌 ${bus.id}</h3>
          <p style="margin: 4px 0; color: #666;"><strong>Route:</strong> ${bus.route}</p>
          <p style="margin: 4px 0; color: #666;"><strong>Speed:</strong> ${bus.speed} km/h</p>
          <p style="margin: 4px 0; color: #666; font-size: 0.85rem;">Lat: ${bus.lat.toFixed(4)}, Lng: ${bus.lng.toFixed(4)}</p>
        </div>
      `);
    }

    const busItem = document.createElement('div');
    busItem.className = 'bus-item';
    busItem.innerHTML = `
      <h3>
        <span class="status-online"></span>
        ${bus.id}
        <span class="speed-badge">⚡ ${bus.speed} km/h</span>
      </h3>
      <p><span class="route-badge">${bus.route}</span></p>
      <p>📍 Lat: ${bus.lat.toFixed(4)}, Lng: ${bus.lng.toFixed(4)}</p>
    `;
    busItem.onclick = () => {
      map.flyTo([bus.lat, bus.lng], 16, {
        duration: 1.5
      });
      setTimeout(() => busMarkers[bus.id].openPopup(), 1500);
    };
    busList.appendChild(busItem);
  });
}
