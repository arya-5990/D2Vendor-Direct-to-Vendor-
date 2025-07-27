import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Hero from '../pages/hero';
import Login from '../pages/login';
import Registration from '../pages/registration';
import VendorDashboard from '../pages/vendorDashboard';
import SearchFilter from '../pages/searchFilter';
import Suppliers from '../pages/suppliers';
import PriceTracker from '../pages/priceTracker';
import QuickReorder from '../pages/quickReorder';
import Reviews from '../pages/reviews';
import AddProductPage from '../pages/AddProduct';
import DeleteModal from '../pages/DeleteModal';
import MyProductsPage from '../pages/MyProducts';
import OrderHistoryPage from '../pages/OrderHistory';
import Sidebar from '../pages/Sidebar';
import Topbar from '../pages/Topbar';
import { FaTrash } from 'react-icons/fa';
import './App.css';

// Mock data for MyProducts
const mockProducts = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 45,
    originalPrice: 50,
    description: "Fresh red tomatoes from local farms",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
    rating: 4.5,
    reviews: 128,
    orderCount: 156,
    inStock: true
  },
  {
    id: 2,
    name: "Organic Milk",
    category: "Dairy",
    price: 65,
    originalPrice: 70,
    description: "Pure organic milk from grass-fed cows",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    rating: 4.8,
    reviews: 89,
    orderCount: 203,
    inStock: true
  },
  {
    id: 3,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 35,
    originalPrice: 40,
    description: "Sweet yellow bananas",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    rating: 4.2,
    reviews: 67,
    orderCount: 98,
    inStock: false
  }
];

// Wrapper component for MyProducts with state management
function MyProductsWrapper() {
  const [products, setProducts] = React.useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('mostOrdered');
  const [showSortDropdown, setShowSortDropdown] = React.useState(false);
  const [editingPrice, setEditingPrice] = React.useState(null);
  const [newPrice, setNewPrice] = React.useState('');
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState(null);

  const sortedProducts = React.useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = products.filter(p => p.category === selectedCategory);
    }
    
    switch (sortBy) {
      case 'mostOrdered':
        return [...filtered].sort((a, b) => b.orderCount - a.orderCount);
      case 'alphabetical':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'ratings':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, selectedCategory, sortBy]);

  const toggleStock = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ));
  };

  const startEditPrice = (product) => {
    setEditingPrice(product.id);
    setNewPrice(product.price.toString());
  };

  const savePrice = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, price: parseFloat(newPrice) } : p
    ));
    setEditingPrice(null);
    setNewPrice('');
  };

  const cancelEdit = () => {
    setEditingPrice(null);
    setNewPrice('');
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <>
      <MyProductsPage
        sortedProducts={sortedProducts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showCategoryDropdown={showCategoryDropdown}
        setShowCategoryDropdown={setShowCategoryDropdown}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showSortDropdown={showSortDropdown}
        setShowSortDropdown={setShowSortDropdown}
        editingPrice={editingPrice}
        setEditingPrice={setEditingPrice}
        newPrice={newPrice}
        setNewPrice={setNewPrice}
        toggleStock={toggleStock}
        startEditPrice={startEditPrice}
        savePrice={savePrice}
        cancelEdit={cancelEdit}
        handleDeleteClick={handleDeleteClick}
      />
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-confirmation-modal">
            <div className="modal-header">
              <FaTrash className="modal-icon" />
              <h3>Delete Product</h3>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="cancel-delete-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Wrapper component for OrderHistory with state management
function OrderHistoryWrapper() {
  const [timeFilter, setTimeFilter] = React.useState('lastMonth');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [expandedOrder, setExpandedOrder] = React.useState(null);
  
  // Mock data for orders
  const currentOrders = [
    {
      id: "ORD001",
      vendor: "Fresh Farms",
      products: [
        { name: "Fresh Tomatoes", quantity: 50, price: 45 },
        { name: "Organic Milk", quantity: 20, price: 65 }
      ],
      amount: 3250,
      date: "2024-01-15",
      status: "Completed"
    },
    {
      id: "ORD002", 
      vendor: "Dairy Delights",
      products: [
        { name: "Cheese", quantity: 10, price: 120 },
        { name: "Butter", quantity: 15, price: 85 }
      ],
      amount: 2175,
      date: "2024-01-14",
      status: "Processing"
    }
  ];
  
  const totalRevenue = currentOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <OrderHistoryPage
      timeFilter={timeFilter}
      setTimeFilter={setTimeFilter}
      showDropdown={showDropdown}
      setShowDropdown={setShowDropdown}
      currentOrders={currentOrders}
      totalRevenue={totalRevenue}
      expandedOrder={expandedOrder}
      setExpandedOrder={setExpandedOrder}
    />
  );
}

// Wrapper component for AddProduct with state management
function AddProductWrapper() {
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    brand: '',
    description: '',
    inStock: true
  });
  const [showAddSuccess, setShowAddSuccess] = React.useState(false);

  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      // Here you would typically save to a database
      console.log('Adding product:', newProduct);
      setShowAddSuccess(true);
      setTimeout(() => setShowAddSuccess(false), 3000);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: '',
      brand: '',
      description: '',
      inStock: true
    });
  };

  return (
    <AddProductPage
      newProduct={newProduct}
      handleInputChange={handleInputChange}
      handleAddProduct={handleAddProduct}
      resetForm={resetForm}
      showAddSuccess={showAddSuccess}
    />
  );
}

function SupplierDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Topbar at the top */}
      <Topbar supplierName="Supplier Name" />
      {/* Sidebar and main content below */}
      <div className="flex flex-1">
        <div className="w-64 bg-white shadow-md">
          <Sidebar />
        </div>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to order history */}
          <Route path="/" element={<Navigate to="/order-history" replace />} />
          
          {/* Main application routes */}
          <Route path="/order-history" element={<SupplierDashboardLayout><OrderHistoryWrapper /></SupplierDashboardLayout>} />
          <Route path="/my-products" element={<SupplierDashboardLayout><MyProductsWrapper /></SupplierDashboardLayout>} />
          <Route path="/add-product" element={<SupplierDashboardLayout><AddProductWrapper /></SupplierDashboardLayout>} />
          
          {/* Vendor dashboard routes */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />}>
            <Route path="search" element={<SearchFilter />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="price-tracker" element={<PriceTracker />} />
            <Route path="quick-reorder" element={<QuickReorder />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          
          {/* Other routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          
          {/* Catch all route - redirect to order history */}
          <Route path="*" element={<Navigate to="/order-history" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


