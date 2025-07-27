import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, getUserType } from '../utils/auth';

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authResult = await isAuthenticated();
        const currentUserType = getUserType();
        
        console.log('🛡️ Protected Route - Auth Result:', authResult);
        console.log('🛡️ Protected Route - User Type:', currentUserType);
        
        setAuthenticated(authResult);
        setUserType(currentUserType);
      } catch (error) {
        console.error('🛡️ Protected Route - Auth Error:', error);
        setAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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
        Verifying authentication...
      </div>
    );
  }

  if (!authenticated) {
    console.log('🛡️ Protected Route - Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
    console.log('🛡️ Protected Route - User type not allowed, redirecting');
    // User type not allowed, redirect to appropriate dashboard
    if (userType === 'supplier') {
      return <Navigate to="/order-history" replace />;
    } else if (userType === 'vendor') {
      return <Navigate to="/vendor-dashboard" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  console.log('🛡️ Protected Route - Access granted');
  return children;
};

export default ProtectedRoute; 