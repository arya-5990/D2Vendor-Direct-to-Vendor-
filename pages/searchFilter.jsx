import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SearchFilter = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    verified: false,
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{t('searchAndFilter')}</h2>
      
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-lg"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          </div>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
            {t('filter')}
          </button>
        </div>
        
        {/* Auto-suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{suggestion.text.split(' ')[0]}</span>
                  <div>
                    <div className="font-medium">{suggestion.text}</div>
                    {suggestion.type === 'supplier' && suggestion.contact && (
                      <div className="text-sm text-gray-500">{t('contact')}: {suggestion.contact}</div>
                    )}
                    {suggestion.type === 'supplier' && suggestion.email && (
                      <div className="text-sm text-gray-500">{t('email')}: {suggestion.email}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{t('filter')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm">{t('verifiedFilter')}</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.fastDelivery}
              onChange={(e) => setFilters({ ...filters, fastDelivery: e.target.checked })}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm">{t('fastDelivery')}</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.rating4Plus}
              onChange={(e) => setFilters({ ...filters, rating4Plus: e.target.checked })}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm">{t('rating4Plus')}</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium mb-2">{t('priceSort')}</label>
            <select
              value={filters.priceSort}
              onChange={(e) => setFilters({ ...filters, priceSort: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="none">{t('none')}</option>
              <option value="lowToHigh">{t('lowToHigh')}</option>
              <option value="highToLow">{t('highToLow')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          {searchQuery ? `"${getActualSearchTerm(searchQuery)}"` : t('search')} {t('results')}
        </h3>
        {filteredSuppliers.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            {searchQuery ? `No results found for "${getActualSearchTerm(searchQuery)}"` : 'Start typing to search suppliers'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSuppliers.map((supplier, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-orange-50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{supplier.supplierName}</h4>
                    <p className="text-gray-600">{supplier.supplierContact}</p>
                    {supplier.shopAddress && (
                      <p className="text-sm text-gray-500">📍 {supplier.shopAddress}</p>
                    )}
                  </div>
                  <div className="text-right">
                    {supplier.rating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        ⭐ <span className="font-semibold">{supplier.rating}</span>
                      </div>
                    )}
                    <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                      {t('view')}
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