require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

// Infermedica API credentials (Free tier - sign up at https://developer.infermedica.com/)
const INFERMEDICA_APP_ID = process.env.INFERMEDICA_APP_ID || 'demo_app_id';
const INFERMEDICA_APP_KEY = process.env.INFERMEDICA_APP_KEY || 'demo_app_key';

app.use(cors());
app.use(express.json());

const diseasesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/diseases.json'), 'utf8'));

// In-memory storage (no MongoDB required)
let consultations = [];
let users = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'Healthcare API' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exists = users.find(u => u.email === email);
    if (exists) return res.status(400).json({ success: false, error: 'User exists' });
    
    const user = { id: Date.now(), email, password, name };
    users.push(user);
    
    res.json({ success: true, token: 'token123', user: { id: user.id, name, email } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ success: false, error: 'Invalid credentials' });
    
    res.json({ success: true, token: 'token123', user: { id: user.id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms, age, gender, temperature, location, triggers, medicalHistory, medications, recentTravel } = req.body;
    console.log('Received data:', { symptoms, age, gender });
    
    if (!symptoms) return res.status(400).json({ success: false, error: 'Symptoms required' });
    
    // Build comprehensive symptom description
    let fullDescription = symptoms;
    if (temperature && temperature !== 'No fever') fullDescription += `. Temperature: ${temperature}`;
    if (location) fullDescription += `. Location: ${location}`;
    if (triggers) fullDescription += `. Triggers: ${triggers}`;
    if (medicalHistory) fullDescription += `. Medical history: ${medicalHistory}`;
    if (medications) fullDescription += `. Current medications: ${medications}`;
    if (recentTravel && recentTravel !== 'No') fullDescription += `. Recent exposure: ${recentTravel}`;
    
    // Extract keywords from symptoms
    const keywords = fullDescription.toLowerCase().split(' ').filter(word => word.length > 3);
    
    // Enhanced disease matching with scoring and context
    const predictions = diseasesData
      .map(disease => {
        let score = 0;
        let matchedSymptoms = [];
        
        disease.symptoms.forEach(diseaseSymptom => {
          const symptomLower = diseaseSymptom.toLowerCase();
          if (fullDescription.toLowerCase().includes(symptomLower)) {
            score += 2;
            matchedSymptoms.push(diseaseSymptom);
          } else {
            keywords.forEach(keyword => {
              if (symptomLower.includes(keyword)) {
                score += 1;
                matchedSymptoms.push(diseaseSymptom);
              }
            });
          }
        });
        
        // Bonus scoring based on additional context
        if (temperature && temperature.includes('High') && disease.symptoms.some(s => s.toLowerCase().includes('fever'))) {
          score += 1;
        }
        if (age && parseInt(age) > 60 && disease.riskFactors?.includes('elderly')) {
          score += 0.5;
        }
        
        return {
          disease: disease,
          score: score,
          matchedSymptoms: [...new Set(matchedSymptoms)]
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => {
        const baseConfidence = Math.floor((item.score / item.disease.symptoms.length) * 100);
        const confidence = Math.min(95, baseConfidence);
        return {
          disease: item.disease.name,
          confidence: confidence,
          matchedSymptoms: item.matchedSymptoms,
          description: item.disease.description,
          detailedDescription: item.disease.detailedDescription,
          medications: item.disease.medications,
          precautions: item.disease.precautions,
          dietRecommendations: item.disease.dietRecommendations,
          doctorConsultation: item.disease.doctorConsultation,
          duration: item.disease.duration,
          severity: item.disease.severity,
          contagious: item.disease.contagious,
          patientContext: {
            age: age,
            gender: gender,
            temperature: temperature,
            medicalHistory: medicalHistory
          }
        };
      });
    
    const consultation = {
      id: Date.now(),
      symptoms,
      predictions: predictions.length > 0 ? predictions : [
        { 
          disease: 'General Consultation Needed', 
          confidence: 50, 
          description: 'Your symptoms do not match our database. Please consult a doctor for proper diagnosis.',
          doctorConsultation: 'Immediate consultation recommended'
        }
      ],
      timestamp: new Date()
    };
    
    consultations.push(consultation);
    
    res.json({
      success: true,
      message: 'Symptoms analyzed successfully',
      consultationId: consultation.id,
      predictions: consultation.predictions
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/nearby-care', (req, res) => {
  const { lat, lng } = req.query;
  
  // Mock data - In production, use Google Places API or similar
  const hospitals = [
    { 
      name: 'AIIMS Delhi', 
      address: 'Ansari Nagar, Sri Aurobindo Marg, New Delhi - 110029', 
      distance: '1.2 km', 
      rating: 4.8, 
      phone: '+911126588500',
      type: 'Government Multi-Specialty',
      beds: '2500+',
      emergency: '24/7',
      facilities: ['ICU', 'Emergency', 'Trauma Center', 'Blood Bank'],
      lat: parseFloat(lat) + 0.01, 
      lng: parseFloat(lng) + 0.01 
    },
    { 
      name: 'Apollo Hospital', 
      address: 'Sarita Vihar, Mathura Road, New Delhi - 110076', 
      distance: '2.3 km', 
      rating: 4.7, 
      phone: '+911129871090',
      type: 'Private Multi-Specialty',
      beds: '700+',
      emergency: '24/7',
      facilities: ['ICU', 'NICU', 'Cardiology', 'Oncology', 'Neurology'],
      lat: parseFloat(lat) + 0.02, 
      lng: parseFloat(lng) + 0.02 
    },
    { 
      name: 'Max Super Specialty Hospital', 
      address: 'Press Enclave Road, Saket, New Delhi - 110017', 
      distance: '3.1 km', 
      rating: 4.6, 
      phone: '+911126515050',
      type: 'Private Multi-Specialty',
      beds: '500+',
      emergency: '24/7',
      facilities: ['ICU', 'Cardiac Care', 'Orthopedics', 'Maternity'],
      lat: parseFloat(lat) + 0.03, 
      lng: parseFloat(lng) + 0.03 
    },
    { 
      name: 'Fortis Hospital', 
      address: 'Sector B, Pocket 1, Aruna Asaf Ali Marg, Vasant Kunj - 110070', 
      distance: '3.8 km', 
      rating: 4.5, 
      phone: '+911142776222',
      type: 'Private Multi-Specialty',
      beds: '400+',
      emergency: '24/7',
      facilities: ['ICU', 'Emergency', 'Dialysis', 'Pharmacy'],
      lat: parseFloat(lat) + 0.04, 
      lng: parseFloat(lng) + 0.04 
    },
    { 
      name: 'Sir Ganga Ram Hospital', 
      address: 'Rajinder Nagar, New Delhi - 110060', 
      distance: '4.5 km', 
      rating: 4.7, 
      phone: '+911125750000',
      type: 'Private Multi-Specialty',
      beds: '675+',
      emergency: '24/7',
      facilities: ['ICU', 'Trauma Center', 'Kidney Transplant', 'Cancer Center'],
      lat: parseFloat(lat) + 0.05, 
      lng: parseFloat(lng) + 0.05 
    },
    { 
      name: 'Safdarjung Hospital', 
      address: 'Ansari Nagar West, New Delhi - 110029', 
      distance: '5.2 km', 
      rating: 4.4, 
      phone: '+911126165060',
      type: 'Government Multi-Specialty',
      beds: '1500+',
      emergency: '24/7',
      facilities: ['ICU', 'Emergency', 'Burns Unit', 'Blood Bank'],
      lat: parseFloat(lat) + 0.06, 
      lng: parseFloat(lng) + 0.06 
    },
    { 
      name: 'BLK Super Specialty Hospital', 
      address: 'Pusa Road, Rajinder Nagar, New Delhi - 110005', 
      distance: '5.8 km', 
      rating: 4.6, 
      phone: '+911130403040',
      type: 'Private Multi-Specialty',
      beds: '650+',
      emergency: '24/7',
      facilities: ['ICU', 'Robotic Surgery', 'Bone Marrow Transplant', 'IVF Center'],
      lat: parseFloat(lat) + 0.07, 
      lng: parseFloat(lng) + 0.07 
    },
    { 
      name: 'Indraprastha Apollo Hospital', 
      address: 'Sarita Vihar, Mathura Road, New Delhi - 110076', 
      distance: '6.2 km', 
      rating: 4.8, 
      phone: '+911126825001',
      type: 'Private Multi-Specialty',
      beds: '700+',
      emergency: '24/7',
      facilities: ['ICU', 'Heart Transplant', 'Liver Transplant', 'Cancer Center'],
      lat: parseFloat(lat) + 0.08, 
      lng: parseFloat(lng) + 0.08 
    },
    { 
      name: 'Manipal Hospital', 
      address: 'Sector 6, Dwarka, New Delhi - 110075', 
      distance: '6.9 km', 
      rating: 4.5, 
      phone: '+911145771000',
      type: 'Private Multi-Specialty',
      beds: '380+',
      emergency: '24/7',
      facilities: ['ICU', 'NICU', 'Dialysis', 'Maternity Ward'],
      lat: parseFloat(lat) + 0.09, 
      lng: parseFloat(lng) + 0.09 
    },
    { 
      name: 'Primus Super Specialty Hospital', 
      address: 'Chandragupta Marg, Chanakyapuri, New Delhi - 110021', 
      distance: '7.5 km', 
      rating: 4.4, 
      phone: '+911146211111',
      type: 'Private Multi-Specialty',
      beds: '200+',
      emergency: '24/7',
      facilities: ['ICU', 'Emergency', 'Orthopedics', 'Neurosurgery'],
      lat: parseFloat(lat) + 0.10, 
      lng: parseFloat(lng) + 0.10 
    }
  ];
  
  const doctors = [
    { 
      name: 'Dr. Rajesh Kumar', 
      specialization: 'General Physician', 
      clinic: 'Apollo Clinic, Connaught Place', 
      distance: '0.8 km', 
      experience: 15, 
      rating: 4.8, 
      phone: '+919039507514',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      education: 'MBBS, MD (Medicine)',
      languages: 'English, Hindi',
      consultationFee: '₹500',
      availability: 'Mon-Fri: 9AM-5PM' 
    },
    { 
      name: 'Dr. Priya Sharma', 
      specialization: 'Cardiologist', 
      clinic: 'Max Heart Care, Saket', 
      distance: '1.2 km', 
      experience: 18, 
      rating: 4.9, 
      phone: '+919876543210',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      education: 'MBBS, MD, DM (Cardiology)',
      languages: 'English, Hindi, Punjabi',
      consultationFee: '₹1200',
      availability: 'Mon-Sat: 10AM-6PM' 
    },
    { 
      name: 'Dr. Amit Verma', 
      specialization: 'Pediatrician', 
      clinic: 'Child Care Clinic, Dwarka', 
      distance: '1.5 km', 
      experience: 12, 
      rating: 4.7, 
      phone: '+919123456789',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg',
      education: 'MBBS, MD (Pediatrics)',
      languages: 'English, Hindi',
      consultationFee: '₹600',
      availability: 'Mon-Sun: 8AM-8PM' 
    },
    { 
      name: 'Dr. Sneha Reddy', 
      specialization: 'Dermatologist', 
      clinic: 'Skin & Hair Clinic, Vasant Vihar', 
      distance: '2.1 km', 
      experience: 10, 
      rating: 4.8, 
      phone: '+919988776655',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      education: 'MBBS, MD (Dermatology)',
      languages: 'English, Hindi, Telugu',
      consultationFee: '₹800',
      availability: 'Tue-Sun: 10AM-6PM' 
    },
    { 
      name: 'Dr. Vikram Singh', 
      specialization: 'Orthopedic Surgeon', 
      clinic: 'Bone & Joint Hospital, Rohini', 
      distance: '2.8 km', 
      experience: 20, 
      rating: 4.9, 
      phone: '+919876501234',
      photo: 'https://randomuser.me/api/portraits/men/52.jpg',
      education: 'MBBS, MS (Orthopedics)',
      languages: 'English, Hindi',
      consultationFee: '₹1000',
      availability: 'Mon-Sat: 9AM-5PM' 
    },
    { 
      name: 'Dr. Anjali Mehta', 
      specialization: 'Gynecologist', 
      clinic: 'Women Care Center, Lajpat Nagar', 
      distance: '3.2 km', 
      experience: 14, 
      rating: 4.8, 
      phone: '+919012345678',
      photo: 'https://randomuser.me/api/portraits/women/32.jpg',
      education: 'MBBS, MS (Obstetrics & Gynecology)',
      languages: 'English, Hindi, Gujarati',
      consultationFee: '₹700',
      availability: 'Mon-Fri: 10AM-7PM' 
    },
    { 
      name: 'Dr. Arjun Kapoor', 
      specialization: 'Neurologist', 
      clinic: 'Brain & Spine Clinic, Greater Kailash', 
      distance: '3.5 km', 
      experience: 16, 
      rating: 4.9, 
      phone: '+919898989898',
      photo: 'https://randomuser.me/api/portraits/men/67.jpg',
      education: 'MBBS, MD, DM (Neurology)',
      languages: 'English, Hindi',
      consultationFee: '₹1500',
      availability: 'Mon-Sat: 11AM-6PM' 
    },
    { 
      name: 'Dr. Kavita Joshi', 
      specialization: 'Dentist', 
      clinic: 'Smile Dental Care, Janakpuri', 
      distance: '3.9 km', 
      experience: 9, 
      rating: 4.7, 
      phone: '+919765432109',
      photo: 'https://randomuser.me/api/portraits/women/55.jpg',
      education: 'BDS, MDS (Orthodontics)',
      languages: 'English, Hindi',
      consultationFee: '₹400',
      availability: 'Mon-Sat: 9AM-8PM' 
    },
    { 
      name: 'Dr. Sanjay Gupta', 
      specialization: 'ENT Specialist', 
      clinic: 'ENT Care Clinic, Pitampura', 
      distance: '4.2 km', 
      experience: 13, 
      rating: 4.6, 
      phone: '+919654321098',
      photo: 'https://randomuser.me/api/portraits/men/71.jpg',
      education: 'MBBS, MS (ENT)',
      languages: 'English, Hindi',
      consultationFee: '₹650',
      availability: 'Tue-Sun: 10AM-5PM' 
    },
    { 
      name: 'Dr. Meera Iyer', 
      specialization: 'Psychiatrist', 
      clinic: 'Mind Wellness Center, Hauz Khas', 
      distance: '4.8 km', 
      experience: 11, 
      rating: 4.8, 
      phone: '+919543210987',
      photo: 'https://randomuser.me/api/portraits/women/72.jpg',
      education: 'MBBS, MD (Psychiatry)',
      languages: 'English, Hindi, Tamil',
      consultationFee: '₹900',
      availability: 'Mon-Fri: 2PM-8PM' 
    }
  ];
  
  res.json({ success: true, hospitals, doctors });
});

app.listen(PORT, () => {
  console.log(`🏥 Healthcare API running on port ${PORT}`);
  console.log(`📊 No MongoDB required - using in-memory storage`);
});
