import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex" style={{ background: '#FFF4E6' }}>
      {/* Left Section: Visual/Illustration */}
      <div className="flex flex-col items-center justify-center w-[60%] min-h-screen bg-[#FFF4E6] relative overflow-hidden">
        {/* Centered Food Cart Illustration Placeholder */}
        <div className="flex flex-col items-center justify-center">
          {/* Replace this div with your animated food cart illustration */}
          <div className="w-[340px] h-[260px] bg-orange-100 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
            {/* Illustration Placeholder */}
            <span className="text-5xl" role="img" aria-label="food-cart">🛒</span>
          </div>
          {/* Tagline */}
          <div className="mt-2 text-center font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, color: '#FF3D00' }}>
            Bringing Street Delights to Your Screen!
          </div>
        </div>
        {/* Floating Doodles/Icons (optional, for vibrancy) */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-orange-200 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 left-32 w-10 h-10 bg-orange-100 rounded-full opacity-50 animate-bounce"></div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-[40%] min-h-screen bg-white flex flex-col justify-center px-0" style={{ padding: 64 }}>
        {/* Logo & Site Name */}
        <div className="flex items-center mb-10">
          <img 
            src="./images/D2VENDOR_logo.jpg" 
            alt="D2VENDOR Logo" 
            className="h-[60px] w-[60px] object-contain rounded-lg mr-4" 
          />
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 24, color: '#FF3D00' }}>
            D2VENDORS
          </span>
        </div>
        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="mb-8 font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, color: '#212121' }}>
            Welcome Back!
          </h2>
          <form className="flex flex-col gap-6">
            {/* Email Field */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
            />
            {/* Password Field */}
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
            />
            {/* Forgot Password */}
            <div className="text-right mb-2">
              <a
                href="#"
                className="text-xs font-medium hover:underline"
                style={{ color: '#F57C00', fontFamily: 'Poppins, sans-serif', fontSize: 12 }}
              >
                Forgot Password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold transition-colors duration-200"
              style={{
                background: '#FF3D00',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 16,
                borderRadius: 12
              }}
              onMouseOver={e => (e.target.style.background = '#E53935')}
              onMouseOut={e => (e.target.style.background = '#FF3D00')}
            >
              Login
            </button>
          </form>
          {/* comment */}
          {/* Register Prompt */}
          <div className="mt-8 text-center text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
            Don't have an account?{' '}
            <a 
              href="#" 
              className="font-semibold hover:underline" 
              style={{ color: '#F57C00' }}
              onClick={handleSignUpClick}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 