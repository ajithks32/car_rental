import React, { useState } from "react";

const ConfirmationModal = ({ booking, onConfirm, onCancel }) => {
  const [currentMeter, setCurrentMeter] = useState("");

  const startPoint = 0; // Static start point
  const formattedPlan = booking.selectedPlan?.trim().toLowerCase().replace(/\s+/g, "");

  // Set max free KM based on selected plan
  let maxFreeKM;
  if (formattedPlan === "24hr") {
    maxFreeKM = 359;
  } else if (formattedPlan === "8hr") {
    maxFreeKM = 299;
  } else if (formattedPlan === "infinity") {
    maxFreeKM = Infinity; // No extra charge for Infinity plan
  } else {
    maxFreeKM = 299; // Default
  }

  const currentMeterNum = Number(currentMeter);
  const distanceTraveled = currentMeterNum > startPoint ? currentMeterNum - startPoint : 0;
  const extraKM = distanceTraveled > maxFreeKM ? distanceTraveled - maxFreeKM : 0;
  const extraCharge = extraKM * 8; // ₹8 per extra KM

  const handleConfirm = () => {
    if (!currentMeter) {
      alert("Please enter the ending KM.");
      return;
    }
    if (currentMeterNum < startPoint) {
      alert("Current Meter KM should be greater than 1 KM.");
      return;
    }
    onConfirm(currentMeterNum, extraCharge);
  };
  console.log("Distance Traveled:", distanceTraveled);
  console.log("Max Free KM:", maxFreeKM);
  console.log("Extra KM:", extraKM);
  console.log("Extra Charge:", extraCharge);
  
  return (
    <div className="car-rental-modal-overlay">
<div className="car-rental-modal">
  <h2>Confirm Booking</h2>
  <p>Are you sure you want to accept the booking for {booking.fullName}?</p>

  {/* Show the selected plan and free KM in UI */}
  <p>
    <strong>Selected Plan: </strong> {booking.selectedPlan} <br />
    <strong>Max Free KM: </strong> {maxFreeKM === Infinity ? "Unlimited" : maxFreeKM} KM
  </p>

  <div className="input-group">
    <label>Ending Point(KM):</label>
    <input
      type="number"
      value={currentMeter}
      onChange={(e) => setCurrentMeter(e.target.value)}
      placeholder="Enter current KM"
    />
  </div>

  <div className="extra-charge">
    {formattedPlan === "infinity" ? (
      <strong>No Extra Charge (Infinity Plan)</strong>
    ) : extraKM > 0 ? (
      <>
        <strong>Extra KM: </strong> {extraKM} KM <br />
        <strong>Extra Charge: </strong> ₹{extraCharge}
      </>
    ) : (
      <strong>No Extra Charge</strong>
    )}
  </div>

  <div className="car-rental-modal-actions">
    <button className="car-rental-confirm-btn" onClick={handleConfirm}>
      Confirm
    </button>
    <button className="car-rental-cancel-btn" onClick={onCancel}>
      Cancel
    </button>
  </div>
</div>


    </div>
  );
};

export default ConfirmationModal;
