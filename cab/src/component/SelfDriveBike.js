import React from "react";
import "./bookurtaxi.css";
import bg from "../image/page-title.png";

const SelfDriveBike = () => {
  return (
    <>
      <div className="taxi-banner">
        <img src={bg} alt="Background" className="taxi-banner-img" />
        <div className="taxi-overlay">
          <h1 className="taxi-title">Self Drive Bike</h1>
          <p className="taxi-breadcrumb">
            <a href="/">Home</a> &gt;<a href="/">Self Drive Bike</a>
          </p>
        </div>
      </div>
      <div className="comingsoon" style={{ textAlign: "center", margin: "100px 30px", fontSize: "24px", fontWeight: "bold",color: " #facc15" }}>
      Coming Soon...
    </div>
    </>
  );
};

export default SelfDriveBike;
