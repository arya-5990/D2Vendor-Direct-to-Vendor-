import React from 'react';
import { useTranslation } from 'react-i18next';

const savedSets = [
  {
    name: 'Monday Stock',
    supplier: 'FreshMart Suppliers',
    items: [
      { name: 'Tomatoes', quantity: '5kg', price: 25 },
      { name: 'Onions', quantity: '10kg', price: 20 },
      { name: 'Potatoes', quantity: '8kg', price: 12 },
    ],
    totalCost: 580,
    eta: '4 hrs',
    lastOrdered: '2 days ago',
  },
  {
    name: 'Weekend Items',
    supplier: 'A-Grade Suppliers',
    items: [
      { name: 'Paneer', quantity: '3kg', price: 180 },
      { name: 'Chillies', quantity: '2kg', price: 40 },
    ],
    totalCost: 620,
    eta: '6 hrs',
    lastOrdered: '1 week ago',
  },
  {
    name: 'Daily Essentials',
    supplier: 'Shree Vegetables Co.',
    items: [
      { name: 'Oil', quantity: '2L', price: 120 },
      { name: 'Salt', quantity: '1kg', price: 8 },
      { name: 'Sugar', quantity: '2kg', price: 35 },
    ],
    totalCost: 318,
    eta: '3 hrs',
    lastOrdered: 'Yesterday',
  },
];

const QuickReorder = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">🔄 {t('quickReorder')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {savedSets.map((set, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  📦 {t(set.name)}
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  {t('supplier')}: <span className="font-medium text-orange-600">{set.supplier}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">₹{set.totalCost}</div>
                <div className="text-sm text-gray-500">{t('totalCost')}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">{t('items')}:</h4>
              <div className="space-y-2">
                {set.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({item.quantity})</span>
                    </div>
                    <span className="font-semibold text-orange-600">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  ⏰
                  <span>{t('eta')}: {set.eta}</span>
                </div>
                <div className="flex items-center gap-1">
                  🚚
                  <span>{t('lastOrdered')}: {set.lastOrdered}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
              ✅ {t('oneClickReorder')}
            </button>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">{t('reorderSummary')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold">{savedSets.length}</div>
            <div className="text-sm opacity-90">{t('savedSets')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">₹{savedSets.reduce((sum, set) => sum + set.totalCost, 0)}</div>
            <div className="text-sm opacity-90">{t('totalValue')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">3-6 hrs</div>
            <div className="text-sm opacity-90">{t('averageDelivery')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickReorder; 