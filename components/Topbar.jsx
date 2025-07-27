import { FaUserCircle, FaBell, FaStore, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { clearAuthData } from '../src/utils/auth';

function Topbar({ supplierName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all authentication data
    clearAuthData();
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="brand-logo-placeholder">
          <FaStore className="brand-icon" />
        </div>
        <div className="greeting-section">
          <span className="greeting">Welcome back, <strong>{supplierName}</strong></span>
          <span className="greeting-subtitle">Manage your products and track orders</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="notification-bell">
          <FaBell className="bell-icon" />
          <span className="notification-badge">3</span>
        </div>
        <div className="profile-section">
          <FaUserCircle className="profile-icon" />
          <div className="profile-info">
            <span className="profile-name">{supplierName}</span>
            <span className="profile-role">Supplier</span>
          </div>
        </div>
        <button 
          className="logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <FaSignOutAlt className="logout-icon" />
        </button>
      </div>
    </div>
  );
}

export default Topbar; 