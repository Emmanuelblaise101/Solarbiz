import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuoteProvider } from './context/QuoteContext';
import { QuoteModal } from './components/QuoteModal';
import { CartProvider } from './context/CartContext';
import { ToastNotification } from './components/ToastNotification';
import { SharedLayout } from './components/SharedLayout';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import Batteries from './pages/Batteries';
import SolarLights from './pages/SolarLights';
import Stabilizers from './pages/Stabilizers';
import Panels from './pages/Panels';
import Inverters from './pages/Inverters';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
        <QuoteProvider>
        <BrowserRouter>
          <QuoteModal />
          <ToastNotification />
          <Routes>
            {/* Admin Dashboard - Separate Layout */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />

            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="products" element={<Products />} />
                <Route path="batteries" element={<Batteries />} />
                <Route path="solar-lights" element={<SolarLights />} />
                <Route path="stabilizers" element={<Stabilizers />} />
                <Route path="panels" element={<Panels />} />
                <Route path="inverters" element={<Inverters />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </QuoteProvider>
      </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
