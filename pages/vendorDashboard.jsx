import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navItems = [
  { name: 'Search & Filter', path: '/vendor-dashboard/search' },
  { name: 'Suppliers', path: '/vendor-dashboard/suppliers' },
  { name: 'Price Tracker', path: '/vendor-dashboard/price-tracker' },
  { name: 'Quick Reorder', path: '/vendor-dashboard/quick-reorder' },
  { name: 'Reviews & Ratings', path: '/vendor-dashboard/reviews' },
  { name: 'Give Leftovers', path: '/vendor-dashboard/give-leftovers' },
  { name: 'Waste to Wealth', path: '/vendor-dashboard/kitchen-waste' },
  { name: 'Group Buy', path: '#', disabled: true },
];

const VendorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');
  const [profileOpen, setProfileOpen] = useState(false);
  const [supplierName, setSupplierName] = useState('Supplier Name');

  useEffect(() => {
    const userDetailsStr = localStorage.getItem('userDetails');
    if (userDetailsStr) {
      const userDetails = JSON.parse(userDetailsStr);
      setSupplierName(userDetails.supplierName || userDetails.vendorName || t('supplierName'));
    }
  }, [t]);

  const handleLogout = () => {
    localStorage.removeItem('supplierName');
    localStorage.removeItem('sessionToken');
    setProfileOpen(false);
    navigate('/');
  };

  const handleLanguageSwitch = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  // Check if we're on the main dashboard page (no nested route)
  const isMainDashboard = location.pathname === '/vendor-dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <div className="text-2xl font-bold text-orange-500 mb-10">
          VendorHub
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.disabled ? '#' : item.path}
              className={`block px-4 py-3 rounded-lg text-lg font-medium transition
                ${location.pathname === item.path ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-orange-50'}
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              tabIndex={item.disabled ? -1 : 0}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-orange-500">
              VendorHub
            </span>
          </div>
          <div className="flex items-center gap-6">
            {/* Language Switch */}
            <button
              className="px-3 py-2 rounded-lg bg-orange-50 text-orange-600 font-semibold hover:bg-orange-100 transition"
              onClick={handleLanguageSwitch}
            >
              {t('language')}
            </button>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="px-4 py-2 rounded-lg bg-orange-100 text-orange-700 font-semibold focus:outline-none"
                onClick={() => setProfileOpen((v) => !v)}
              >
                {supplierName}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        {/* Main Content Area */}
        <div className="flex-1 p-10">
          {isMainDashboard ? (
            <div className="bg-white rounded-2xl shadow p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('welcome')}</h1>
              <p className="text-gray-600 mb-6">{t('manage')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">{t('quickActions')}</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• {t('searchItems')}</li>
                    <li>• {t('trackPrices')}</li>
                    <li>• {t('reorder')}</li>
                    <li>• {t('leaveReviews')}</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-600 mb-2">{t('recentActivity')}</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• 3 {t('orders')}</li>
                    <li>• 2 {t('priceAlerts')}</li>
                    <li>• 1 {t('reviewSubmitted')}</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">{t('tips')}</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• {t('useFilters')}</li>
                    <li>• {t('saveItems')}</li>
                    <li>• {t('checkTrends')}</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard; 