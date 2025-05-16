import React from 'react';
import '../styles/Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="feature-card">
        <i className="fas fa-bolt"></i>
        <h3>10-Minute Delivery</h3>
        <p>Get your groceries delivered in just 10 minutes</p>
      </div>
      <div className="feature-card">
        <i className="fas fa-leaf"></i>
        <h3>Fresh Products</h3>
        <p>100% fresh and quality assured</p>
      </div>
      <div className="feature-card">
        <i className="fas fa-tag"></i>
        <h3>Best Prices</h3>
        <p>Competitive prices with daily deals</p>
      </div>
    </section>
  );
};

export default Features; 