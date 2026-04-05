import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { LanguageContext } from './context/LanguageContext';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import Auth from './components/Auth';
import Questionnaire from './components/Questionnaire';
import ResultsDisplay from './components/ResultsDisplay';
import History from './components/History';
import FindCare from './components/FindCare';
import Bot3D from './components/Bot3D';
import DoctorsList from './components/DoctorsList';
import HospitalsList from './components/HospitalsList';

function App() {
  const { language, toggleLanguage, t } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [analysisResults, setAnalysisResults] = useState(null);

  const startConsultation = () => {
    setCurrentView('questionnaire');
  };

  const handleQuestionnaireComplete = async (answers) => {
    try {
      const res = await fetch('http://localhost:5000/api/analyze-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          symptoms: `${answers.symptoms}. Duration: ${answers.duration}. Severity: ${answers.severity}`,
          age: answers.age,
          gender: answers.gender,
          temperature: answers.temperature,
          location: answers.location,
          triggers: answers.triggers,
          medicalHistory: answers.medicalHistory,
          medications: answers.medications,
          recentTravel: answers.recentTravel
        })
      });
      const data = await res.json();
      
      // Save to history
      const historyItem = {
        timestamp: new Date().toISOString(),
        symptoms: answers.symptoms,
        results: data
      };
      const history = JSON.parse(localStorage.getItem('consultationHistory') || '[]');
      history.push(historyItem);
      localStorage.setItem('consultationHistory', JSON.stringify(history));
      
      setAnalysisResults(data);
      setCurrentView('results');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'questionnaire') {
    return (
      <Questionnaire
        onComplete={handleQuestionnaireComplete}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'results') {
    return (
      <ResultsDisplay
        results={analysisResults}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  if (currentView === 'history') {
    return (
      <History
        onBack={() => setCurrentView('home')}
        onViewResult={(results) => {
          setAnalysisResults(results);
          setCurrentView('results');
        }}
      />
    );
  }

  if (currentView === 'findcare') {
    return (
      <FindCare onBack={() => setCurrentView('home')} />
    );
  }

  if (currentView === 'doctors') {
    return (
      <DoctorsList onBack={() => setCurrentView('home')} />
    );
  }

  if (currentView === 'hospitals') {
    return (
      <HospitalsList onBack={() => setCurrentView('home')} />
    );
  }

  return (
    <div className="app">
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      <nav className="navbar">
        <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="logo">
          <div className="logo-text">Healthcare Plus</div>
        </div>
        <div className="navbar-right">
          <button className="lang-toggle" onClick={toggleLanguage}>
            {language === 'en' ? 'हिं' : 'EN'}
          </button>
          {user ? (
            <button className="nav-link login-btn" onClick={logout}>{t('logout')}</button>
          ) : (
            <button className="nav-link login-btn" onClick={() => setShowAuth(true)}>{t('login')}</button>
          )}
        </div>
        <div className={`nav-links ${showMenu ? 'active' : ''}`}>
          <button className="close-menu" onClick={() => setShowMenu(false)}>✕</button>
          {user && (
            <div className="user-info">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div className="user-details">
                <div className="user-name-menu">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
          )}
          <button className="nav-link" onClick={() => { setCurrentView('history'); setShowMenu(false); }}>History</button>
          <button className="nav-link" onClick={() => { setCurrentView('doctors'); setShowMenu(false); }}>👨⚕️ Find Doctors</button>
          <button className="nav-link" onClick={() => { setCurrentView('hospitals'); setShowMenu(false); }}>🏥 Find Hospitals</button>
          <button className="nav-link" onClick={() => { scrollToSection('about'); setShowMenu(false); }}>{t('about')}</button>
          <button className="nav-link" onClick={() => { scrollToSection('features'); setShowMenu(false); }}>{t('features')}</button>
          <button className="nav-link" onClick={() => { scrollToSection('contact'); setShowMenu(false); }}>{t('contact')}</button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          {user && (
            <button className="nav-link" onClick={logout}>{t('logout')}</button>
          )}
          <button className="cta-button" onClick={() => { startConsultation(); setShowMenu(false); }}>
            {t('startConsultation')}
          </button>
        </div>
      </nav>
      
      <main className="hero">
        <div className="hero-content">
          <h1>Healthcare Plus</h1>
          <p className="hero-tagline">Healthcare for Good Today. Tomorrow. Always</p>
          <p className="hero-description">Advanced AI-powered symptom analysis with 95% accuracy. Get instant health insights, personalized recommendations, and connect with nearby healthcare providers - all in one place.</p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Consultations</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>
      </main>
      
      <section className="advertisement">
        <div className="ad-content">
          <div className="ad-badge">SPONSORED</div>
          <h3>🏥 Premium Health Insurance - Get 20% Off</h3>
          <p>Comprehensive coverage for you and your family. Cashless hospitalization at 10,000+ hospitals nationwide.</p>
          <button className="ad-button">Learn More →</button>
        </div>
      </section>
      
      <button className="sticky-consult-btn" onClick={startConsultation}>
        {t('startConsultation')}
      </button>
      
      <div className="bot-assistant">
        <Bot3D onClick={startConsultation} />
      </div>
      
      <section id="about" className="about">
        <h2>{t('about')} Healthcare Plus</h2>
        <div className="about-content-detailed">
          <div className="about-text">
            <p>Healthcare Plus is your trusted AI-powered medical companion, designed to provide instant, accurate health insights when you need them most. Our advanced natural language processing technology analyzes your symptoms and provides comprehensive disease predictions with detailed treatment recommendations.</p>
            <div className="about-features-list">
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <span>Instant symptom analysis using advanced AI</span>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <span>Comprehensive disease database with 100+ conditions</span>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <span>Personalized medication and diet recommendations</span>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <span>Connect with nearby hospitals and doctors</span>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <span>Multi-language support (English & Hindi)</span>
              </div>
              <div className="about-feature">
                <span className="feature-icon">✓</span>
                <span>Secure consultation history tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="features">
        <h2>{t('features')}</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon-large">🔍</div>
            <h3>Smart Symptom Analysis</h3>
            <p>Our AI analyzes your symptoms using advanced natural language processing to identify potential health conditions with high accuracy.</p>
            <ul className="feature-list">
              <li>Multi-symptom detection</li>
              <li>Context-aware analysis</li>
              <li>Severity assessment</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">💊</div>
            <h3>Treatment Recommendations</h3>
            <p>Get detailed medication suggestions, dietary advice, and precautionary measures tailored to your specific condition.</p>
            <ul className="feature-list">
              <li>Medication guidance</li>
              <li>Diet recommendations</li>
              <li>Lifestyle tips</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">🏥</div>
            <h3>Healthcare Network</h3>
            <p>Instantly find nearby hospitals and doctors with ratings, contact information, and directions to get immediate care.</p>
            <ul className="feature-list">
              <li>Location-based search</li>
              <li>Verified providers</li>
              <li>Direct booking</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">📊</div>
            <h3>Health History</h3>
            <p>Track all your consultations and health assessments in one secure place for better health management.</p>
            <ul className="feature-list">
              <li>Consultation records</li>
              <li>Progress tracking</li>
              <li>Export reports</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">🌐</div>
            <h3>Multi-Language Support</h3>
            <p>Access healthcare information in your preferred language with support for English and Hindi.</p>
            <ul className="feature-list">
              <li>English interface</li>
              <li>Hindi support</li>
              <li>Easy switching</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon-large">🔒</div>
            <h3>Privacy & Security</h3>
            <p>Your health data is protected with enterprise-grade security and complete privacy compliance.</p>
            <ul className="feature-list">
              <li>Encrypted data</li>
              <li>HIPAA compliant</li>
              <li>No data sharing</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="advertisement ad-banner">
        <div className="ad-content-banner">
          <div className="ad-badge">ADVERTISEMENT</div>
          <div className="ad-banner-content">
            <div className="ad-banner-text">
              <h3>💪 Stay Fit with FitLife Pro</h3>
              <p>Track your fitness goals, get personalized workout plans, and monitor your health metrics. Download now and get 3 months free!</p>
            </div>
            <button className="ad-button">Download App</button>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">📝</div>
            <h3>Answer Questions</h3>
            <p>Complete our comprehensive 11-question health assessment covering symptoms, duration, severity, and medical history.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">🤖</div>
            <h3>AI Analysis</h3>
            <p>Our advanced AI engine processes your symptoms using natural language processing and medical databases.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">📊</div>
            <h3>Get Results</h3>
            <p>Receive detailed disease predictions with confidence scores, medications, diet plans, and precautions.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">🏥</div>
            <h3>Find Care</h3>
            <p>Connect with nearby hospitals and doctors for professional consultation and treatment.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"Healthcare Plus helped me identify my symptoms quickly. The AI analysis was spot-on and I got the right treatment immediately."</p>
            <div className="testimonial-author">
              <div className="author-avatar">R</div>
              <div>
                <div className="author-name">Rajesh Kumar</div>
                <div className="author-location">Delhi, India</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"As a working professional, I don't have time for long hospital visits. This platform gave me instant insights and connected me with a doctor nearby."</p>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div>
                <div className="author-name">Priya Sharma</div>
                <div className="author-location">Mumbai, India</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"The Hindi language support made it easy for my parents to use. They can now check their symptoms without my help."</p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div>
                <div className="author-name">Amit Patel</div>
                <div className="author-location">Ahmedabad, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-detailed">
        <h2>Trusted by Thousands</h2>
        <div className="stats-detailed-grid">
          <div className="stat-detailed-card">
            <div className="stat-detailed-icon">👥</div>
            <div className="stat-detailed-number">50,000+</div>
            <div className="stat-detailed-label">Active Users</div>
            <p>People trust us for their health needs</p>
          </div>
          <div className="stat-detailed-card">
            <div className="stat-detailed-icon">🏥</div>
            <div className="stat-detailed-number">500+</div>
            <div className="stat-detailed-label">Healthcare Partners</div>
            <p>Hospitals and clinics in our network</p>
          </div>
          <div className="stat-detailed-card">
            <div className="stat-detailed-icon">🌍</div>
            <div className="stat-detailed-number">100+</div>
            <div className="stat-detailed-label">Cities Covered</div>
            <p>Across India and growing globally</p>
          </div>
          <div className="stat-detailed-card">
            <div className="stat-detailed-icon">⚡</div>
            <div className="stat-detailed-number">24/7</div>
            <div className="stat-detailed-label">Always Available</div>
            <p>Get health insights anytime, anywhere</p>
          </div>
        </div>
      </section>

      <section id="findcare" className="findcare-section">
        <h2>Find Healthcare Near You</h2>
        <FindCareHome />
      </section>

      <section id="contact" className="contact-detailed">
        <h2>Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div>
                <div className="contact-label">Email</div>
                <a href="mailto:rawat@healthcareplus.com">rawat@healthcareplus.com</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <div className="contact-label">Phone</div>
                <a href="tel:+919039507514">+91 9039507514</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">💬</div>
              <div>
                <div className="contact-label">WhatsApp</div>
                <a href="https://wa.me/919039507514">+91 9039507514</a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <div className="contact-label">Address</div>
                <p>Healthcare Plus Pvt Ltd<br/>123 Medical Plaza, Connaught Place<br/>New Delhi - 110001, India</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕐</div>
              <div>
                <div className="contact-label">Business Hours</div>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed<br/><em>(AI Service: 24/7 Available)</em></p>
              </div>
            </div>
          </div>
          <div className="contact-form-section">
            <h3>Send Us a Message</h3>
            <form className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your.email@example.com" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Partnership Opportunity</option>
                  <option>Feedback</option>
                  <option>Report an Issue</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Healthcare Plus</h3>
            <p className="footer-tagline">Healthcare for Good Today. Tomorrow. Always.</p>
            <p className="footer-description">Your trusted AI-powered medical companion providing instant health insights and connecting you with quality healthcare providers.</p>
            <div className="social-links">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">💼</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#findcare">Find Healthcare</a></li>
              <li><button onClick={startConsultation}>Start Consultation</button></li>
              <li><button onClick={() => setCurrentView('history')}>My History</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Health Blog</a></li>
              <li><a href="#">Medical Encyclopedia</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">API Documentation</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Medical Disclaimer</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">HIPAA Compliance</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>For Healthcare Providers</h4>
            <ul className="footer-links">
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">List Your Hospital</a></li>
              <li><a href="#">Doctor Registration</a></li>
              <li><a href="#">Enterprise Solutions</a></li>
              <li><a href="#">Contact Sales</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-disclaimer">
            <p><strong>⚠️ Medical Disclaimer:</strong> Healthcare Plus is an AI-powered health information platform and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this platform. If you think you may have a medical emergency, call your doctor or emergency services immediately.</p>
          </div>
          <div className="footer-certifications">
            <div className="cert-badge">🔒 SSL Secured</div>
            <div className="cert-badge">✓ HIPAA Compliant</div>
            <div className="cert-badge">✓ ISO 27001</div>
            <div className="cert-badge">✓ GDPR Ready</div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2024 Healthcare Plus Pvt Ltd. All rights reserved.</p>
            <p className="footer-made">Made with ❤️ in India | Serving patients globally</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FindCareHome() {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeTab, setActiveTab] = useState('hospitals');
  const [locationName, setLocationName] = useState('your area');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultLoc = { lat: 28.6139, lng: 77.2090 };
    setLocation(defaultLoc);
    setLocationName('Delhi, India');
    fetchNearby(defaultLoc);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setLocation(loc);
          getLocationName(loc);
          fetchNearby(loc);
        },
        (error) => {
          console.log('Using default location');
        }
      );
    }
  }, []);

  const getLocationName = async (loc) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${loc.lat}&lon=${loc.lng}&format=json`);
      const data = await res.json();
      const city = data.address.city || data.address.town || data.address.village || 'your area';
      const country = data.address.country || '';
      setLocationName(`${city}, ${country}`);
    } catch (error) {
      setLocationName('your area');
    }
  };

  const fetchNearby = async (loc) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/nearby-care?lat=${loc.lat}&lng=${loc.lng}`);
      const data = await res.json();
      console.log('Fetched data:', data);
      setHospitals(data.hospitals || []);
      setDoctors(data.doctors || []);
    } catch (error) {
      console.error('Error fetching nearby care:', error);
    }
    setLoading(false);
  };

  const openInMaps = (lat, lng, name) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  if (loading) {
    return (
      <div className="findcare-home">
        <p className="loading-text">Loading nearby healthcare...</p>
      </div>
    );
  }

  return (
    <div className="findcare-home">
      <p className="location-text">📍 Showing results near {locationName}</p>
      <div className="tabs-home">
        <button className={`tab-home ${activeTab === 'hospitals' ? 'active' : ''}`} onClick={() => setActiveTab('hospitals')}>
          🏥 Hospitals
        </button>
        <button className={`tab-home ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
          👨⚕️ Doctors
        </button>
      </div>

      <div className="care-grid">
        {activeTab === 'hospitals' && hospitals.slice(0, 3).map((h, i) => (
          <div key={i} className="care-card-home">
            <div className="care-icon-home">🏥</div>
            <h3>{h.name}</h3>
            <p>{h.address}</p>
            <div className="care-meta">
              <span>📍 {h.distance}</span>
              <span>⭐ {h.rating}</span>
            </div>
            <button onClick={() => openInMaps(h.lat, h.lng, h.name)}>Get Directions</button>
          </div>
        ))}

        {activeTab === 'doctors' && doctors.slice(0, 3).map((d, i) => (
          <div key={i} className="care-card-home">
            <div className="care-icon-home">👨⚕️</div>
            <h3>{d.name}</h3>
            <p className="specialization-home">{d.specialization}</p>
            <p>{d.clinic}</p>
            <div className="care-meta">
              <span>📍 {d.distance}</span>
              <span>⭐ {d.rating}</span>
            </div>
            <a href={`tel:${d.phone}`} className="call-btn-home">Book Appointment</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
