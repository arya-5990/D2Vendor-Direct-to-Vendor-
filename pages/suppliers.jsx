import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { db } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaEye, FaStar, FaTruck, FaMapMarkerAlt, FaCheck, FaUsers, FaClock } from 'react-icons/fa';

const Suppliers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'User_suppliers'));
        const supplierList = querySnapshot.docs.map(doc => doc.data());
        setSuppliers(supplierList);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.supplierName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.supplierContact?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerified = !filterVerified || supplier.verified;
    return matchesSearch && matchesVerified;
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('suppliers')}</h2>
          <p className="text-gray-600">Discover and connect with verified suppliers</p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
            />
            <FaEye className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all duration-300">
            <input
              type="checkbox"
              checked={filterVerified}
              onChange={(e) => setFilterVerified(e.target.checked)}
              className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500 focus:ring-2"
            />
            <FaCheck className="text-green-500 text-lg" />
            <span className="text-gray-700 font-medium">Verified only</span>
          </label>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="loading-spinner"></div>
          <span className="ml-3 text-gray-600 text-lg">Loading suppliers...</span>
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-1">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <FaUsers className="text-orange-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{suppliers.length}</p>
                  <p className="text-gray-600">Total Suppliers</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-2">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {suppliers.filter(s => s.verified).length}
                  </p>
                  <p className="text-gray-600">Verified</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-3">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FaTruck className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {suppliers.filter(s => s.fastDelivery).length}
                  </p>
                  <p className="text-gray-600">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Suppliers Grid */}
          {filteredSuppliers.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-float">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No suppliers found</h3>
              <p className="text-gray-600">
                {searchTerm ? `No suppliers match "${searchTerm}"` : 'No suppliers available'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map((supplier, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up border border-gray-100 hover:border-orange-200 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4 items-start">
                      {supplier.shopImageUrl && (
                        <img 
                          src={supplier.shopImageUrl} 
                          alt={supplier.supplierName} 
                          className="w-20 h-20 object-cover rounded-xl border-2 border-gray-100 group-hover:border-orange-200 transition-all duration-300" 
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                          {supplier.supplierName}
                        </h3>
                        <div className="flex items-center gap-3 mb-2">
                          {supplier.verified && (
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaCheck className="text-xs" />
                              {t('verified')}
                            </span>
                          )}
                          {supplier.fastDelivery && (
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <FaTruck className="text-xs" />
                              Fast Delivery
                            </span>
                          )}
                        </div>
                        {supplier.shopAddress && (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <FaMapMarkerAlt className="text-orange-500" />
                            <span>{supplier.shopAddress}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {supplier.rating && (
                        <div className="flex items-center gap-1 text-yellow-500 mb-2">
                          <FaStar className="text-lg" />
                          <span className="font-bold text-lg">{supplier.rating}</span>
                        </div>
                      )}
                      {supplier.reviews && (
                        <div className="text-xs text-gray-500">({supplier.reviews}+ {t('reviews')})</div>
                      )}
                    </div>
                  </div>
                  
                  {supplier.topItems && supplier.topItems.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <FaStar className="text-orange-500" />
                        {t('topItems')}
                      </h4>
                      <div className="space-y-2">
                        {supplier.topItems.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-800">{item.name}</span>
                            <span className="font-bold text-orange-600">₹{item.price}/kg</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-orange-500" />
                      <span>{t('deliversWithin')} {supplier.deliveryRange || 'N/A'}</span>
                    </div>
                    <button 
                      onClick={() => navigate('/vendor-dashboard/supplier-items')}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <FaEye className="text-lg" />
                      {t('viewItems')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Suppliers; 