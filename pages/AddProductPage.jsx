import { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebase';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import AddProduct from '../components/AddProduct';
import { getUserDetails, getAuthToken } from '../src/utils/auth';

// Cloudinary config (same as registration page)
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtintjmp4/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'hackathon_unsigned';

function AddProductPage() {
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    imageFile: null,
    price: '',
    category: '',
    inStock: true,
    brand: '',
    description: '',
    stock: ''
  });

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

  // Add Product Functions
  const handleInputChange = (field, value) => {
    if (field === 'imageFile' && value) {
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(value);
      setNewProduct(prev => ({
        ...prev,
        imageFile: value,
        image: previewUrl
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if brand is required (not for fruits/vegetables)
    if (newProduct.category !== 'Fruits' && newProduct.category !== 'Vegetables' && !newProduct.brand) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Get supplier details
      const userDetails = getUserDetails();
      const supplierToken = getAuthToken();
      
      if (!userDetails || !supplierToken) {
        alert('Authentication error. Please login again.');
        return;
      }

      let imageUrl = newProduct.image || '';

      // Upload image to Cloudinary if a file was selected (same logic as registration page)
      if (newProduct.imageFile) {
        const data = new FormData();
        data.append('file', newProduct.imageFile);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        try {
          const res = await axios.post(CLOUDINARY_URL, data);
          imageUrl = res.data.secure_url;
          console.log('✅ Image uploaded to Cloudinary:', imageUrl);
        } catch (err) {
          let msg = 'Image upload failed.';
          if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
            msg += '\nCloudinary: ' + err.response.data.error.message;
          }
          alert(msg);
          setIsLoading(false);
          return;
        }
      }

      // Prepare product data for Firestore
      const productData = {
        name: newProduct.name,
        image: imageUrl,
        price: parseFloat(newProduct.price) || 0,
        category: newProduct.category,
        inStock: newProduct.inStock,
        brand: newProduct.brand || '',
        description: newProduct.description,
        stock: parseInt(newProduct.stock) || 0,
        supplierId: userDetails.id || userDetails.supplierId || supplierToken, // Use actual supplier ID from user details
        supplierName: userDetails.supplierName || supplierName,
        supplierEmail: userDetails.supplierEmail || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Add product to Firestore products collection (lowercase)
      const productsCollectionRef = collection(db, 'products');
      const docRef = await addDoc(productsCollectionRef, productData);
      
      console.log('✅ Product added successfully with ID:', docRef.id);
      console.log('📦 Product data:', productData);
      
      // Reset form
      setNewProduct({
        name: '',
        image: '',
        imageFile: null,
        price: '',
        category: '',
        inStock: true,
        brand: '',
        description: '',
        stock: ''
      });

      setShowAddSuccess(true);
      setTimeout(() => setShowAddSuccess(false), 3000);
      
    } catch (error) {
      console.error('❌ Error adding product to Firestore:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      image: '',
      imageFile: null,
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
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage; 