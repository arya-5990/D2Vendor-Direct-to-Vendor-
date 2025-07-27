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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch suppliers
        const supplierSnapshot = await getDocs(collection(db, 'User_suppliers'));
        const supplierList = supplierSnapshot.docs.map(doc => doc.data());
        console.log('🔍 Fetched suppliers:', supplierList.length, supplierList);
        setSuppliers(supplierList);

        // Fetch products
        console.log('🔍 Attempting to fetch products from Firebase...');
        try {
          const productSnapshot = await getDocs(collection(db, 'products'));
          console.log('🔍 Product snapshot:', productSnapshot);
          console.log('🔍 Product snapshot empty:', productSnapshot.empty);
          console.log('🔍 Product snapshot size:', productSnapshot.size);
          
          const productList = productSnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('🔍 Product doc data:', doc.id, data);
            return {
              id: doc.id,
              ...data
            };
          });
          console.log('🔍 Fetched products:', productList.length, productList);
          setProducts(productList);
        } catch (productError) {
          console.error('❌ Error fetching products:', productError);
          // Try to fetch with mock data as fallback
          console.log('🔍 Trying to use mock data as fallback...');
          const mockProducts = [
            {
              id: 'mock1',
              name: 'Fresh Tomatoes',
              category: 'Vegetables',
              price: 25,
              supplierName: 'Fresh Farm',
              description: 'Fresh red tomatoes from local farms',
              brand: 'Local',
              image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=150&h=150&fit=crop',
              rating: 4.5
            },
            {
              id: 'mock2',
              name: 'Organic Bananas',
              category: 'Fruits',
              price: 30,
              supplierName: 'Organic Valley',
              description: 'Sweet organic bananas',
              brand: 'Organic',
              image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&fit=crop',
              rating: 4.8
            }
          ];
          console.log('🔍 Using mock products:', mockProducts);
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Extract actual search term from query (remove emoji and prefixes)
  const getActualSearchTerm = (query) => {
    if (query.includes('Supplier:')) {
      return query.split('Supplier:')[1]?.trim() || query;
    }
    if (query.includes('Product:')) {
      return query.split('Product:')[1]?.trim() || query;
    }
    return query;
  };

  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(supplier => {
    const actualQuery = getActualSearchTerm(searchQuery).toLowerCase();
    if (!actualQuery || actualQuery.trim() === '') return false;
    
    return (
      supplier.supplierName?.toLowerCase().includes(actualQuery) ||
      supplier.supplierContact?.toLowerCase().includes(actualQuery) ||
      supplier.supplierEmail?.toLowerCase().includes(actualQuery)
    );
  });

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    const actualQuery = getActualSearchTerm(searchQuery).toLowerCase();
    if (!actualQuery || actualQuery.trim() === '') return false;
    
    const matches = (
      product.name?.toLowerCase().includes(actualQuery) ||
      product.category?.toLowerCase().includes(actualQuery) ||
      product.brand?.toLowerCase().includes(actualQuery) ||
      product.description?.toLowerCase().includes(actualQuery) ||
      product.supplierName?.toLowerCase().includes(actualQuery)
    );
    
    if (matches) {
      console.log('🔍 Product match found:', product.name, 'for query:', actualQuery);
    }
    
    return matches;
  });

  // Suggestions: both filtered suppliers and products
  const suggestions = [
    ...filteredSuppliers.map(supplier => ({
      text: `🧑‍🌾 Supplier: ${supplier.supplierName}`,
      supplier: supplier.supplierName,
      contact: supplier.supplierContact,
      email: supplier.supplierEmail,
      type: 'supplier',
    })),
    ...filteredProducts.map(product => ({
      text: `📦 Product: ${product.name}`,
      product: product.name,
      category: product.category,
      price: product.price,
      supplierName: product.supplierName,
      type: 'product',
    }))
  ];

  console.log('🔍 Filtered suppliers:', filteredSuppliers.length);
  console.log('🔍 Filtered products:', filteredProducts.length);
  console.log('🔍 Total suggestions:', suggestions.length);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log('🔍 Search query changed:', value);
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
              placeholder="Search suppliers or products..."
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
                    {suggestion.type === 'product' && suggestion.category && (
                      <div className="text-sm text-gray-500">{t('category')}: {suggestion.category}</div>
                    )}
                    {suggestion.type === 'product' && suggestion.price && (
                      <div className="text-sm text-gray-500">{t('price')}: ₹{suggestion.price}</div>
                    )}
                    {suggestion.type === 'product' && suggestion.supplierName && (
                      <div className="text-sm text-gray-500">{t('supplier')}: {suggestion.supplierName}</div>
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
        {filteredSuppliers.length === 0 && filteredProducts.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            {searchQuery ? `No results found for "${getActualSearchTerm(searchQuery)}"` : 'Start typing to search suppliers or products'}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Suppliers Section */}
            {filteredSuppliers.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-gray-700">🧑‍🌾 {t('suppliers')} ({filteredSuppliers.length})</h4>
                <div className="space-y-3">
                  {filteredSuppliers.map((supplier, index) => (
                    <div key={`supplier-${index}`} className="border border-gray-200 rounded-lg p-4 hover:bg-orange-50 transition">
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
              </div>
            )}

            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-gray-700">📦 {t('products')} ({filteredProducts.length})</h4>
                <div className="space-y-3">
                  {filteredProducts.map((product, index) => (
                    <div key={`product-${index}`} className="border border-gray-200 rounded-lg p-4 hover:bg-orange-50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-lg">{product.name}</h4>
                            <p className="text-gray-600">{product.category}</p>
                            <p className="text-sm text-gray-500">💰 ₹{product.price}</p>
                            {product.supplierName && (
                              <p className="text-sm text-gray-500">🏭 {product.supplierName}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          {product.rating && (
                            <div className="flex items-center gap-1 text-yellow-500">
                              ⭐ <span className="font-semibold">{product.rating}</span>
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
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter; 