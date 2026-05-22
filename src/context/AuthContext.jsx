import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

const ADMIN_EMAIL = "admin@solarbiz.ng";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          ...session.user,
          name: session.user.user_metadata?.name || '',
          role: session.user.email === ADMIN_EMAIL ? 'admin' : 'user'
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          ...session.user,
          name: session.user.user_metadata?.name || '',
          role: session.user.email === ADMIN_EMAIL ? 'admin' : 'user'
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    if (email === ADMIN_EMAIL) {
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

    const isAdmin = data.user.email === ADMIN_EMAIL;
    return { success: true, isAdmin };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const isAdmin = user?.email === ADMIN_EMAIL;

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin,
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
