import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roleRequired, children }) => {
    const user = useSelector((state) => state.user);

  if (user.role !== roleRequired) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
