import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

const featuredBuses = [
  {
    id: 1,
    name: 'Volvo Multi-Axle AC Sleeper',
    operator: 'Royal Travels',
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    rating: 4.8,
    price: 1500,
    originalPrice: 2000,
    route: 'Mumbai → Pune',
    duration: '12h 30m',
    features: ['WiFi', 'Entertainment', 'Meals']
  },
  {
    id: 2,
    name: 'Mercedes Luxury Coach',
    operator: 'Premium Lines',
    image: 'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    rating: 4.9,
    price: 2200,
    originalPrice: 2800,
    route: 'Delhi → Jaipur',
    duration: '8h 45m',
    features: ['Luxury Seats', 'Personal Attendant', 'Meals']
  },
  {
    id: 3,
    name: 'Scania Multi-Axle Seater',
    operator: 'Express Tours',
    image: 'https://images.pexels.com/photos/2538107/pexels-photo-2538107.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    rating: 4.6,
    price: 900,
    originalPrice: 1200,
    route: 'Bangalore → Chennai',
    duration: '10h 15m',
    features: ['AC', 'Charging Points', 'WiFi']
  }
];

export const FeaturedBuses: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Routes</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our most popular bus routes with premium comfort and unbeatable prices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBuses.map((bus) => (
            <div
              key={bus.id}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={bus.image}
                  alt={bus.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(((bus.originalPrice - bus.price) / bus.originalPrice) * 100)}% OFF
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{bus.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span className="text-white font-semibold">{bus.rating}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{bus.operator}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-gray-300 text-sm">
                    <MapPin size={14} />
                    {bus.route}
                  </div>
                  <div className="flex items-center gap-1 text-gray-300 text-sm">
                    <Clock size={14} />
                    {bus.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bus.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 line-through text-sm">₹{bus.originalPrice.toLocaleString()}</div>
                    <div className="text-white font-bold text-xl">₹{bus.price.toLocaleString()}</div>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};