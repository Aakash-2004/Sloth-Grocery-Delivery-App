import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import LocationDisplay from './LocationDisplay';

const Navbar = ({ onCartClick, isAuthenticated, user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo">
          <img src={logo} alt="Sloth Logo" />
          <h1>Sloth</h1>
        </div>
        {isAuthenticated && <LocationDisplay />}
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <div className="account-dropdown">
          <button className="account-btn" onClick={toggleDropdown}>
            {isAuthenticated && user ? user.name : 'My Account'}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <button className="logout-btn active" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">User Login</Link>
                  <Link to="/employee/login">Employee Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          )}
        </div>
        <button className="cart-btn" onClick={onCartClick} aria-label="Cart">
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 