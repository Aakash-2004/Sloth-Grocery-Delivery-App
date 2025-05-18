import React from 'react';
import './About.css';
import { FaRocket, FaLeaf, FaSmile, FaShippingFast } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Sloth</h1>
          <p>Delivering groceries at lightning speed with a smile!</p>
        </div>
      </div>
      
      <div className="about-sections">
        <div className="about-section">
          <h2><FaRocket className="icon" /> Our Mission</h2>
          <p>To make grocery shopping effortless, fast, and joyful for everyone. We combine cutting-edge technology, efficient logistics, and a genuine passion for customer service to bring you the best grocery delivery experience possible.</p>
        </div>
        
        <div className="about-section">
          <h2><FaLeaf className="icon" /> Our Vision</h2>
          <p>We envision a world where quality groceries are accessible to everyone, delivered sustainably and efficiently, saving you time for the things that matter most in your life.</p>
        </div>
        
        <div className="about-section">
          <h2><FaSmile className="icon" /> Our Values</h2>
          <p>At Sloth, we believe in customer satisfaction, product quality, sustainability, and innovation. Every decision we make is guided by these core values to ensure we consistently exceed your expectations.</p>
        </div>
      </div>
      
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/images/team1.jpg" alt="Founder" />
            <h3>Aakash</h3>
            <p className="role">Founder & CEO</p>
            <p>Passionate about making grocery shopping hassle-free with technology.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions about our service? Want to partner with us? We'd love to hear from you!</p>
        <div className="contact-buttons">
          <a href="/contact" className="contact-btn primary">
            <i className="fas fa-envelope"></i> Contact Us
          </a>
          <a href="tel:+919876543210" className="contact-btn secondary">
            <i className="fas fa-phone"></i> Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About; 