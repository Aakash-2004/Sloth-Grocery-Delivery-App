import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again.');
        setLoading(false);
        
        if (err.response?.status === 401) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
          navigate('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (address)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      // Handle top-level properties
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const token = localStorage.getItem('userToken');
    
    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setFormData(response.data);
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      
      // Update the user data in localStorage
      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      
      if (err.response?.status === 401) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-container loading">Loading profile data...</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="profile-section">
          <h3>Personal Information</h3>
          
          <div className="form-group">
            <label>Name:</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            ) : (
              <span>{formData.name}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <span>{formData.email}</span>
          </div>
          
          <div className="form-group">
            <label>Phone:</label>
            {editMode ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            ) : (
              <span>{formData.phone || 'Not provided'}</span>
            )}
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Delivery Address</h3>
          
          <div className="form-group">
            <label>Street:</label>
            {editMode ? (
              <input
                type="text"
                name="address.street"
                value={formData.address?.street || ''}
                onChange={handleChange}
                placeholder="Street address"
              />
            ) : (
              <span>{formData.address?.street || 'Not provided'}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>City:</label>
            {editMode ? (
              <input
                type="text"
                name="address.city"
                value={formData.address?.city || ''}
                onChange={handleChange}
                placeholder="City"
              />
            ) : (
              <span>{formData.address?.city || 'Not provided'}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>State:</label>
            {editMode ? (
              <input
                type="text"
                name="address.state"
                value={formData.address?.state || ''}
                onChange={handleChange}
                placeholder="State/Province"
              />
            ) : (
              <span>{formData.address?.state || 'Not provided'}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>ZIP Code:</label>
            {editMode ? (
              <input
                type="text"
                name="address.zipCode"
                value={formData.address?.zipCode || ''}
                onChange={handleChange}
                placeholder="ZIP Code"
              />
            ) : (
              <span>{formData.address?.zipCode || 'Not provided'}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>Country:</label>
            {editMode ? (
              <input
                type="text"
                name="address.country"
                value={formData.address?.country || ''}
                onChange={handleChange}
                placeholder="Country"
              />
            ) : (
              <span>{formData.address?.country || 'Not provided'}</span>
            )}
          </div>
        </div>
        
        <div className="profile-actions">
          {editMode ? (
            <>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              type="button" 
              className="edit-btn" 
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile; 