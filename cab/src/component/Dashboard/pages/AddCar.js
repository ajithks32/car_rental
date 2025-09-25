import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddCar.css";

const AddCar = ({ onTaxiAdded }) => {
  const [formData, setFormData] = useState({
    model: "",
    gear: "",
    capacity: "",
    fuel: "",
    price8hr: "",
    price24hr: "",
    priceInfinity: "",
  });
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleIconChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !icon) {
      toast.error("Please select both an image and an icon", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const data = new FormData();
    data.append("image", image);
    data.append("icon", icon);
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/taxis", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
      onTaxiAdded();

      setFormData({
        model: "",
        gear: "",
        capacity: "",
        fuel: "",
        price8hr: "",
        price24hr: "",
        priceInfinity: "",
      });
      setImage(null);
      setIcon(null);
      e.target.reset();
    } catch (error) {
      console.error("Error adding taxi:", error);
      
    }
  };

  return (
    <div className="add-car-container">
      <form onSubmit={handleSubmit} className="add-car-form">
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Banner Image:</label>
              <input type="file" onChange={handleImageChange} required />
            </div>
            <div className="form-group">
              <label>Model:</label>
              <input type="text" name="model" value={formData.model} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gear:</label>
              <input type="text" name="gear" value={formData.gear} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Capacity:</label>
              <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fuel Type:</label>
              <input type="text" name="fuel" value={formData.fuel} onChange={handleChange} required />
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Car Image:</label>
              <input type="file" onChange={handleIconChange} required />
            </div>
            <div className="form-group">
              <label>Price for 8 hrs:</label>
              <input type="number" name="price8hr" value={formData.price8hr} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Price for 24 hrs:</label>
              <input type="number" name="price24hr" value={formData.price24hr} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Price for Infinity:</label>
              <input type="number" name="priceInfinity" value={formData.priceInfinity} onChange={handleChange} required />
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Add Taxi</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCar;