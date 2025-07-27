import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MyProducts from '../components/MyProducts';
import DeleteModal from '../components/DeleteModal';
import { mockProducts } from '../src/data/mockData';
import { getUserDetails } from '../src/utils/auth';

function MyProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [sortBy, setSortBy] = useState('mostOrdered');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [supplierName, setSupplierName] = useState('');

  // Fetch supplier name from stored authentication data
  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails && userDetails.supplierName) {
      setSupplierName(userDetails.supplierName);
    } else {
      // Fallback to localStorage if not in userDetails
      const storedName = localStorage.getItem('supplierName');
      if (storedName) {
        setSupplierName(storedName);
      } else {
        setSupplierName('Supplier'); // Default fallback
      }
    }
  }, []);

  // Filter and sort products based on selected criteria
  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // First sort by stock status (in-stock first)
    filtered.sort((a, b) => {
      if (a.inStock && !b.inStock) return -1;
      if (!a.inStock && b.inStock) return 1;
      return 0;
    });

    // Then apply the selected sort criteria
    switch (sortBy) {
      case 'mostOrdered':
        filtered.sort((a, b) => b.orderCount - a.orderCount);
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ratings':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const sortedProducts = getFilteredAndSortedProducts();

  const toggleStock = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  const startEditPrice = (product) => {
    setEditingPrice(product.id);
    setNewPrice(product.price.toString());
  };

  const savePrice = (productId) => {
    if (newPrice && !isNaN(newPrice)) {
      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, price: parseInt(newPrice) }
          : product
      ));
    }
    setEditingPrice(null);
    setNewPrice('');
  };

  const cancelEdit = () => {
    setEditingPrice(null);
    setNewPrice('');
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className="supplier-homepage-container">
      <Sidebar 
        products={products}
        currentOrders={[]}
      />

      <div className="main-content">
        <Topbar supplierName={supplierName} />

        <div className="content-area">
          <MyProducts
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
        </div>
      </div>

      <DeleteModal
        showDeleteConfirm={showDeleteConfirm}
        productToDelete={productToDelete}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
      />
    </div>
  );
}

export default MyProductsPage; 