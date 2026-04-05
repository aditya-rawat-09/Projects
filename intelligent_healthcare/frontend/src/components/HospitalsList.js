import React, { useState, useEffect } from 'react';
import './HospitalsList.css';

function HospitalsList({ onBack }) {
  const [hospitals, setHospitals] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultLoc = { lat: 28.6139, lng: 77.2090 };
    setLocation(defaultLoc);
    fetchHospitals(defaultLoc);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setLocation(loc);
          fetchHospitals(loc);
        },
        () => console.log('Using default location')
      );
    }
  }, []);

  const fetchHospitals = async (loc) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/nearby-care?lat=${loc.lat}&lng=${loc.lng}`);
      const data = await res.json();
      setHospitals(data.hospitals || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const openInMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  if (loading) return <div className="hospitals-list"><div className="loading">Loading hospitals...</div></div>;

  return (
    <div className="hospitals-list">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1>🏥 Nearby Hospitals</h1>
      <p className="subtitle">Find trusted hospitals near you</p>
      
      <div className="hospitals-grid">
        {hospitals.map((hosp, i) => (
          <div key={i} className="hospital-card">
            <div className="hospital-icon">🏥</div>
            <h3>{hosp.name}</h3>
            <p className="hospital-type">{hosp.type}</p>
            <p className="address">📍 {hosp.address}</p>
            <div className="hospital-info">
              <span className="distance">{hosp.distance}</span>
              <span className="rating">⭐ {hosp.rating}</span>
            </div>
            <div className="hospital-details">
              <div className="detail-item">
                <span>🛏️ Beds:</span>
                <span>{hosp.beds}</span>
              </div>
              <div className="detail-item">
                <span>🚨 Emergency:</span>
                <span>{hosp.emergency}</span>
              </div>
            </div>
            <div className="facilities">
              <p className="facilities-title">Facilities:</p>
              <div className="facilities-list">
                {hosp.facilities.map((fac, idx) => (
                  <span key={idx} className="facility-badge">{fac}</span>
                ))}
              </div>
            </div>
            <div className="hospital-actions">
              <button onClick={() => openInMaps(hosp.lat, hosp.lng)} className="btn-directions">
                🗺️ Directions
              </button>
              <a href={`tel:${hosp.phone}`} className="btn-call">
                📞 Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HospitalsList;
