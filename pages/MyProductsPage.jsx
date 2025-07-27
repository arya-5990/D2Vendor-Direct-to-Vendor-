import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebase';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MyProducts from '../components/MyProducts';
import DeleteModal from '../components/DeleteModal';
import { getUserDetails, getAuthToken } from '../src/utils/auth';

function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [sortBy, setSortBy] = useState('mostOrdered');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [supplierName, setSupplierName] = useState('');

  // Fetch supplier name and products from Firebase
  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const userDetails = getUserDetails();
        const supplierToken = getAuthToken();
        
        if (!userDetails || !supplierToken) {
          console.error('Authentication error');
          setLoading(false);
          return;
        }

        // Set supplier name
        if (userDetails.supplierName) {
          setSupplierName(userDetails.supplierName);
        } else {
          const storedName = localStorage.getItem('supplierName');
          setSupplierName(storedName || 'Supplier');
        }

        // Fetch products from Firebase
        await fetchProducts(supplierToken);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, []);

  // Fetch products from Firebase
  const fetchProducts = async (supplierToken) => {
    try {
      setLoading(true);
      const userDetails = getUserDetails();
      
      // Use actual supplier ID from user details, fallback to token
      const supplierId = userDetails?.id || userDetails?.supplierId || supplierToken;
      
      console.log('🔍 Fetching products for supplier ID:', supplierId);
      
      const productsQuery = query(
        collection(db, 'products'),
        where('supplierId', '==', supplierId)
      );
      
      const querySnapshot = await getDocs(productsQuery);
      const fetchedProducts = [];
      
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        fetchedProducts.push({
          id: doc.id,
          ...productData,
          // Add default values for missing fields
          orderCount: productData.orderCount || 0,
          rating: productData.rating || 0,
          reviews: productData.reviews || 0,
          originalPrice: productData.originalPrice || productData.price
        });
      });
      
      setProducts(fetchedProducts);
      console.log('✅ Products fetched from Firebase:', fetchedProducts);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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
        filtered.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ratings':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    return filtered;
  };

  const sortedProducts = getFilteredAndSortedProducts();

  // Toggle stock status in Firebase
  const toggleStock = async (productId) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const newStockStatus = !product.inStock;
      
      // Update in Firebase
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        inStock: newStockStatus,
        updatedAt: serverTimestamp()
      });

      // Update local state
      setProducts(products.map(p => 
        p.id === productId 
          ? { ...p, inStock: newStockStatus }
          : p
      ));

      console.log('✅ Stock status updated in Firebase');
    } catch (error) {
      console.error('❌ Error updating stock status:', error);
      alert('Failed to update stock status. Please try again.');
    }
  };

  const startEditPrice = (product) => {
    setEditingPrice(product.id);
    setNewPrice(product.price.toString());
  };

  // Save price to Firebase
  const savePrice = async (productId) => {
    if (!newPrice || isNaN(newPrice)) {
      alert('Please enter a valid price');
      return;
    }

    try {
      const newPriceValue = parseFloat(newPrice);
      
      // Update in Firebase
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, {
        price: newPriceValue,
        updatedAt: serverTimestamp()
      });

      // Update local state
      setProducts(products.map(product => 
        product.id === productId 
          ? { ...product, price: newPriceValue }
          : product
      ));

      setEditingPrice(null);
      setNewPrice('');
      console.log('✅ Price updated in Firebase');
    } catch (error) {
      console.error('❌ Error updating price:', error);
      alert('Failed to update price. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingPrice(null);
    setNewPrice('');
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  // Delete product from Firebase
  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      // Delete from Firebase
      const productRef = doc(db, 'products', productToDelete.id);
      await deleteDoc(productRef);

      // Update local state
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      
      console.log('✅ Product deleted from Firebase');
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="supplier-homepage-container">
        <Sidebar products={[]} currentOrders={[]} />
        <div className="main-content">
          <Topbar supplierName={supplierName} />
          <div className="content-area">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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