import React from 'react';
import { Shield, Clock, CreditCard, Headphones, MapPin, Star } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '100% Safe & Secure',
    description: 'Your safety is our top priority with verified operators and secure payments',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your travel needs',
    color: 'from-blue-600 to-purple-600'
  },
  {
    icon: CreditCard,
    title: 'Easy Payments',
    description: 'Multiple payment options with instant confirmation',
    color: 'from-purple-600 to-pink-600'
  },
  {
    icon: Headphones,
    title: 'Live Tracking',
    description: 'Real-time bus tracking and journey updates',
    color: 'from-orange-600 to-red-600'
  },
  {
    icon: MapPin,
    title: 'Wide Network',
    description: 'Extensive network covering major cities across the country',
    color: 'from-teal-600 to-cyan-600'
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'Luxury travel experience with world-class amenities',
    color: 'from-yellow-600 to-orange-600'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose LuxusBus?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the difference with our premium services and commitment to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};