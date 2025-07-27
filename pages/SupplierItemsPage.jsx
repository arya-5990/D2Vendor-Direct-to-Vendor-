import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaHome,
  FaClipboardList,
  FaStar,
  FaBox
} from 'react-icons/fa';

const items = [
  { name: 'Onions', price: 20, unit: 'kg', stock: 120 },
  { name: 'Oil', price: 120, unit: 'kg', stock: 85 },
  { name: 'Paneer', price: 180, unit: 'kg', stock: 60 },
];

const SupplierItemsPage = () => {
  const location = useLocation();
  const supplier = location.state?.supplier;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 fixed h-screen">
        <h2 className="text-xl font-bold mb-8 text-orange-500">VendorHub</h2>
        <nav className="flex flex-col gap-4 text-gray-700">
          <button className="flex items-center gap-2 hover:text-orange-500">
            <FaHome /> Dashboard
          </button>
          <button className="flex items-center gap-2 text-orange-500 font-semibold">
            <FaBox /> View Items
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500">
            <FaClipboardList /> Orders
          </button>
          <button className="flex items-center gap-2 hover:text-orange-500">
            <FaStar /> Reviews
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="ml-64 flex-1">
        {/* Top Navbar */}
        <div className="w-full h-16 bg-white flex justify-end items-center px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="bg-orange-100 text-orange-500 px-4 py-1 rounded-md font-semibold">
              English
            </button>
            <div className="bg-orange-100 text-orange-500 px-4 py-1 rounded-md font-semibold">
              Supplier Name
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {supplier ? `${supplier.supplierName} - Items Supplied` : 'Items Supplied'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                  <p className="text-orange-600 font-semibold text-xl">
                    ₹{item.price}/{item.unit}
                  </p>
                </div>
                <div className="text-sm text-gray-500 mt-4">
                  Stock Available: <span className="font-semibold">{item.stock}</span> {item.unit}
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