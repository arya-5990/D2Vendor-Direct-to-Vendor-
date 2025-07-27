import { useNavigate, useLocation } from 'react-router-dom';
import { FaHistory, FaBoxOpen, FaPlusSquare, FaStore, FaChartLine, FaUsers } from 'react-icons/fa';

const sidebarButtons = [
  { key: 'orderHistory', label: 'Order History', icon: <FaHistory size={24} />, path: '/order-history' },
  { key: 'myProducts', label: 'My Products', icon: <FaBoxOpen size={24} />, path: '/my-products' },
  { key: 'addProduct', label: 'Add Product', icon: <FaPlusSquare size={24} />, path: '/add-product' },
];

function Sidebar({ products = [], currentOrders = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    const path = location.pathname;
    const button = sidebarButtons.find(btn => btn.path === path);
    return button ? button.key : 'orderHistory';
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <FaStore className="logo-icon" />
          <span className="logo-text">SupplierHub</span>
        </div>
      </div>
      
      <div className="sidebar-nav">
        {sidebarButtons.map(btn => (
          <button
            key={btn.key}
            className={`sidebar-btn${getSelectedKey() === btn.key ? ' active' : ''}`}
            onClick={() => handleNavigation(btn.path)}
            aria-label={btn.label}
          >
            {btn.icon}
            <span className="btn-label">{btn.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="quick-stats">
          <div className="stat-card">
            <FaChartLine className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{products.length}</span>
              <span className="stat-label">Products</span>
            </div>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{currentOrders.length}</span>
              <span className="stat-label">Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 