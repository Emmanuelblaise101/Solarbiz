import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

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
        className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center px-4 sm:px-8 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.4)] z-0"></div>
        <div className="container mx-auto relative z-10 w-full h-full">
          <div className="max-w-2xl space-y-6 sm:space-y-8 py-12">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-headline font-extrabold leading-[1.0] sm:leading-[0.9] tracking-tighter text-on-background">
              Power Your World <br/>
              <span className="text-primary italic">With Clean Energy</span>
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-xl">
              Precision-engineered solar solutions designed for the Nigerian climate. Transition to reliable, independent power with our radiant monolith technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/products" className="bg-primary-container text-on-primary-container px-6 py-3.5 sm:px-8 sm:py-4 rounded-md font-label font-bold text-base sm:text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,166,35,0.4)]">
                Shop Products
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_cart</span>
              </NavLink>
              <button 
                onClick={() => openQuote('Book Installation')}
                className="bg-transparent border border-outline-variant text-on-surface px-6 py-3.5 sm:px-8 sm:py-4 rounded-md font-label font-bold text-base sm:text-lg hover:bg-white/5 transition-all">
                Book Installation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section
        style={{
          backgroundColor: '#1a1a1a',
          borderTop: '1px solid #2a2a2a',
          borderBottom: '1px solid #2a2a2a',
          overflow: 'hidden',
          padding: '16px 0',
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
        <div style={{ paddingLeft: '1rem', smPaddingLeft: '2rem', marginBottom: '10px' }} className="px-4 sm:px-8">
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#f59e0b',
            fontWeight: 700,
          }}>
            Trusted Brands
          </span>
        </div>

        {/* Scrolling track */}
        <div className="marquee-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
          <div className="marquee-track">
            {[0, 1].map((setIndex) => (
              <div key={setIndex} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {[
                  {
                    name: 'Felicity Solar',
                    logo: 'https://logo.clearbit.com/felicitysolar.ng',
                  },
                  {
                    name: 'SMK Solar',
                    logo: 'https://logo.clearbit.com/smksolar.com',
                  },
                  {
                    name: 'Canadian Solar',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Canadian_Solar_logo.svg/320px-Canadian_Solar_logo.svg.png',
                  },
                  {
                    name: 'Jinko Solar',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/JinkoSolar_logo.svg/320px-JinkoSolar_logo.svg.png',
                  },
                  {
                    name: 'Prag Solar',
                    logo: 'https://logo.clearbit.com/pragsolar.com',
                  },
                  {
                    name: 'Trina Solar',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Trina_Solar_logo.svg/320px-Trina_Solar_logo.svg.png',
                  },
                  {
                    name: 'AE Dunamis',
                    logo: 'https://logo.clearbit.com/aedunamis.com',
                  },
                  {
                    name: 'Bluesun Solar',
                    logo: 'https://logo.clearbit.com/bluesun-solar.com',
                  },
                ].map((brand, i) => (
                  <div key={`${setIndex}-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Brand entry */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px sm:0 36px', whiteSpace: 'nowrap' }}>
                      {/* White pill behind logo so any color logo is visible on dark bg */}
                      <div style={{
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        borderRadius: '8px',
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '38px',
                        minWidth: '55px',
                      }}>
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          onError={(e) => {
                            e.target.parentElement.style.display = 'none';
                          }}
                          style={{
                            height: '24px',
                            width: 'auto',
                            objectFit: 'contain',
                            maxWidth: '75px',
                          }}
                        />
                      </div>
                      <span style={{ color: '#e5e5e5', fontWeight: 600, fontSize: '13px', letterSpacing: '0.03em' }}>
                        {brand.name}
                      </span>
                    </div>
                    {/* Amber divider */}
                    <div style={{ width: '1px', height: '24px', backgroundColor: '#f59e0b', opacity: 0.3, flexShrink: 0 }} />
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
        <div className="bg-gradient-to-r from-primary-container via-secondary-container to-primary-container rounded-lg py-12 px-6 sm:py-20 sm:px-12 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <div className="h-full w-full bg-[radial-gradient(circle_at_2px_2px,_white_1px,_transparent_0)] bg-[length:24px_24px]"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter text-on-primary-container relative z-10 mb-6 sm:mb-8">
            Ready to Go Solar?
          </h2>
          <p className="text-on-primary-container/80 text-base sm:text-xl font-label max-w-xl mb-8 sm:mb-10 relative z-10 font-medium">
            Our engineering team is standing by to design your custom energy roadmap.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10 justify-center">
            <button 
              onClick={() => navigate("/products")}
              className="bg-on-primary-container text-primary-container px-8 py-4 sm:px-10 sm:py-5 rounded-md font-label font-bold text-base sm:text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
              Start Your Journey
            </button>
            <button 
              onClick={() => navigate("/products")}
              className="bg-transparent border-2 border-on-primary-container/30 text-on-primary-container px-8 py-4 sm:px-10 sm:py-5 rounded-md font-label font-bold text-base sm:text-xl uppercase tracking-widest hover:bg-on-primary-container/10 transition-colors">
              View Price List
            </button>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
