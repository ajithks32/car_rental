import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../image/page-title.png";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",  
    email: "",
    phone: "",  
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validation Functions
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validatePhone = (phone) => /^[7-9][0-9]{9}$/.test(phone);

  // Handle Form Submission
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset previous messages

    // Form Validation
    let validationErrors = {};
    if (!formData.username || !formData.email || !formData.phone || !formData.password) {
      validationErrors.general = "Please fill in all fields.";
    }
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }
    if (!validatePassword(formData.password)) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }
    if (!validatePhone(formData.phone)) {
      validationErrors.phone = "Please enter a valid 10-digit Indian phone number.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", formData);
      
      if (response.status === 201) {
        setMessage("Registration success...");
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setMessage(" Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <>
      {/* Background Banner */}
      <div className="bookurtaxi-banner">
        <img src={bg} alt="Background" className="bookurtaxi-banner-img" />
        <div className="bookurtaxi-overlay">
          <h1 className="bookurtaxi-title">Booking</h1>
          <p className="bookurtaxi-breadcrumb">
            <a href="/">Home</a> &gt; <a href="/">Pages</a> &gt; <a href="/">Booking</a>
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bookurtaxi-container">
        <div className="bookurtaxi-card">
          <div className="bookurtaxi-card-body">
            <h2 className="bookurtaxi-heading">Register to Your Account</h2>
            
            {/* Success or Error Message */}
            {message && <p className={message.includes("✅") ? "success-message" : "error-message"}>{message}</p>}
            
            <form onSubmit={handleRegisterClick}>
              <input type="text" className="bookurtaxi-input" name="username" value={formData.username} onChange={handleInputChange} placeholder="Enter your username" required />

              <input type="email" className="bookurtaxi-input" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
              {errors.email && <small className="bookurtaxi-error">{errors.email}</small>}

              <input type="tel" className="bookurtaxi-input" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" required />
              {errors.phone && <small className="bookurtaxi-error">{errors.phone}</small>}

              <input type="password" className="bookurtaxi-input" name="password" value={formData.password} onChange={handleInputChange} placeholder="Create a password" required />
              {errors.password && <small className="bookurtaxi-error">{errors.password}</small>}

              <button type="submit" className="taxi-submit-btn">Register</button>
              {errors.general && <div className="bookurtaxi-error">{errors.general}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
