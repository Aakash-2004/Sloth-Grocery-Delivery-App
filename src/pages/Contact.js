import React, { useState } from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus({ type: 'success', message: 'Message sent successfully! We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We're here to help! Get in touch with us for any questions or feedback.</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Our Location</h3>
            <p>123 Grocery Street</p>
            <p>Mumbai, Maharashtra 400001</p>
          </div>
          
          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Phone Number</h3>
            <p>+91 98765 43210</p>
            <p>+91 98765 43211</p>
          </div>
          
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email Address</h3>
            <p>support@sloth.com</p>
            <p>info@sloth.com</p>
          </div>
          
          <div className="info-card">
            <FaClock className="info-icon" />
            <h3>Working Hours</h3>
            <p>Monday - Saturday</p>
            <p>8:00 AM - 10:00 PM</p>
          </div>
        </div>

        <div className="form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            
            {status.message && (
              <div className={`alert ${status.type}`}>
                {status.type === 'loading' && <div className="spinner"></div>}
                {status.message}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <div className="input-wrapper">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  rows="5"
                ></textarea>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={status.type === 'loading'}
            >
              {status.type === 'loading' ? (
                <>
                  <div className="spinner-small"></div> Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 