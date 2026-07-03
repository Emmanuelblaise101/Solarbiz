import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openQuote } = useQuote();
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState('login');

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-center px-8 h-20 max-w-full mx-auto relative z-20">
      <NavLink to="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-amber-600 text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>solar_power</span>
        <h1 className="text-2xl font-black text-amber-600 italic font-headline tracking-tighter uppercase">SOLARBIZ</h1>
      </NavLink>
      <nav className="hidden xl:flex gap-6 items-center">
        <NavLink to="/" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Products</NavLink>
        <NavLink to="/panels" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Panels</NavLink>
        <NavLink to="/inverters" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Inverters</NavLink>
        <NavLink to="/batteries" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Batteries</NavLink>
        <NavLink to="/solar-lights" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Lights</NavLink>
        <NavLink to="/stabilizers" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold transition-colors ${isActive ? 'text-amber-600 border-b-2 border-amber-600 pb-1' : 'text-slate-600 hover:text-slate-900'}`}>Stabilizers</NavLink>
      </nav>
      
      <div className="flex items-center gap-4">
        {/* Cart Icon & Badge */}
        <NavLink to="/cart" className="relative p-2 text-on-surface hover:text-primary transition-colors flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart_checkout</span>
          {cartCount > 0 && (
            <span className="absolute 0 right-0 w-5 h-5 bg-primary text-on-primary rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md animate-pulse">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </NavLink>

        {!isAuthenticated ? (
          <button 
            onClick={() => {
              setAuthDefaultTab('login');
              setIsAuthModalOpen(true);
            }}
            className="hidden sm:block text-slate-600 hover:text-slate-900 font-headline font-bold uppercase tracking-widest text-sm transition-colors mx-2"
          >
            Log In / Sign Up
          </button>
        ) : (
          <div className="relative group hidden sm:block mx-2">
            <button className="flex items-center gap-2 bg-surface-container border border-slate-200/50 rounded-full pl-1 pr-3 py-1 hover:bg-surface-container-high transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-headline font-bold text-sm text-slate-800">{user?.name.split(' ')[0]}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
              {isAdmin && (
                <NavLink 
                  to="/admin" 
                  className="block w-full text-left px-4 py-2 text-sm font-body text-amber-600 hover:bg-slate-50 transition-colors font-bold"
                >
                  Admin Console
                </NavLink>
              )}
              <button className="w-full text-left px-4 py-2 text-sm font-body text-slate-600 hover:text-slate-900 hover:bg-slate-50">My Account</button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm font-body text-red-600 hover:bg-red-50 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => openQuote('General Consultation')}
          className="hidden sm:block bg-primary text-white px-6 py-2.5 rounded-md font-label font-bold uppercase tracking-wider hover:scale-95 transition-transform active:scale-90 shadow-md">
          Get a Quote
        </button>
        <button 
          className="xl:hidden bg-transparent border border-outline p-2 rounded-md hover:bg-slate-50 transition-colors text-on-surface"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`xl:hidden absolute top-20 left-0 w-full bg-white/95 border-t border-slate-200/60 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="flex flex-col p-8 space-y-6 overflow-y-auto max-h-[80vh]">
          <NavLink to="/" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Products</NavLink>
          <NavLink to="/panels" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Solar Panels</NavLink>
          <NavLink to="/inverters" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Inverters</NavLink>
          <NavLink to="/batteries" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Batteries</NavLink>
          <NavLink to="/solar-lights" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Solar Lights</NavLink>
          <NavLink to="/stabilizers" className={({ isActive }) => `font-headline tracking-tighter uppercase font-bold text-2xl transition-colors ${isActive ? 'text-amber-600' : 'text-slate-800 hover:text-amber-600'}`}>Stabilizers</NavLink>
          
          {/* Mobile Auth / Logout actions */}
          <div className="pt-6 border-t border-slate-200/60 flex flex-col gap-4">
            {!isAuthenticated ? (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setAuthDefaultTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="w-full bg-slate-100 border border-slate-200 text-slate-800 py-3.5 rounded-md font-headline font-bold uppercase tracking-widest text-sm hover:bg-slate-200 active:scale-95 transition-all text-center"
              >
                Log In / Sign Up
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-xl p-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-base">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-headline font-bold text-slate-800 text-sm truncate">{user?.name}</p>
                    <p className="font-body text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <NavLink 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-amber-50 border border-amber-200 text-amber-700 py-3.5 rounded-md font-headline font-bold uppercase tracking-widest text-sm hover:bg-amber-100 active:scale-95 transition-all text-center"
                  >
                    Admin Console
                  </NavLink>
                )}
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-50 border border-red-200 text-red-600 py-3.5 rounded-md font-headline font-bold uppercase tracking-widest text-sm hover:bg-red-100 active:scale-95 transition-all text-center"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-200/60">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                openQuote('General Consultation');
              }}
              className="w-full bg-primary text-white px-6 py-4 rounded-md font-label font-bold uppercase tracking-wider active:scale-95 transition-transform shadow-md">
              Get a Quote Now
            </button>
          </div>
        </nav>
      </div>
    </header>

    <AuthModal 
      open={isAuthModalOpen} 
      onClose={() => setIsAuthModalOpen(false)} 
      defaultTab={authDefaultTab} 
    />
    </>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-start bg-slate-900 border-t border-slate-800 gap-12 relative z-40">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500 text-3xl">solar_power</span>
          <span className="text-white font-bold text-2xl font-headline italic tracking-tighter">SOLARBIZ</span>
        </div>
        <p className="text-slate-400 max-w-xs font-body text-sm leading-relaxed">
          Empowering Nigerians with premium solar hardware and expert engineering since 2014.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-white font-headline font-bold text-xs uppercase tracking-widest">Resources</span>
          <a className="text-slate-400 hover:text-amber-500 transition-colors font-headline text-sm uppercase tracking-widest" href="#">Installation Guide</a>
          <a className="text-slate-400 hover:text-amber-500 transition-colors font-headline text-sm uppercase tracking-widest" href="#">Maintenance</a>
          <a className="text-slate-400 hover:text-amber-500 transition-colors font-headline text-sm uppercase tracking-widest" href="#">Solar Calculator</a>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <span className="text-white font-headline font-bold text-xs uppercase tracking-widest">Legal</span>
            <a className="text-slate-400 hover:text-amber-500 transition-colors font-headline text-sm uppercase tracking-widest" href="#">Privacy Policy</a>
            <a className="text-slate-400 hover:text-amber-500 transition-colors font-headline text-sm uppercase tracking-widest" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-6 border-t md:border-t-0 border-slate-800 pt-8 md:pt-0">
        <p className="font-headline text-sm uppercase tracking-widest text-slate-400">© 2026 SolarBiz Solutions Nigeria. All Rights Reserved.</p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer text-white">
            <span className="material-symbols-outlined text-sm">public</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer text-white">
            <span className="material-symbols-outlined text-sm">share</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const WhatsAppCTA = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <a 
        href="https://wa.me/2348137077713?text=Hello%20SolarBiz!%20I%20am%20interested%20in%20getting%20a%20solar%20quote." 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
        </svg>
        <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>
      </a>
    </div>
  );
};

export const SharedLayout = () => {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container flex flex-col min-h-screen">
      <div className="fixed inset-0 grain-overlay z-[100]"></div>
      <Navbar />
      <main className="pt-20 flex-1 relative z-10 w-full overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppCTA />
    </div>
  );
};
