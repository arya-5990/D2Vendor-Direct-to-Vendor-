import React from 'react';
import { useTranslation } from 'react-i18next';

const mostOrderedItems = [
  {
    name: 'Onions',
    currentPrice: 20,
    previousPrice: 18,
    trend: 'up',
    chartData: [18, 19, 20, 19, 20, 21, 20],
  },
  {
    name: 'Oil',
    currentPrice: 120,
    previousPrice: 125,
    trend: 'down',
    chartData: [125, 124, 123, 122, 121, 120, 120],
  },
  {
    name: 'Paneer',
    currentPrice: 180,
    previousPrice: 175,
    trend: 'up',
    chartData: [175, 176, 177, 178, 179, 180, 180],
  },
];

const PriceTracker = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">📊 {t('priceTracker')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mostOrderedItems.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{t(item.name)}</h3>
              <div className="flex items-center gap-2">
                {item.trend === 'up' ? (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ⬆️ {t('priceRising')}
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    ⬇️ {t('cheaperThanAverage')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-3xl font-bold text-orange-600 mb-1">₹{item.currentPrice}/kg</div>
              <div className="text-sm text-gray-500">
                {t('previous')}: ₹{item.previousPrice}/kg
              </div>
            </div>
            
            {/* Price Chart Placeholder */}
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">{t('priceTrendsPast30')}</div>
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="text-orange-500 text-2xl mx-auto mb-2 block">📈</span>
                  <div className="text-sm text-gray-500">{t('chartVisualization')}</div>
                  <div className="text-xs text-gray-400">{t('lineChartShowingTrends')}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{t('thirtyDayAverage')}: ₹{Math.round((item.currentPrice + item.previousPrice) / 2)}/kg</span>
              <span className="text-gray-500">{t('updatedToday')}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary Widget */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{t('priceSummary')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm opacity-90">{t('itemsWithRisingPrices')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm opacity-90">{t('itemsCheaperThanAverage')}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">₹320</div>
            <div className="text-sm opacity-90">{t('totalSavingsThisMonth')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTracker; 