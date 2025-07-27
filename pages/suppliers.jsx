import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Suppliers = () => {
  const { t } = useTranslation();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'User_suppliers'));
        const supplierList = querySnapshot.docs.map(doc => doc.data());
        setSuppliers(supplierList);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{t('suppliers')}</h2>
      {loading ? (
        <div className="text-gray-500">{t('loadingSuppliers')}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.length === 0 ? (
            <div className="text-gray-500">{t('noSuppliersFound')}</div>
          ) : (
            suppliers.map((supplier, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4 items-start">
                    {supplier.shopImageUrl && (
                      <img src={supplier.shopImageUrl} alt={supplier.supplierName} className="w-16 h-16 object-cover rounded-lg border" />
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{supplier.supplierName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {supplier.verified && (
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            {t('verified')}
                          </span>
                        )}
                        {supplier.shopAddress && (
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            📍 {supplier.shopAddress}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {supplier.rating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        ⭐
                        <span className="font-semibold">{supplier.rating}</span>
                      </div>
                    )}
                    {supplier.reviews && (
                      <div className="text-xs text-gray-500">({supplier.reviews}+ {t('reviews')})</div>
                    )}
                  </div>
                </div>
                {supplier.topItems && supplier.topItems.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                      {t('topItems')}
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
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    ⏰
                    <span>{t('deliversWithin')} {supplier.deliveryRange || 'N/A'}</span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
                    {t('viewItems')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Suppliers; 