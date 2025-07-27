import React from 'react';

const Login = () => {
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
            {/* OR Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-[#E0E0E0]"></div>
              <span className="text-xs" style={{ color: '#9E9E9E' }}>OR</span>
              <div className="flex-1 h-px bg-[#E0E0E0]"></div>
            </div>
            {/* Google Login Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border border-[#E0E0E0] rounded-xl font-semibold bg-white hover:bg-orange-50 transition-colors"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, borderRadius: 12 }}
            >
              {/* Google Icon Placeholder */}
              <span className="inline-block w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                {/* Replace with Google SVG icon */}
                <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.69 30.18 0 24 0 14.84 0 6.73 5.82 2.69 14.09l7.98 6.19C12.13 13.13 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.03l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.28a14.5 14.5 0 010-8.56l-7.98-6.19A23.97 23.97 0 000 24c0 3.77.9 7.34 2.69 10.47l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.58 2.15-7.96 2.15-6.44 0-11.87-3.63-14.33-8.9l-7.98 6.19C6.73 42.18 14.84 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
              </span>
              Continue with Google
            </button>
          </form>
          {/* Register Prompt */}
          <div className="mt-8 text-center text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
            Don’t have an account?{' '}
            <a href="#" className="font-semibold hover:underline" style={{ color: '#F57C00' }}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 