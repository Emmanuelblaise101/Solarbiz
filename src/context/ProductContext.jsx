import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({
    panels: [],
    inverters: [],
    batteries: [],
    lights: [],
    stabilizers: [],
    products: []
  });
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      return;
    }

    const grouped = {
      panels: [],
      inverters: [],
      batteries: [],
      lights: [],
      stabilizers: [],
      products: []
    };

    if (data) {
      const mapped = data.map(row => ({
        id: row.id,
        category: row.category,
        badge: row.badge,
        name: row.name,
        description: row.description,
        spec1Label: row.spec1_label,
        spec1Value: row.spec1_value,
        spec2Label: row.spec2_label,
        spec2Value: row.spec2_value,
        image: row.image,
        price: row.price
      }));

      mapped.forEach(product => {
        if (grouped[product.category]) {
          grouped[product.category].push(product);
        } else {
          grouped[product.category] = [product];
        }
      });
    }

    setProductData(grouped);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Returns { error } or null
  const addProduct = async (category, newProduct) => {
    const { error } = await supabase
      .from('products')
      .insert([{
        id: newProduct.id,
        category: category,
        badge: newProduct.badge,
        name: newProduct.name,
        description: newProduct.description,
        spec1_label: newProduct.spec1Label,
        spec1_value: newProduct.spec1Value,
        spec2_label: newProduct.spec2Label,
        spec2_value: newProduct.spec2Value,
        image: newProduct.image,
        price: newProduct.price
      }]);

    if (!error) await fetchProducts();
    return { error };
  };

  const removeProduct = async (category, productId) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (!error) await fetchProducts();
    return { error };
  };

  const editProduct = async (category, productId, updatedFields) => {
    const { error } = await supabase
      .from('products')
      .update({
        badge: updatedFields.badge,
        name: updatedFields.name,
        description: updatedFields.description,
        spec1_label: updatedFields.spec1Label,
        spec1_value: updatedFields.spec1Value,
        spec2_label: updatedFields.spec2Label,
        spec2_value: updatedFields.spec2Value,
        image: updatedFields.image,
        price: updatedFields.price,
        category: updatedFields.category
      })
      .eq('id', productId);

    if (!error) await fetchProducts();
    return { error };
  };

  return (
    <ProductContext.Provider value={{ productData, loading, addProduct, removeProduct, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
