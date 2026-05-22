import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const ADMIN_EMAIL = 'admin@solarbiz.ng';

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email === ADMIN_EMAIL) {
        setIsAdminVerified(true);
      } else {
        setIsAdminVerified(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-surface" />;
  }

  if (!isAdminVerified) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
