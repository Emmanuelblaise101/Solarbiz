import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthModal = ({ open, onClose, defaultTab = 'login' }) => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (result.isAdmin) {
      onClose();
      navigate('/admin');
      return;
    }

    onClose();
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const res = await signup(name, email, password);
    if (res.error) {
      setError(res.error);
    } else {
      onClose();
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-surface-container-high w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header Tabs */}
        <div className="flex border-b border-white/5 pt-6 px-8">
          <button 
            onClick={() => switchTab('login')}
            className={`flex-1 pb-4 font-headline font-bold text-lg transition-colors ${activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Log In
          </button>
          <button 
            onClick={() => switchTab('signup')}
            className={`flex-1 pb-4 font-headline font-bold text-lg transition-colors ${activeTab === 'signup' ? 'text-primary border-b-2 border-primary' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {error && (
            <div className="mb-4 text-error text-sm font-label bg-error/10 p-3 rounded-lg border border-error/20 text-center">
              {error}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline font-bold text-lg mt-6 hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                Log In
              </button>
              <div className="text-center mt-6">
                <p className="text-neutral-400 text-sm font-body">
                  Don't have an account? <button type="button" onClick={() => switchTab('signup')} className="text-primary hover:underline font-bold">Sign Up</button>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Confirm Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body"
                  placeholder="••••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-headline font-bold text-lg mt-6 hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                Create Account
              </button>
              <div className="text-center mt-6">
                <p className="text-neutral-400 text-sm font-body">
                  Already have an account? <button type="button" onClick={() => switchTab('login')} className="text-primary hover:underline font-bold">Log In</button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
