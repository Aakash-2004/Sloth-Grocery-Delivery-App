import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../config/api';
import '../../styles/AdminSettings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: '',
    deliveryFee: '',
    minOrderAmount: '',
    taxRate: '',
    currency: 'INR',
    theme: 'light'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSettings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch settings');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`${API_URL}/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  if (loading) return <div className="admin-settings-loading">Loading settings...</div>;

  return (
    <div className="admin-settings">
      <div className="settings-header">
        <h1>Store Settings</h1>
      </div>

      {error && <div className="settings-error">{error}</div>}
      {success && <div className="settings-success">{success}</div>}

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h2>Store Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="storeName">Store Name</label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="storeEmail">Store Email</label>
              <input
                type="email"
                id="storeEmail"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="storePhone">Store Phone</label>
              <input
                type="tel"
                id="storePhone"
                name="storePhone"
                value={settings.storePhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="storeAddress">Store Address</label>
              <textarea
                id="storeAddress"
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                required
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Order Settings</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="deliveryFee">Delivery Fee (₹)</label>
              <input
                type="number"
                id="deliveryFee"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="minOrderAmount">Minimum Order Amount (₹)</label>
              <input
                type="number"
                id="minOrderAmount"
                name="minOrderAmount"
                value={settings.minOrderAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="taxRate">Tax Rate (%)</label>
              <input
                type="number"
                id="taxRate"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                required
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Appearance</h2>
          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              required
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings; 