import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/admin/ProductForm.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    unit: '',
    weight: '',
    stockCount: '',
    isAvailable: true
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const product = response.data;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          unit: product.unit,
          weight: product.weight || '',
          stockCount: product.stockCount,
          isAvailable: product.isAvailable
        });
        
        setCurrentImage(`http://localhost:5000${product.image}`);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file (jpg, jpeg, png, webp)');
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setImage(file);
    setPreviewURL(URL.createObjectURL(file));
    setError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSaving(true);
    setError('');
    
    const formPayload = new FormData();
    Object.keys(formData).forEach(key => {
      formPayload.append(key, formData[key]);
    });
    
    if (image) {
      formPayload.append('image', image);
    }
    
    try {
      const token = localStorage.getItem('userToken');
      
      await axios.put(`http://localhost:5000/api/products/${id}`, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Redirect to products list
      navigate('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading product data...</div>;
  }
  
  return (
    <div className="product-form-container">
      <div className="page-header">
        <h1>Edit Product</h1>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="unit">Unit *</label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="e.g., kg, lbs, piece"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              placeholder="e.g., 500g, 1kg"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stockCount">Stock Count *</label>
            <input
              type="number"
              id="stockCount"
              name="stockCount"
              min="0"
              value={formData.stockCount}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
              />
              Available for Purchase
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Product Image</label>
          <div className="image-upload-container">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload"
            />
            <label htmlFor="image" className="image-upload-label">
              {previewURL ? 'Change Image' : 'Update Image'}
            </label>
            
            <div className="image-preview">
              <img src={previewURL || currentImage} alt={formData.name} />
            </div>
          </div>
          <small className="form-text">
            Current image will be kept if no new image is selected
          </small>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/admin/products')}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={saving}
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct; 