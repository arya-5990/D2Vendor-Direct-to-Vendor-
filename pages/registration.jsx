import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Registration = () => {
  const query = useQuery();
  const type = query.get('type'); // 'supplier' or 'vendor'
  const [showSupplierPassword, setShowSupplierPassword] = useState(false);
  const [showVendorPassword, setShowVendorPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    alert('Registration submitted!');
  };

  const toggleSupplierPasswordVisibility = () => {
    setShowSupplierPassword(!showSupplierPassword);
  };

  const toggleVendorPasswordVisibility = () => {
    setShowVendorPassword(!showVendorPassword);
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
                <input type="text" name="supplierName" value={form.supplierName} onChange={handleChange} required placeholder="Name" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🏪</span>
                <input type="text" name="shopName" value={form.shopName} onChange={handleChange} required placeholder="Shop Name" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📍</span>
                <input type="text" name="shopAddress" value={form.shopAddress} onChange={handleChange} required placeholder="Shop Address" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📞</span>
                <input type="tel" name="supplierContact" value={form.supplierContact} onChange={handleChange} required placeholder="Contact Number" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📧</span>
                <input type="email" name="supplierEmail" value={form.supplierEmail} onChange={handleChange} placeholder="Email (optional)" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🆔</span>
                <input type="text" name="supplierAadhaar" value={form.supplierAadhaar} onChange={handleChange} required placeholder="Aadhaar Card Number" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <input type={showSupplierPassword ? "text" : "password"} name="supplierPassword" value={form.supplierPassword} onChange={handleChange} required placeholder="Password" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300 pr-12" />
                <span className="absolute left-4 text-orange-400 text-2xl">🔒</span>
                <span className="absolute right-4 text-orange-400 cursor-pointer" onClick={toggleSupplierPasswordVisibility} aria-label="Toggle password visibility">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📷</span>
                <input type="file" name="shopImage" accept="image/*" onChange={handleChange} required className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
                <span className="ml-2 text-base text-gray-400">Shop Image</span>
              </div>
            </>
          )}
          {/* Vendor Fields */}
          {type === 'vendor' && (
            <>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">👤</span>
                <input type="text" name="vendorName" value={form.vendorName} onChange={handleChange} required placeholder="Name" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📞</span>
                <input type="tel" name="vendorMobile" value={form.vendorMobile} onChange={handleChange} required placeholder="Mobile Number" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🏠</span>
                <input type="text" name="vendorResidential" value={form.vendorResidential} onChange={handleChange} required placeholder="Residential Address" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🏪</span>
                <input type="text" name="vendorShop" value={form.vendorShop} onChange={handleChange} required placeholder="Shop Address" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">🆔</span>
                <input type="text" name="vendorAadhaar" value={form.vendorAadhaar} onChange={handleChange} required placeholder="Aadhaar Card Number" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="relative flex items-center">
                <input type={showVendorPassword ? "text" : "password"} name="vendorPassword" value={form.vendorPassword} onChange={handleChange} required placeholder="Password" className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300 pr-12" />
                <span className="absolute left-4 text-orange-400 text-2xl">🔒</span>
                <span className="absolute right-4 text-orange-400 cursor-pointer" onClick={toggleVendorPasswordVisibility} aria-label="Toggle password visibility">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-orange-400 text-2xl">📸</span>
                <input type="file" name="vendorSelfie" accept="image/*" onChange={handleChange} required className="pl-14 py-4 text-lg input input-bordered w-full rounded-xl focus:ring-2 focus:ring-orange-300" />
                <span className="ml-2 text-base text-gray-400">Selfie Verification</span>
              </div>
            </>
          )}
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-xl shadow-md hover:from-orange-500 hover:to-orange-600 transition-all duration-200 mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration; 