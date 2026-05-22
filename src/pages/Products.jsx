import React from 'react';
import { Link } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Products = () => {
  const { openQuote } = useQuote();
  const { addToCart } = useCart();
  const { productData, loading } = useProducts();
  const products = productData.products || [];
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-8 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-3xl">
            <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
              THE <span className="text-primary">ENERGY</span><br/>CATALOGUE
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Precision-engineered solar hardware for the Nigerian climate. High-efficiency components designed for a lifetime of radiant performance.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-2 text-primary font-label text-sm uppercase tracking-widest bg-surface-container-high px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>24/7 Power Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category & Filter Bar */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-md py-6 border-none">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-surface-container-low p-2 rounded-xl">
            <div className="flex flex-wrap gap-2">
              <Link to="/products" className="px-6 py-2 rounded-lg bg-primary-container text-on-primary-container font-headline font-bold text-sm">All</Link>
              <Link to="/panels" className="px-6 py-2 rounded-lg text-neutral-400 hover:bg-surface-container-high transition-colors font-headline font-bold text-sm">Panels</Link>
              <Link to="/batteries" className="px-6 py-2 rounded-lg text-neutral-400 hover:bg-surface-container-high transition-colors font-headline font-bold text-sm">Batteries</Link>
              <Link to="/inverters" className="px-6 py-2 rounded-lg text-neutral-400 hover:bg-surface-container-high transition-colors font-headline font-bold text-sm">Inverters</Link>
              <Link to="/stabilizers" className="px-6 py-2 rounded-lg text-neutral-400 hover:bg-surface-container-high transition-colors font-headline font-bold text-sm">Stabilizers</Link>
              <Link to="/solar-lights" className="px-6 py-2 rounded-lg text-neutral-400 hover:bg-surface-container-high transition-colors font-headline font-bold text-sm">Lights</Link>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center bg-surface-container-high rounded-lg px-4 py-2 flex-grow lg:flex-grow-0">
                <span className="material-symbols-outlined text-neutral-500 mr-2">sort</span>
                <select className="bg-transparent border-none text-sm font-label focus:ring-0 text-neutral-300 w-full">
                  <option>Sort by Price</option>
                  <option>Sort by Capacity</option>
                  <option>Brand: A-Z</option>
                </select>
              </div>
              <button className="p-2 bg-surface-container-high text-neutral-400 rounded-lg hover:text-primary transition-colors">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-8 mt-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="bg-surface-container-low rounded-lg p-6 diagonal-cut transition-all duration-500 hover:translate-y-[-8px]">
                <div className="aspect-square mb-6 overflow-hidden rounded-md bg-gradient-to-br from-surface-container-high to-surface-container-low relative">
                  <img alt={product.name} className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-700" src={product.image} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-8xl text-primary/40 group-hover:scale-125 transition-transform duration-500">solar_power</span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-2xl tracking-tight">{product.name}</h3>
                  <span className="font-label text-primary text-xs bg-primary/10 px-2 py-1 rounded">{product.badge}</span>
                </div>
                <div className="font-label text-neutral-400 text-sm mb-6 flex gap-4">
                  <span>{product.spec1Value}</span>
                  <span>{product.spec2Value}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-neutral-500 text-xs font-label uppercase">Starting From</span>
                    <span className="text-2xl font-bold text-warm-white">₦ {new Intl.NumberFormat().format(product.price)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </section>

      {/* Technical Specs Section */}
      <section className="mt-32 px-8">
        <div className="max-w-7xl mx-auto bg-[#FFFDF5] text-[#0A0A0A] rounded-xl p-12 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[40rem] rotate-12 -translate-y-20 translate-x-20">flare</span>
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-5xl font-black tracking-tight leading-none mb-8">
                NOT SURE WHAT<br/>YOU NEED?
              </h2>
              <p className="text-xl opacity-80 mb-12 font-medium">
                Our engineers can help you design a custom configuration tailored to your specific power consumption patterns.
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A0A0A]/5 flex items-center justify-center">
                    <span className="material-symbols-outlined">handyman</span>
                  </div>
                  <span className="font-headline font-bold">Complimentary Load Audit</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0A0A0A]/5 flex items-center justify-center">
                    <span className="material-symbols-outlined">verified</span>
                  </div>
                  <span className="font-headline font-bold">5-Year Premium Warranty</span>
                </div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] text-[#FFFDF5] p-8 rounded-lg diagonal-cut">
              <h4 className="font-label text-sm uppercase tracking-[0.2em] mb-6 text-primary">System Configurator</h4>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-label uppercase mb-2 opacity-50">Estimated Daily Usage</label>
                  <input className="w-full accent-primary bg-surface-container-highest h-2 rounded-full appearance-none" type="range" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container-low rounded">
                    <span className="block text-[10px] uppercase font-label opacity-50 mb-1">Recommended</span>
                    <span className="text-xl font-headline font-bold">3.5kVA System</span>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded">
                    <span className="block text-[10px] uppercase font-label opacity-50 mb-1">Est. Savings</span>
                    <span className="text-xl font-headline font-bold">₦2.4M/yr</span>
                  </div>
                </div>
                <button 
                  onClick={() => openQuote('Custom Configurator Quote - 3.5kVA')}
                  className="w-full bg-primary-container text-on-primary-container py-4 font-headline font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform flex items-center justify-center gap-2">
                  BOOK FREE CONSULTATION <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
