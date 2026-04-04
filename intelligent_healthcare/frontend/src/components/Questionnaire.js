import React, { useState } from 'react';
import './Questionnaire.css';

function Questionnaire({ onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    symptoms: '',
    duration: '',
    severity: '',
    age: '',
    gender: '',
    medicalHistory: ''
  });

  const questions = [
    {
      id: 'symptoms',
      question: 'What symptoms are you experiencing?',
      type: 'textarea',
      placeholder: 'e.g., fever, headache, cough, body aches...'
    },
    {
      id: 'duration',
      question: 'How long have you had these symptoms?',
      type: 'select',
      options: ['Less than 24 hours', '1-3 days', '4-7 days', 'More than a week', 'More than a month']
    },
    {
      id: 'severity',
      question: 'How severe are your symptoms? (1-10)',
      type: 'select',
      options: ['1 - Very Mild', '2', '3', '4', '5 - Moderate', '6', '7', '8', '9', '10 - Very Severe']
    },
    {
      id: 'temperature',
      question: 'Do you have a fever? If yes, what is your temperature?',
      type: 'select',
      options: ['No fever', 'Low grade (99-100°F)', 'Moderate (100-102°F)', 'High (102-104°F)', 'Very high (>104°F)']
    },
    {
      id: 'age',
      question: 'What is your age?',
      type: 'number',
      placeholder: 'Enter your age'
    },
    {
      id: 'gender',
      question: 'What is your gender?',
      type: 'select',
      options: ['Male', 'Female', 'Other', 'Prefer not to say']
    },
    {
      id: 'location',
      question: 'Where is the pain/discomfort located?',
      type: 'textarea',
      placeholder: 'e.g., head, chest, stomach, throat... (optional)'
    },
    {
      id: 'triggers',
      question: 'What makes your symptoms worse or better?',
      type: 'textarea',
      placeholder: 'e.g., eating, lying down, movement... (optional)'
    },
    {
      id: 'medicalHistory',
      question: 'Do you have any existing medical conditions?',
      type: 'textarea',
      placeholder: 'e.g., diabetes, hypertension, asthma, allergies... (optional)'
    },
    {
      id: 'medications',
      question: 'Are you currently taking any medications?',
      type: 'textarea',
      placeholder: 'List any medications you are taking... (optional)'
    },
    {
      id: 'recentTravel',
      question: 'Have you traveled recently or been exposed to sick people?',
      type: 'select',
      options: ['No', 'Yes - Recent travel', 'Yes - Exposed to sick person', 'Both']
    }
  ];

  const currentQuestion = questions[step];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleChange = (value) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const isAnswered = answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== '';
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="questionnaire-wrapper">
      <div className="questionnaire-container">
        <button onClick={handleBack} className="back-btn">← Back</button>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="question-counter">
          Question {step + 1} of {questions.length}
        </div>
        
        <h2 className="question-text">{currentQuestion.question}</h2>
        
        <div className="answer-section">
          {currentQuestion.type === 'textarea' && (
            <textarea
              value={answers[currentQuestion.id]}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              rows="5"
            />
          )}
          
          {currentQuestion.type === 'select' && (
            <select
              value={answers[currentQuestion.id]}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value="">Select an option</option>
              {currentQuestion.options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          )}
          
          {currentQuestion.type === 'number' && (
            <input
              type="number"
              value={answers[currentQuestion.id]}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              min="1"
              max="120"
            />
          )}
        </div>
        
        <button 
          className="next-btn" 
          onClick={handleNext}
          disabled={!isAnswered && currentQuestion.id !== 'medicalHistory'}
        >
          {step === questions.length - 1 ? 'Get Results' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
