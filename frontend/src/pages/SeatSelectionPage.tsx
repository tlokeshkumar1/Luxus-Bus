import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { SeatLayout } from '../components/SeatLayout';
import { BookingSummary } from '../components/BookingSummary';
import { UpgradeOptions } from '../components/UpgradeOptions';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft } from 'lucide-react';

interface Bus {
  id: string;
  name: string;
  departure: string;
  arrival: string;
  duration: string;
  rating: number;
  price: number;
  type: string;
}

interface SeatSelectionPageProps {
  onShowAuth: () => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export const SeatSelectionPage: React.FC<SeatSelectionPageProps> = ({
  onShowAuth,
  user,
  onLogout,
}) => {
  const { busId } = useParams<{ busId: string }>();
  const navigate = useNavigate();
  const { selectedBus, setSelectedBus } = useBooking(); // assuming your context provides setter
  const [busData, setBusData] = useState<Bus | null>(selectedBus || null);
  const [loading, setLoading] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<'lower' | 'upper'>('lower');

  useEffect(() => {
    if (!busData && busId) {
      setLoading(true);
      fetch(`http://localhost:5000/bus/${busId}`)
        .then(res => res.json())
        .then(data => {
          setBusData(data);
          setSelectedBus?.(data); // Optional: update context if needed
        })
        .catch(err => {
          console.error('Failed to fetch bus:', err);
        })
        .finally(() => setLoading(false));
    }
  }, [busId, busData, setSelectedBus]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading bus details...
      </div>
    );
  }

  if (!busData) {
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
      <Header onShowAuth={onShowAuth} user={user} onLogout={onLogout} />

      <div className="container mx-auto px-6 pt-24">
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

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-xl font-bold text-white mb-2">{busData.name}</h1>
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                <span>{busData.departure} → {busData.arrival}</span>
                <span>{busData.duration}</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  {busData.rating}
                </span>
              </div>
            </div>
            <div className="text-right mt-3 lg:mt-0">
              <div className="text-xl font-bold text-white">₹{busData.price.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">per seat</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Select Seats</h2>

                {busData.type.includes('Sleeper') && (
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

              <SeatLayout busType={busData.type} selectedDeck={selectedDeck} />
            </div>

            <div className="mt-6">
              <UpgradeOptions />
            </div>
          </div>

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
