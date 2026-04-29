import React from 'react';
import { Smartphone } from 'lucide-react';

interface UPIFormProps {
  onClose: () => void;
}

export function UPIForm({ onClose }: UPIFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('UPI payment processed successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          UPI ID
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="username@upi"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
            pattern="[a-zA-Z0-9\.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}"
          />
          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );
}