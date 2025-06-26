import React from 'react';
import { Header } from '../components/Header';
import { SearchForm } from '../components/SearchForm';
import { FeaturedBuses } from '../components/FeaturedBuses';
import { Features } from '../components/Features';

interface HomePageProps {
  onShowAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onShowAuth }) => {
  return (
    <div className="min-h-screen">
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(88, 28, 135, 0.8)), url('https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        <Header onShowAuth={onShowAuth} />
        
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Travel in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {' '}Luxury
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience premium bus travel with world-class comfort, safety, and convenience
            </p>
          </div>
          
          <SearchForm />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <FeaturedBuses />
      <Features />
    </div>
  );
};