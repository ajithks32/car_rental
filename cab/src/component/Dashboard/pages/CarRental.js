import React, { useEffect, useState } from "react";
import axios from "axios";
import "./carrental.css";
import ConfirmationModal from "./ConfirmationModal";

const CarRental = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rental/all");
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id,
    status,
    currentMeter = 0,
    extraCharge = 0
  ) => {
    try {
      await axios.patch(`http://localhost:5000/rental/update/${id}`, {
        status,
        currentMeter,
        extraCharge,
      });

      await fetchBookings();
    } catch (err) {
      console.error("Error updating booking status:", err);
    } finally {
      setModalOpen(false);
      setSelectedBooking(null);
    }
  };

  const openModal = (booking) => {
    if (booking.selectedPlan?.trim().toLowerCase() === "infinity") {
      handleStatusChange(booking._id, "Accepted", 0, 0);
    } else {
      setSelectedBooking(booking);
      setModalOpen(true);
    }
  };

  const activeBookings = bookings.filter(
    (booking) => booking.status !== "Accepted"
  );
  const completedBookings = bookings.filter(
    (booking) => booking.status === "Accepted"
  );

  if (loading)
    return (
      <div className="car-rental-container">
        <h2>Loading...</h2>
      </div>
    );
  if (error)
    return (
      <div className="car-rental-container">
        <h2>{error}</h2>
      </div>
    );

  return (
    <div className="car-rental-container">
      <h1 className="car-rental-title text-target ">Car Rental Bookings</h1>

      {/* Active Bookings */}
      <h2>Active Bookings</h2>
      <table className="car-rental-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Model</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Pickup</th>
            <th>Drop-off</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.bookingId}</td>
              <td>{booking.fullName}</td>
              <td>{booking.email}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.model}</td>
              <td>{booking.selectedPlan}</td>
              <td>₹{booking.amount}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropoffLocation}</td>
              <td>{booking.rentalDuration}</td>
              <td>
                <button
                  className="car-rental-accept-btn"
                  onClick={() => openModal(booking)}
                >
                  Accept
                </button>
                <button
                  className="car-rental-decline-btn"
                  onClick={() => handleStatusChange(booking._id, "Declined")}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Completed Bookings */}
      <h2>Completed Bookings</h2>
      <table className="car-rental-table completed-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Model</th>
            <th>Plan</th>
            <th>Amount (₹)</th>
            <th>Extra Charge (₹)</th>
            <th>Total Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {completedBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.bookingId}</td>
              <td>{booking.fullName}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.model}</td>
              <td>{booking.selectedPlan}</td>
              <td>₹{booking.amount - (booking.extraCharge || 0)}</td>
              <td>₹{booking.extraCharge || 0}</td>
              <td>₹{booking.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && selectedBooking && (
        <ConfirmationModal
          booking={selectedBooking}
          onConfirm={(currentMeter, extraCharge) =>
            handleStatusChange(
              selectedBooking._id,
              "Accepted",
              currentMeter,
              extraCharge
            )
          }
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CarRental;
