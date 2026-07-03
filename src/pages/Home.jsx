import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

import brand1 from '../assets/brands/brand-1.png';
import brand2 from '../assets/brands/brand-2.png';
import brand3 from '../assets/brands/brand-3.png';
import brand4 from '../assets/brands/brand-4.png';
import brand5 from '../assets/brands/brand-5.png';

const Home = () => {
  const { openQuote } = useQuote();
  const { addToCart } = useCart();
  const { productData } = useProducts();
  const navigate = useNavigate();

  const featuredProducts = [
    productData.panels?.[0],
    productData.inverters?.[1] ?? productData.inverters?.[0],
    productData.stabilizers?.[0],
    productData.batteries?.[1] ?? productData.batteries?.[0]
  ].filter(Boolean);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative -mt-20 h-screen flex overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=85')" }}
      >
        {/* Very subtle left-edge fade only — keeps the image vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-[1]"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-start px-6 sm:px-12 md:px-20 lg:px-28 xl:px-32">
          {/* Content block — left-aligned, vertically centred, padded for navbar */}
          <div className="max-w-3xl w-full pt-20 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow label */}
            <p className="text-xs sm:text-sm font-label font-bold uppercase tracking-[0.3em] text-primary">
              Nigeria's Leading Solar Distributor
            </p>

            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-extrabold leading-[1.0] tracking-tighter text-white">
              Power Your World<br/>
              <span className="text-amber-400 italic">With Clean Energy</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-lg">
              Precision-engineered solar solutions designed for the Nigerian climate. Transition to reliable, independent power with our radiant monolith technology.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 pt-2">
              <NavLink
                to="/products"
                className="bg-primary text-white px-7 py-4 sm:px-9 sm:py-4 rounded-md font-label font-bold text-sm sm:text-base uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,145,0,0.25)] w-full xs:w-auto"
              >
                Shop Products
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
              </NavLink>
              <button
                onClick={() => openQuote('Book Installation')}
                className="bg-white/10 border border-white/30 backdrop-blur-sm text-white px-7 py-4 sm:px-9 sm:py-4 rounded-md font-label font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-white/20 hover:border-white/50 transition-all w-full xs:w-auto"
              >
                Book Installation
              </button>
            </div>

            {/* Stat strip */}
            <div className="flex flex-wrap gap-6 sm:gap-10 pt-4 border-t border-white/20">
              <div>
                <p className="text-xl sm:text-2xl font-headline font-black text-amber-400">500+</p>
                <p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-widest font-label">Installations</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-headline font-black text-amber-400">10yr</p>
                <p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-widest font-label">Warranty</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-headline font-black text-amber-400">24/7</p>
                <p className="text-[11px] sm:text-xs text-white/60 uppercase tracking-widest font-label">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section
        className="bg-slate-100 border-y border-slate-200/80"
        style={{
          overflow: 'hidden',
          padding: '24px 0',
        }}
      >
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
          .marquee-wrapper:hover .marquee-track {
            animation-play-state: paused;
          }
        `}</style>

        {/* Label */}
        <div style={{ paddingLeft: '1rem', smPaddingLeft: '2rem', marginBottom: '16px' }} className="px-4 sm:px-8">
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#FF9100',
            fontWeight: 700,
          }}>
            Trusted Brands
          </span>
        </div>

        {/* Scrolling track */}
        <div className="marquee-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
          <div className="marquee-track">
            {[0, 1, 2, 3].map((setIndex) => (
              <div key={setIndex} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {[brand1, brand2, brand3, brand4, brand5].map((brand, i) => (
                  <div key={`${setIndex}-${i}`} style={{ display: 'flex', alignItems: 'center', padding: '0 12px sm:0 18px' }}>
                    {/* Glassmorphic Brand Card */}
                    <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200/60 hover:bg-slate-50 transition-all flex items-center justify-center h-16 sm:h-20 w-36 sm:w-44 shadow-sm shadow-slate-100/50">
                      <img 
                        src={brand} 
                        alt={`Brand Logo ${i + 1}`} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 px-4 sm:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16">
            <div>
              <h3 className="font-headline text-3xl sm:text-4xl font-bold uppercase tracking-tighter">Featured Products</h3>
              <p className="text-primary font-label mt-1 sm:mt-2 text-sm sm:text-base">Precision instruments for energy independence</p>
            </div>
            <NavLink to="/products" className="text-primary font-label uppercase tracking-widest text-xs sm:text-sm underline underline-offset-8 decoration-2 hover:text-primary-fixed transition-colors">
              View All Inventory
            </NavLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex flex-col bg-surface-container-high/60 backdrop-blur-md rounded-lg p-5 sm:p-6 border border-outline-variant/10 hover:border-primary/30 transition-all group">
                <div className="aspect-square bg-surface-container-lowest rounded-md mb-6 overflow-hidden p-4">
                  <img className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={product.name} src={product.image} />
                </div>
                <h4 className="font-headline font-bold text-lg sm:text-xl mb-2 uppercase">{product.name}</h4>
                <p className="text-on-surface-variant text-xs sm:text-sm mb-6 font-body flex-1 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className="font-label text-lg sm:text-xl font-bold text-primary">₦{new Intl.NumberFormat().format(product.price)}</span>
                  <button 
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="bg-surface-container-highest p-2 rounded-full hover:bg-primary hover:text-on-primary transition-colors shrink-0 ml-4"
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Solar Section */}
      <section className="bg-surface-container-low py-16 sm:py-32 px-4 sm:px-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 blur-[80px] sm:blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto">
          <div className="text-center mb-16 sm:mb-24 max-w-2xl mx-auto">
            <h3 className="font-headline text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter mb-4 italic">Unrivaled Power</h3>
            <p className="text-on-surface-variant text-sm sm:text-base">The future isn't just bright—it's independent. We build systems that liberate your lifestyle from the grid.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-16">
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20 shadow-xl group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>payments</span>
              </div>
              <h5 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight">Save Money</h5>
              <p className="text-on-surface-variant font-body text-sm sm:text-base">Slash your monthly utility bills by up to 90% and eliminate diesel costs completely.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20 shadow-xl group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-tertiary" style={{ fontVariationSettings: "'FILL' 0" }}>eco</span>
              </div>
              <h5 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight">Go Green</h5>
              <p className="text-on-surface-variant font-body text-sm sm:text-base">Zero carbon emissions. Join the movement toward a sustainable, clean Nigeria.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20 shadow-xl group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>bolt</span>
              </div>
              <h5 className="font-headline text-xl sm:text-2xl font-bold uppercase tracking-tight">Never Blackout</h5>
              <p className="text-on-surface-variant font-body text-sm sm:text-base">Seamless 24/7 power supply regardless of grid instability or maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="p-4 sm:p-8">
        <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-lg py-12 px-6 sm:py-20 sm:px-12 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] bg-[length:24px_24px]"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-white relative z-10 mb-6 sm:mb-8">
            Ready to Go Solar?
          </h2>
          <p className="text-white/90 text-base sm:text-xl font-label max-w-xl mb-8 sm:mb-10 relative z-10 font-medium">
            Our engineering team is standing by to design your custom energy roadmap.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10 justify-center">
            <button 
              onClick={() => navigate("/products")}
              className="bg-white text-orange-600 px-8 py-4 sm:px-10 sm:py-5 rounded-md font-label font-bold text-base sm:text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
              Start Your Journey
            </button>
            <button 
              onClick={() => navigate("/products")}
              className="bg-transparent border-2 border-white/40 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-md font-label font-bold text-base sm:text-xl uppercase tracking-widest hover:bg-white/10 transition-colors">
              View Price List
            </button>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
