import React from 'react';
import { Building } from 'lucide-react';

interface NetBankingFormProps {
  onClose: () => void;
}

export function NetBankingForm({ onClose }: NetBankingFormProps) {
  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'Punjab National Bank'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Net Banking payment processed successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Bank
        </label>
        <div className="relative">
          <select
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="">Select your bank</option>
            {banks.map(bank => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Continue to Net Banking
      </button>
    </form>
  );
}