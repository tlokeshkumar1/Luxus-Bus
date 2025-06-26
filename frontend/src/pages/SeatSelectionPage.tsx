import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SeatLayout } from '../components/SeatLayout';
import { BookingSummary } from '../components/BookingSummary';
import { UpgradeOptions } from '../components/UpgradeOptions';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft } from 'lucide-react';

interface SeatSelectionPageProps {
  onShowAuth: () => void;
}

export const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({ onShowAuth }) => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { selectedBus, selectedSeats } = useBooking();
  const [selectedDeck, setSelectedDeck] = useState<'lower' | 'upper'>('lower');

  if (!selectedBus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-4">Bus not found</h2>
          <button
            onClick={() => navigate('/buses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to Bus Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onShowAuth={onShowAuth} />
      
      <div className="container mx-auto px-6 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/buses')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Buses
          </button>
          <div className="text-gray-400 text-sm">Select Seats</div>
        </div>

        {/* Bus Info Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-xl font-bold text-white mb-2">{selectedBus.name}</h1>
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <span>{selectedBus.departure} → {selectedBus.arrival}</span>
                <span>{selectedBus.duration}</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {selectedBus.rating}
                </span>
              </div>
            </div>
            <div className="text-right mt-3 lg:mt-0">
              <div className="text-xl font-bold text-white">₹{selectedBus.price.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">per seat</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Select Seats</h2>
                
                {/* Deck Toggle */}
                {selectedBus.type.includes('Sleeper') && (
                  <div className="flex bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => setSelectedDeck('lower')}
                      className={`px-3 py-2 rounded-md transition-all text-sm ${
                        selectedDeck === 'lower'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Lower Deck
                    </button>
                    <button
                      onClick={() => setSelectedDeck('upper')}
                      className={`px-3 py-2 rounded-md transition-all text-sm ${
                        selectedDeck === 'upper'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Upper Deck
                    </button>
                  </div>
                )}
              </div>
              
              <SeatLayout 
                busType={selectedBus.type} 
                selectedDeck={selectedDeck}
              />
            </div>

            {/* Upgrade Options */}
            <div className="mt-6">
              <UpgradeOptions />
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};