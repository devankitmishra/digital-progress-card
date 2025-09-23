// src/pages/ContactPage.js
import React, { useState } from 'react';
import '../../styles/contact.css';
import AboutPage from './AboutPage';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted', formData);
    }
  };

  return (
    <>
    <div className="contact-container">
      <div className="contact-card">
        <div className="card-content">
          <h2>Get in Touch</h2>
          <p>We are here to help you. Contact us for any inquiries or support.</p>
        </div>
      </div>
      <div className="contact-form">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
    <hr />
    <AboutPage />
    </>
  );
};

export default ContactPage;