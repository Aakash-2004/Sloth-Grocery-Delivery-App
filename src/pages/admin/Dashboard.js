import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import API_URL from '../../config/api';
import '../../styles/AdminDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (!token) return;

        // For demonstration - in production, get real data from API
        // const response = await axios.get(`${API_URL}/admin/dashboard`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        
        // Mock data for demonstration
        setStats({
          users: 342,
          orders: 127,
          products: 89,
          revenue: 21560
        });
        
        setRecentOrders([
          { id: 'ORD-9384', customer: 'Alex Johnson', total: 78.50, status: 'delivered', date: '2023-06-15' },
          { id: 'ORD-9383', customer: 'Sarah Williams', total: 125.99, status: 'processing', date: '2023-06-15' },
          { id: 'ORD-9382', customer: 'Michael Brown', total: 43.25, status: 'delivered', date: '2023-06-14' },
          { id: 'ORD-9381', customer: 'Jessica Davis', total: 96.00, status: 'shipped', date: '2023-06-14' },
          { id: 'ORD-9380', customer: 'David Miller', total: 157.75, status: 'processing', date: '2023-06-13' }
        ]);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Returns appropriate class for order status
  const getStatusClass = (status) => {
    switch(status) {
      case 'delivered': return 'status-delivered';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      default: return '';
    }
  };

  if (loading) return <div className="dashboard-loading">Loading dashboard data...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon users-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-details">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.users}</p>
            <p className="stat-growth positive">+12% this month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-details">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.orders}</p>
            <p className="stat-growth positive">+5% this month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon products-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-details">
            <h3>Products</h3>
            <p className="stat-value">{stats.products}</p>
            <p className="stat-growth positive">+8 new this month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-details">
            <h3>Revenue</h3>
            <p className="stat-value">${stats.revenue.toLocaleString()}</p>
            <p className="stat-growth positive">+15% this month</p>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button className="view-all-btn">View All</button>
        </div>
        
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button className="view-details-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions Panel */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-btn">
            <i className="fas fa-plus"></i>
            Add New Product
          </button>
          <button className="action-btn">
            <i className="fas fa-user-plus"></i>
            Add New User
          </button>
          <button className="action-btn">
            <i className="fas fa-file-invoice-dollar"></i>
            Generate Report
          </button>
          <button className="action-btn">
            <i className="fas fa-cog"></i>
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 