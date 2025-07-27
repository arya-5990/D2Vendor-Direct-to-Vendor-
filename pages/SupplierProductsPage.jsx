import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { db } from '../src/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { getUserDetails, getAuthToken } from '../src/utils/auth';
import { FaBoxOpen, FaFilter, FaChevronDown, FaSort, FaShoppingCart, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const SupplierProductsPage = () => {
  const { t } = useTranslation();
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Vegetables', label: 'Vegetables' },
    { value: 'Fruits', label: 'Fruits' },
    { value: 'Dairy', label: 'Dairy' },
    { value: 'Grains', label: 'Grains' },
    { value: 'Spices', label: 'Spices' },
    { value: 'Bakery', label: 'Bakery' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating' },
    { value: 'orders', label: 'Most Ordered' }
  ];

  useEffect(() => {
    const fetchSupplierAndProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching supplier with ID:', supplierId);
        
        // First, let's see all suppliers in the database
        const allSuppliersQuery = query(collection(db, 'User_suppliers'));
        const allSuppliersSnapshot = await getDocs(allSuppliersQuery);
        console.log('All suppliers in database:', allSuppliersSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().supplierName
        })));
        
        // Fetch supplier details by custom ID field
        const supplierQuery = query(
          collection(db, 'User_suppliers'),
          where('id', '==', supplierId)
        );
        const supplierSnapshot = await getDocs(supplierQuery);
        console.log('Supplier query result:', supplierSnapshot.docs.length);
        
        if (!supplierSnapshot.empty) {
          const supplierDoc = supplierSnapshot.docs[0];
          const supplierData = { id: supplierDoc.id, ...supplierDoc.data() };
          console.log('Supplier data:', supplierData);
          setSupplier(supplierData);
        } else {
          console.error('Supplier not found for custom ID:', supplierId);
          console.log('Available suppliers:', allSuppliersSnapshot.docs.map(doc => ({
            docId: doc.id,
            customId: doc.data().id,
            name: doc.data().supplierName
          })));
          alert('Supplier not found, but showing page anyway to debug.');
          // Don't redirect, let's see what happens
        }

        // Fetch products for this supplier
        console.log('Searching for products with supplierId:', supplierId);
        
        // First, let's see all products to understand the structure
        const allProductsQuery = query(collection(db, 'products'));
        const allProductsSnapshot = await getDocs(allProductsQuery);
        console.log('All products in collection:', allProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          supplierId: doc.data().supplierId,
          name: doc.data().name
        })));
        
        // Now search for products with this supplier ID
        const productsQuery = query(
          collection(db, 'products'),
          where('supplierId', '==', supplierId)
        );
        const productsSnapshot = await getDocs(productsQuery);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Products found for supplier:', productsList.length, productsList);
        
        // If no products found by supplierId, try searching by supplier name
        if (productsList.length === 0 && supplier) {
          console.log('No products found by supplierId, trying supplier name:', supplier.supplierName);
          const productsByNameQuery = query(
            collection(db, 'products'),
            where('supplierName', '==', supplier.supplierName)
          );
          const productsByNameSnapshot = await getDocs(productsByNameQuery);
          const productsByNameList = productsByNameSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log('Products found by supplier name:', productsByNameList.length, productsByNameList);
          setProducts(productsByNameList);
        } else {
          setProducts(productsList);
        }
      } catch (error) {
        console.error('Error fetching supplier and products:', error);
        alert('Error loading supplier data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (supplierId) {
      fetchSupplierAndProducts();
    }
  }, [supplierId, navigate]);

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
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'orders':
        filtered.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return stars;
  };

  const sortedProducts = getFilteredAndSortedProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading supplier products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {supplier && (
        <>
          {/* Supplier Info Header */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-6">
              {supplier.shopImageUrl && (
                <img 
                  src={supplier.shopImageUrl} 
                  alt={supplier.supplierName} 
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-800">{supplier.supplierName}</h1>
                  {supplier.verified && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-gray-600">
                  {supplier.shopAddress && (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-orange-500" />
                      <span>{supplier.shopAddress}</span>
                    </div>
                  )}
                  {supplier.supplierEmail && (
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-orange-500" />
                      <span>{supplier.supplierEmail}</span>
                    </div>
                  )}
                  {supplier.supplierMobile && (
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-orange-500" />
                      <span>{supplier.supplierMobile}</span>
                    </div>
                  )}
                </div>
                {supplier.rating && (
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      {renderStars(supplier.rating)}
                    </div>
                    <span className="font-semibold text-gray-800">{supplier.rating}</span>
                    {supplier.reviews && (
                      <span className="text-gray-500">({supplier.reviews}+ reviews)</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaBoxOpen className="text-orange-500" />
                  Products ({sortedProducts.length})
                </h2>
                <p className="text-gray-600 mt-1">Browse all products from this supplier</p>
              </div>
              
              {/* Filters */}
              <div className="flex gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    <FaFilter />
                    <span>{categoryOptions.find(c => c.value === selectedCategory)?.label}</span>
                    <FaChevronDown className={`transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showCategoryDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
                      {categoryOptions.map(option => (
                        <button
                          key={option.value}
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                            selectedCategory === option.value ? 'bg-orange-50 text-orange-600' : ''
                          }`}
                          onClick={() => {
                            setSelectedCategory(option.value);
                            setShowCategoryDropdown(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort Filter */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    <FaSort />
                    <span>{sortOptions.find(s => s.value === sortBy)?.label}</span>
                    <FaChevronDown className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border">
                      {sortOptions.map(option => (
                        <button
                          key={option.value}
                          className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                            sortBy === option.value ? 'bg-orange-50 text-orange-600' : ''
                          }`}
                          onClick={() => {
                            setSortBy(option.value);
                            setShowSortDropdown(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <FaBoxOpen className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">This supplier doesn't have any products available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
                        {product.category}
                      </div>
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                          Out of Stock
                        </div>
                      )}
                      {product.orderCount && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                          <FaShoppingCart />
                          <span>{product.orderCount}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      
                      {product.rating && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                          </div>
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-orange-600">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <button 
                          className={`px-4 py-2 rounded-lg font-medium transition ${
                            product.inStock 
                              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SupplierProductsPage; 