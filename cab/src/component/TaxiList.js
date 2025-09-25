import React, { useEffect, useState } from "react";
import axios from "axios";
import TaxiCard from "./Taxicard";
import bg from "../image/page-title.png";
import "./taxicard.css";

const TaxiList = () => {
  const [taxiData, setTaxiData] = useState([]);

  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const response = await axios.get("http://localhost:5000/taxis");
        setTaxiData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching taxis:", error);
      }
    };

    fetchTaxis();
  }, []);

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
        <div className="card-grid">
          {taxiData.length > 0 ? (
            taxiData.map((taxi, index) => (
              <TaxiCard
                key={index}
                image={taxi.image}
                model={taxi.model}
                gear={taxi.gear}
                capacity={taxi.capacity}
                fuel={taxi.fuel}
                price8hr={taxi.price8hr}
                price24hr={taxi.price24hr}
                priceInfinity={taxi.priceInfinity}
                icon={taxi.icon} // Pass the icon field
              />
            ))
          ) : (
            <p>Loading taxis...</p>
          )}
        </div>
      </div>

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

export default TaxiList;