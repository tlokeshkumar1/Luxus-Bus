import React from 'react';
import { Clock, DollarSign, Settings } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    busType: string;
    departure: string;
    priceRange: number[];
    amenities: string[];
    operators: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange }) => {
  const busTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'seater', label: 'AC Seater' },
    { value: 'sleeper', label: 'AC Sleeper' },
    { value: 'semi', label: 'Semi Sleeper' }
  ];

  const departureSlots = [
    { value: 'all', label: 'Any Time' },
    { value: 'morning', label: 'Morning (6AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { value: 'evening', label: 'Evening (6PM - 12AM)' },
    { value: 'night', label: 'Night (12AM - 6AM)' }
  ];

  const amenitiesList = [
    'WiFi', 'Charging Port', 'Entertainment', 'Meals', 'Blanket', 'Pillow', 'Reading Light'
  ];

  const operatorsList = [
    'Royal Travels', 'Luxury Lines', 'Express Tours', 'Premium Travels'
  ];

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleAmenityChange = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', newAmenities);
  };

  const handleOperatorChange = (operator: string) => {
    const newOperators = filters.operators.includes(operator)
      ? filters.operators.filter(o => o !== operator)
      : [...filters.operators, operator];
    updateFilter('operators', newOperators);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Filters</h3>
      </div>

      {/* Bus Type */}
      <div>
        <h4 className="text-white font-medium mb-3">Bus Type</h4>
        <div className="space-y-2">
          {busTypes.map(type => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="busType"
                value={type.value}
                checked={filters.busType === type.value}
                onChange={(e) => updateFilter('busType', e.target.value)}
                className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-300">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Departure Time */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="text-blue-400" size={16} />
          <h4 className="text-white font-medium">Departure Time</h4>
        </div>
        <div className="space-y-2">
          {departureSlots.map(slot => (
            <label key={slot.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="departure"
                value={slot.value}
                checked={filters.departure === slot.value}
                onChange={(e) => updateFilter('departure', e.target.value)}
                className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-300 text-sm">{slot.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="text-blue-400" size={16} />
          <h4 className="text-white font-medium">Price Range</h4>
        </div>
        <div className="space-y-3">
          <input
            type="range"
            min="500"
            max="3000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-300 text-sm">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-white font-medium mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenitiesList.map(amenity => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-300 text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Operators */}
      <div>
        <h4 className="text-white font-medium mb-3">Operators</h4>
        <div className="space-y-2">
          {operatorsList.map(operator => (
            <label key={operator} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.operators.includes(operator)}
                onChange={() => handleOperatorChange(operator)}
                className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-300 text-sm">{operator}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFiltersChange({
          busType: 'all',
          departure: 'all',
          priceRange: [500, 3000],
          amenities: [],
          operators: []
        })}
        className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-white transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};