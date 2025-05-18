import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import '../../styles/AdminCustomers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/admin/customers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch customers');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div className="admin-customers-loading">Loading customers...</div>;
  if (error) return <div className="admin-customers-error">{error}</div>;

  return (
    <div className="admin-customers">
      <div className="customers-header">
        <h1>Customers Management</h1>
        <div className="customers-filters">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer._id}>
                <td>
                  <div className="customer-info">
                    <div className="customer-avatar">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{customer.name}</span>
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.totalOrders}</td>
                <td>{formatCurrency(customer.totalSpent)}</td>
                <td>{customer.lastOrder ? formatDate(customer.lastOrder) : 'No orders'}</td>
                <td>
                  <span className={`status-badge ${customer.status}`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div className="customer-modal">
          <div className="modal-content">
            <button 
              className="close-btn"
              onClick={() => setSelectedCustomer(null)}
            >
              ×
            </button>
            <h2>Customer Details</h2>
            
            <div className="customer-details">
              <div className="customer-profile">
                <div className="profile-avatar">
                  {selectedCustomer.name.charAt(0).toUpperCase()}
                </div>
                <h3>{selectedCustomer.name}</h3>
                <p className="customer-email">{selectedCustomer.email}</p>
                <span className={`status-badge ${selectedCustomer.status}`}>
                  {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                </span>
              </div>

              <div className="customer-stats">
                <div className="stat-item">
                  <h4>Total Orders</h4>
                  <p>{selectedCustomer.totalOrders}</p>
                </div>
                <div className="stat-item">
                  <h4>Total Spent</h4>
                  <p>{formatCurrency(selectedCustomer.totalSpent)}</p>
                </div>
                <div className="stat-item">
                  <h4>Last Order</h4>
                  <p>{selectedCustomer.lastOrder ? formatDate(selectedCustomer.lastOrder) : 'No orders'}</p>
                </div>
                <div className="stat-item">
                  <h4>Member Since</h4>
                  <p>{formatDate(selectedCustomer.createdAt)}</p>
                </div>
              </div>

              <div className="recent-orders">
                <h3>Recent Orders</h3>
                {selectedCustomer.recentOrders?.length > 0 ? (
                  <div className="orders-list">
                    {selectedCustomer.recentOrders.map(order => (
                      <div key={order._id} className="order-item">
                        <div className="order-info">
                          <h4>Order #{order._id.slice(-6)}</h4>
                          <p className="order-date">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="order-details">
                          <span className="order-amount">{formatCurrency(order.totalAmount)}</span>
                          <span className={`order-status ${order.status}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-orders">No recent orders</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers; 