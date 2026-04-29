import React from 'react';
import { Search, Calendar, Users } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Where are you going?"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in / Check-out</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Add dates"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4+ Guests</option>
          </select>
        </div>
      </div>
      
      <button className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 transition-colors">
        Search
      </button>
    </div>
  );
}