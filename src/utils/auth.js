// Authentication utility functions
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('authToken');
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  const userType = localStorage.getItem('userType');
  const userDetails = localStorage.getItem('userDetails');
  
  console.log('🔐 Auth Check - Token:', token);
  console.log('🔐 Auth Check - Token Expiry:', tokenExpiry);
  console.log('🔐 Auth Check - User Type:', userType);
  
  if (!token || !tokenExpiry || !userType || !userDetails) {
    console.log('❌ Auth Check Failed - Missing required authentication data');
    return false;
  }
  
  // Check if token has expired
  const currentTime = new Date().getTime();
  const expiryTime = parseInt(tokenExpiry);
  
  if (currentTime > expiryTime) {
    console.log('❌ Auth Check Failed - Token expired');
    clearAuthData();
    return false;
  }
  
  // Primary authentication: Use localStorage data (fast and reliable)
  try {
    const parsedUserDetails = JSON.parse(userDetails);
    console.log('✅ Auth Check Success - Using localStorage data:', parsedUserDetails);
    return true;
  } catch (error) {
    console.error('❌ Auth Check Error - Invalid localStorage data:', error);
    clearAuthData();
    return false;
  }
};

export const getUserDetails = () => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? JSON.parse(userDetails) : null;
};

export const getUserType = () => {
  return localStorage.getItem('userType');
};

export const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('🔐 Getting Auth Token:', token);
  return token;
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('userDetails');
  localStorage.removeItem('userType');
  localStorage.removeItem('supplierName');
};

export const generateToken = () => {
  const chars = '0123456789abcdef';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
};

export const setAuthData = (userDetails, userType, token) => {
  const tokenExpiry = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours
  
  console.log('🔐 Setting Auth Data - Token:', token);
  console.log('🔐 Setting Auth Data - User Type:', userType);
  console.log('🔐 Setting Auth Data - User Details:', userDetails);
  console.log('🔐 Setting Auth Data - Token Expiry:', new Date(tokenExpiry).toISOString());
  
  localStorage.setItem('authToken', token);
  localStorage.setItem('tokenExpiry', tokenExpiry.toString());
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
  localStorage.setItem('userType', userType);
  
  if (userType === 'supplier') {
    localStorage.setItem('supplierName', userDetails.supplierName);
  }
  
  // Verify storage immediately
  const storedToken = localStorage.getItem('authToken');
  const storedUserDetails = localStorage.getItem('userDetails');
  const storedUserType = localStorage.getItem('userType');
  
  console.log('🔐 Verification - Stored Token:', storedToken);
  console.log('🔐 Verification - Stored User Details:', storedUserDetails);
  console.log('🔐 Verification - Stored User Type:', storedUserType);
};

// Function to fetch user details from Firebase based on token and user type
const fetchUserDetailsFromFirebase = async (token, userType) => {
  console.log('🔥 Fetching user details from Firebase...');
  console.log('🔥 User Type:', userType);
  console.log('🔥 Token:', token);
  
  try {
    if (userType === 'supplier') {
      // Search in User_suppliers collection
      const supplierQuery = query(
        collection(db, 'User_suppliers'),
        where('supplierPassword', '==', token) // Using token as password for demo
      );
      const supplierSnapshot = await getDocs(supplierQuery);
      
      console.log('🔥 Supplier query result - Empty:', supplierSnapshot.empty);
      console.log('🔥 Supplier query result - Size:', supplierSnapshot.size);
      
      if (!supplierSnapshot.empty) {
        const docSnap = supplierSnapshot.docs[0];
        const docRef = doc(db, 'User_suppliers', docSnap.id);
        const latestDoc = await getDoc(docRef);
        const userDetails = { id: docSnap.id, ...latestDoc.data() };
        console.log('🔥 Supplier details fetched from Firebase:', userDetails);
        return userDetails;
      } else {
        // Let's try to get all suppliers to see what's in the database
        const allSuppliersQuery = query(collection(db, 'User_suppliers'));
        const allSuppliersSnapshot = await getDocs(allSuppliersQuery);
        console.log('🔥 All suppliers in database:', allSuppliersSnapshot.docs.map(doc => ({
          id: doc.id,
          password: doc.data().supplierPassword
        })));
      }
    } else if (userType === 'vendor') {
      // Search in User_vendors collection
      const vendorQuery = query(
        collection(db, 'User_vendors'),
        where('vendorPassword', '==', token) // Using token as password for demo
      );
      const vendorSnapshot = await getDocs(vendorQuery);
      
      console.log('🔥 Vendor query result - Empty:', vendorSnapshot.empty);
      console.log('🔥 Vendor query result - Size:', vendorSnapshot.size);
      
      if (!vendorSnapshot.empty) {
        const docSnap = vendorSnapshot.docs[0];
        const docRef = doc(db, 'User_vendors', docSnap.id);
        const latestDoc = await getDoc(docRef);
        const userDetails = { id: docSnap.id, ...latestDoc.data() };
        console.log('🔥 Vendor details fetched from Firebase:', userDetails);
        return userDetails;
      }
    }
    
    console.log('🔥 No user found in Firebase for token:', token);
    return null;
  } catch (error) {
    console.error('🔥 Error fetching user details from Firebase:', error);
    throw error;
  }
}; 