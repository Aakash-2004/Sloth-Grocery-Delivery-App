import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FaFilter, FaSort, FaSearch } from 'react-icons/fa';
import ProductGrid from '../components/ProductGrid';
import API_URL from '../config/api';
import './Products.css';

const featuredProducts = [
  { _id: '1', name: 'Fresh Apples', images: ['/images/apple.jpg'], price: 2.99, discount: 10, inStock: true, category: { name: 'Fruits' }, rating: 4.8, reviewCount: 120 },
  { _id: '2', name: 'Whole Milk', images: ['/images/milk.jpg'], price: 3.49, discount: 0, inStock: true, category: { name: 'Dairy' }, rating: 4.6, reviewCount: 80 },
  { _id: '3', name: 'Brown Bread', images: ['/images/bread.jpg'], price: 2.49, discount: 5, inStock: false, category: { name: 'Bakery' }, rating: 4.2, reviewCount: 60 },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(featuredProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '-createdAt',
    search: searchParams.get('search') || ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query string
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        const response = await axios.get(`${API_URL}/products?${queryParams}`);
        setProducts(response.data.products);

        // Update URL with current filters
        setSearchParams(queryParams);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.response?.data?.message || 'Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, setSearchParams]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    setFilters(prev => ({
      ...prev,
      search: searchValue
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: '-createdAt',
      search: ''
    });
    setSearchParams({});
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <h1>Our Products</h1>
        <p>Browse our bestsellers and new arrivals. Quality delivered fast!</p>
      </section>
      <section className="products-featured">
        <h2>Featured Products</h2>
        <ProductGrid products={products} loading={loading} error={error} onAddToCart={() => {}} onAddToWishlist={() => {}} />
      </section>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            defaultValue={filters.search}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter />
        Filters
      </button>

      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            <button onClick={clearFilters}>Clear All</button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h4>Category</h4>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                min="0"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div className="filter-group">
            <h4>Sort By</h4>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
            >
              <option value="-createdAt">Newest</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratings.average">Highest Rated</option>
              <option value="name">Name: A to Z</option>
              <option value="-name">Name: Z to A</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            emptyMessage="No products match your filters"
          />
        </main>
      </div>
    </div>
  );
};

export default Products; 