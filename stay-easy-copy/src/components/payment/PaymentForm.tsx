import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  onClose: () => void;
}

export function PaymentForm({ onClose }: PaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    alert('Payment processed successfully!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
            pattern="[0-9\s]{16,19}"
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
            pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
            pattern="[0-9]{3,4}"
          />
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