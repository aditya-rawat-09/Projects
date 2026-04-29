import React from 'react';
import { X, CreditCard, Smartphone, Building } from 'lucide-react';
import { PaymentForm } from './payment/PaymentForm';
import { UPIForm } from './payment/UPIForm';
import { NetBankingForm } from './payment/NetBankingForm';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotelName: string;
  price: number;
}

export function PaymentModal({ isOpen, onClose, hotelName, price }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'upi' | 'netbanking'>('card');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Payment for {hotelName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">Amount: ₹{price}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            className={`flex flex-col items-center p-3 rounded-lg border ${
              paymentMethod === 'card' ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <CreditCard className={paymentMethod === 'card' ? 'text-red-500' : 'text-gray-500'} />
            <span className="text-sm mt-1">Card</span>
          </button>
          <button
            className={`flex flex-col items-center p-3 rounded-lg border ${
              paymentMethod === 'upi' ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('upi')}
          >
            <Smartphone className={paymentMethod === 'upi' ? 'text-red-500' : 'text-gray-500'} />
            <span className="text-sm mt-1">UPI</span>
          </button>
          <button
            className={`flex flex-col items-center p-3 rounded-lg border ${
              paymentMethod === 'netbanking' ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
            onClick={() => setPaymentMethod('netbanking')}
          >
            <Building className={paymentMethod === 'netbanking' ? 'text-red-500' : 'text-gray-500'} />
            <span className="text-sm mt-1">Net Banking</span>
          </button>
        </div>

        {paymentMethod === 'card' && <PaymentForm onClose={onClose} />}
        {paymentMethod === 'upi' && <UPIForm onClose={onClose} />}
        {paymentMethod === 'netbanking' && <NetBankingForm onClose={onClose} />}
      </div>
    </div>
  );
}