import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import OrderHistory from '../components/OrderHistory';
import { mockOrders } from '../data/mockData';

function OrderHistoryPage() {
  const [timeFilter, setTimeFilter] = useState('lastDay');
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  const supplierName = 'Supplier Name';
  const currentOrders = mockOrders[timeFilter];
  const totalRevenue = currentOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="supplier-homepage-container">
      <Sidebar 
        products={[]}
        currentOrders={currentOrders}
      />

      <div className="main-content">
        <Topbar supplierName={supplierName} />

        <div className="content-area">
          <OrderHistory
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            currentOrders={currentOrders}
            totalRevenue={totalRevenue}
            expandedOrder={expandedOrder}
            setExpandedOrder={setExpandedOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryPage; 