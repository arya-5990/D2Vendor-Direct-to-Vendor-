import React, { useState, useRef } from 'react';
import { 
  FaUpload, 
  FaImage, 
  FaTrash, 
  FaCoins, 
  FaCalculator, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaCamera,
  FaWeightHanging,
  FaTag
} from 'react-icons/fa';

const Exchange = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('grams');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedExchanges, setSubmittedExchanges] = useState([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const fileInputRef = useRef(null);

  // Calculate tokens based on quantity (1 token per 100 grams)
  const calculateTokens = (qty, unit) => {
    let grams = 0;
    switch (unit) {
      case 'grams':
        grams = parseFloat(qty) || 0;
        break;
      case 'kilograms':
        grams = (parseFloat(qty) || 0) * 1000;
        break;
      case 'pounds':
        grams = (parseFloat(qty) || 0) * 453.592;
        break;
      default:
        grams = parseFloat(qty) || 0;
    }
    return Math.floor(grams / 100);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage || !productName || !quantity) {
      alert('Please fill in all fields and upload an image');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const tokens = calculateTokens(quantity, unit);
      const newExchange = {
        id: Date.now(),
        productName,
        quantity: parseFloat(quantity),
        unit,
        tokens,
        image: imagePreview,
        date: new Date().toLocaleDateString(),
        status: 'pending'
      };
      
      setSubmittedExchanges(prev => [newExchange, ...prev]);
      setTotalTokens(prev => prev + tokens);
      
      // Reset form
      setSelectedImage(null);
      setImagePreview(null);
      setProductName('');
      setQuantity('');
      setUnit('grams');
      
      setIsSubmitting(false);
    }, 2000);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const tokensEarned = calculateTokens(quantity, unit);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 fixed h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 text-orange-500">VendorHub</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaUpload className="text-lg" />
            Search & Filter
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaImage className="text-lg" />
            Suppliers
          </button>
          <button className="flex items-center gap-2 text-orange-500 font-semibold px-4 py-3 rounded-lg bg-orange-100">
            <FaCoins className="text-lg" />
            Food Exchange
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaCalculator className="text-lg" />
            Price Tracker
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaCheckCircle className="text-lg" />
            Reviews
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-1">
        {/* Top Navbar */}
        <div className="w-full h-16 bg-white flex justify-between items-center px-6 shadow-sm sticky top-0 z-10">
          <div className="text-xl font-bold text-orange-500">
            VendorHub
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-orange-100 text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-orange-200 transition-all duration-300">
              English
            </button>
            <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-lg font-semibold">
              Supplier Name
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 animate-fade-in-up">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Food Exchange Program</h1>
            <p className="text-gray-600">Exchange your leftover raw food materials for tokens and contribute to reducing food waste</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exchange Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaUpload className="text-orange-500" />
                Upload Food Material
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <FaCamera className="inline mr-2 text-orange-500" />
                    Upload Image
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
                    >
                      <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload image</p>
                      <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <FaTag className="inline mr-2 text-orange-500" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., Fresh Tomatoes, Onions, Rice..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                  />
                </div>

                {/* Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaWeightHanging className="inline mr-2 text-orange-500" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="0"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Unit
                    </label>
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    >
                      <option value="grams">Grams</option>
                      <option value="kilograms">Kilograms</option>
                      <option value="pounds">Pounds</option>
                    </select>
                  </div>
                </div>

                {/* Token Calculation */}
                {quantity && (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Tokens to receive:</p>
                        <p className="text-2xl font-bold text-orange-600">{tokensEarned}</p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <FaCoins className="text-2xl text-orange-500" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      1 token = 100 grams of food material
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedImage || !productName || !quantity}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaUpload className="text-lg" />
                      Submit Exchange
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Exchange History & Stats */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-1">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <FaCoins className="text-green-500 text-2xl" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{totalTokens}</p>
                      <p className="text-gray-600">Total Tokens</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-2">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <FaCheckCircle className="text-blue-500 text-2xl" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{submittedExchanges.length}</p>
                      <p className="text-gray-600">Exchanges</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exchange History */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-3">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-orange-500" />
                  Recent Exchanges
                </h3>
                
                {submittedExchanges.length === 0 ? (
                  <div className="text-center py-8">
                    <FaExclamationTriangle className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No exchanges yet</p>
                    <p className="text-sm text-gray-400">Start by uploading your first food material</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {submittedExchanges.map((exchange) => (
                      <div 
                        key={exchange.id}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <img 
                          src={exchange.image} 
                          alt={exchange.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{exchange.productName}</h4>
                          <p className="text-sm text-gray-600">
                            {exchange.quantity} {exchange.unit} • {exchange.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-orange-500">
                            <FaCoins className="text-sm" />
                            <span className="font-bold">{exchange.tokens}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            exchange.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            {exchange.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange; 