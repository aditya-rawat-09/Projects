import React, { useState, useEffect } from 'react';
import './History.css';

function History({ onBack, onViewResult }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('consultationHistory') || '[]');
    setHistory(savedHistory.reverse());
  }, []);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('consultationHistory');
      setHistory([]);
    }
  };

  return (
    <div className="history-wrapper">
      <div className="history-container">
        <button onClick={onBack} className="back-btn">← Back</button>
        <div className="history-header">
          <h2>Consultation History</h2>
          {history.length > 0 && (
            <button onClick={clearHistory} className="clear-btn">Clear All</button>
          )}
        </div>
        
        {history.length === 0 ? (
          <div className="empty-history">
            <p>No consultation history yet</p>
            <p className="empty-subtitle">Your past consultations will appear here</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-card" onClick={() => onViewResult(item.results)}>
                <div className="history-date">
                  {new Date(item.timestamp).toLocaleDateString()} - {new Date(item.timestamp).toLocaleTimeString()}
                </div>
                <div className="history-symptoms">
                  <strong>Symptoms:</strong> {item.symptoms.substring(0, 100)}...
                </div>
                {item.results?.predictions && item.results.predictions.length > 0 && (
                  <div className="history-diagnosis">
                    <strong>Top Result:</strong> {item.results.predictions[0].disease} ({item.results.predictions[0].confidence}% match)
                  </div>
                )}
                <div className="view-details">View Details →</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
