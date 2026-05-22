import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Panels = () => {
  const { addToCart } = useCart();
  const { productData, loading } = useProducts();
  const panels = productData.panels || [];
  return (
    <main className="pt-20">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface mb-6 uppercase break-words">
              Monocrystalline <br/><span className="text-primary-container">Excellence.</span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Industrial grade solar absorption arrays. Engineered to withstand extreme environments, from coastal saltwater to desert heat, maintaining peak efficiency year after year.
            </p>
          </div>
          <div className="diagonal-cut w-full aspect-video bg-surface-container-low shadow-2xl overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" alt="High grade shiny solar panels installed" className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low relative">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <span className="font-label text-primary tracking-[0.3em] uppercase text-sm mb-4 block">Current Inventory</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight">Solar Arrays</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {panels.map((panel, index) => (
              <div key={panel.id} className={`bg-surface-container-highest rounded-lg p-1 group border border-outline-variant/10 hover:border-primary/30 transition-all ${index === 4 ? 'md:col-span-2' : ''}`}>
                <div className={`bg-surface-container h-full w-full p-8 flex ${index === 4 ? 'flex-col md:flex-row gap-8 items-center border border-primary/5' : 'flex-col justify-between'}`}>
                  <div className={index === 4 ? 'flex-1' : ''}>
                    <div className="inline-flex bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-label mb-6">{panel.badge}</div>
                    <h3 className={`font-headline font-bold mb-3 uppercase tracking-tight ${index === 4 ? 'text-3xl' : 'text-2xl'}`}>{panel.name}</h3>
                    <p className="font-body text-sm text-on-surface-variant mb-6">{panel.description}</p>
                    
                    {index === 4 ? (
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <p className="font-label text-[10px] text-neutral-500 uppercase">{panel.spec1Label}</p>
                          <p className="font-label text-xl text-on-surface">{panel.spec1Value}</p>
                        </div>
                        <div>
                          <p className="font-label text-[10px] text-neutral-500 uppercase">{panel.spec2Label}</p>
                          <p className="font-label text-xl text-on-surface">{panel.spec2Value}</p>
                        </div>
                      </div>
                    ) : (
                      <ul className="space-y-3 mb-8">
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="font-label text-xs text-neutral-500 uppercase">{panel.spec1Label}</span>
                          <span className="font-label text-xs text-on-surface">{panel.spec1Value}</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="font-label text-xs text-neutral-500 uppercase">{panel.spec2Label}</span>
                          <span className="font-label text-xs text-on-surface">{panel.spec2Value}</span>
                        </li>
                      </ul>
                    )}
                    
                    {index === 4 && (
                      <button 
                        onClick={() => addToCart({ id: panel.id, name: panel.name, price: panel.price, image: panel.image })}
                        className="w-full py-4 bg-white/5 text-on-surface hover:bg-primary hover:text-on-primary font-bold rounded transition-colors duration-300 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">add_shopping_cart</span> Add to Cart
                      </button>
                    )}
                  </div>
                  <div className={index === 4 ? 'flex-1 rounded-xl w-full h-[250px] overflow-hidden diagonal-cut p-4 mt-6 md:mt-0' : ''}>
                    {index !== 4 && (
                      <div className="rounded-xl w-full h-[180px] overflow-hidden mb-6 diagonal-cut p-4">
                        <img src={panel.image} alt={panel.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                    )}
                    {index === 4 && (
                      <img src={panel.image} alt={panel.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                    )}
                    {index !== 4 && (
                      <>
                        <div className="text-3xl font-headline font-black text-primary mb-6">
                          ₦ {new Intl.NumberFormat().format(panel.price)}
                        </div>
                        <button 
                          onClick={() => addToCart({ id: panel.id, name: panel.name, price: panel.price, image: panel.image })}
                          className="w-full py-4 bg-white/5 text-on-surface hover:bg-primary hover:text-on-primary font-bold rounded transition-colors duration-300 flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined">add_shopping_cart</span> Add to Cart
                        </button>
                      </>
                    )}
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

export default Panels;
