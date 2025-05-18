import React from 'react';
import '../styles/CartModal.css';

const CartModal = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    // Handle different price formats (string or number)
    let price;
    if (typeof item.price === 'string') {
      // If price is already a string, extract numbers
      price = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    } else if (typeof item.price === 'number') {
      // If price is a number, use it directly
      price = item.price;
    } else {
      // Default to 0 if price is undefined or another type
      price = 0;
    }
    return sum + price;
  }, 0);

  return (
    <div className="cart-modal">
      <div className="cart-modal-content">
        <span className="close-cart" onClick={onClose}>&times;</span>
        <h2>Your Cart</h2>
        <div id="cart-items">
          {cartItems && cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img 
                    src={item.image ? `${process.env.REACT_APP_API_URL || ''}${item.image}` : '/placeholder-product.jpg'} 
                    alt={item.name} 
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="price">
                      {typeof item.price === 'number' 
                        ? `₹${item.price.toFixed(2)}` 
                        : item.price}
                    </p>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => onRemoveItem(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <div className="cart-total">
                <h3>Total: ₹{typeof total === 'number' ? total.toFixed(2) : total}</h3>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="cart-actions">
          <button id="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal; 