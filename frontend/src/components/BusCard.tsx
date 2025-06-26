import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Wifi, Zap, Coffee, Bed, Tv, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface BusCardProps {
  bus: {
    id: string;
    name: string;
    operator: string;
    type: string;
    duration: string;
    departure: string;
    arrival: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    seatsAvailable: number;
    amenities: string[];
    route: string;
    boardingPoints: string[];
    droppingPoints: string[];
  };
}

export const BusCard: React.FC<BusCardProps> = ({ bus }) => {
  const navigate = useNavigate();
  const { setSelectedBus } = useBooking();

  const handleSelectSeats = () => {
    setSelectedBus({
      id: bus.id,
      name: bus.name,
      type: bus.type,
      duration: bus.duration,
      departure: bus.departure,
      arrival: bus.arrival,
      price: bus.price,
      rating: bus.rating,
      amenities: bus.amenities
    });
    navigate(`/seats/${bus.id}`);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi size={14} />;
      case 'charging port': return <Zap size={14} />;
      case 'meals': return <Coffee size={14} />;
      case 'entertainment': return <Tv size={14} />;
      default: return <Bed size={14} />;
    }
  };

  const savings = bus.originalPrice - bus.price;
  const savingsPercentage = Math.round((savings / bus.originalPrice) * 100);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Section - Bus Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{bus.name}</h3>
              <p className="text-gray-300 text-sm">{bus.operator}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md text-blue-300 text-xs">
                  {bus.type}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={14} />
                  <span className="text-white font-semibold text-sm">{bus.rating}</span>
                  <span className="text-gray-400 text-xs">({bus.reviews})</span>
                </div>
              </div>
            </div>
            
            {savings > 0 && (
              <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-lg px-2 py-1 mt-2 sm:mt-0">
                <span className="text-emerald-300 text-xs font-semibold">
                  Save ₹{savings} ({savingsPercentage}% OFF)
                </span>
              </div>
            )}
          </div>

          {/* Timing and Duration */}
          <div className="flex items-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-xl font-bold text-white">{bus.departure}</div>
              <div className="text-gray-400 text-xs">Departure</div>
            </div>
            <div className="flex-1 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md text-blue-300 text-xs">
                {bus.duration}
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">{bus.arrival}</div>
              <div className="text-gray-400 text-xs">Arrival</div>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-3">
            {bus.amenities.slice(0, 6).map((amenity) => (
              <div key={amenity} className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 text-xs">
                {getAmenityIcon(amenity)}
                {amenity}
              </div>
            ))}
            {bus.amenities.length > 6 && (
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300 text-xs">
                +{bus.amenities.length - 6} more
              </div>
            )}
          </div>

          {/* Boarding Points */}
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <MapPin size={12} />
            <span>Boarding: {bus.boardingPoints.slice(0, 2).join(', ')}</span>
            {bus.boardingPoints.length > 2 && <span>+{bus.boardingPoints.length - 2} more</span>}
          </div>
        </div>

        {/* Right Section - Pricing and Action */}
        <div className="lg:w-56 flex flex-col justify-between">
          <div className="text-right mb-4">
            {bus.originalPrice > bus.price && (
              <div className="text-gray-400 line-through">₹{bus.originalPrice.toLocaleString()}</div>
            )}
            <div className="text-2xl font-bold text-white">₹{bus.price.toLocaleString()}</div>
            <div className="text-gray-300 text-sm">per seat</div>
            <div className="text-orange-400 text-sm mt-1">
              {bus.seatsAvailable} seats available
            </div>
          </div>

          <button
            onClick={handleSelectSeats}
            className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg text-sm"
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
};