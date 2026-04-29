import React, { useState } from 'react';
import { BedDouble } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { HotelCard } from './components/HotelCard';
import { Header } from './components/Header';
import { hotels } from './data/hotels';

export default function App() {
  const [displayCount, setDisplayCount] = useState(6);

  const showMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, hotels.length));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl opacity-90">
              Book hotels, resorts and homestays at the best prices
            </p>
          </div>
          <SearchBar />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hotels Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <BedDouble className="text-red-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Available Hotels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.slice(0, displayCount).map((hotel) => (
              <HotelCard key={hotel.name} {...hotel} />
            ))}
          </div>
          {displayCount < hotels.length && (
            <div className="text-center mt-8">
              <button
                onClick={showMore}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Load More Hotels
              </button>
            </div>
          )}
        </section>

        {/* Why Choose Us */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose StayEasy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Best Prices",
                description: "Find the best deals and exclusive offers on hotels"
              },
              {
                title: "Quality Assured",
                description: "All properties are verified for quality and comfort"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer support for your needs"
              }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About StayEasy</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Property Owners</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">List Your Property</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Partner Hub</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Safety Guidelines</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StayEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}