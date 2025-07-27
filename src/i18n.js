import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      language: 'English',
      supplierName: 'Supplier Name',
      welcome: 'Welcome to VendorHub Dashboard',
      manage: 'Manage your orders, track prices, and connect with suppliers. Use the sidebar to navigate to different features.',
      quickActions: 'Quick Actions',
      searchItems: 'Search for suppliers and items',
      trackPrices: 'Track price trends',
      reorder: 'Reorder saved sets',
      leaveReviews: 'Leave reviews',
      recentActivity: 'Recent Activity',
      orders: 'orders this week',
      priceAlerts: 'price alerts',
      reviewSubmitted: 'review submitted',
      tips: 'Tips',
      useFilters: 'Use filters to find best suppliers',
      saveItems: 'Save frequently ordered items',
      checkTrends: 'Check price trends regularly',
    },
  },
  hi: {
    translation: {
      language: 'हिंदी',
      supplierName: 'आपूर्तिकर्ता नाम',
      welcome: 'VendorHub डैशबोर्ड में आपका स्वागत है',
      manage: 'अपने ऑर्डर प्रबंधित करें, कीमतें ट्रैक करें, और आपूर्तिकर्ताओं से जुड़ें। विभिन्न फीचर्स के लिए साइडबार का उपयोग करें।',
      quickActions: 'त्वरित क्रियाएँ',
      searchItems: 'आपूर्तिकर्ताओं और वस्तुओं के लिए खोजें',
      trackPrices: 'कीमत के रुझान ट्रैक करें',
      reorder: 'सहेजे गए सेट्स को फिर से ऑर्डर करें',
      leaveReviews: 'समीक्षाएँ दें',
      recentActivity: 'हाल की गतिविधि',
      orders: 'आर्डर इस सप्ताह',
      priceAlerts: 'मूल्य अलर्ट',
      reviewSubmitted: 'समीक्षा सबमिट की गई',
      tips: 'टिप्स',
      useFilters: 'सर्वश्रेष्ठ आपूर्तिकर्ता खोजने के लिए फ़िल्टर का उपयोग करें',
      saveItems: 'अक्सर ऑर्डर की गई वस्तुएं सहेजें',
      checkTrends: 'कीमत के रुझान नियमित रूप से जांचें',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 