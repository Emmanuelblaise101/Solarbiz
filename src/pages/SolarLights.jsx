import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const SolarLights = () => {
  const { addToCart } = useCart();
  const { productData, loading } = useProducts();
  const lights = productData.lights || [];
  return (
    <main className="pt-20">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface mb-6 uppercase break-words">
              SOLAR <br/><span className="text-primary-container">LIGHT.</span>
            </h1>
            <p className="font-headline text-2xl font-bold tracking-widest text-primary mb-4 uppercase">
              BUILT TO OUTLAST THE GRID.
            </p>
            <p className="font-body text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              All-in-one solar lighting engineered for Nigerian streets, estates, and compounds. Zero wiring, zero NEPA dependency, full illumination from dusk to dawn.
            </p>
          </div>
          <div className="diagonal-cut w-full aspect-video bg-surface-container-low shadow-2xl overflow-hidden group">
             <img src="https://solarmall.ng/wp-content/uploads/2025/10/dyzdo66wk4vbz5iefdjy.webp" alt="Solar Light Hero" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low relative">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <span className="font-label text-primary tracking-[0.3em] uppercase text-sm mb-4 block">Current Inventory</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight">Solar Lights</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lights.map((light) => (
              <div key={light.id} className="bg-surface-container-highest rounded-lg p-1 group border border-outline-variant/10 hover:border-primary/30 transition-all">
                <div className="bg-surface-container h-full w-full p-8 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full text-xs font-label mb-6">{light.badge}</div>
                    <h3 className="font-headline text-2xl font-bold mb-3 uppercase tracking-tight">{light.name}</h3>
                    <p className="font-body text-sm text-on-surface-variant mb-6">{light.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      <li className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-label text-xs text-neutral-500 uppercase">{light.spec1Label}</span>
                        <span className="font-label text-xs text-on-surface">{light.spec1Value}</span>
                      </li>
                      <li className="flex justify-between border-b border-white/5 pb-2">
                        <span className="font-label text-xs text-neutral-500 uppercase">{light.spec2Label}</span>
                        <span className="font-label text-xs text-on-surface">{light.spec2Value}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="rounded-xl w-full h-[180px] overflow-hidden mb-6 diagonal-cut p-4 bg-white/5">
                      <img src={light.image} alt={light.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="text-3xl font-headline font-black text-primary mb-6">
                      ₦ {new Intl.NumberFormat().format(light.price)}
                    </div>
                    <button 
                      onClick={() => addToCart({ id: light.id, name: light.name, price: light.price, image: light.image })}
                      className="w-full py-4 bg-white/5 text-on-surface hover:bg-primary hover:text-on-primary font-bold rounded transition-colors duration-300 flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">add_shopping_cart</span> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SolarLights;
