import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./signin.css";
import bg from "../image/page-title.png";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formType, model, selectedPlan, amount } = location.state || {};

  const [message, setMessage] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
  
      if (response.status === 200) {
        setMessage("Login successful!...");
  
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
  
        // Retrieve pending booking details
        const pendingBooking = JSON.parse(sessionStorage.getItem("pendingBooking"));
        let redirectPath = "/";
        if (pendingBooking) {
          console.log("Booking Type:", pendingBooking.formType);
          redirectPath = pendingBooking.formType === "taxi" ? "/bookurtaxi" : "/selfdrivecar";
        }
        
        setTimeout(() => {
          navigate(redirectPath, { state: pendingBooking });
          sessionStorage.removeItem("pendingBooking"); // Clear pending booking
          window.location.reload(); // Reload to update header
        }, 2000);
      }
    } catch (error) {
      setMessage("Login failed. Invalid credentials.");
    }
  };
  
  

  return (
    <>
      {/* Background Banner */}
      <div className="taxi-banner">
        <img src={bg} alt="Background" className="taxi-banner-img" />
        <div className="taxi-overlay">
          <h1 className="taxi-title">Sign In</h1>
        </div>
      </div>

      {/* Sign In Form */}
      <div className="taxi-form signin">
        <h1 className="taxi-form-title">Sign In</h1>
        {message && <p style={{ color: message.includes("failed") ? "red" : "green", textAlign: "center" }}>{message}</p>}
        <form onSubmit={handleSignIn}>
          <div className="taxi-input-group">
            <input type="email" name="email" placeholder="Enter your Email" className="taxi-input" required />
            <input type="password" name="password" placeholder="Enter your Password" className="taxi-input" required />
          </div>
          <button type="submit" className="taxi-submit-btn">Sign In</button>
        </form>
        <p style={{ color: "black", textAlign: "center", marginTop: "2px", cursor: "pointer" }}>
          New User?{" "}
          <span style={{ color: "blue" }} onClick={() => navigate("/signup", { state: location.state })}>
            Sign Up
          </span>
        </p>
      </div>

      {/* Call for Booking Section */}
      <div className="cab-booking-container">
        <div className="cab-booking-content">
          <div className="cab-info">
            <p className="cab-subtitle">LONG ESTABLISHED FACT THAT A READER</p>
            <h2 className="cab-title">BOOK YOUR CAB IT'S SIMPLE AND AFFORDABLE</h2>
          </div>
          <div className="cab-contact">
            <div className="cab-call">
              <p className="cab-phone-text">📱 CALL FOR TAXI</p>
              <p className="cab-phone-number">5267-214-392</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
