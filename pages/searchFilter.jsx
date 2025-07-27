import React, { useState } from 'react';

const SearchFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    verified: false,
    fastDelivery: false,
    rating4Plus: false,
    priceSort: 'none'
  });

  const suggestions = [
    { text: '🥦 Tomatoes', supplier: 'FreshMart', type: 'item' },
    { text: '🧂 Salt', supplier: 'A-Grade Suppliers', type: 'item' },
    { text: '🧑‍🌾 Supplier: Shree Wholesale Co.', type: 'supplier' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Search & Filter</h2>
      
      {/* Search Bar */}
      <div className="relative">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by item name or supplier name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none text-lg"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          </div>
          <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
            Filter
          </button>
        </div>
        
        {/* Auto-suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 mt-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setSearchQuery(suggestion.text);
                  setShowSuggestions(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{suggestion.text.split(' ')[0]}</span>
                  <div>
                    <div className="font-medium">{suggestion.text}</div>
                    {suggestion.supplier && (
                      <div className="text-sm text-gray-500">from {suggestion.supplier}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Options */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.verified}
              onChange={(e) => setFilters({...filters, verified: e.target.checked})}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span>✅ Verified only</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.fastDelivery}
              onChange={(e) => setFilters({...filters, fastDelivery: e.target.checked})}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span>🚛 Fast delivery</span>
          </label>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.rating4Plus}
              onChange={(e) => setFilters({...filters, rating4Plus: e.target.checked})}
              className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
            />
            <span>⭐ Rating 4+ suppliers</span>
          </label>
          
          <select
            value={filters.priceSort}
            onChange={(e) => setFilters({...filters, priceSort: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="none">Price sorting</option>
            <option value="low-to-high">Price low-to-high</option>
            <option value="high-to-low">Price high-to-low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter; 