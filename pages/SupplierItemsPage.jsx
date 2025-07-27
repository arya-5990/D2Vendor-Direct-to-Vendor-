import React from 'react';
import {
  FaHome,
  FaClipboardList,
  FaStar,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const items = [
  { name: 'Onions', price: 20, unit: 'kg', stock: 120, category: 'Vegetables' },
  { name: 'Oil', price: 120, unit: 'kg', stock: 85, category: 'Cooking Essentials' },
  { name: 'Paneer', price: 180, unit: 'kg', stock: 60, category: 'Dairy' },
  { name: 'Tomatoes', price: 35, unit: 'kg', stock: 95, category: 'Vegetables' },
  { name: 'Rice', price: 45, unit: 'kg', stock: 200, category: 'Grains' },
  { name: 'Potatoes', price: 25, unit: 'kg', stock: 150, category: 'Vegetables' },
];

const SupplierItemsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 fixed h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-8 text-orange-500">VendorHub</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaHome className="text-lg" />
            Dashboard
          </button>
          <button className="flex items-center gap-2 text-orange-500 font-semibold px-4 py-3 rounded-lg bg-orange-100">
            <FaBox className="text-lg" />
            View Items
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaClipboardList className="text-lg" />
            Orders
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-orange-50">
            <FaStar className="text-lg" />
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Items Supplied</h1>
            <p className="text-gray-600">Browse through our comprehensive catalog of quality products</p>
          </div>

          {/* Supplier Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8 animate-fade-in-up animate-stagger-1">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                <FaBox className="text-3xl text-orange-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Fresh Food Suppliers</h2>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-orange-500" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-orange-500" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-orange-500" />
                    <span>contact@freshfood.com</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <FaStar className="text-xl" />
                  <span className="font-bold text-xl">4.8</span>
                </div>
                <span className="text-sm text-gray-500">(150+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-2">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <FaBox className="text-orange-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{items.length}</p>
                  <p className="text-gray-600">Total Items</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-3">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <FaTruck className="text-green-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">710</p>
                  <p className="text-gray-600">Total Stock</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FaStar className="text-blue-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">₹{items.reduce((sum, item) => sum + item.price, 0)}</p>
                  <p className="text-gray-600">Avg Price</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fade-in-up animate-stagger-5">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <FaClipboardList className="text-purple-500 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                  <p className="text-gray-600">Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-100 hover:border-orange-200 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="text-sm" />
                      <span className="text-sm font-semibold">4.5</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {item.name}
                  </h2>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaTruck className="text-green-500" />
                      <span className="text-sm text-gray-600">Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBox className="text-blue-500" />
                      <span className="text-sm text-gray-600">In Stock</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{item.price}
                      </span>
                      <span className="text-gray-500">/{item.unit}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Stock Available:</span>
                    <span className="font-semibold text-gray-800">{item.stock} {item.unit}</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SupplierItemsPage;