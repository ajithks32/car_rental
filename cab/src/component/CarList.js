import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Car from "./Car";
import taxi1 from "../image/taxi1.jpg";
import taxi2 from "../image/taxi2.jpg";
import taxi3 from "../image/taxi3.jpg";
import taxi4 from "../image/taxi4.jpg";
import taxi5 from "../image/taxi5.jpg";
import taxi6 from "../image/taxi6.jpg";
import taxi7 from "../image/taxi7.jpg";
import taxi8 from "../image/taxi8.jpg";
import taxi9 from "../image/taxi9.jpg";
import bg from "../image/page-title.png";
import "./taxicard.css";

const CarList = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const taxiData = [
    { image: taxi1, model: "Alfa Romeo", gear: "Automatic", capacity: "4-Seater", fuel: "Petrol", price: 2000 },
    { image: taxi2, model: "Bentley", gear: "Automatic", capacity: "5-Seater", fuel: "Diesel", price: 3000 },
    { image: taxi3, model: "Cadillac", gear: "Automatic", capacity: "4-Seater", fuel: "Petrol", price: 2500 },
    { image: taxi4, model: "Ferrari", gear: "Automatic", capacity: "4-Seater", fuel: "Hybrid", price: 5000 },
    { image: taxi5, model: "Hyundai", gear: "Automatic", capacity: "4-Seater", fuel: "Petrol", price: 1800 },
    { image: taxi6, model: "Isuzu", gear: "Automatic", capacity: "4-Seater", fuel: "Petrol", price: 2200 },
    { image: taxi7, model: "Kia", gear: "Automatic", capacity: "5-Seater", fuel: "Diesel", price: 2700 },
    { image: taxi8, model: "Mazda", gear: "Automatic", capacity: "4-Seater", fuel: "Petrol", price: 2000 },
    { image: taxi9, model: "Renault", gear: "Automatic", capacity: "4-Seater", fuel: "Hybrid", price: 2800 },
  ];

  const handleBooking = (car) => {
    if (user) {
      navigate("/selfdrivecar", { state: { ...car, formType: "car" } });
    } else {
      sessionStorage.setItem("pendingBooking", JSON.stringify({ ...car, formType: "car" }));
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="taxi-header-banner">
        <img src={bg} alt="Background" className="taxi-banner-image" />
        <div className="taxi-banner-overlay">
          <h1 className="taxi-heading">Booking</h1>
          <p className="taxi-navigation">
            <a href="/">Home</a> &gt; <a href="/">Booking</a>
          </p>
        </div>
      </div>

      <div className="card-container">
        <div className="card-layout">
          {taxiData.map((taxi, index) => (
            <Car key={index} {...taxi} onBook={() => handleBooking(taxi)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CarList;
