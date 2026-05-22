import React from 'react';
import { useCart } from '../context/CartContext';

export const ToastNotification = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-surface-container-highest border border-outline-variant/30 rounded-full shadow-2xl flex items-center gap-3 animate-[slideUp_0.3s_ease-out]">
      <span className="material-symbols-outlined text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
      <span className="font-label text-sm text-on-surface font-bold tracking-wide">{toastMessage}</span>
    </div>
  );
};
