import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NIGERIAN_STATES = {
  "Abia": ["Aba North", "Aba South", "Umuahia North"],
  "Adamawa": ["Yola North", "Yola South", "Mubi North"],
  "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene"],
  "Anambra": ["Awka South", "Onitsha North", "Nnewi North"],
  "Bauchi": ["Bauchi", "Katagum", "Misau"],
  "Bayelsa": ["Yenagoa", "Ogbia", "Sagbama"],
  "Benue": ["Makurdi", "Gboko", "Otukpo"],
  "Borno": ["Maiduguri", "Jere", "Bama"],
  "Cross River": ["Calabar Municipal", "Calabar South", "Ikom"],
  "Delta": ["Warri South", "Oshimili South (Asaba)", "Ughelli North"],
  "Ebonyi": ["Abakaliki", "Afikpo North", "Ohaukwu"],
  "Edo": ["Oredo (Benin City)", "Egor", "Ikpoba Okha"],
  "Ekiti": ["Ado Ekiti", "Ikere", "Ijero"],
  "Enugu": ["Enugu North", "Enugu South", "Nsukka"],
  "FCT": ["Abuja Municipal (AMAC)", "Bwari", "Gwagwalada"],
  "Gombe": ["Gombe", "Akko", "Yamaltu/Deba"],
  "Imo": ["Owerri Municipal", "Orlu", "Okigwe"],
  "Jigawa": ["Dutse", "Hadejia", "Kazaure"],
  "Kaduna": ["Kaduna North", "Kaduna South", "Zaria"],
  "Kano": ["Kano Municipal", "Dala", "Nassarawa"],
  "Katsina": ["Katsina", "Daura", "Funtua"],
  "Kebbi": ["Birnin Kebbi", "Argungu", "Yauri"],
  "Kogi": ["Lokoja", "Okene", "Idah"],
  "Kwara": ["Ilorin West", "Ilorin South", "Offa"],
  "Lagos": ["Ikeja", "Eti-Osa", "Alimosho", "Lagos Mainland"],
  "Nasarawa": ["Lafia", "Keffi", "Karu"],
  "Niger": ["Chanchaga (Minna)", "Bida", "Suleja"],
  "Ogun": ["Abeokuta South", "Ado-Odo/Ota", "Ijebu Ode"],
  "Ondo": ["Akure South", "Ondo West", "Owo"],
  "Osun": ["Osogbo", "Ilesa West", "Ife Central"],
  "Oyo": ["Ibadan North", "Ibadan South West", "Ogbomosho North"],
  "Plateau": ["Jos North", "Jos South", "Pankshin"],
  "Rivers": ["Port Harcourt", "Obio-Akpor", "Eleme"],
  "Sokoto": ["Sokoto North", "Sokoto South", "Wamakko"],
  "Taraba": ["Jalingo", "Wukari", "Bali"],
  "Yobe": ["Damaturu", "Potiskum", "Gashua"],
  "Zamfara": ["Gusau", "Kaura Namoda", "Talata Mafara"]
};

