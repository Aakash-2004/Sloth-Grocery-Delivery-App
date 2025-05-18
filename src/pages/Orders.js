import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Orders.css';
import API_URL from '../config/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#2ecc71';
      case 'processing':
        return '#3498db';
      case 'cancelled':
        return '#e74c3c';
      case 'out for delivery':
        return '#f1c40f';
      default:
        return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-hero">
        <h1>My Orders</h1>
        <p>Track your orders and view order history</p>
      </div>

      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <i className="fas fa-shopping-bag"></i>
            <h2>No Orders Yet</h2>
            <p>Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div 
                key={order._id} 
                className={`order-card ${selectedOrder?._id === order._id ? 'expanded' : ''}`}
                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
              >
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-6)}</h3>
                    <p className="order-date">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                    <span className="order-total">₹{order.totalAmount}</span>
                  </div>
                </div>

                {selectedOrder?._id === order._id && (
                  <div className="order-details">
                    <div className="delivery-info">
                      <h4>Delivery Address</h4>
                      <p>{order.deliveryAddress.street}</p>
                      <p>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                      <p>{order.deliveryAddress.zipCode}</p>
                    </div>

                    <div className="items-list">
                      <h4>Order Items</h4>
                      {order.items.map(item => (
                        <div key={item._id} className="order-item">
                          <img src={item.product.image} alt={item.product.name} />
                          <div className="item-details">
                            <h5>{item.product.name}</h5>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-summary">
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal}</span>
                      </div>
                      <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>₹{order.deliveryFee}</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="summary-row discount">
                          <span>Discount</span>
                          <span>-₹{order.discount}</span>
                        </div>
                      )}
                      <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {order.status === 'processing' && (
                      <div className="order-actions">
                        <button className="cancel-order-btn">
                          Cancel Order
                        </button>
                        <button className="track-order-btn">
                          Track Order
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 