import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowLeftRight, Search } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const { setSearchData } = useBooking();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur'
  ];

  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.from && formData.to && formData.date) {
      setSearchData(formData);
      navigate('/buses');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
        <div className="grid md:grid-cols-4 gap-4">
          {/* From */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              From
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={formData.from}
                onChange={(e) => setFormData(prev => ({ ...prev, from: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                required
              >
                <option value="" disabled>Select departure city</option>
                {cities.map(city => (
                  <option key={city} value={city} className="bg-gray-800">{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="hidden md:flex items-end justify-center pb-3">
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg text-white hover:scale-110 transition-transform shadow-md"
            >
              <ArrowLeftRight size={18} />
            </button>
          </div>

          {/* To */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              To
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={formData.to}
                onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                required
              >
                <option value="" disabled>Select destination city</option>
                {cities.filter(city => city !== formData.from).map(city => (
                  <option key={city} value={city} className="bg-gray-800">{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Journey Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={formData.date}
                min={today}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg"
          >
            <Search size={18} />
            Search Buses
          </button>
        </div>
      </form>
    </div>
  );
};