import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/bookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-dark">Booking Details</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading bookings...</p>
        </div>
      )}

      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th className="text-dark">Model</th>
                <th className="text-dark">Start Destination</th>
                <th className="text-dark">Booking ID</th>
                <th className="text-dark">End Destination</th>
                <th className="text-dark">Name</th>
                <th className="text-dark">Email</th>
                <th className="text-dark">Phone</th>
                <th className="text-dark">Type</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <strong>{booking.bookingId}</strong>
                    </td>
                    <td>{booking.model}</td>
                    <td>{booking.startDestination}</td>
                    <td>{booking.endDestination}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>
                      <span
                        className={`badge text-dark ${
                          booking.type === "single" ? "bg-info" : "bg-success"
                        }`}
                      >
                        {booking.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No Bookings Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
