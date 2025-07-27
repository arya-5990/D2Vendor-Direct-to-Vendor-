import React, { useState, useEffect } from 'react';
import logo from '../images/D2VENDOR_logo.jpg';
import heroImg from '../images/indian-street-food-free-vector.jpg';
import { Link } from 'react-router-dom';
import { FaPlay, FaStar, FaUsers, FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-orange-300 to-yellow-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-red-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
        
        {/* Floating food icons */}
        <div className="absolute top-1/4 left-1/4 text-orange-400 opacity-10 animate-float">
          <FaUtensils size={40} />
        </div>
        <div className="absolute top-1/3 right-1/3 text-red-400 opacity-10 animate-float-delayed">
          <FaStar size={30} />
        </div>
      </div>

      {/* Enhanced Header */}
      <header 
        className={`relative z-10 border-b-2 border-orange-200 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(215, 38, 61, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Enhanced Logo + Site Name */}
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="D2VENDOR Logo" 
                  className="h-24 w-24 object-contain rounded-2xl shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                  style={{ 
                    minWidth: '96px',
                    border: '4px solid #FFE5D4',
                    boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
                  }}
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-1">
                <span
                  className="font-bold block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
                  style={{ 
                    fontSize: '32px',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  D2VENDORS
                </span>
                <span
                  className="text-sm font-medium bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                  style={{ 
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: '600'
                  }}
                >
                  Street Food Revolution
                </span>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#" 
                className="font-medium hover:scale-105 transition-all duration-300 relative group"
                style={{ 
                  color: '#D7263D',
                  fontSize: '16px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '600'
                }}
              >
                ABOUT
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </a>
              <a 
                href="#" 
                className="font-medium hover:scale-105 transition-all duration-300 relative group"
                style={{ 
                  color: '#D7263D',
                  fontSize: '16px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '600'
                }}
              >
                CONTACT
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
              </a>
            </nav>
            
            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-orange-500 p-3 rounded-xl hover:bg-orange-50 transition-all duration-300 hover:scale-110">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <main className={`relative z-10 flex items-center justify-center min-h-screen py-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Enhanced Left Column - Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
              <span 
                className="text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                style={{ 
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Connecting Street Food Lovers Worldwide
              </span>
            </div>

            {/* Enhanced Main Headline */}
            <div className="space-y-6">
              <h1 
                className="font-bold leading-tight animate-fade-in-up"
                style={{ 
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  lineHeight: 1.1
                }}
              >
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  EMPOWERING
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  EVERY STREET BITE
                </span>
              </h1>
              
              <p 
                className="text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up-delayed"
                style={{ 
                  color: '#666',
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.7
                }}
              >
                Discover authentic street food vendors, connect with local suppliers, and be part of the street food revolution. From traditional recipes to modern twists, we bring the world's flavors to your doorstep.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 py-6 animate-fade-in-up-delayed-2">
              <div className="flex items-center gap-3 text-center">
                <FaUsers className="text-2xl text-orange-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">10K+</div>
                  <div className="text-sm text-gray-600">Vendors</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-center">
                <FaMapMarkerAlt className="text-2xl text-red-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">50+</div>
                  <div className="text-sm text-gray-600">Cities</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-center">
                <FaStar className="text-2xl text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">4.8★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Enhanced Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up-delayed-3">
              <Link
                to="/registration?type=supplier"
                className="group relative overflow-hidden rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                style={{ 
                  backgroundColor: '#D7263D',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  padding: '20px 40px',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(215, 38, 61, 0.4)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaPlay className="text-sm" />
                  Become a Supplier
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/registration?type=vendor"
                className="group relative overflow-hidden rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                style={{ 
                  backgroundColor: '#FF6F3C',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  padding: '20px 40px',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(255, 111, 60, 0.4)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaUtensils className="text-sm" />
                  BECOME A VENDOR
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Enhanced Login Link */}
            <div className="text-gray-600 text-center lg:text-left animate-fade-in-up-delayed-4">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-bold underline hover:opacity-80 transition-all duration-300 hover:scale-105"
                style={{ 
                  color: '#D7263D',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Login Now
              </Link>
            </div>
          </div>

          {/* Enhanced Right Column - Hero Image */}
          <div className="flex-1 flex justify-center items-center animate-fade-in-up-delayed-5">
            <div 
              className="relative w-full max-w-2xl h-[35rem] rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: '#FFFDFC',
                border: '6px solid #FFE5D4',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img 
                src={heroImg} 
                alt="Indian Street Food Vendor" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              {/* Enhanced Decorative Elements */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-30 animate-bounce"></div>
              
              {/* Floating elements */}
              <div className="absolute top-1/4 left-4 w-6 h-6 bg-yellow-400 rounded-full opacity-40 animate-float"></div>
              <div className="absolute bottom-1/4 right-4 w-4 h-4 bg-orange-400 rounded-full opacity-40 animate-float-delayed"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-100 via-red-50 to-transparent"></div>
      
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
        
        .animate-fade-in-up-delayed-3 {
          animation: fadeInUp 1s ease-out 0.6s both;
        }
        
        .animate-fade-in-up-delayed-4 {
          animation: fadeInUp 1s ease-out 0.8s both;
        }
        
        .animate-fade-in-up-delayed-5 {
          animation: fadeInUp 1s ease-out 1s both;
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

export default Hero; 