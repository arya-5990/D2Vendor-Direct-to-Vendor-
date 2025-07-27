import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from '../pages/hero';
import Login from '../pages/login';
import Registration from '../pages/registration';
import VendorDashboard from '../pages/vendorDashboard';
import SearchFilter from '../pages/searchFilter';
import Suppliers from '../pages/suppliers';
import PriceTracker from '../pages/priceTracker';
import QuickReorder from '../pages/quickReorder';
import Reviews from '../pages/reviews';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />}>
          <Route path="search" element={<SearchFilter />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="price-tracker" element={<PriceTracker />} />
          <Route path="quick-reorder" element={<QuickReorder />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


