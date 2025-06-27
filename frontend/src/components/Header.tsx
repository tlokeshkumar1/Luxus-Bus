import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { UserProfileDropdown } from './UserProfileDropdown';

interface HeaderProps {
  onShowAuth: () => void;
  user?: {
    name: string;
    email: string;
  } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowAuth, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg">
              <Bus size={20} />
            </div>
            <span className="text-lg font-bold">LuxusBus</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-gray-300 hover:text-white transition-colors text-sm ${
                location.pathname === '/' ? 'text-white' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/buses" 
              className={`text-gray-300 hover:text-white transition-colors text-sm ${
                location.pathname === '/buses' ? 'text-white' : ''
              }`}
            >
              Search Buses
            </Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
              Help
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <UserProfileDropdown user={user} onLogout={onLogout || (() => {})} />
            ) : (
              <button
                onClick={onShowAuth}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white transition-all hover:scale-105 text-sm"
              >
                <User size={16} />
                Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/buses" 
                className="text-gray-300 hover:text-white transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Buses
              </Link>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </a>
              {!user && (
                <button
                  onClick={() => {
                    onShowAuth();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-white transition-all w-fit text-sm"
                >
                  <User size={16} />
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};