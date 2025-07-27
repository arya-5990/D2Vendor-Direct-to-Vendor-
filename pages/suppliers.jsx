import React from 'react';

const suppliers = [
  {
    name: 'Shree Vegetables Co.',
    verified: true,
    location: 'Indore',
    rating: 4.2,
    reviews: 156,
    topItems: [
      { name: 'Potatoes', price: 12 },
      { name: 'Onion', price: 20 },
    ],
    deliveryTime: '4 hrs',
  },
  {
    name: 'FreshMart Suppliers',
    verified: true,
    location: 'Bhopal',
    rating: 4.5,
    reviews: 89,
    topItems: [
      { name: 'Tomatoes', price: 25 },
      { name: 'Carrots', price: 15 },
    ],
    deliveryTime: '6 hrs',
  },
  {
    name: 'A-Grade Suppliers',
    verified: false,
    location: 'Indore',
    rating: 3.8,
    reviews: 67,
    topItems: [
      { name: 'Salt', price: 8 },
      { name: 'Sugar', price: 35 },
    ],
    deliveryTime: '8 hrs',
  },
];

const Suppliers = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold mb-6">🏪 Suppliers</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map((supplier, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{supplier.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {supplier.verified && (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    ✅ Verified
                  </span>
                )}
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  📍 {supplier.location}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-500">
                ⭐
                <span className="font-semibold">{supplier.rating}</span>
              </div>
              <div className="text-xs text-gray-500">({supplier.reviews}+ reviews)</div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
              📦 Top Items
            </h4>
            <div className="space-y-1">
              {supplier.topItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-semibold text-orange-600">₹{item.price}/kg</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ⏰
              <span>Delivers within {supplier.deliveryTime}</span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
              👁️ View Items
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Suppliers; 