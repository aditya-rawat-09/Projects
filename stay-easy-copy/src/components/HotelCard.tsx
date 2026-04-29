import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface HotelCardProps {
  name: string;
  image: string;
  rating: number;
  price: number;
  location: string;
  amenities: string[];
}

export function HotelCard({ name, image, rating, price, location, amenities }: HotelCardProps) {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center bg-green-500 text-white px-2 py-1 rounded">
              <Star size={16} className="mr-1" />
              <span>{rating}</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {amenities.map((amenity) => (
              <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-gray-800">₹{price}</span>
              <span className="text-gray-600 text-sm">/night</span>
            </div>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        hotelName={name}
        price={price}
      />
    </>
  );
}