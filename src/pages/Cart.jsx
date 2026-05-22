import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, updateQuantity, cartTotal } = useCart();

  // Helper function to format prices cleanly
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price).replace('.00', '');
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-6">shopping_cart</span>
        <h2 className="text-3xl font-headline font-bold mb-4">Your cart is empty</h2>
        <p className="text-on-surface-variant mb-8 text-center max-w-md">Looks like you haven't added any products to your cart yet. Explore our high-efficiency solar solutions.</p>
        <Link to="/products" className="bg-primary text-on-primary px-8 py-4 rounded-md font-label font-bold uppercase tracking-wider hover:brightness-110 transition-all">
          Return to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 min-h-[80vh] px-4 md:px-12 w-full max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter mb-12 border-b border-outline-variant/30 pb-6">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 shadow-md">
              <div className="w-full sm:w-32 h-32 bg-surface-container-highest rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center">
                {item.image ? (
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-screen opacity-90" />
                ) : (
                   <span className="material-symbols-outlined text-4xl text-outline-variant">solar_power</span>
                )}
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-headline font-bold text-xl">{item.name}</h3>
                    <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-outline hover:text-red-400 transition-colors bg-surface-container hover:bg-surface-container-highest p-2 rounded-full"
                    aria-label="Remove item"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  {/* Quantity Control */}
                  <div className="flex items-center gap-1 bg-surface-container-highest p-1 rounded-md border border-outline-variant/30">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <div className="w-10 text-center font-bold font-label">{item.quantity}</div>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-surface-container rounded transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  
                  {/* Line Total */}
                  <div className="text-right">
                    <span className="text-xs text-on-surface-variant uppercase tracking-widest font-label block">Subtotal</span>
                    <span className="font-headline font-black text-lg">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-start border-t border-outline-variant/20 pt-6">
            <button 
              onClick={clearCart}
              className="text-on-surface-variant hover:text-white flex items-center gap-2 font-label tracking-wide uppercase text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-lg">delete_sweep</span> Clear Cart
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-high rounded-3xl p-8 border border-outline-variant/30 sticky top-32 shadow-2xl">
            <h2 className="font-headline font-black text-2xl mb-6 border-b border-outline-variant/20 pb-4">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-on-surface font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-outline-variant/30 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Total</span>
                <span className="font-headline font-black text-3xl text-primary">{formatPrice(cartTotal)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full bg-primary-container text-on-primary-container py-5 rounded-md font-headline font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10">
              Proceed to Checkout <span className="material-symbols-outlined text-sm">lock</span>
            </Link>
            <p className="text-xs text-center text-on-surface-variant mt-4 font-label">Secure, encrypted checkout.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
