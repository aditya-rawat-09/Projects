import React, { useState, useEffect } from 'react';
import './FindCare.css';

function FindCare({ onBack }) {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hospitals');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(loc);
          fetchNearbyPlaces(loc);
        },
        (error) => {
          console.error('Location error:', error);
          setLoading(false);
          // Use default location (Delhi)
          const defaultLoc = { lat: 28.6139, lng: 77.2090 };
          setLocation(defaultLoc);
          fetchNearbyPlaces(defaultLoc);
        }
      );
    }
  };

  const fetchNearbyPlaces = async (loc) => {
    try {
      const res = await fetch(`http://localhost:5000/api/nearby-care?lat=${loc.lat}&lng=${loc.lng}`);
      const data = await res.json();
      setHospitals(data.hospitals || []);
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const openInMaps = (lat, lng, name) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`, '_blank');
  };

  return (
    <div className="findcare-wrapper">
      <div className="findcare-container">
        <button onClick={onBack} className="back-btn">← Back</button>
        
        <h2>Find Healthcare Near You</h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'hospitals' ? 'active' : ''}`}
            onClick={() => setActiveTab('hospitals')}
          >
            🏥 Hospitals ({hospitals.length})
          </button>
          <button 
            className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            👨‍⚕️ Doctors ({doctors.length})
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading nearby healthcare...</div>
        ) : (
          <div className="care-list">
            {activeTab === 'hospitals' && hospitals.map((hospital, index) => (
              <div key={index} className="care-card">
                <div className="care-icon">🏥</div>
                <div className="care-info">
                  <h3>{hospital.name}</h3>
                  <p className="care-address">{hospital.address}</p>
                  <div className="care-details">
                    <span className="distance">📍 {hospital.distance}</span>
                    {hospital.rating && <span className="rating">⭐ {hospital.rating}</span>}
                    {hospital.phone && <span className="phone">📞 {hospital.phone}</span>}
                  </div>
                  <div className="care-actions">
                    <button onClick={() => openInMaps(hospital.lat, hospital.lng, hospital.name)}>
                      Get Directions
                    </button>
                    {hospital.phone && (
                      <a href={`tel:${hospital.phone}`} className="call-btn">Call Now</a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'doctors' && doctors.map((doctor, index) => (
              <div key={index} className="care-card">
                <div className="care-icon">👨‍⚕️</div>
                <div className="care-info">
                  <h3>{doctor.name}</h3>
                  <p className="specialization">{doctor.specialization}</p>
                  <p className="care-address">{doctor.clinic}</p>
                  <div className="care-details">
                    <span className="distance">📍 {doctor.distance}</span>
                    {doctor.experience && <span className="experience">🎓 {doctor.experience} years exp</span>}
                    {doctor.rating && <span className="rating">⭐ {doctor.rating}</span>}
                  </div>
                  {doctor.availability && (
                    <p className="availability">🕐 {doctor.availability}</p>
                  )}
                  <div className="care-actions">
                    {doctor.phone && (
                      <a href={`tel:${doctor.phone}`} className="call-btn">Book Appointment</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindCare;
