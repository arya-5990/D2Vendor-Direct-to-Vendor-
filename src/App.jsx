import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import pages
import OrderHistoryPage from './pages/OrderHistoryPage';
import MyProductsPage from './pages/MyProductsPage';
import AddProductPage from './pages/AddProductPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to order history */}
          <Route path="/" element={<Navigate to="/order-history" replace />} />
          
          {/* Main application routes */}
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          
          {/* Catch all route - redirect to order history */}
          <Route path="*" element={<Navigate to="/order-history" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
