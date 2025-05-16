import React from 'react';
import '../styles/CartModal.css';

const CartModal = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
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
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="price">{item.price}</p>
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
                <h3>Total: ₹{total}</h3>
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