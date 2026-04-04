const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  symptoms: { type: String, required: true },
  extractedSymptoms: [String],
  predictions: [{
    disease: String,
    confidence: Number
  }],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', consultationSchema);
