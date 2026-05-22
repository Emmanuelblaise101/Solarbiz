import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState('login');

  if (isAuthenticated) {
    return <Outlet />;
  }

  const openAuth = (tab) => {
    setDefaultTab(tab);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Blurred background content */}
      <div className="blur-[8px] opacity-40 pointer-events-none select-none h-screen overflow-hidden">
        <Outlet />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md px-4">
        <div className="text-center max-w-md w-full bg-surface-container border border-white/5 p-12 rounded-[2rem] shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-on-surface mb-8">
            <span className="material-symbols-outlined text-primary text-3xl">solar_power</span>
            <span className="font-headline font-black text-2xl tracking-[0.2em]">SOLARBIZ</span>
          </div>
          
          <h2 className="font-headline text-4xl font-bold mb-4">Members Only</h2>
          <p className="font-body text-on-surface-variant mb-10 leading-relaxed">
            Create a free account or log in to browse our full product range and add items to your cart.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openAuth('signup')}
              className="flex-1 bg-primary text-on-primary py-4 rounded-lg font-headline font-bold hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </button>
            <button 
              onClick={() => openAuth('login')}
              className="flex-1 border border-white/20 text-white hover:bg-white/10 py-4 rounded-lg font-headline font-bold transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      <AuthModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        defaultTab={defaultTab} 
      />
    </div>
  );
};
