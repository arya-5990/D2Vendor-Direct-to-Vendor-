import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaSearch, FaTruck, FaStar, FaChevronDown, FaCheck, FaFilter, FaCoins } from 'react-icons/fa';

const SearchFilter = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    verified: true,
    fastDelivery: false,
    rating4Plus: false,
    priceSort: 'none'
  });
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, 'User_suppliers'));
        const supplierList = querySnapshot.docs.map(doc => doc.data());
        setSuppliers(supplierList);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  // Extract actual search term from query (remove emoji and "Supplier:" prefix)
  const getActualSearchTerm = (query) => {
    if (query.includes('Supplier:')) {
      return query.split('Supplier:')[1]?.trim() || query;
    }
    return query;
  };

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(supplier => {
    const actualQuery = getActualSearchTerm(searchQuery).toLowerCase();
    if (!actualQuery || actualQuery.trim() === '') return false; // Don't show any suppliers if no search query
    
    return (
      supplier.supplierName?.toLowerCase().includes(actualQuery) ||
      supplier.supplierContact?.toLowerCase().includes(actualQuery) ||
      supplier.supplierEmail?.toLowerCase().includes(actualQuery)
    );
  });

  // Suggestions: only filtered suppliers
  const suggestions = filteredSuppliers.map(supplier => ({
    text: `🧑‍🌾 Supplier: ${supplier.supplierName}`,
    supplier: supplier.supplierName,
    contact: supplier.supplierContact,
    email: supplier.supplierEmail,
    type: 'supplier',
  }));

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleFilterClick = () => {
    // Add any filter logic here
    console.log('Filter applied:', filters);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 fixed h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 text-orange-500">VendorHub</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <button className="flex items-center gap-2 bg-orange-100 text-orange-600 font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-200">
            <FaSearch className="text-lg" />
            Search & Filter
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaTruck className="text-lg" />
            Suppliers
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaStar className="text-lg" />
            Price Tracker
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaFilter className="text-lg" />
            Quick Reorder
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaStar className="text-lg" />
            Reviews & Ratings
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaCoins className="text-lg" />
            Food Exchange
          </button>
          <button className="flex items-center gap-2 text-gray-400 opacity-50 cursor-not-allowed px-4 py-3 rounded-lg">
            <FaFilter className="text-lg" />
            Group Buy
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-1">
        {/* Top Navbar */}
        <div className="w-full h-16 bg-white flex justify-between items-center px-6 shadow-sm sticky top-0 z-10">
          <div className="text-xl font-bold text-orange-500">
            VendorHub
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-orange-100 text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-200 transition-all duration-300">
              English
            </button>
            <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-lg font-semibold">
              Supplier Name
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Search & Filter</h1>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by item name or supplier name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 text-lg shadow-sm transition-all duration-300"
                />
                <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
              <button 
                onClick={handleFilterClick}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <FaFilter className="text-lg" />
                Filter
              </button>
            </div>
            
            {/* Auto-suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border-2 border-gray-100 rounded-xl shadow-2xl z-20 mt-3 animate-scale-in">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-300"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{suggestion.text.split(' ')[0]}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{suggestion.text}</div>
                        {suggestion.type === 'supplier' && suggestion.contact && (
                          <div className="text-sm text-gray-500">Contact: {suggestion.contact}</div>
                        )}
                        {suggestion.type === 'supplier' && suggestion.email && (
                          <div className="text-sm text-gray-500">Email: {suggestion.email}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Options */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 animate-fade-in-up animate-stagger-1">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaFilter className="text-orange-500" />
              Filter Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                  className="w-5 h-5 rounded text-green-500 focus:ring-green-500 focus:ring-2"
                />
                <FaCheck className="text-green-500 text-lg" />
                <span className="text-gray-700 font-medium">Verified only</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.fastDelivery}
                  onChange={(e) => setFilters({ ...filters, fastDelivery: e.target.checked })}
                  className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500 focus:ring-2"
                />
                <FaTruck className="text-blue-500 text-lg" />
                <span className="text-gray-700 font-medium">Fast delivery</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.rating4Plus}
                  onChange={(e) => setFilters({ ...filters, rating4Plus: e.target.checked })}
                  className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500 focus:ring-2"
                />
                <FaStar className="text-yellow-500 text-lg" />
                <span className="text-gray-700 font-medium">Rating 4+ suppliers</span>
              </label>
              
              <div className="p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Price sorting</label>
                <div className="relative">
                  <select
                    value={filters.priceSort}
                    onChange={(e) => setFilters({ ...filters, priceSort: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 appearance-none bg-white shadow-sm transition-all duration-300"
                  >
                    <option value="none">None</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 animate-fade-in-up animate-stagger-2">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {searchQuery ? `"${getActualSearchTerm(searchQuery)}"` : 'Search'} Results
            </h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="loading-spinner"></div>
                <span className="ml-3 text-gray-600">Loading suppliers...</span>
              </div>
            ) : filteredSuppliers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-float">🔍</div>
                <p className="text-lg text-gray-500">
                  {searchQuery ? `No results found for "${getActualSearchTerm(searchQuery)}"` : 'Start typing to search suppliers'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSuppliers.map((supplier, index) => (
                  <div 
                    key={index} 
                    className="border-2 border-gray-100 rounded-xl p-6 hover:border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 shadow-sm hover:shadow-lg animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xl text-gray-800 mb-2">{supplier.supplierName}</h4>
                        <p className="text-gray-600 text-lg mb-1">{supplier.supplierContact}</p>
                        {supplier.shopAddress && (
                          <p className="text-gray-500">📍 {supplier.shopAddress}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {supplier.rating && (
                          <div className="flex items-center gap-2 text-yellow-500 mb-3">
                            <FaStar className="text-xl" />
                            <span className="font-bold text-lg">{supplier.rating}</span>
                          </div>
                        )}
                        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter; 