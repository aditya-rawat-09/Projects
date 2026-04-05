import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    title: 'Healthcare Plus',
    startConsultation: 'Start Consultation',
    about: 'About',
    features: 'Features',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout'
  },
  hi: {
    title: 'हेल्थकेयर प्लस',
    startConsultation: 'परामर्श शुरू करें',
    about: 'के बारे में',
    features: 'विशेषताएं',
    contact: 'संपर्क करें',
    login: 'लॉगिन',
    logout: 'लॉगआउट'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
