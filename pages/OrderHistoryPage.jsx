import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import OrderHistory from '../components/OrderHistory';
import { mockOrders } from '../src/data/mockData';
import { getUserDetails, getAuthToken } from '../src/utils/auth';

function OrderHistoryPage() {
  const [timeFilter, setTimeFilter] = useState('lastDay');
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supplierName, setSupplierName] = useState('');
  
  useEffect(() => {
    console.log('OrderHistoryPage mounted');
    console.log('mockOrders:', mockOrders);
    
    // Fetch authentication data
    const userDetails = getUserDetails();
    const token = getAuthToken();
    
    console.log('🔐 OrderHistoryPage - User Details:', userDetails);
    console.log('🔐 OrderHistoryPage - Auth Token:', token);
    console.log('🔐 OrderHistoryPage - Supplier ID:', userDetails?.id);
    
    // Fetch supplier name from stored authentication data
    if (userDetails && userDetails.supplierName) {
      setSupplierName(userDetails.supplierName);
    } else {
      // Fallback to localStorage if not in userDetails
      const storedName = localStorage.getItem('supplierName');
      if (storedName) {
        setSupplierName(storedName);
      } else {
        setSupplierName('Supplier'); // Default fallback
      }
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '18px',
        color: '#374151'
      }}>
        Loading Order History Page...
      </div>
    );
  }

  try {
    const currentOrders = mockOrders[timeFilter] || [];
    const totalRevenue = currentOrders.reduce((sum, order) => sum + order.amount, 0);

    console.log('OrderHistoryPage rendering with:', { currentOrders, totalRevenue, timeFilter });

    return (
      <div className="supplier-homepage-container" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
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
  } catch (error) {
    console.error('Error in OrderHistoryPage:', error);
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '18px',
        color: '#ef4444',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div>Error loading Order History Page</div>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>{error.message}</div>
      </div>
    );
  }
}

export default OrderHistoryPage; 