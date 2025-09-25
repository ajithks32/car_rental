import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./taxicard.css";

const TaxiCard = ({ image, model, gear, capacity, fuel, price8hr, price24hr, priceInfinity, icon }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handlePlanChange = (event) => {
    const plan = event.target.value;
    setSelectedPlan(plan);

    // Set the amount based on the selected plan
    if (plan === "8 hr") setAmount(`₹${price8hr}`);
    else if (plan === "24 hr") setAmount(`₹${price24hr}`);
    else if (plan === "Infinity") setAmount(`₹${priceInfinity}`);
  };

  const handleBooking = () => {
    if (!selectedPlan || !amount) {
      alert("Please select a plan before booking!");
      return;
    }
  
    if (user) {
      // User is logged in, proceed to booking
      navigate("/selfdrivecar", {
        state: { model, selectedPlan, amount, formType: "car" },
      });
    } else {
      // Store booking details in sessionStorage before redirecting to login
      sessionStorage.setItem("pendingBooking", JSON.stringify({ model, selectedPlan, amount, formType: "car" }));
      navigate("/signin");
    }
  };
  

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card-image-section">
        <img src={`http://localhost:5000${image}`} alt={model} className="card-photo" />
      </div>

      <div className="card-info">
        <div
          className="card-icon"
          style={{
            backgroundImage: `url(http://localhost:5000${icon})`,
          }}
        ></div>
        <h3 className="tcard-heading">{model}</h3>
        <p className="tcard-details">Gear: {gear}</p>
        <p className="tcard-details">Capacity: {capacity}</p>
        <p className="tcard-details">Fuel: {fuel}</p>

        <div className="plan-selection">
          <label className="tcard-details">Select Plan:</label>
          <select className="plan-dropdown" onChange={handlePlanChange}>
            <option>Choose Your Plan</option>
            <option value="8 hr">8 Hours - ₹{price8hr}</option>
            <option value="24 hr">24 Hours - ₹{price24hr}</option>
            <option value="Infinity">Unlimited - ₹{priceInfinity}</option>
          </select>
        </div>

        <button className="book-btn" onClick={handleBooking}>
          Book Taxi
        </button>
      </div>
    </motion.div>
  );
};

export default TaxiCard;
