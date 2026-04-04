import React from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ results, onBack }) {
  return (
    <div className="results-wrapper">
      <div className="results-container">
        <button onClick={onBack} className="back-btn">← Back</button>
        <h2>Analysis Results</h2>
        
        <div className="results-content">
          <div className="consultation-info">
            <p><strong>Consultation ID:</strong> {results?.consultationId}</p>
            <p><strong>Status:</strong> <span className="status-success">Success</span></p>
          </div>
          
          {results?.predictions && results.predictions.length > 0 && (
            <div className="predictions-section">
              <h3>Possible Conditions</h3>
              {results.predictions.map((pred, index) => (
                <div key={index} className="prediction-card">
                  <div className="prediction-header">
                    <h4>{pred.disease}</h4>
                    <span className="confidence-badge">{pred.confidence}% Match</span>
                  </div>
                  
                  <div className="prediction-section">
                    <h5>📝 Description</h5>
                    <p>{pred.description}</p>
                  </div>
                  
                  {pred.medications && pred.medications.length > 0 && (
                    <div className="prediction-section">
                      <h5>💊 Medications</h5>
                      <ul>
                        {pred.medications.map((med, i) => (
                          <li key={i}>{med}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {pred.precautions && pred.precautions.length > 0 && (
                    <div className="prediction-section">
                      <h5>⚠️ Precautions</h5>
                      <ul>
                        {pred.precautions.map((prec, i) => (
                          <li key={i}>{prec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {pred.dietRecommendations && pred.dietRecommendations.length > 0 && (
                    <div className="prediction-section">
                      <h5>🍎 Diet Recommendations</h5>
                      <ul>
                        {pred.dietRecommendations.map((diet, i) => (
                          <li key={i}>{diet}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {pred.doctorConsultation && (
                    <div className="prediction-section doctor-advice">
                      <h5>👨‍⚕️ Doctor Consultation</h5>
                      <p>{pred.doctorConsultation}</p>
                    </div>
                  )}
                  
                  {pred.duration && (
                    <div className="info-tags">
                      <span className="info-tag">⏱️ Duration: {pred.duration}</span>
                      {pred.severity && <span className="info-tag severity">🚨 Severity: {pred.severity}</span>}
                      {pred.contagious && <span className="info-tag contagious">⚠️ Contagious</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="disclaimer">
            <strong>⚠️ Disclaimer:</strong> This is an AI-based preliminary analysis. 
            Please consult a qualified healthcare professional for proper diagnosis and treatment.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;
