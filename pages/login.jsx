import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import firebaseApp from '../src/firebase';
import { db } from '../src/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // email or phone
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpClick = () => {
    navigate('/registration');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    let foundUser = null;
    let userType = null;
    // Check in User_suppliers
    const supplierQuery = query(
      collection(db, 'User_suppliers'),
      where('supplierPassword', '==', password),
      // Match either email or phone
      where('supplierEmail', '==', identifier)
    );
    const supplierSnapshot = await getDocs(supplierQuery);
    if (!supplierSnapshot.empty) {
      const docSnap = supplierSnapshot.docs[0];
      const docRef = doc(db, 'User_suppliers', docSnap.id);
      const latestDoc = await getDoc(docRef);
      foundUser = { id: docSnap.id, ...latestDoc.data() };
      userType = 'supplier';
      console.log('Supplier (email) details fetched:', foundUser);
    } else {
      // Try phone number for suppliers
      const supplierPhoneQuery = query(
        collection(db, 'User_suppliers'),
        where('supplierPassword', '==', password),
        where('supplierContact', '==', identifier)
      );
      const supplierPhoneSnapshot = await getDocs(supplierPhoneQuery);
      if (!supplierPhoneSnapshot.empty) {
        const docSnap = supplierPhoneSnapshot.docs[0];
        const docRef = doc(db, 'User_suppliers', docSnap.id);
        const latestDoc = await getDoc(docRef);
        foundUser = { id: docSnap.id, ...latestDoc.data() };
        userType = 'supplier';
        console.log('Supplier (phone) details fetched:', foundUser);
      }
    }
    // Check in User_vendors if not found
    if (!foundUser) {
      // Try email (if any)
      const vendorEmailQuery = query(
        collection(db, 'User_vendors'),
        where('vendorPassword', '==', password),
        where('vendorEmail', '==', identifier)
      );
      const vendorEmailSnapshot = await getDocs(vendorEmailQuery);
      if (!vendorEmailSnapshot.empty) {
        const docSnap = vendorEmailSnapshot.docs[0];
        const docRef = doc(db, 'User_vendors', docSnap.id);
        const latestDoc = await getDoc(docRef);
        foundUser = { id: docSnap.id, ...latestDoc.data() };
        userType = 'vendor';
        console.log('Vendor (email) details fetched:', foundUser);
      } else {
        // Try phone
        const vendorPhoneQuery = query(
          collection(db, 'User_vendors'),
          where('vendorPassword', '==', password),
          where('vendorMobile', '==', identifier)
        );
        const vendorPhoneSnapshot = await getDocs(vendorPhoneQuery);
        if (!vendorPhoneSnapshot.empty) {
          const docSnap = vendorPhoneSnapshot.docs[0];
          const docRef = doc(db, 'User_vendors', docSnap.id);
          const latestDoc = await getDoc(docRef);
          foundUser = { id: docSnap.id, ...latestDoc.data() };
          userType = 'vendor';
          console.log('Vendor (phone) details fetched:', foundUser);
        }
      }
    }
    setLoading(false);
    if (foundUser) {
      console.log('Final user details being stored in localStorage:', foundUser);
      alert(t('loginSuccess', { userType }));
      // Generate a random 32-character hex token
      const token = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      localStorage.setItem('sessionToken', token);
      localStorage.setItem('userDetails', JSON.stringify(foundUser));
      if (userType === 'supplier') {
        localStorage.setItem('supplierName', foundUser.supplierName);
      }
      if (userType === 'vendor') {
        navigate('/vendor-dashboard');
      }
      // You can add more redirects for suppliers if needed
    } else {
      alert(t('invalidCredentials'));
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
            <span className="text-5xl" role="img" aria-label="food-cart">🛒</span>
          </div>
          {/* Tagline */}
          <div className="mt-2 text-center font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, color: '#FF3D00' }}>
            {t('bringStreetDelights')}
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
            {t('d2Vendors')}
          </span>
        </div>
        {/* Login Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="mb-8 font-bold" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, color: '#212121' }}>
            {t('welcomeBack')}
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <input
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder={t('emailOrPhone')}
              className="w-full px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
              disabled={loading}
            />
            {/* Password Field */}
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={t('password')}
              className="w-full px-5 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-orange-200"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}
              disabled={loading}
            />
            {/* Forgot Password */}
            <div className="text-right mb-2">
              <a
                href="#"
                className="text-xs font-medium hover:underline"
                style={{ color: '#F57C00', fontFamily: 'Poppins, sans-serif', fontSize: 12 }}
              >
                {t('forgotPassword')}
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
              disabled={loading}
            >
              {loading ? t('loggingIn') : t('login')}
            </button>
            {/* OR Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-px bg-[#E0E0E0]"></div>
              <span className="text-xs" style={{ color: '#9E9E9E' }}>{t('or')}</span>
              <div className="flex-1 h-px bg-[#E0E0E0]"></div>
            </div>
            {/* Google Login Button */}
          </form>
          {/* comment */}
          {/* Register Prompt */}
          <div className="mt-8 text-center text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>
            {t('dontHaveAccount')}
            {' '}
            <a 
              href="#" 
              className="font-semibold hover:underline" 
              style={{ color: '#F57C00' }}
              onClick={handleSignUpClick}
            >
              {t('signUp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 