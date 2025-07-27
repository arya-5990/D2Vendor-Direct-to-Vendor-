import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from '../pages/hero';
import Login from '../pages/login';
import Registration from '../pages/registration';
import ForgotPass from '../pages/forgotPass';
import VendorDashboard from '../pages/vendorDashboard';
import SearchFilter from '../pages/searchFilter';
import Suppliers from '../pages/suppliers';
import SupplierProductsPage from '../pages/SupplierProductsPage';
import PriceTracker from '../pages/priceTracker';
import QuickReorder from '../pages/quickReorder';
import Reviews from '../pages/reviews';
import GiveLeftovers from '../pages/giveLeftovers';
import KitchenWasteDonation from '../pages/kitchenWasteDonation';
import AddProductPage from '../pages/AddProductPage';
import MyProductsPage from '../pages/MyProductsPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-Pass" element={<ForgotPass />} />
        <Route path="/vendor-dashboard" element={
          <ProtectedRoute allowedUserTypes={['vendor']}>
            <VendorDashboard />
          </ProtectedRoute>
        }>
          <Route path="search" element={<SearchFilter />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="supplier/:supplierId/products" element={<SupplierProductsPage />} />
          <Route path="price-tracker" element={<PriceTracker />} />
          <Route path="quick-reorder" element={<QuickReorder />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="give-leftovers" element={<GiveLeftovers />} />
          <Route path="kitchen-waste" element={<KitchenWasteDonation />} />
        </Route>
        <Route path="/order-history" element={
          <ProtectedRoute allowedUserTypes={['supplier']}>
            <OrderHistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/my-products" element={
          <ProtectedRoute allowedUserTypes={['supplier']}>
            <MyProductsPage />
          </ProtectedRoute>
        } />
        <Route path="/add-product" element={
          <ProtectedRoute allowedUserTypes={['supplier']}>
            <AddProductPage />
          </ProtectedRoute>
        } />
        <Route path="/supplier/:supplierId/products" element={
          <ProtectedRoute allowedUserTypes={['supplier']}>
            <SupplierProductsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;


