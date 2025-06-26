import React, { useState } from 'react';
import { Header } from '../components/Header';
import { BusCard } from '../components/BusCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusListingPageProps {
  onShowAuth: () => void;
}

const mockBuses = [
  {
    id: '1',
    name: 'Volvo Multi-Axle Semi Sleeper',
    operator: 'Royal Travels',
    type: 'AC Semi Sleeper',
    duration: '14h 30m',
    departure: '09:30',
    arrival: '00:00+1',
    price: 1200,
    originalPrice: 1500,
    rating: 4.5,
    reviews: 1250,
    seatsAvailable: 28,
    amenities: ['WiFi', 'Charging Port', 'Blanket', 'Pillow', 'Water Bottle', 'Reading Light'],
    route: 'Mumbai → Pune',
    boardingPoints: ['Dadar', 'Kurla', 'Thane'],
    droppingPoints: ['Shivaji Nagar', 'Kothrud', 'Hadapsar']
  },
  {
    id: '2',
    name: 'Mercedes Multi-Axle AC Sleeper',
    operator: 'Luxury Lines',
    type: 'AC Full Sleeper',
    duration: '13h 45m',
    departure: '11:00',
    arrival: '00:45+1',
    price: 1800,
    originalPrice: 2200,
    rating: 4.8,
    reviews: 890,
    seatsAvailable: 15,
    amenities: ['WiFi', 'Entertainment', 'Charging Port', 'Blanket', 'Pillow', 'Meals', 'Reading Light'],
    route: 'Mumbai → Pune',
    boardingPoints: ['Andheri', 'Borivali', 'Thane'],
    droppingPoints: ['Camp', 'Koregaon Park', 'Wakad']
  },
  {
    id: '3',
    name: 'Scania Multi-Axle AC Seater',
    operator: 'Express Tours',
    type: 'AC Seater',
    duration: '12h 15m',
    departure: '14:30',
    arrival: '02:45+1',
    price: 900,
    originalPrice: 1100,
    rating: 4.2,
    reviews: 567,
    seatsAvailable: 35,
    amenities: ['WiFi', 'Charging Port', 'Water Bottle', 'Reading Light'],
    route: 'Mumbai → Pune',
    boardingPoints: ['CST', 'Dadar', 'Bandra'],
    droppingPoints: ['Pune Station', 'Kothrud', 'Baner']
  },
  {
    id: '4',
    name: 'Volvo B11R Multi-Axle Sleeper',
    operator: 'Premium Travels',
    type: 'Luxury Sleeper',
    duration: '13h 20m',
    departure: '20:00',
    arrival: '09:20+1',
    price: 2200,
    originalPrice: 2800,
    rating: 4.9,
    reviews: 2100,
    seatsAvailable: 8,
    amenities: ['WiFi', 'Entertainment', 'Charging Port', 'Blanket', 'Pillow', 'Meals', 'Reading Light', 'Personal Attendant'],
    route: 'Mumbai → Pune',
    boardingPoints: ['Bandra', 'Andheri', 'Goregaon'],
    droppingPoints: ['Shivaji Nagar', 'Koregaon Park', 'Viman Nagar']
  }
];

export const BusListingPage: React.FC<BusListingPageProps> = ({ onShowAuth }) => {
  const { searchData } = useBooking();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    busType: 'all',
    departure: 'all',
    priceRange: [500, 3000],
    amenities: [] as string[],
    operators: [] as string[]
  });
  
  const [sortBy, setSortBy] = useState('duration');

  const filteredBuses = mockBuses.filter(bus => {
    if (filters.busType !== 'all' && !bus.type.toLowerCase().includes(filters.busType)) {
      return false;
    }
    if (bus.price < filters.priceRange[0] || bus.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.price - b.price;
      case 'duration': return parseFloat(a.duration) - parseFloat(b.duration);
      case 'rating': return b.rating - a.rating;
      case 'departure': return a.departure.localeCompare(b.departure);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header onShowAuth={onShowAuth} />
      
      <div className="container mx-auto px-6 pt-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Search
          </button>
          {searchData && (
            <div className="text-gray-400">
              {searchData.from} → {searchData.to} • {new Date(searchData.date).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Available Buses</h1>
            <p className="text-gray-300">{sortedBuses.length} buses found</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <span className="text-gray-300">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="duration">Duration</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="departure">Departure</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>
          
          {/* Bus Listings */}
          <div className="flex-1">
            <div className="space-y-6">
              {sortedBuses.map((bus, index) => (
                <div
                  key={bus.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BusCard bus={bus} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};