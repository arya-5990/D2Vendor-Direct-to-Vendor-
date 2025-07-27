import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const PriceTracker = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Fetch all products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching all products for price tracking...');
        
        const productsQuery = query(
          collection(db, 'products'),
          orderBy('name')
        );
        
        const querySnapshot = await getDocs(productsQuery);
        const fetchedProducts = [];
        
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          // Generate mock price history for demonstration
          const currentPrice = productData.price || 0;
          const previousPrice = Math.round(currentPrice * (0.9 + Math.random() * 0.2)); // Random variation
          const trend = currentPrice > previousPrice ? 'up' : 'down';
          
          // Generate mock chart data (7 days)
          const chartData = [];
          let basePrice = previousPrice;
          for (let i = 0; i < 7; i++) {
            const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
            basePrice = Math.round(basePrice * (1 + variation));
            chartData.push(basePrice);
          }
          chartData[6] = currentPrice; // Ensure last point is current price
          
          fetchedProducts.push({
            id: doc.id,
            name: productData.name,
            category: productData.category,
            supplierName: productData.supplierName,
            currentPrice: currentPrice,
            previousPrice: previousPrice,
            trend: trend,
            chartData: chartData,
            image: productData.image,
            inStock: productData.inStock,
            orderCount: productData.orderCount || 0,
            rating: productData.rating || 0
          });
        });
        
        setProducts(fetchedProducts);
        console.log('✅ Products fetched for price tracking:', fetchedProducts.length);
      } catch (error) {
        console.error('❌ Error fetching products for price tracking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'trend-up':
        filtered.sort((a, b) => {
          if (a.trend === 'up' && b.trend !== 'up') return -1;
          if (a.trend !== 'up' && b.trend === 'up') return 1;
          return 0;
        });
        break;
      case 'trend-down':
        filtered.sort((a, b) => {
          if (a.trend === 'down' && b.trend !== 'down') return -1;
          if (a.trend !== 'down' && b.trend === 'down') return 1;
          return 0;
        });
        break;
      case 'orders':
        filtered.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const sortedProducts = getFilteredAndSortedProducts();

  // Calculate summary statistics
  const summaryStats = {
    totalProducts: products.length,
    risingPrices: products.filter(p => p.trend === 'up').length,
    fallingPrices: products.filter(p => p.trend === 'down').length,
    totalSavings: products.reduce((sum, p) => {
      if (p.trend === 'down') {
        return sum + (p.previousPrice - p.currentPrice);
      }
      return sum;
    }, 0)
  };

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">📊 {t('priceTracker')}</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading price tracking data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">📊 {t('priceTracker')}</h2>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="trend-up">Rising Prices</option>
            <option value="trend-down">Falling Prices</option>
            <option value="orders">Most Ordered</option>
          </select>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedProducts.map((product, index) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-xs text-gray-400">{product.supplierName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {product.trend === 'up' ? (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ⬆️ {t('priceRising')}
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ⬇️ {t('cheaperThanAverage')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-orange-600 mb-1">₹{product.currentPrice}/kg</div>
              <div className="text-sm text-gray-500">
                {t('previous')}: ₹{product.previousPrice}/kg
                <span className={`ml-2 ${product.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                  ({product.trend === 'up' ? '+' : '-'}₹{Math.abs(product.currentPrice - product.previousPrice)})
                </span>
              </div>
            </div>
            
            {/* Price Chart Placeholder */}
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">{t('priceTrendsPast30')}</div>
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="text-orange-500 text-2xl mx-auto mb-2 block">📈</span>
                  <div className="text-sm text-gray-500">{t('chartVisualization')}</div>
                  <div className="text-xs text-gray-400">{t('lineChartShowingTrends')}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{t('thirtyDayAverage')}: ₹{Math.round((product.currentPrice + product.previousPrice) / 2)}/kg</span>
              <span className="text-gray-500">{t('updatedToday')}</span>
            </div>
            
            {/* Product Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Orders: {product.orderCount}</span>
                <span>Rating: {product.rating}/5</span>
                <span className={`px-2 py-1 rounded ${product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary Widget */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{t('priceSummary')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold">{summaryStats.totalProducts}</div>
            <div className="text-sm opacity-90">Total Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{summaryStats.risingPrices}</div>
            <div className="text-sm opacity-90">{t('itemsWithRisingPrices')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{summaryStats.fallingPrices}</div>
            <div className="text-sm opacity-90">{t('itemsCheaperThanAverage')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">₹{summaryStats.totalSavings}</div>
            <div className="text-sm opacity-90">{t('totalSavingsThisMonth')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTracker; 