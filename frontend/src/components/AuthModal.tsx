import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    passwordMatch: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setErrors({
        passwordMatch: true
      });
      return;
    }
    
    // Handle authentication logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    
    // Validate password match for confirm password field
    if (name === 'confirmPassword' || (name === 'password' && formData.confirmPassword)) {
      const password = name === 'password' ? value : formData.password;
      const confirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      setErrors({
        passwordMatch: password !== confirmPassword && confirmPassword !== ''
      });
    }
  };

  const socialLogins = [
    { name: 'Google', color: 'from-red-500 to-red-600', icon: '🔍' },
    { name: 'Facebook', color: 'from-blue-600 to-blue-700', icon: '📘' },
    { name: 'Apple', color: 'from-gray-800 to-black', icon: '🍎' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-300 text-sm">
            {isLogin ? 'Sign in to your account' : 'Join us for premium bus travel'}
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-2 mb-5">
          {socialLogins.map((social) => (
            <button
              key={social.name}
              className={`w-full flex items-center justify-center gap-2 p-3 bg-gradient-to-r ${social.color} text-white rounded-lg hover:scale-105 transition-transform text-sm`}
            >
              <span>{social.icon}</span>
              Continue with {social.name}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-3 bg-white/5 backdrop-blur-sm border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${
                  errors.passwordMatch 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-white/20 focus:ring-blue-500'
                }`}
                required={!isLogin}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.passwordMatch && (
                <p className="text-red-400 text-xs mt-1 ml-1">Passwords do not match</p>
              )}
            </div>
          )}

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg text-sm"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-5">
          <p className="text-gray-300 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 ml-2 transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};