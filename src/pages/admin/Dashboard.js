import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import '../../styles/AdminDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div className="dashboard-loading">Loading dashboard data...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <i className="fas fa-rupee-sign"></i>
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon products-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon customers-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Total Customers</h3>
            <p className="stat-value">{stats.totalCustomers}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-orders">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <a href="/admin/orders" className="view-all">View All</a>
          </div>
          <div className="orders-list">
            {stats.recentOrders.map(order => (
              <div key={order._id} className="order-item">
                <div className="order-info">
                  <h4>Order #{order._id.slice(-6)}</h4>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-details">
                  <span className="order-amount">{formatCurrency(order.totalAmount)}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="low-stock">
          <div className="section-header">
            <h2>Low Stock Alert</h2>
            <a href="/admin/products" className="view-all">View All</a>
          </div>
          <div className="stock-list">
            {stats.lowStockProducts.map(product => (
              <div key={product._id} className="stock-item">
                <img src={product.image} alt={product.name} />
                <div className="stock-info">
                  <h4>{product.name}</h4>
                  <p className="stock-quantity">
                    <span className={`stock-badge ${product.stock <= 5 ? 'critical' : 'warning'}`}>
                      {product.stock} units left
                    </span>
                  </p>
                </div>
                <button className="restock-btn">Restock</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 