import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { db } from '../src/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { 
  FaUser, 
  FaStore, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaIdCard, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaTruck, 
  FaCamera, 
  FaHome, 
  FaArrowLeft,
  FaCheckCircle,
  FaUpload,
  FaSpinner
} from 'react-icons/fa';
import logo from '../images/D2VENDOR_logo.jpg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Cloudinary config
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtintjmp4/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'hackathon_unsigned';

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useQuery();
  const type = query.get('type'); // 'supplier' or 'vendor'
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSupplierPassword, setShowSupplierPassword] = useState(false);
  const [showVendorPassword, setShowVendorPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    deliveryRange: '',
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
    setIsSubmitting(true);
    setUploadProgress(0);

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
        setUploadProgress(30);
        const res = await axios.post(CLOUDINARY_URL, data);
        imageUrl = res.data.secure_url;
        setUploadProgress(70);
      } catch (err) {
        let msg = 'Image upload failed.';
        if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
          msg += '\nCloudinary: ' + err.response.data.error.message;
        }
        alert(msg);
        setIsSubmitting(false);
        setUploadProgress(0);
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
      setUploadProgress(90);
      const collectionName = type === 'vendor' ? 'User_vendors' : 'User_suppliers';
      await addDoc(collection(db, collectionName), registrationData);
      setUploadProgress(100);
      
      // Show success message
      setTimeout(() => {
      alert(t('registrationSuccess'));
        navigate('/login');
      }, 1000);
    } catch (error) {
      alert(t('registrationFailed') + error.message);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const toggleSupplierPasswordVisibility = () => {
    setShowSupplierPassword(!showSupplierPassword);
  };

  const toggleVendorPasswordVisibility = () => {
    setShowVendorPassword(!showVendorPassword);
  };

  const getStepProgress = () => {
    const totalFields = type === 'supplier' ? 9 : 7;
    const filledFields = Object.values(form).filter(value => value !== '' && value !== null).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-orange-300 to-yellow-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-red-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center py-10 px-4 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Enhanced Back to Home */}
        <div className="w-full max-w-4xl mb-6 animate-fade-in-up">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 text-orange-600 hover:text-orange-700 font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft className="text-xl" />
            Back to Home
          </Link>
        </div>

        {/* Enhanced Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl p-12 relative overflow-hidden animate-fade-in-up-delayed">
          {/* Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-15 animate-bounce"></div>
          
          {/* Enhanced Header */}
          <div className="text-center mb-10 relative z-10">
            <div className="flex items-center justify-center mb-6">
              <img 
                src={logo} 
                alt="D2VENDOR Logo" 
                className="h-16 w-16 object-contain rounded-2xl shadow-lg mr-4 transition-all duration-300 hover:scale-110" 
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  D2VENDORS
                </h1>
                <p className="text-sm text-gray-500">Street Food Revolution</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          {type === 'supplier' ? 'Supplier Registration' : 'Vendor Registration'}
        </h2>
            <p className="text-gray-600 text-lg">
              Join the street food revolution and connect with amazing vendors
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 relative z-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Form Progress</span>
              <span className="text-sm font-bold text-orange-600">{getStepProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Supplier Fields */}
          {type === 'supplier' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaUser size={20} />
                  </div>
                  <input 
                    type="text" 
                    name="supplierName" 
                    value={form.supplierName} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('supplierNamePlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaStore size={20} />
                  </div>
                  <input 
                    type="text" 
                    name="shopName" 
                    value={form.shopName} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('shopNamePlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                </div>

                <div className="relative group md:col-span-2">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <input 
                    type="text" 
                    name="shopAddress" 
                    value={form.shopAddress} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('shopAddressPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaPhone size={20} />
              </div>
                  <input 
                    type="tel" 
                    name="supplierContact" 
                    value={form.supplierContact} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('supplierContactPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaEnvelope size={20} />
              </div>
                  <input 
                    type="email" 
                    name="supplierEmail" 
                    value={form.supplierEmail} 
                    onChange={handleChange} 
                    placeholder={t('supplierEmailPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaIdCard size={20} />
              </div>
                  <input 
                    type="text" 
                    name="supplierAadhaar" 
                    value={form.supplierAadhaar} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('supplierAadhaarPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaLock size={20} />
                  </div>
                  <input 
                    type={showSupplierPassword ? "text" : "password"} 
                    name="supplierPassword" 
                    value={form.supplierPassword} 
                    onChange={handleChange} 
                    required 
                    placeholder="Password" 
                    className="pl-12 pr-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                    onClick={toggleSupplierPasswordVisibility}
                  >
                    {showSupplierPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaTruck size={20} />
                  </div>
                  <input 
                    type="text" 
                    name="deliveryRange" 
                    value={form.deliveryRange} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('deliveryRangePlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group md:col-span-2">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaCamera size={20} />
                  </div>
                  <input 
                    type="file" 
                    name="shopImage" 
                    accept="image/*" 
                    onChange={handleChange} 
                    required 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                  />
                  <span className="ml-2 text-sm text-gray-500">{t('shopImageLabel')}</span>
              </div>
              </div>
          )}

          {/* Vendor Fields */}
          {type === 'vendor' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaUser size={20} />
                  </div>
                  <input 
                    type="text" 
                    name="vendorName" 
                    value={form.vendorName} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('vendorNamePlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaPhone size={20} />
                  </div>
                  <input 
                    type="tel" 
                    name="vendorMobile" 
                    value={form.vendorMobile} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('vendorMobilePlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaHome size={20} />
              </div>
                  <input 
                    type="text" 
                    name="vendorResidential" 
                    value={form.vendorResidential} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('vendorResidentialPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaStore size={20} />
              </div>
                  <input 
                    type="text" 
                    name="vendorShop" 
                    value={form.vendorShop} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('vendorShopPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
              </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaIdCard size={20} />
                  </div>
                  <input 
                    type="text" 
                    name="vendorAadhaar" 
                    value={form.vendorAadhaar} 
                    onChange={handleChange} 
                    required 
                    placeholder={t('vendorAadhaarPlaceholder')} 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaLock size={20} />
                  </div>
                  <input 
                    type={showVendorPassword ? "text" : "password"} 
                    name="vendorPassword" 
                    value={form.vendorPassword} 
                    onChange={handleChange} 
                    required 
                    placeholder="Password" 
                    className="pl-12 pr-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                    onClick={toggleVendorPasswordVisibility}
                  >
                    {showVendorPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>

                <div className="relative group md:col-span-2">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 group-focus-within:text-orange-600 transition-colors duration-300">
                    <FaCamera size={20} />
                  </div>
                  <input 
                    type="file" 
                    name="vendorSelfie" 
                    accept="image/*" 
                    onChange={handleChange} 
                    required 
                    className="pl-12 py-4 text-lg w-full rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-300 bg-white/80 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                  />
                  <span className="ml-2 text-sm text-gray-500">{t('vendorSelfieLabel')}</span>
                </div>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <div className="mt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, #FF6F3C 0%, #E53935 100%)',
                  color: '#fff',
                  boxShadow: '0 8px 25px rgba(255, 111, 60, 0.3)'
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FaSpinner className="animate-spin" size={20} />
                    <span>Creating Account...</span>
                    {uploadProgress > 0 && (
                      <div className="ml-2 text-sm opacity-75">{uploadProgress}%</div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <FaCheckCircle size={20} />
                    <span>{t('registerButton')}</span>
              </div>
          )}
          </button>
            </div>
        </form>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-fade-in-up-delayed {
          animation: fadeInUp 1s ease-out 0.2s both;
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
      `}</style>
    </div>
  );
};

export default Registration; 