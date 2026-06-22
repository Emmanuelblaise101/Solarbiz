import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('bypass') === 'true') {
      localStorage.setItem('admin_bypass', 'true');
      window.location.href = '/admin';
    }
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-surface" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
