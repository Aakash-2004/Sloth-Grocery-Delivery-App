import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('userToken');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isAdmin = userData?.role === 'admin';
  
  // If not authenticated or not an admin, redirect to login
  if (!token || !isAdmin) {
    return <Navigate to="/login" />;
  }
  
  // Otherwise, render the protected admin component
  return <Outlet />;
};

export default AdminRoute; 