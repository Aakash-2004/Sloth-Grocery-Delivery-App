import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import API_URL from '../../config/api';
import '../../styles/AdminProducts.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('userToken');
      if (!token) return;

      // In production, fetch from actual API
      // const response = await axios.get(`${API_URL}/products`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Mock data for demonstration
      const mockProducts = [
        { id: '1', name: 'Fresh Apples', description: 'Organic fresh apples', price: 2.99, category: 'Fruits', stock: 100, image: 'apple.jpg' },
        { id: '2', name: 'Whole Milk', description: 'Farm fresh milk', price: 3.49, category: 'Dairy', stock: 50, image: 'milk.jpg' },
        { id: '3', name: 'Brown Bread', description: 'Freshly baked brown bread', price: 2.49, category: 'Bakery', stock: 30, image: 'bread.jpg' },
        { id: '4', name: 'Chicken Breast', description: 'Boneless chicken breast', price: 5.99, category: 'Meat', stock: 25, image: 'chicken.jpg' },
        { id: '5', name: 'Spinach', description: 'Fresh spinach leaves', price: 1.99, category: 'Vegetables', stock: 40, image: 'spinach.jpg' },
        { id: '6', name: 'Orange Juice', description: '100% natural orange juice', price: 3.99, category: 'Beverages', stock: 45, image: 'juice.jpg' },
        { id: '7', name: 'Greek Yogurt', description: 'Creamy Greek yogurt', price: 4.49, category: 'Dairy', stock: 35, image: 'yogurt.jpg' },
        { id: '8', name: 'Pasta', description: 'Italian pasta', price: 1.79, category: 'Grains', stock: 70, image: 'pasta.jpg' },
        { id: '9', name: 'Tomatoes', description: 'Vine ripened tomatoes', price: 2.29, category: 'Vegetables', stock: 60, image: 'tomatoes.jpg' },
        { id: '10', name: 'Cereal', description: 'Healthy breakfast cereal', price: 4.99, category: 'Breakfast', stock: 40, image: 'cereal.jpg' },
        { id: '11', name: 'Bananas', description: 'Fresh bananas', price: 1.49, category: 'Fruits', stock: 80, image: 'bananas.jpg' },
        { id: '12', name: 'Eggs', description: 'Free-range eggs', price: 3.99, category: 'Dairy', stock: 60, image: 'eggs.jpg' }
      ];

      setProducts(mockProducts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (editingProduct) {
        // In production, update via API
        // await axios.put(`${API_URL}/products/${editingProduct.id}`, formDataToSend, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        
        // Mock update for demonstration
        const updatedProducts = products.map(p => 
          p.id === editingProduct.id ? { ...p, ...formData, image: formData.image ? URL.createObjectURL(formData.image) : p.image } : p
        );
        setProducts(updatedProducts);
      } else {
        // In production, create via API
        // const response = await axios.post(`${API_URL}/products`, formDataToSend, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        
        // Mock create for demonstration
        const newProduct = {
          id: Date.now().toString(),
          ...formData,
          image: formData.image ? URL.createObjectURL(formData.image) : null
        };
        setProducts([...products, newProduct]);
      }

      // Reset form and state
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: null
      });
      setImagePreview(null);
      setEditingProduct(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product');
    }
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: null
    });
    setImagePreview(product.image.startsWith('http') ? product.image : null);
    setShowForm(true);
  };

  // Handle delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;

      // In production, delete via API
      // await axios.delete(`${API_URL}/products/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      // Mock delete for demonstration
      const filteredProducts = products.filter(p => p.id !== id);
      setProducts(filteredProducts);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <div className="products-loading">Loading products...</div>;
  if (error) return <div className="products-error">{error}</div>;

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Products Management</h1>
        <button className="add-product-btn" onClick={() => {
          setShowForm(!showForm);
          setEditingProduct(null);
          setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            stock: '',
            image: null
          });
          setImagePreview(null);
        }}>
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>
      
      {!showForm ? (
        <>
          <div className="products-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="table-responsive">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-image">
                        {product.image ? (
                          <img src={product.image.startsWith('http') ? product.image : `/images/products/${product.image}`} alt={product.name} />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </div>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td className="action-column">
                      <button className="edit-btn" onClick={() => handleEdit(product)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {pageNumbers.length > 1 && (
            <div className="pagination">
              <button
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              {pageNumbers.map(number => (
                <button
                  key={number}
                  className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
              
              <button
                className={`pagination-btn ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
                onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="product-form-container">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
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
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Grains">Grains</option>
                  <option value="Breakfast">Breakfast</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Product Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Product Preview" />
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products; 