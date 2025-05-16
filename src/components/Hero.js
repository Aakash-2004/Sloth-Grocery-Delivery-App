import React from 'react';
import '../styles/Hero.css';
import heroBg from '../assets/hero-bg.jpg';

const Hero = () => {
  return (
    <header className="hero" style={{ backgroundImage: `linear-gradient(rgba(74, 144, 226, 0.8), rgba(92, 107, 192, 0.8)), url(${heroBg})` }}>
      <div className="hero-content">
        <h1>Groceries Delivered in Minutes</h1>
        <p>Experience lightning-fast delivery with Sloth</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for products..." />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>
    </header>
  );
};

export default Hero; 