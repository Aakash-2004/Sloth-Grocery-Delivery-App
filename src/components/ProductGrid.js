import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import API_URL from '../config/api';
import './ProductGrid.css';

const ProductGrid = ({ products, loading, error, onAddToCart, onAddToWishlist }) => {
  if (loading) {
    return (
      <div className="product-grid-loading">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="product-card-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-price"></div>
              <div className="skeleton-rating"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid-error">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-message">
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <Link to={`/product/${product._id}`} className="product-image-link">
            <div className="product-image">
              <img 
                src={product.image ? `${API_URL}${product.image}` : '/placeholder-product.jpg'} 
                alt={product.name} 
              />
              {product.discount > 0 && (
                <span className="discount-badge">-{product.discount}%</span>
              )}
            </div>
          </Link>
          
          <div className="product-content">
            <Link to={`/product/${product._id}`} className="product-name">
              {product.name}
            </Link>
            
            <div className="product-category">
              {product.category}
            </div>
            
            <div className="product-rating">
              <FaStar className="star-icon" />
              <span>{product.ratings?.average?.toFixed(1) || '0.0'}</span>
              <span className="rating-count">({product.ratings?.count || 0})</span>
            </div>
            
            <div className="product-price">
              {product.discount > 0 ? (
                <>
                  <span className="original-price">₹{product.price.toFixed(2)}</span>
                  <span className="discounted-price">
                    ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="current-price">₹{product.price.toFixed(2)}</span>
              )}
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
              disabled={product.stock?.available <= 0}
            >
              <FaShoppingCart />
              {product.stock?.available > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button 
              className="add-to-wishlist-btn"
              onClick={() => onAddToWishlist(product)}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 