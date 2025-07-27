import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AddProduct from '../components/AddProduct';

function AddProductPage() {
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  
  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    price: '',
    category: '',
    inStock: true,
    brand: '',
    description: '',
    stock: ''
  });

  const supplierName = 'Supplier Name';

  // Add Product Functions
  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if brand is required (not for fruits/vegetables)
    if (newProduct.category !== 'Fruits' && newProduct.category !== 'Vegetables' && !newProduct.brand) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would be sent to an API
    console.log('New product added:', newProduct);
    
    // Reset form
    setNewProduct({
      name: '',
      image: '',
      price: '',
      category: '',
      inStock: true,
      brand: '',
      description: '',
      stock: ''
    });

    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      image: '',
      price: '',
      category: '',
      inStock: true,
      brand: '',
      description: '',
      stock: ''
    });
  };

  return (
    <div className="supplier-homepage-container">
      <Sidebar 
        products={[]}
        currentOrders={[]}
      />

      <div className="main-content">
        <Topbar supplierName={supplierName} />

        <div className="content-area">
          <AddProduct
            newProduct={newProduct}
            handleInputChange={handleInputChange}
            handleAddProduct={handleAddProduct}
            resetForm={resetForm}
            showAddSuccess={showAddSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage; 