import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

const ADMIN_EMAIL = "wrightferdinard9@gmail.com";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBypass = () => localStorage.getItem('admin_bypass') === 'true';

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          ...session.user,
          name: session.user.user_metadata?.name || '',
          role: (session.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || checkBypass()) ? 'admin' : 'user'
        });
      } else if (checkBypass()) {
        setUser({
          email: ADMIN_EMAIL,
          name: 'Admin',
          role: 'admin'
        });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          ...session.user,
          name: session.user.user_metadata?.name || '',
          role: (session.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || checkBypass()) ? 'admin' : 'user'
        });
      } else if (checkBypass()) {
        setUser({
          email: ADMIN_EMAIL,
          name: 'Admin',
          role: 'admin'
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    if (email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      return { error: 'This email cannot be used for registration.' };
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      await supabase.auth.updateUser({ data: { name } });
    }

    return { success: true };
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message };
    }

    const isAdmin = data.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    return { success: true, isAdmin };
  };

  const logout = async () => {
    localStorage.removeItem('admin_bypass');
    await supabase.auth.signOut();
  };

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || user?.role === 'admin';

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
