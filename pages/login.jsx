import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGoogle, FaLock, FaEnvelope, FaUser, FaUtensils, FaStore, FaStar } from 'react-icons/fa';
import logo from '../images/D2VENDOR_logo.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSignUpClick = () => {
    navigate('/registration');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/vendor-dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-orange-300 to-yellow-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-red-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Left Section: Enhanced Visual/Illustration */}
      <div className={`flex flex-col items-center justify-center w-[60%] min-h-screen relative overflow-hidden transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}>
        {/* Enhanced Food Cart Illustration */}
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Animated Food Cart */}
          <div className="relative group">
            <div className="w-[400px] h-[300px] bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-orange-200 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
              <div className="text-center space-y-4">
                <div className="text-8xl animate-bounce" role="img" aria-label="food-cart">🛒</div>
                <div className="flex justify-center space-x-2">
                  <FaUtensils className="text-3xl text-orange-500 animate-pulse" />
                  <FaStore className="text-3xl text-red-500 animate-pulse" />
                  <FaStar className="text-3xl text-yellow-500 animate-pulse" />
                </div>
              </div>
            </div>
            {/* Floating elements around cart */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full opacity-60 animate-float-delayed"></div>
          </div>
          
          {/* Enhanced Tagline */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h2 className="font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent" 
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px' }}>
              Bringing Street Delights to Your Screen!
            </h2>
            <p className="text-gray-600 max-w-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Connect with authentic street food vendors and discover amazing flavors from around the world.
            </p>
          </div>

          {/* Stats Section */}
          <div className="flex space-x-8 mt-8 animate-fade-in-up-delayed">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">10K+</div>
              <div className="text-sm text-gray-600">Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">50+</div>
              <div className="text-sm text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">4.8★</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Doodles */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-gradient-to-r from-red-300 to-pink-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 left-32 w-10 h-10 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full opacity-50 animate-bounce"></div>
      </div>

      {/* Right Section: Enhanced Login Form */}
      <div className={`w-[40%] min-h-screen bg-white/95 backdrop-blur-sm flex flex-col justify-center px-16 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        {/* Enhanced Logo & Site Name */}
        <div className="flex items-center mb-10 animate-fade-in-up">
          <div className="relative group">
            <img 
              src={logo} 
              alt="D2VENDOR Logo" 
              className="h-[70px] w-[70px] object-contain rounded-2xl shadow-lg mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div>
            <span className="font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent" 
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px' }}>
              D2VENDORS
            </span>
            <div className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Street Food Revolution
            </div>
          </div>
        </div>

        {/* Enhanced Login Form */}
        <div className="w-full max-w-md mx-auto animate-fade-in-up-delayed">
          <h2 className="mb-8 font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent" 
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px' }}>
            Welcome Back! 👋
          </h2>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Enhanced Email Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                <FaEnvelope size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 pl-12 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
                required
              />
            </div>

            {/* Enhanced Password Field */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-300">
                <FaLock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-5 py-4 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Enhanced Forgot Password */}
            <div className="text-right mb-2">
              <a
                href="#"
                className="text-sm font-medium hover:underline transition-all duration-300 hover:text-orange-600"
                style={{ color: '#F57C00', fontFamily: 'Poppins, sans-serif' }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Enhanced Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                isSubmitting ? 'animate-pulse' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, #FF3D00 0%, #E53935 100%)',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 16,
                boxShadow: '0 8px 25px rgba(255, 61, 0, 0.3)'
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Enhanced OR Divider */}
            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="text-sm font-medium" style={{ color: '#9E9E9E', fontFamily: 'Poppins, sans-serif' }}>OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Enhanced Google Login Button */}
            <button
              type="button"
              className="w-full py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 border-gray-200 hover:border-orange-300 bg-white"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <FaGoogle className="text-red-500" size={20} />
                <span style={{ color: '#374151' }}>Continue with Google</span>
              </div>
            </button>
          </form>

          {/* Enhanced Register Prompt */}
          <div className="mt-8 text-center animate-fade-in-up-delayed-2">
            <p className="text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#6B7280' }}>
              Don't have an account?{' '}
              <button 
                onClick={handleSignUpClick}
                className="font-bold hover:underline transition-all duration-300 hover:text-orange-600" 
                style={{ color: '#F57C00' }}
              >
                Sign up now
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-fade-in-up-delayed {
          animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        .animate-fade-in-up-delayed-2 {
          animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Login; 