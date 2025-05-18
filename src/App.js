import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import TrendingProducts from './components/TrendingProducts';
import AppFeatures from './components/AppFeatures';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import UserLogin from './pages/UserLogin';
import EmployeeLogin from './pages/EmployeeLogin';
import Register from './components/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import About from './pages/About';

// Admin components
import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './components/AdminRoute';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminCustomers from './pages/admin/Customers';
import AdminSettings from './pages/admin/Settings';

import GenieChatbot from './components/GenieChatbot';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userRole');
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
          
          {/* Public/User Routes */}
          <Route path="/*" element={
            <>
              <Navbar 
                onCartClick={toggleCart} 
                isAuthenticated={isAuthenticated} 
                user={user} 
                onLogout={handleLogout}
              />
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Features />
                    <Categories />
                    <TrendingProducts onAddToCart={addToCart} />
                    <AppFeatures />
                  </>
                } />
                <Route path="/login" element={
                  !isAuthenticated ? <UserLogin onLoginSuccess={handleLogin} /> : <Navigate to="/" />
                } />
                <Route path="/employee/login" element={
                  !isAuthenticated ? <EmployeeLogin /> : <Navigate to="/" />
                } />
                <Route path="/register" element={
                  !isAuthenticated ? <Register /> : <Navigate to="/" />
                } />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected User Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
              </Routes>
              <Footer />
              <CartModal 
                isOpen={isCartOpen} 
                onClose={toggleCart} 
                cartItems={cartItems}
                onRemoveItem={removeFromCart}
              />
              <GenieChatbot />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
