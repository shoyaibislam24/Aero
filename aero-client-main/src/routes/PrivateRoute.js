import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user && user.email) {
    return children;
  }
  if (loading) {
    return <Spinner />
  }


  return <Navigate to="/login" state={{ from: location }} replace />

};

export default PrivateRoute;