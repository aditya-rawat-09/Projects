import React, { useState, useEffect } from 'react';
import './DoctorsList.css';

function DoctorsList({ onBack }) {
  const [doctors, setDoctors] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultLoc = { lat: 28.6139, lng: 77.2090 };
    setLocation(defaultLoc);
    fetchDoctors(defaultLoc);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setLocation(loc);
          fetchDoctors(loc);
        },
        () => console.log('Using default location')
      );
    }
  }, []);

  const fetchDoctors = async (loc) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/nearby-care?lat=${loc.lat}&lng=${loc.lng}`);
      const data = await res.json();
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  if (loading) return <div className="doctors-list"><div className="loading">Loading doctors...</div></div>;

  return (
    <div className="doctors-list">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1>👨⚕️ Nearby Doctors</h1>
      <p className="subtitle">Find experienced doctors near you</p>
      
      <div className="doctors-grid">
        {doctors.map((doc, i) => (
          <div key={i} className="doctor-card">
            <img src={doc.photo} alt={doc.name} className="doctor-photo" />
            <h3>{doc.name}</h3>
            <p className="specialization">{doc.specialization}</p>
            <p className="education">🎓 {doc.education}</p>
            <p className="clinic">🏥 {doc.clinic}</p>
            <div className="doctor-info">
              <span>📍 {doc.distance}</span>
              <span>⭐ {doc.rating}</span>
              <span>💼 {doc.experience} years</span>
            </div>
            <div className="doctor-details">
              <p>💬 {doc.languages}</p>
              <p className="fee">💰 {doc.consultationFee}</p>
            </div>
            <p className="availability">🕒 {doc.availability}</p>
            <div className="doctor-actions">
              <a href={`tel:${doc.phone}`} className="btn-call">📞 Call</a>
              <a href={`https://wa.me/${doc.phone.replace(/\D/g, '')}`} className="btn-whatsapp">💬 WhatsApp</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;
