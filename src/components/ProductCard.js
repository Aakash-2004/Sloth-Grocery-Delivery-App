import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import API_URL from '../config/api';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const {
    _id,
    name,
    slug,
    image,
    price,
    compareAtPrice,
    discount,
    unit,
    stock,
    ratings,
    isNewArrival,
    isBestSeller,
    isOnSale
  } = product;

  // Calculate discount percentage
  const discountPercentage = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : discount;

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }

    return stars;
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${slug || _id}`} className="product-card">
      <div className="product-image-container">
        <img
          src={image ? `${API_URL}${image}` : '/placeholder-product.jpg'}
          alt={name}
          className="product-image"
        />
        
        {/* Product badges */}
        <div className="product-badges">
          {isNewArrival && <span className="badge new">New</span>}
          {isBestSeller && <span className="badge bestseller">Best Seller</span>}
          {isOnSale && <span className="badge sale">Sale</span>}
          {discountPercentage > 0 && (
            <span className="badge discount">{discountPercentage}% OFF</span>
          )}
        </div>

        {/* Quick add to cart button */}
        <button
          className="quick-add-btn"
          onClick={handleAddToCart}
          disabled={stock?.available <= 0}
        >
          {stock?.available > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        
        <div className="product-price">
          {compareAtPrice && compareAtPrice > price ? (
            <>
              <span className="current-price">₹{price.toFixed(2)}</span>
              <span className="original-price">₹{compareAtPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">₹{price.toFixed(2)}</span>
          )}
          <span className="unit">/{unit}</span>
        </div>

        {ratings?.count > 0 && (
          <div className="product-rating">
            <div className="stars">
              {renderStars(ratings.average)}
            </div>
            <span className="rating-count">({ratings.count})</span>
          </div>
        )}

        {stock?.available <= stock?.lowStockThreshold && stock?.available > 0 && (
          <div className="low-stock-warning">
            Only {stock.available} left in stock
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard; 