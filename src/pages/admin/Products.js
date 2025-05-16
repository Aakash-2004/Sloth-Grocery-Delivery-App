import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/admin/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const fetchProducts = async (page = 1, search = '', cat = '') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      
      let url = `http://localhost:5000/api/products?page=${page}`;
      if (search) url += `&search=${search}`;
      if (cat) url += `&category=${cat}`;
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.products.map(p => p.category))];
      setCategories(uniqueCategories);
      
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts(currentPage, searchTerm, category);
  }, [currentPage]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts(1, searchTerm, category);
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
    fetchProducts(1, searchTerm, e.target.value);
  };
  
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };
  
  const handleDelete = async () => {
    if (!productToDelete) return;
    
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Remove the deleted product from the state
      setProducts(products.filter(p => p._id !== productToDelete._id));
      setShowDeleteModal(false);
      setProductToDelete(null);
      
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };
  
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  return (
    <div className="admin-products">
      <div className="page-header">
        <h1>Product Management</h1>
        <Link to="/admin/products/add" className="add-product-btn">
          <i className="fas fa-plus"></i> Add New Product
        </Link>
      </div>
      
      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        
        <select 
          value={category} 
          onChange={handleCategoryChange}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-products">No products found</td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product._id}>
                      <td>
                        <img 
                          src={`http://localhost:5000${product.image}`} 
                          alt={product.name} 
                          className="product-thumbnail" 
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stockCount}</td>
                      <td>
                        <span className={`status ${product.isAvailable ? 'available' : 'unavailable'}`}>
                          {product.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="action-buttons">
                        <Link to={`/admin/products/edit/${product._id}`} className="edit-btn">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          className="delete-btn"
                          onClick={() => confirmDelete(product)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}
      
      {showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete the product "{productToDelete?.name}"?</p>
            <p className="warning">This action cannot be undone.</p>
            
            <div className="delete-modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleDelete} className="confirm-btn">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products; 