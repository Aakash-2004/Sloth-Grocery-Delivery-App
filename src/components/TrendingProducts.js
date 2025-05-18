import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import '../styles/TrendingProducts.css';

const TrendingProducts = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`, {
          params: {
            limit: 3,
            sort: '-ratings.average' // Sort by highest rated products
          }
        });
        setProducts(response.data.products || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending products:', err);
        setError('Failed to load trending products');
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return (
      <section className="trending">
        <h2>Trending Products</h2>
        <div className="product-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="product-card loading">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="trending">
        <h2>Trending Products</h2>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="trending">
      <h2>Trending Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image ? `${API_URL}${product.image}` : '/placeholder-product.jpg'} 
                alt={product.name} 
              />
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price.toFixed(2)}/{product.unit}</p>
              <button 
                className="add-to-cart"
                onClick={() => onAddToCart(product)}
                disabled={product.stock?.available <= 0}
              >
                {product.stock?.available > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts; 