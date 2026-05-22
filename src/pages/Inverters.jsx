import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Inverters = () => {
  const { addToCart } = useCart();
  const { productData, loading } = useProducts();
  const inverters = productData.inverters || [];
  return (
    <main className="pt-20">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-6 uppercase">
              Intelligent <br/><span className="text-primary-container">Conversion.</span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              Industrial grade hybrid inversion. Harnessing up to 98% AC/DC conversion efficiency, prioritizing solar, grid, or battery based on your exact load profiles.
            </p>
          </div>
          <div className="diagonal-cut w-full md:w-4/5 aspect-square md:aspect-video bg-surface-container-low overflow-hidden group mx-auto rounded-2xl">
             <img src="https://solarmall.ng/wp-content/uploads/2024/03/Felicity-Solar-5KVA-48V-3KVA-24V-Hybrid-Inverter.jpg" alt="Full inverter unit" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low relative">
        <div className="container mx-auto px-8">
          <div className="mb-16">
            <span className="font-label text-primary tracking-[0.3em] uppercase text-sm mb-4 block">Current Inventory</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight">Hybrid Inverters</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inverters.map((inverter, index) => (
              <div key={inverter.id} className={`bg-surface-container-highest rounded-lg p-1 group border border-outline-variant/10 hover:border-primary/30 transition-all ${index === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                <div className={`bg-surface-container h-full w-full p-8 flex ${index === 3 ? 'flex-col md:flex-row gap-8 items-center border border-primary/5' : 'flex-col justify-between'}`}>
                  <div className={index === 3 ? 'flex-1' : ''}>
                    <div className="inline-flex bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-label mb-6">{inverter.badge}</div>
                    <h3 className={`font-headline font-bold mb-3 uppercase tracking-tight ${index === 3 ? 'text-3xl' : 'text-2xl'}`}>{inverter.name}</h3>
                    <p className="font-body text-sm text-on-surface-variant mb-6">{inverter.description}</p>
                    
                    {index === 3 ? (
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <p className="font-label text-[10px] text-neutral-500 uppercase">{inverter.spec1Label}</p>
                          <p className="font-label text-xl text-on-surface">{inverter.spec1Value}</p>
                        </div>
                        <div>
                          <p className="font-label text-[10px] text-neutral-500 uppercase">{inverter.spec2Label}</p>
                          <p className="font-label text-xl text-on-surface">{inverter.spec2Value}</p>
                        </div>
                        {/* We add dummy 3rd and 4th spec if it was hardcoded before, but context only has 2 specs. We will just use the 2 specs from the object. */}
                      </div>
                    ) : (
                      <ul className="space-y-3 mb-8">
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="font-label text-xs text-neutral-500 uppercase">{inverter.spec1Label}</span>
                          <span className="font-label text-xs text-on-surface">{inverter.spec1Value}</span>
                        </li>
                        <li className="flex justify-between border-b border-white/5 pb-2">
                          <span className="font-label text-xs text-neutral-500 uppercase">{inverter.spec2Label}</span>
                          <span className="font-label text-xs text-on-surface">{inverter.spec2Value}</span>
                        </li>
                      </ul>
                    )}
                    
                    {index === 3 && (
                      <div className="mt-4">
                        <div className="text-3xl font-headline font-black text-primary mb-6">
                          ₦ {new Intl.NumberFormat().format(inverter.price)}
                        </div>
                        <button 
                          onClick={() => addToCart({ id: inverter.id, name: inverter.name, price: inverter.price, image: inverter.image })}
                          className="w-full py-4 bg-white/5 text-on-surface hover:bg-primary hover:text-on-primary font-bold rounded transition-colors duration-300 flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined">add_shopping_cart</span> Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className={index === 3 ? 'flex-1 rounded-xl w-full h-[250px] bg-white/5 overflow-hidden diagonal-cut flex items-center justify-center p-4' : ''}>
                    {index !== 3 && (
                      <div className="rounded-xl w-full h-[180px] overflow-hidden mb-6 diagonal-cut bg-white/5">
                        <img src={inverter.image} alt={inverter.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                    )}
                    {index === 3 && (
                      <img src={inverter.image} alt={inverter.name} className="h-full w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                    )}
                    {index !== 3 && (
                      <>
                        <div className="text-3xl font-headline font-black text-primary mb-6">
                          ₦ {new Intl.NumberFormat().format(inverter.price)}
                        </div>
                        <button 
                          onClick={() => addToCart({ id: inverter.id, name: inverter.name, price: inverter.price, image: inverter.image })}
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

export default Inverters;
