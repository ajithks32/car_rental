import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Car.css";

const Car = ({ image, model, gear, capacity, fuel, price }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const bookingData = { model, gear, capacity, fuel, price, formType: "taxi" };
  
    if (user) {
      // Redirect based on formType
      navigate("/bookurtaxi", { state: bookingData });
    } else {
      // Save booking data and redirect to sign-in
      sessionStorage.setItem("pendingBooking", JSON.stringify(bookingData));
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
        <img src={image} alt={model} className="card-photo" />
      </div>

      <div className="card-info">
        <h3 className="tcard-heading">{model}</h3>
        <p className="tcard-details">Gear: {gear}</p>
        <p className="tcard-details">Capacity: {capacity}</p>
        <p className="tcard-details">Fuel: {fuel}</p>
        <p className="tcard-details">Price: ₹{price}</p>

        <button className="book-btn" onClick={handleBooking}>
          Book Taxi
        </button>
      </div>
    </motion.div>
  );
};

export default Car;
