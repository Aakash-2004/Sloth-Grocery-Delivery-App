import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help! Reach out to our friendly support team.</p>
      </section>
      <section className="contact-form-section">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
          <button type="submit">Send Message</button>
          {submitted && <div className="contact-success">Thank you! We'll get back to you soon.</div>}
        </form>
        <div className="contact-support-card">
          <h2>Support</h2>
          <p>Email: support@sloth.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Live Chat: Use the Genie assistant!</p>
        </div>
      </section>
    </div>
  );
};

export default Contact; 