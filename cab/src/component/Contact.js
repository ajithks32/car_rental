import React, { useState } from 'react';
import './Contact.css'; 

import bg from "../image/page-title.png"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
    {/* Background Banner */}
          <div className="taxi-banner">
            <img src={bg} alt="Background" className="taxi-banner-img" />
            <div className="taxi-overlay">
              <h1 className="taxi-title">Contact</h1>
            </div>
          </div>
       <div
      className="contact-container"

    >
      <div className="taxi-form contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Contact Us</h2>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              aria-label="Your Name"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              aria-label="Your Email"
            />
          </div>
          <div className="input-group">
            <textarea
              name="message"
              placeholder="Your Message"
              className="textarea-field"
              value={formData.message}
              onChange={handleChange}
              aria-label="Your Message"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="send-button">
              Send Message
            </button>
            <button type="button" className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="contact-info-container">
        <div className="contact-info">
          <h3 className="info-title">Contact Info</h3>
          <p  className="info-text">You can reach us via the following methods:</p>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <p style={{color:"black"}} >+123456789</p>
          </div>
          <div className="info-item">
            <span className="info-icon">✉</span>
            <p style={{color:"black"}}>contact@example.com</p>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <p style={{color:"black"}}>123 Main Street, City, Country</p>
          </div>
        </div>
      </div>

      {/* Google Map Embed for Chennai Location */}
      <div className="location-map" style={{ width: '100%', marginTop: '30px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.41043228007!2d80.28204971416783!3d13.052775516145335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526495153865ad%3A0x2f4469cc87c96806!2sMarina%20Beach!5e0!3m2!1sen!2sin!4v1687921375365!5m2!1sen!2sin"
          width="100%"
          height="350"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex="0"
          title="Google Map Location"
          alt="Google map showing Marina Beach location"
        ></iframe>
      </div>
    </div>
    </>
  );
};

export default Contact;