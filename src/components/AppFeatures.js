import React from 'react';
import '../styles/AppFeatures.css';

const AppFeatures = () => {
  const features = [
    {
      id: 1,
      icon: 'fas fa-clock',
      title: 'Real-time Tracking',
      description: 'Track your delivery in real-time'
    },
    {
      id: 2,
      icon: 'fas fa-shield-alt',
      title: 'Safe Delivery',
      description: 'Contactless delivery options'
    },
    {
      id: 3,
      icon: 'fas fa-percentage',
      title: 'Daily Deals',
      description: 'Exciting offers every day'
    },
    {
      id: 4,
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Always here to help you'
    }
  ];

  return (
    <section className="app-features">
      <h2>Why Choose Sloth?</h2>
      <div className="features-grid">
        {features.map(feature => (
          <div key={feature.id} className="feature">
            <i className={feature.icon}></i>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppFeatures; 