import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Crown, Coffee, Zap, Star, Gift, Sparkles } from 'lucide-react';

export const UpgradeOptions: React.FC = () => {
  const { upgrades, setUpgrades, selectedSeats } = useBooking();

  const upgradeOptions = [
    {
      id: 'luxurySleeper',
      title: 'Royal Luxury Sleeper',
      description: 'Transform your journey into a first-class experience',
      features: ['Premium memory foam mattress', 'Egyptian cotton bedding', 'Privacy curtains', 'Personal reading light'],
      price: 500,
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      borderColor: 'border-yellow-500/40',
      bgColor: 'bg-gradient-to-br from-yellow-600/10 to-orange-600/10',
      popular: true
    },
    {
      id: 'meal',
      title: 'Gourmet Dining',
      description: 'Savor premium cuisine crafted by expert chefs',
      features: ['Welcome refreshments', '5-course gourmet meal', 'Premium snacks', 'Unlimited beverages'],
      price: 200,
      icon: Coffee,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-gradient-to-br from-emerald-600/10 to-teal-600/10'
    },
    {
      id: 'priorityBoarding',
      title: 'VIP Priority Access',
      description: 'Experience premium treatment throughout your journey',
      features: ['Priority boarding', 'Dedicated service', 'Lounge access', 'Express handling'],
      price: 100,
      icon: Zap,
      color: 'from-blue-500 to-purple-600',
      borderColor: 'border-blue-500/40',
      bgColor: 'bg-gradient-to-br from-blue-600/10 to-purple-600/10'
    }
  ];

  const handleUpgradeToggle = (upgradeId: string) => {
    setUpgrades({
      ...upgrades,
      [upgradeId]: !upgrades[upgradeId as keyof typeof upgrades]
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg">
          <Gift className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">Upgrade Your Journey</h3>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-md text-purple-300 text-sm font-medium">
              PREMIUM ADD-ONS
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="text-yellow-400" size={12} />
              <span className="text-yellow-400 font-medium text-xs">LUXURY</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {upgradeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = upgrades[option.id as keyof typeof upgrades];
          const totalPrice = option.price * selectedSeats.length;
          
          return (
            <div
              key={option.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                isSelected ? 'scale-[1.01]' : ''
              }`}
              onClick={() => handleUpgradeToggle(option.id)}
            >
              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                isSelected
                  ? `${option.borderColor} ${option.bgColor} shadow-lg`
                  : `border-white/10 bg-black/20 hover:${option.bgColor} hover:border-white/20`
              } backdrop-blur-sm`}>
                
                {/* Popular Badge */}
                {option.popular && (
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-xs rounded-md">
                      <Star size={12} className="fill-current" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm"></div>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${option.color} shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg mb-1">{option.title}</h4>
                        <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-white font-bold text-xl">
                          ₹{selectedSeats.length > 0 ? totalPrice.toLocaleString() : option.price.toLocaleString()}
                        </div>
                        {selectedSeats.length > 1 && (
                          <div className="text-gray-400 text-xs">
                            ₹{option.price} × {selectedSeats.length}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-md">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${option.color} rounded-full`}></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleUpgradeToggle(option.id)}
                          className="w-4 h-4 text-blue-600 bg-transparent border-2 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-300 font-medium">Add to booking</span>
                      </div>
                      
                      {isSelected && (
                        <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          ADDED
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {selectedSeats.length === 0 && (
        <div className="mt-6">
          <div className="p-4 bg-yellow-600/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <p className="text-yellow-300 font-medium">
                Select seats to see personalized upgrade pricing
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Total Upgrades Summary */}
      {(upgrades.luxurySleeper || upgrades.meal || upgrades.priorityBoarding) && selectedSeats.length > 0 && (
        <div className="mt-6">
          <div className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="text-purple-400" size={20} />
                <div>
                  <span className="text-purple-300 font-bold">Total Upgrades</span>
                  <div className="text-gray-400 text-sm">Premium package</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ₹{((upgrades.luxurySleeper ? 500 : 0) + 
                     (upgrades.meal ? 200 : 0) + 
                     (upgrades.priorityBoarding ? 100 : 0)) * selectedSeats.length}
                </div>
                <div className="text-gray-400 text-sm">for {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};