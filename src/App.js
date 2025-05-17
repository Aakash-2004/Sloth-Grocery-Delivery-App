import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Admin components
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';

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

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<h1>Orders Management</h1>} />
            <Route path="customers" element={<h1>Customer Management</h1>} />
            <Route path="settings" element={<h1>Settings</h1>} />
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
                <Route path="/login" element={<UserLogin onLoginSuccess={handleLogin} />} />
                <Route path="/employee/login" element={<EmployeeLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
              <CartModal 
                isOpen={isCartOpen} 
                onClose={toggleCart} 
                cartItems={cartItems}
                onRemoveItem={removeFromCart}
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
