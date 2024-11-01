// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContextt';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga o un spinner mientras carga
  }

  if (!user) {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default ProtectedRoute;
