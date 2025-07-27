import React from 'react';
import logo from '../images/D2VENDOR_logo.jpg';
import heroImg from '../images/indian-street-food-free-vector.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#FFF5F0' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-orange-300 rounded-full"></div>
      </div>

      {/* Header */}
      <header 
        className="relative z-10 border-b-2 border-orange-200"
        style={{ 
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(215, 38, 61, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo + Site Name */}
            <div className="flex items-center gap-4">
              <img 
                src={logo} 
                alt="D2VENDOR Logo" 
                className="h-24 w-24 object-contain rounded-lg shadow-lg" 
                style={{ 
                  minWidth: '96px',
                  border: '3px solid #FFE5D4'
                }}
              />
              <div>
                <span
                  className="font-bold block"
                  style={{ 
                    color: '#D7263D',
                    fontSize: '28px',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  D2VENDORS
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ 
                    color: '#FF6F3C',
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  Street Food Revolution
                </span>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#" 
                className="font-medium hover:scale-105 transition-transform duration-200 relative group"
                style={{ 
                  color: '#D7263D',
                  fontSize: '16px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '600'
                }}
              >
                ABOUT
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
              </a>
              <a 
                href="#" 
                className="font-medium hover:scale-105 transition-transform duration-200 relative group"
                style={{ 
                  color: '#D7263D',
                  fontSize: '16px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: '600'
                }}
              >
                CONTACT
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></div>
              </a>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column - Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span 
                className="text-sm font-semibold"
                style={{ 
                  color: '#FF6F3C',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Connecting Street Food Lovers
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 
                className="font-bold leading-tight"
                style={{ 
                  color: '#D7263D',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  lineHeight: 1.1
                }}
              >
                EMPOWERING<br />
                <span style={{ color: '#FF6F3C' }}>EVERY STREET BITE</span>
              </h1>
              
              <p 
                className="text-lg max-w-2xl mx-auto lg:mx-0"
                style={{ 
                  color: '#666',
                  fontFamily: "'Poppins', sans-serif",
                  lineHeight: 1.6
                }}
              >
                Discover authentic street food vendors, connect with local suppliers, and be part of the street food revolution. From traditional recipes to modern twists, we bring the world's flavors to your doorstep.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                to="/registration?type=supplier"
                className="group relative overflow-hidden rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: '#D7263D',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(215, 38, 61, 0.3)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                <span className="relative z-10">Become a Supplier</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/registration?type=vendor"
                className="group relative overflow-hidden rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: '#FF6F3C',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 'bold',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(255, 111, 60, 0.3)',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                <span className="relative z-10">BECOME A VENDOR</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Login Link */}
            <div className="text-gray-600 text-center lg:text-left">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium underline hover:opacity-80 transition-opacity"
                style={{ 
                  color: '#D7263D',
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="flex-1 flex justify-center items-center">
            <div 
              className="relative w-full max-w-2xl h-[32rem] rounded-2xl overflow-hidden shadow-2xl"
              style={{ 
                backgroundColor: '#FFFDFC',
                border: '4px solid #FFE5D4',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
            >
              <img 
                src={heroImg} 
                alt="Indian Street Food Vendor" 
                className="w-full h-full object-cover" 
              />
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-orange-400 rounded-full opacity-20"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-red-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-orange-100 to-transparent"></div>
    </div>
  );
};

export default Hero; 