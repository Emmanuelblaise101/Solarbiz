import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  // Local state always holds the current cart items, whether from DB or localStorage
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const fetchSupabaseCart = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Failed to fetch cart:', error);
      return;
    }
    
    // Map db columns to app format
    const mapped = data.map(item => ({
      id: item.product_id, // we use product_id as the main identifier in the app
      cart_item_id: item.id, // keep the db row id just in case
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    }));
    
    setCartItems(mapped);
  };

  // Sync state on mount and auth changes
  useEffect(() => {
    const handleAuthChange = async () => {
      if (isAuthenticated && user) {
        // Merge guest cart if exists
        try {
          const localCart = window.localStorage.getItem('solarbiz_cart');
          if (localCart) {
            const parsed = JSON.parse(localCart);
            if (parsed.length > 0) {
              for (const item of parsed) {
                // Check if exists
                const { data: existing } = await supabase
                  .from('cart_items')
                  .select('*')
                  .eq('user_id', user.id)
                  .eq('product_id', item.id)
                  .single();

                if (existing) {
                  await supabase
                    .from('cart_items')
                    .update({ quantity: existing.quantity + item.quantity })
                    .eq('id', existing.id);
                } else {
                  await supabase
                    .from('cart_items')
                    .insert({
                      user_id: user.id,
                      product_id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      quantity: item.quantity
                    });
                }
              }
              window.localStorage.removeItem('solarbiz_cart');
            }
          }
        } catch (err) {
          console.error("Error merging guest cart", err);
        }
        
        await fetchSupabaseCart();
      } else {
        // Load guest cart
        try {
          const item = window.localStorage.getItem('solarbiz_cart');
          setCartItems(item ? JSON.parse(item) : []);
        } catch (error) {
          setCartItems([]);
        }
      }
    };
    
    handleAuthChange();
  }, [user, isAuthenticated]);

  // Save guest cart to localStorage when cartItems changes and no user
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        window.localStorage.setItem('solarbiz_cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to local storage', error);
      }
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product) => {
    if (isAuthenticated && user) {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();
        
      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + 1 })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          });
      }
      await fetchSupabaseCart();
      triggerToast('Item added to cart.');
    } else {
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
        if (existingItemIndex >= 0) {
          const newItems = [...prevItems];
          newItems[existingItemIndex].quantity += 1;
          return newItems;
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
      triggerToast('Item added to cart.');
    }
  };

  const removeFromCart = async (id) => {
    if (isAuthenticated && user) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', id);
      await fetchSupabaseCart();
    } else {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated && user) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
      await fetchSupabaseCart();
    } else {
      setCartItems([]);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    if (isAuthenticated && user) {
      await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('user_id', user.id)
        .eq('product_id', id);
      await fetchSupabaseCart();
    } else {
      setCartItems((prevItems) => 
        prevItems.map((item) => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, clearCart, updateQuantity, cartCount, cartTotal, toastMessage 
    }}>
      {children}
    </CartContext.Provider>
  );
};
