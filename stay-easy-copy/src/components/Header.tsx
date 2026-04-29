import React, { useState } from 'react';
import { Hotel } from 'lucide-react';
import { LoginModal } from './auth/LoginModal';

export function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hotel className="text-red-500" size={32} />
            <span className="text-2xl font-bold text-gray-800">StayEasy</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">List Your Property</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Sign In
            </button>
          </nav>
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}