import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CreditCard, Shield, Clock, Star, MapPin, Zap, Crown } from 'lucide-react';

export const BookingSummary: React.FC = () => {
  const { selectedBus, selectedSeats, upgrades, searchData } = useBooking();

  if (!selectedBus) return null;

  const basePrice = selectedBus.price * selectedSeats.length;
  const luxuryUpgrade = upgrades.luxurySleeper ? 500 * selectedSeats.length : 0;
  const mealUpgrade = upgrades.meal ? 200 * selectedSeats.length : 0;
  const priorityBoarding = upgrades.priorityBoarding ? 100 * selectedSeats.length : 0;
  const taxes = Math.round((basePrice + luxuryUpgrade + mealUpgrade + priorityBoarding) * 0.05);
  const totalAmount = basePrice + luxuryUpgrade + mealUpgrade + priorityBoarding + taxes;

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    // Handle payment flow
    alert('Proceeding to payment...');
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-full"></div>
        <div>
          <h3 className="text-xl font-bold text-white">Booking Summary</h3>
          <div className="flex items-center gap-2">
            <Crown className="text-yellow-400" size={14} />
            <span className="text-yellow-400 font-medium text-sm">PREMIUM</span>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="space-y-4 mb-6">
        <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="text-white font-bold text-lg mb-2">{selectedBus.name}</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-md">
                  <Star className="fill-yellow-400 text-yellow-400" size={14} />
                  <span className="text-yellow-400 font-medium text-sm">{selectedBus.rating}</span>
                </div>
                <div className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-md text-purple-300 text-sm font-medium">
                  LUXURY
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                ₹{selectedBus.price.toLocaleString()}
              </div>
              <div className="text-gray-400 text-sm">per seat</div>
            </div>
          </div>
          
          {searchData && (
            <div className="flex items-center gap-2 mb-3 p-2 bg-white/5 rounded-md">
              <MapPin className="text-blue-400" size={16} />
              <span className="text-gray-200 font-medium">{searchData.from} → {searchData.to}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{selectedBus.departure}</div>
                <div className="text-gray-400 text-xs">DEPARTURE</div>
              </div>
              <div className="flex-1 flex items-center">
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
                <div className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md text-blue-300 text-sm mx-2">
                  {selectedBus.duration}
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">{selectedBus.arrival}</div>
                <div className="text-gray-400 text-xs">ARRIVAL</div>
              </div>
            </div>
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Selected Seats</span>
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  {selectedSeats.sort((a, b) => a - b).join(', ')}
                </div>
                <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-md text-emerald-300 text-sm">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              Premium comfort seats with extra legroom
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      {selectedSeats.length > 0 && (
        <div className="mb-6">
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-blue-400" size={18} />
              <h5 className="text-white font-bold">Price Breakdown</h5>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                <span className="text-gray-300 text-sm">Base Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})</span>
                <span className="font-bold text-white">₹{basePrice.toLocaleString()}</span>
              </div>

              {upgrades.luxurySleeper && (
                <div className="flex justify-between items-center p-2 bg-yellow-600/10 border border-yellow-500/20 rounded-md">
                  <span className="flex items-center gap-2 text-yellow-300 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    Luxury Upgrade
                  </span>
                  <span className="font-bold text-yellow-300">₹{luxuryUpgrade.toLocaleString()}</span>
                </div>
              )}

              {upgrades.meal && (
                <div className="flex justify-between items-center p-2 bg-emerald-600/10 border border-emerald-500/20 rounded-md">
                  <span className="flex items-center gap-2 text-emerald-300 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    Gourmet Meal
                  </span>
                  <span className="font-bold text-emerald-300">₹{mealUpgrade.toLocaleString()}</span>
                </div>
              )}

              {upgrades.priorityBoarding && (
                <div className="flex justify-between items-center p-2 bg-blue-600/10 border border-blue-500/20 rounded-md">
                  <span className="flex items-center gap-2 text-blue-300 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Priority Boarding
                  </span>
                  <span className="font-bold text-blue-300">₹{priorityBoarding.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center p-2 bg-white/5 rounded-md">
                <span className="text-gray-300 text-sm">Taxes & Fees (5%)</span>
                <span className="font-bold text-white">₹{taxes.toLocaleString()}</span>
              </div>
            </div>

            <div className="border-t border-white/10 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-lg">Total Amount</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    ₹{totalAmount.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">All inclusive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Features */}
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
            <Shield className="text-emerald-400" size={18} />
            <div>
              <div className="text-emerald-400 font-medium text-sm">100% Safe & Secure</div>
              <div className="text-gray-400 text-xs">SSL encryption</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <Clock className="text-blue-400" size={18} />
            <div>
              <div className="text-blue-400 font-medium text-sm">Free Cancellation</div>
              <div className="text-gray-400 text-xs">Up to 2 hours before</div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={selectedSeats.length === 0}
        className={`w-full px-6 py-4 font-bold rounded-xl transition-all duration-300 ${
          selectedSeats.length === 0
            ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border border-gray-600/30'
            : 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700 hover:scale-105 shadow-lg border border-blue-500/30'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <CreditCard size={20} />
          <span>
            {selectedSeats.length === 0 ? 'Select Seats to Continue' : 'PROCEED TO PAYMENT'}
          </span>
          {selectedSeats.length > 0 && <Zap size={20} />}
        </div>
      </button>

      {selectedSeats.length === 0 && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Choose your preferred seats from the layout above
          </p>
        </div>
      )}
    </div>
  );
};