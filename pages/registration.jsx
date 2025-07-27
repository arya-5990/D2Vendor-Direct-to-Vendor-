import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios'; // Added for Cloudinary upload
import { db } from '../src/firebase'; // Import Firestore db
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { useTranslation } from 'react-i18next';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Cloudinary config
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtintjmp4/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'hackathon_unsigned'; // <-- Set this to your actual unsigned upload preset from Cloudinary

const Registration = () => {
  const { t } = useTranslation();
  const query = useQuery();
  const type = query.get('type'); // 'supplier' or 'vendor'

  // State for all fields
  const [form, setForm] = useState({
    // Supplier fields
    supplierName: '',
    shopName: '',
    shopAddress: '',
    supplierContact: '',
    supplierEmail: '',
    supplierAadhaar: '',
    supplierPassword: '',
    shopImage: null,
    // Vendor fields
    vendorName: '',
    vendorMobile: '',
    vendorResidential: '',
    vendorShop: '',
    vendorAadhaar: '',
    vendorPassword: '',
    vendorSelfie: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageFile = null;
    let imageField = '';
    if (type === 'supplier') {
      imageFile = form.shopImage;
      imageField = 'shopImageUrl';
    } else if (type === 'vendor') {
      imageFile = form.vendorSelfie;
      imageField = 'vendorSelfieUrl';
    }

    let imageUrl = '';
    if (imageFile) {
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      try {
        const res = await axios.post(CLOUDINARY_URL, data);
        imageUrl = res.data.secure_url;
      } catch (err) {
        let msg = 'Image upload failed.';
        if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
          msg += '\nCloudinary: ' + err.response.data.error.message;
        }
        alert(msg);
        return;
      }
    }

    // Prepare registration data for Firebase
    const registrationData = {
      ...form,
      [imageField]: imageUrl,
      type,
      createdAt: new Date(),
    };

    // Remove file objects before saving to Firestore
    delete registrationData.shopImage;
    delete registrationData.vendorSelfie;

    try {
      const collectionName = type === 'vendor' ? 'User_vendors' : 'User_suppliers';
      await addDoc(collection(db, collectionName), registrationData);
      alert(t('registrationSuccess'));
    } catch (error) {
      alert(t('registrationFailed') + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 py-10 px-2">
      {/* Back to Home */}
      <div className="w-full max-w-2xl mb-4">
        <Link to="/" className="flex items-center text-orange-500 hover:text-orange-700 font-semibold text-base mb-2">
          🏠 Back to Home
        </Link>
      </div>
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-12 relative overflow-hidden">
        {/* Decorative Illustration */}
        <div className="absolute -top-16 right-0 w-52 h-52 opacity-20 pointer-events-none select-none">
          <div className="w-full h-full bg-orange-200 rounded-full"></div>
        </div>
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10 drop-shadow-sm">
          {type === 'supplier' ? 'Supplier Registration' : 'Vendor Registration'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8 z-10 relative">
          {/* Supplier Fields */}
          {type === 'supplier' && (
            <>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">👤</span>
                <input type="text" name="supplierName" value={form.supplierName} onChange={handleChange} required placeholder={t('supplierNamePlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🏪</span>
                <input type="text" name="shopName" value={form.shopName} onChange={handleChange} required placeholder={t('shopNamePlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📍</span>
                <input type="text" name="shopAddress" value={form.shopAddress} onChange={handleChange} required placeholder={t('shopAddressPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📞</span>
                <input type="tel" name="supplierContact" value={form.supplierContact} onChange={handleChange} required placeholder={t('supplierContactPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📧</span>
                <input type="email" name="supplierEmail" value={form.supplierEmail} onChange={handleChange} placeholder={t('supplierEmailPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🆔</span>
                <input type="text" name="supplierAadhaar" value={form.supplierAadhaar} onChange={handleChange} required placeholder={t('supplierAadhaarPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🔒</span>
                <input type="password" name="supplierPassword" value={form.supplierPassword} onChange={handleChange} required placeholder={t('supplierPasswordPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📷</span>
                <input type="file" name="shopImage" accept="image/*" onChange={handleChange} required className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
                <span className="ml-2 text-base text-gray-400">{t('shopImageLabel')}</span>
              </div>
            </>
          )}
          {/* Vendor Fields */}
          {type === 'vendor' && (
            <>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">👤</span>
                <input type="text" name="vendorName" value={form.vendorName} onChange={handleChange} required placeholder={t('vendorNamePlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📞</span>
                <input type="tel" name="vendorMobile" value={form.vendorMobile} onChange={handleChange} required placeholder={t('vendorMobilePlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🏠</span>
                <input type="text" name="vendorResidential" value={form.vendorResidential} onChange={handleChange} required placeholder={t('vendorResidentialPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🏪</span>
                <input type="text" name="vendorShop" value={form.vendorShop} onChange={handleChange} required placeholder={t('vendorShopPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🆔</span>
                <input type="text" name="vendorAadhaar" value={form.vendorAadhaar} onChange={handleChange} required placeholder={t('vendorAadhaarPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🔒</span>
                <input type="password" name="vendorPassword" value={form.vendorPassword} onChange={handleChange} required placeholder={t('vendorPasswordPlaceholder')} className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📸</span>
                <input type="file" name="vendorSelfie" accept="image/*" onChange={handleChange} required className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
                <span className="ml-2 text-base text-gray-400">{t('vendorSelfieLabel')}</span>
              </div>
            </>
          )}
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-xl shadow-md hover:from-orange-500 hover:to-orange-600 transition-all duration-200 mt-4">
            {t('registerButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration; 