const FAST_STATES = ["Lagos", "Rivers", "Oyo"];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingFee, setShippingFee] = useState(0);
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle shipping calculations
  useEffect(() => {
    if (selectedState) {
      if (FAST_STATES.includes(selectedState)) {
        setShippingFee(15000);
        setDeliveryEstimate('1–3 business days');
      } else {
        setShippingFee(30000);
        setDeliveryEstimate('3–7 business days');
      }
    } else {
      setShippingFee(0);
      setDeliveryEstimate('');
    }
  }, [selectedState]);

  // If cart is empty and not just completed an order
  useEffect(() => {
    if (cartItems.length === 0 && !showSuccessModal) {
      navigate('/cart');
    }
  }, [cartItems, navigate, showSuccessModal]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price).replace('.00', '');
  };

  const grandTotal = cartTotal + shippingFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedRef = 'SBZ-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderRef(generatedRef);
    clearCart();
    setShowSuccessModal(true);
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    navigate('/products');
  };

  return (
    <main className="pt-24 pb-20 min-h-[90vh] bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 text-sm font-headline font-bold tracking-widest uppercase">
            <Link to="/cart" className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors">
              <span className="material-symbols-outlined text-[18px]">check_circle</span> Cart
            </Link>
            <div className="w-12 h-[2px] bg-amber-500"></div>
            <div className="flex items-center gap-2 text-amber-500">
              <span className="material-symbols-outlined text-[18px]">radio_button_checked</span> Details & Payment
            </div>
            <div className="w-12 h-[2px] bg-neutral-700"></div>
            <div className="flex items-center gap-2 text-neutral-500">
              <span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span> Confirmation
            </div>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative items-start">
          
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section A: Contact Info */}
            <div className="bg-[#222] border border-[#2e2e2e] rounded-[12px] p-8">
              <div className="flex items-center gap-3 mb-6 border-l-4 border-amber-500 pl-3">
                <span className="material-symbols-outlined text-amber-500">person</span>
                <h2 className="text-xl font-headline font-bold text-white uppercase tracking-tight">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">First Name</label>
                  <input type="text" required className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Last Name</label>
                  <input type="text" required className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Email Address</label>
                  <input type="email" required className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Phone Number</label>
                  <input type="tel" required className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
              </div>
            </div>

            {/* Section B: Delivery Location */}
            <div className="bg-[#222] border border-[#2e2e2e] rounded-[12px] p-8">
              <div className="flex items-center gap-3 mb-6 border-l-4 border-amber-500 pl-3">
                <span className="material-symbols-outlined text-amber-500">local_shipping</span>
                <h2 className="text-xl font-headline font-bold text-white uppercase tracking-tight">Delivery Location</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">State</label>
                  <select 
                    required
                    value={selectedState} 
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedLGA('');
                    }}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body appearance-none"
                  >
                    <option value="">Select State</option>
                    {Object.keys(NIGERIAN_STATES).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">City / LGA</label>
                  <select 
                    required
                    value={selectedLGA}
                    onChange={(e) => setSelectedLGA(e.target.value)}
                    disabled={!selectedState}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select LGA</option>
                    {selectedState && NIGERIAN_STATES[selectedState].map(lga => (
                      <option key={lga} value={lga}>{lga}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Street Address</label>
                  <input type="text" required placeholder="House number and street name" className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Nearest Landmark</label>
                  <input type="text" required className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
                <div>
                  <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Postal Code (Optional)</label>
                  <input type="text" className="w-full bg-[#1a1a1a] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                </div>
              </div>
              
              {/* Delivery Estimate Box */}
              <div className={`p-4 rounded-md border transition-all duration-300 ${selectedState ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#1a1a1a] border-[#333]'}`}>
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined ${selectedState ? 'text-amber-500' : 'text-neutral-500'}`}>schedule</span>
                  <div>
                    <h4 className="font-bold font-headline text-sm mb-1 text-white">Estimated Delivery</h4>
                    <p className="text-sm font-body text-neutral-400">
                      {selectedState 
                        ? `Delivery to ${selectedState} will take approximately ${deliveryEstimate}.` 
                        : 'Select a state to see delivery estimates.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section C: Payment Method */}
            <div className="bg-[#222] border border-[#2e2e2e] rounded-[12px] p-8">
              <div className="flex items-center gap-3 mb-6 border-l-4 border-amber-500 pl-3">
                <span className="material-symbols-outlined text-amber-500">payments</span>
                <h2 className="text-xl font-headline font-bold text-white uppercase tracking-tight">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Method Toggles */}
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-md border text-left transition-all ${paymentMethod === 'card' ? 'bg-amber-500/10 border-amber-500' : 'bg-[#1a1a1a] border-[#333] hover:border-neutral-500'}`}
                >
                  <span className={`material-symbols-outlined mb-2 block ${paymentMethod === 'card' ? 'text-amber-500' : 'text-neutral-400'}`}>credit_card</span>
                  <span className="font-headline font-bold text-sm block text-white">Debit/Credit Card</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-4 rounded-md border text-left transition-all ${paymentMethod === 'bank' ? 'bg-amber-500/10 border-amber-500' : 'bg-[#1a1a1a] border-[#333] hover:border-neutral-500'}`}
                >
                  <span className={`material-symbols-outlined mb-2 block ${paymentMethod === 'bank' ? 'text-amber-500' : 'text-neutral-400'}`}>account_balance</span>
                  <span className="font-headline font-bold text-sm block text-white">Bank Transfer</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('ussd')}
                  className={`p-4 rounded-md border text-left transition-all ${paymentMethod === 'ussd' ? 'bg-amber-500/10 border-amber-500' : 'bg-[#1a1a1a] border-[#333] hover:border-neutral-500'}`}
                >
                  <span className={`material-symbols-outlined mb-2 block ${paymentMethod === 'ussd' ? 'text-amber-500' : 'text-neutral-400'}`}>dialpad</span>
                  <span className="font-headline font-bold text-sm block text-white">USSD / Mobile</span>
                </button>
              </div>

              {/* Payment Content Panels */}
              <div className="bg-[#1a1a1a] p-6 rounded-md border border-[#333]">
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 bg-white rounded text-xs font-bold text-blue-900 italic">VISA</span>
                      <span className="px-2 py-1 bg-white rounded text-xs font-bold text-red-600">mastercard</span>
                      <span className="px-2 py-1 bg-white rounded text-xs font-bold text-green-600">Verve</span>
                    </div>
                    <div>
                      <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#222] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body tracking-widest" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-[#222] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                      </div>
                      <div>
                        <label className="block text-xs font-label text-neutral-400 uppercase mb-2">CVV</label>
                        <input type="password" placeholder="123" className="w-full bg-[#222] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-label text-neutral-400 uppercase mb-2">Cardholder Name</label>
                      <input type="text" className="w-full bg-[#222] border border-[#333] rounded-md px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-body" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="text-center">
                    <p className="text-sm text-neutral-400 mb-6 font-body">Please transfer the total amount of <span className="text-white font-bold">{formatPrice(grandTotal)}</span> to the account below.</p>
                    <div className="bg-[#222] p-6 rounded-md border border-[#333] inline-block text-left mb-6">
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-label">Bank Name</p>
                      <p className="text-lg font-bold text-white mb-4">Access Bank</p>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-label">Account Number</p>
                      <p className="text-2xl font-black text-amber-500 tracking-widest mb-4">1222055348</p>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1 font-label">Account Name</p>
                      <p className="text-lg font-bold text-white">ohanusi Ogochukwu Emmanuel</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-md border border-amber-500/30 flex gap-3 text-left">
                      <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">info</span>
                      <p className="text-xs text-amber-500 font-body leading-relaxed">After completing the transfer, please send the payment receipt via WhatsApp to <span className="font-bold">+2348137077713</span> referencing your order number.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'ussd' && (
                  <div>
                    <p className="text-sm text-neutral-400 mb-6 font-body">Select your bank to view the USSD shortcode for payment.</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#222] border border-[#333] p-4 rounded-md text-center">
                        <span className="block text-white font-bold mb-1">GTBank</span>
                        <span className="text-amber-500 font-headline font-black">*737#</span>
                      </div>
                      <div className="bg-[#222] border border-[#333] p-4 rounded-md text-center">
                        <span className="block text-white font-bold mb-1">First Bank</span>
                        <span className="text-amber-500 font-headline font-black">*894#</span>
                      </div>
                      <div className="bg-[#222] border border-[#333] p-4 rounded-md text-center">
                        <span className="block text-white font-bold mb-1">Access Bank</span>
                        <span className="text-amber-500 font-headline font-black">*901#</span>
                      </div>
                      <div className="bg-[#222] border border-[#333] p-4 rounded-md text-center">
                        <span className="block text-white font-bold mb-1">UBA</span>
                        <span className="text-amber-500 font-headline font-black">*919#</span>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-md border border-amber-500/30 flex gap-3 text-left">
                      <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">info</span>
                      <p className="text-xs text-amber-500 font-body leading-relaxed">After payment is successful, please call or message us on WhatsApp with your transaction reference.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#222] rounded-[12px] p-8 border border-[#2e2e2e] sticky top-24 shadow-2xl">
              <h2 className="font-headline font-black text-2xl text-white mb-6 border-b border-[#333] pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-md overflow-hidden shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-screen opacity-90" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-neutral-500">solar_power</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-neutral-400 mt-1">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                    </div>
                    <div className="font-bold text-white flex items-center">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 border-t border-[#333] pt-6">
                <div className="flex justify-between text-neutral-400 font-body text-sm">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400 font-body text-sm">
                  <span>Shipping</span>
                  <span className="text-white font-bold">{shippingFee === 0 ? '---' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-neutral-400 font-body text-sm">
                  <span>Taxes</span>
                  <span className="text-white font-bold">₦0</span>
                </div>
              </div>
              
              <div className="border-t border-[#333] pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-white">Total</span>
                  <span className="font-headline font-black text-3xl text-amber-500">{formatPrice(grandTotal)}</span>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={cartItems.length === 0}
                className="w-full bg-amber-500 text-[#1a1a1a] py-5 rounded-md font-headline font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order <span className="material-symbols-outlined text-sm">check_circle</span>
              </button>
              <p className="text-xs text-center text-neutral-500 mt-4 font-label">By placing your order, you agree to our Terms of Service.</p>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="bg-[#222] border border-[#333] max-w-md w-full rounded-[2rem] p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-amber-500 text-4xl">task_alt</span>
              </div>
              <h2 className="text-3xl font-headline font-black text-white uppercase tracking-tight mb-2">Order Confirmed!</h2>
              <p className="text-neutral-400 font-body mb-8">Thank you for powering your future with SolarBiz. Your order has been successfully placed.</p>
              
              <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-6 mb-8">
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-label mb-2">Order Reference</p>
                <p className="text-2xl font-headline font-black text-amber-500 tracking-widest">{orderRef}</p>
              </div>

              <p className="text-sm text-neutral-400 mb-8 leading-relaxed">
                We will contact you shortly regarding delivery and installation scheduling.
              </p>

              <button 
                onClick={handleContinueShopping}
                className="w-full bg-amber-500 text-[#1a1a1a] py-4 rounded-md font-headline font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Checkout;
