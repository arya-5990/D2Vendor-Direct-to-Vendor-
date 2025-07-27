import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { db } from '../src/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const ForgotPass = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!mobileNumber || !customerType || !newPassword) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      let collectionName = '';
      let mobileField = '';
      let passwordField = '';

      if (customerType === 'supplier') {
        collectionName = 'User_suppliers';
        mobileField = 'supplierContact';
        passwordField = 'supplierPassword';
      } else if (customerType === 'vendor') {
        collectionName = 'User_vendors';
        mobileField = 'vendorMobile';
        passwordField = 'vendorPassword';
      } else {
        alert('Please select a valid customer type');
        setLoading(false);
        return;
      }

      // Query to find user by mobile number
      const userQuery = query(
        collection(db, collectionName),
        where(mobileField, '==', mobileNumber)
      );
      
      const userSnapshot = await getDocs(userQuery);
      
      if (userSnapshot.empty) {
        alert('No user found with this mobile number');
        setLoading(false);
        return;
      }

      // Update the password
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, collectionName, userDoc.id);
      
      await updateDoc(userRef, {
        [passwordField]: newPassword
      });

      alert('Password updated successfully!');
      navigate('/login');
      
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <span className="text-5xl" role="img" aria-label="food-cart">🔐</span>
          </div>
          {/* Tagline */}
          <div className="mt-2 text-center font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, color: '#FF3D00' }}>
            Reset Your Password
          </div>
        </div>
        {/* Floating Doodles/Icons (optional, for vibrancy) */}
        <div className="absolute top-10 left-10 w-12 h-12 bg-orange-200 rounded-full opacity-70 animate-bounce"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-orange-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 left-32 w-10 h-10 bg-orange-100 rounded-full opacity-50 animate-bounce"></div>
      </div>

      {/* Right Section: Forgot Password Form */}
      <div className="w-[40%] min-h-screen bg-white flex flex-col justify-center px-0" style={{ padding: 64 }}>
        {/* Logo & Site Name */}
        <div className="flex items-center mb-10">
          <img 
            src="./images/D2VENDOR_logo.jpg" 
            alt="D2VENDOR Logo" 
            className="h-[60px] w-[60px] object-contain rounded-lg mr-4" 
          />
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: 24, color: '#FF3D00' }}>
            {t('d2Vendors')}
          </span>
        </div>
        {/* Forgot Password Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="mb-8 font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, color: '#212121' }}>
            Forgot Password
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleResetPassword}>
            {/* Mobile Number Field */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl">📞</span>
              <input
                type="tel"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full pl-12 px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
                disabled={loading}
                required
              />
            </div>

            {/* Customer Type Field */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl">👤</span>
              <select
                value={customerType}
                onChange={e => setCustomerType(e.target.value)}
                className="w-full pl-12 px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200 appearance-none bg-white"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
                disabled={loading}
                required
              >
                <option value="">Select customer type</option>
                <option value="supplier">Supplier</option>
                <option value="vendor">Vendor</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-12 px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200 pr-12"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Reset Password Button */}
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
              disabled={loading}
            >
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
            Remember your password?{' '}
            <a 
              href="#" 
              className="font-semibold hover:underline" 
              style={{ color: '#F57C00' }}
              onClick={handleBackToLogin}
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
