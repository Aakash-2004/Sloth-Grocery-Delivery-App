import React from 'react';
import '../styles/TrendingProducts.css';

const TrendingProducts = ({ onAddToCart }) => {
  const products = [
    { id: 1, name: 'Organic Bananas', price: '₹49/kg', image: '/assets/product1.jpg' },
    { id: 2, name: 'Fresh Milk', price: '₹45/liter', image: '/assets/product2.jpg' },
    { id: 3, name: 'Whole Wheat Bread', price: '₹35/pack', image: '/assets/product3.jpg' }
  ];

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
    <section className="trending">
      <h2>Trending Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{product.price}</p>
            <button 
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts; 