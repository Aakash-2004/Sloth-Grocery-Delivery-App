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
import EmployeeRoute from './components/EmployeeRoute';
import PickerDashboard from './pages/employee/PickerDashboard';
import DeliveryDashboard from './pages/employee/DeliveryDashboard';
import StoreDashboard from './pages/employee/StoreDashboard';
import './App.css';
import { UserProvider, useUser, withRole } from './context/UserContext';

// Protected Route component using context
const ProtectedRoute = ({ children, roles }) => {
    const { user, hasRole } = useUser();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !hasRole(roles)) {
        // Redirect to appropriate dashboard based on role
        switch (user.role) {
            case 'admin':
                return <Navigate to="/admin/dashboard" replace />;
            case 'picker':
                return <Navigate to="/picker-dashboard" replace />;
            case 'delivery':
                return <Navigate to="/delivery-dashboard" replace />;
            case 'store-manager':
                return <Navigate to="/store-dashboard" replace />;
            default:
                return <Navigate to="/login" replace />;
        }
    }

    return children;
};

// Wrap the main app content with user context
const AppContent = () => {
    const { user, logout } = useUser();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

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

    return (
        <div className="App">
            <Routes>
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                    <ProtectedRoute roles="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Employee Routes */}
                <Route path="/employee/login" element={
                    !user ? <EmployeeLogin /> : <Navigate to={`/${user.role}-dashboard`} />
                } />

                <Route path="/picker-dashboard/*" element={
                    <ProtectedRoute roles="picker">
                        <PickerDashboard />
                    </ProtectedRoute>
                } />

                <Route path="/delivery-dashboard/*" element={
                    <ProtectedRoute roles="delivery">
                        <DeliveryDashboard />
                    </ProtectedRoute>
                } />

                <Route path="/store-dashboard/*" element={
                    <ProtectedRoute roles="store-manager">
                        <StoreDashboard />
                    </ProtectedRoute>
                } />

                {/* Public/User Routes */}
                <Route path="/*" element={
                    <>
                        <Navbar 
                            onCartClick={toggleCart} 
                            isAuthenticated={!!user} 
                            user={user} 
                            onLogout={logout}
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
                                !user ? <UserLogin /> : <Navigate to="/" />
                            } />
                            <Route path="/register" element={
                                !user ? <Register /> : <Navigate to="/" />
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
    );
};

// Main App component with providers
function App() {
    return (
        <Router>
            <UserProvider>
                <AppContent />
            </UserProvider>
        </Router>
    );
}

export default App;
