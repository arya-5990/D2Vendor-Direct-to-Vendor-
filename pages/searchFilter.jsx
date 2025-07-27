import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaSearch, FaTruck, FaStar, FaChevronDown, FaCheck } from 'react-icons/fa';

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

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'User_suppliers'));
        const supplierList = querySnapshot.docs.map(doc => doc.data());
        setSuppliers(supplierList);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Search & Filter</h2>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by item name or supplier name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none text-base"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Filter
          </button>
        </div>
        
        {/* Auto-suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{suggestion.text.split(' ')[0]}</span>
                  <div>
                    <div className="font-medium text-gray-800">{suggestion.text}</div>
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
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h3>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
              className="rounded text-green-500 focus:ring-green-500"
            />
            <FaCheck className="text-green-500 text-sm" />
            <span className="text-sm text-gray-700">Verified only</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.fastDelivery}
              onChange={(e) => setFilters({ ...filters, fastDelivery: e.target.checked })}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <FaTruck className="text-blue-400 text-sm" />
            <span className="text-sm text-gray-700">Fast delivery</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.rating4Plus}
              onChange={(e) => setFilters({ ...filters, rating4Plus: e.target.checked })}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm text-gray-700">Rating 4+ suppliers</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price sorting</label>
            <div className="relative">
              <select
                value={filters.priceSort}
                onChange={(e) => setFilters({ ...filters, priceSort: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white text-sm"
              >
                <option value="none">None</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {searchQuery ? `"${getActualSearchTerm(searchQuery)}"` : 'Search'} Results
        </h3>
        {filteredSuppliers.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            {searchQuery ? `No results found for "${getActualSearchTerm(searchQuery)}"` : 'Start typing to search suppliers'}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSuppliers.map((supplier, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{supplier.supplierName}</h4>
                    <p className="text-gray-600">{supplier.supplierContact}</p>
                    {supplier.shopAddress && (
                      <p className="text-sm text-gray-500">📍 {supplier.shopAddress}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {supplier.rating && (
                      <div className="flex items-center gap-1 text-yellow-500 mb-2">
                        <FaStar className="text-sm" />
                        <span className="font-semibold">{supplier.rating}</span>
                      </div>
                    )}
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
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
  );
};

export default SearchFilter; 