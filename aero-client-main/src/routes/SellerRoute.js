import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useRole from '../hooks/useRole';

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, isRoleLoading] = useRole(user?.email);
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <Spinner />
  }

  if (user && role === 'Seller') {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />

};

export default SellerRoute;