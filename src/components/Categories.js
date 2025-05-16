import React from 'react';
import '../styles/Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Fruits & Vegetables', image: '/assets/fruits.jpg' },
    { id: 2, name: 'Dairy & Bakery', image: '/assets/dairy.jpg' },
    { id: 3, name: 'Beverages', image: '/assets/beverages.jpg' },
    { id: 4, name: 'Snacks', image: '/assets/snacks.jpg' }
  ];

  return (
    <section id="categories" className="categories">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories; 