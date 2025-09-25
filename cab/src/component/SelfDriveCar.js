import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./bookurtaxi.css";
import bg from "../image/page-title.png";
import "./selfdrivecar.css";

const SelfDriveCar = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [rentalDuration, setRentalDuration] = useState("1 day");
  const [file, setFile] = useState(null);
  const [bookingId, setBookingId] = useState(""); // Store booking ID
  const [showPopup, setShowPopup] = useState(false); // Control pop-up visibility
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { model = "", selectedPlan = "", amount = "" } = location.state || {};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!pickupLocation || !dropoffLocation || !model || !selectedPlan || !amount || !fullName || !email || !phoneNumber) {
      alert("Please fill all the details");
      return;
    }

    const formData = new FormData();
    formData.append("model", model);
    formData.append("selectedPlan", selectedPlan);
    formData.append("amount", amount);
    formData.append("pickupLocation", pickupLocation);
    formData.append("dropoffLocation", dropoffLocation);
    formData.append("rentalDuration", rentalDuration);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/rental", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setBookingId(response.data.bookingId); // Store generated booking ID
        setShowPopup(true); // Show the pop-up
      }
    } catch (error) {
      console.error("Error booking car:", error);
      alert("Error booking car, please try again.");
    }
  };

  // Function to download booking ID as a text file
  const downloadBookingId = () => {
    const element = document.createElement("a");
    const file = new Blob([`Booking ID: ${bookingId}`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `booking-id-${bookingId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Reset form fields when pop-up is closed
  const handleClosePopup = () => {
    setShowPopup(false);
    setPickupLocation("");
    setDropoffLocation("");
    setRentalDuration("1 day");
    setFile(null);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <>
      {/* Banner Section */}
      <div className="taxi-banner">
        <img src={bg} alt="Background" className="taxi-banner-img" />
        <div className="taxi-overlay">
          <h1 className="taxi-title">Self Drive Car</h1>
          <p className="taxi-breadcrumb">
            <a href="/">Home</a> &gt; <a href="/">Self Drive Car</a>
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="taxi-form">
        <h1 className="taxi-form-title">Book Your Self Drive Car!</h1>

        {/* Car Model */}
        <div className="taxi-input-group">
          <input type="text" value={model} className="taxi-input" readOnly />
        </div>

        {/* Selected Plan */}
        <div className="taxi-input-group">
          <select className="taxi-select" disabled>
            <option>{selectedPlan || "Choose Your Plan"}</option>
          </select>
        </div>

        {/* Amount */}
        <div className="taxi-input-group">
          <input type="text" placeholder="Amount" className="taxi-input" value={amount} readOnly />
        </div>

        {/* Full Name */}
        <div className="taxi-input-group">
          <input
            type="text"
            placeholder="Full Name"
            className="taxi-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="taxi-input-group">
          <input
            type="email"
            placeholder="Email"
            className="taxi-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="taxi-input-group">
          <input
            type="tel"
            placeholder="Phone Number"
            className="taxi-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Pickup & Drop-off Locations */}
        <div className="taxi-input-group">
          <input
            type="text"
            placeholder="Pickup Location"
            className="taxi-input"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Drop-off Location"
            className="taxi-input"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div className="taxi-input-group">
          <input type="file" className="taxi-input" onChange={handleFileChange}  style={{ display: "block", visibility: "visible", opacity: 1 }}  />
        </div>

        {/* Date and Rental Duration */}
        <div className="taxi-input-group">
          <input type="date" className="taxi-input" />
          <select className="taxi-select" onChange={(e) => setRentalDuration(e.target.value)}>
            <option>1 day</option>
            <option>2 days</option>
            <option>1 week</option>
            <option>1 month</option>
          </select>
        </div>

        {/* Submit Button */}
        <button className="taxi-submit-btn" onClick={handleSubmit}>Book a Car</button>
      </div>

      {/* Pop-up for Booking Confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Booking Successfull!</h3>
            <p>Your Booking ID: <strong>{bookingId}</strong></p>
            <button onClick={downloadBookingId}>Download Booking ID</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SelfDriveCar;
