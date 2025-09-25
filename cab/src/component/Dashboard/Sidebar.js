import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [showCarsDropdown, setShowCarsDropdown] = useState(false);
  const [showBookingsDropdown, setShowBookingsDropdown] = useState(false);
  const [showOffersDropdown, setShowOffersDropdown] = useState(false);

  const carsDropdownRef = useRef(null);
  const bookingsDropdownRef = useRef(null);
  const offersDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        carsDropdownRef.current &&
        !carsDropdownRef.current.contains(event.target)
      ) {
        setShowCarsDropdown(false);
      }
      if (
        bookingsDropdownRef.current &&
        !bookingsDropdownRef.current.contains(event.target)
      ) {
        setShowBookingsDropdown(false);
      }
      if (
        offersDropdownRef.current &&
        !offersDropdownRef.current.contains(event.target)
      ) {
        setShowOffersDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Admin Panel</h3>

      {/* Dashboard */}
      <Link to="/dashboard" className="sidebar-link">
        <i className="bi bi-speedometer2 me-2"></i>Dashboard
      </Link>

      {/* Cars Dropdown */}
      <div className="dropdown" ref={carsDropdownRef}>
        <button
          className={`dropdown-btn ${showCarsDropdown ? "active" : ""}`}
          onClick={() => setShowCarsDropdown((prev) => !prev)}
        >
          <i className="bi bi-car-front me-2"></i>Cars
          <i
            className={`bi ${
              showCarsDropdown ? "bi-chevron-up" : "bi-chevron-down"
            } float-end`}
          ></i>
        </button>
        <ul className={`dropdown-menu ${showCarsDropdown ? "show" : ""}`}>
          <li>
            <Link to="/dashboard/cars" className="dropdown-item">
              <i className="bi bi-list-ul me-2"></i>All Cars
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-car" className="dropdown-item">
              <i className="bi bi-plus-circle me-2"></i>Add Car
            </Link>
          </li>
          <li>
            <Link to="/dashboard/edit-car" className="dropdown-item">
              <i className="bi bi-trash me-2"></i>Delete Car
            </Link>
          </li>
        </ul>
      </div>

      {/* Bookings Dropdown */}
      <div className="dropdown" ref={bookingsDropdownRef}>
        <button
          className={`dropdown-btn ${showBookingsDropdown ? "active" : ""}`}
          onClick={() => setShowBookingsDropdown((prev) => !prev)}
        >
          <i className="bi bi-calendar-check me-2"></i>Bookings
          <i
            className={`bi ${
              showBookingsDropdown ? "bi-chevron-up" : "bi-chevron-down"
            } float-end`}
          ></i>
        </button>
        <ul className={`dropdown-menu ${showBookingsDropdown ? "show" : ""}`}>
          <li>
            <Link to="/dashboard/bookings" className="dropdown-item">
              <i className="bi bi-car-front me-2"></i>Car Bookings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/carrental" className="dropdown-item">
              <i className="bi bi-calendar-plus me-2"></i>Rental Booking
            </Link>
          </li>
        </ul>
      </div>

      {/* Users */}
      <div className="static-btn">
        <Link to="/dashboard/users" className="static-btn-link">
          <i className="bi bi-people me-2"></i>Users
        </Link>
      </div>

      {/* Offers Dropdown */}
      <div className="dropdown" ref={offersDropdownRef}>
        <button
          className={`dropdown-btn ${showOffersDropdown ? "active" : ""}`}
          onClick={() => setShowOffersDropdown((prev) => !prev)}
        >
          <i className="bi bi-tags me-2"></i>Offers
          <i
            className={`bi ${
              showOffersDropdown ? "bi-chevron-up" : "bi-chevron-down"
            } float-end`}
          ></i>
        </button>
        <ul className={`dropdown-menu ${showOffersDropdown ? "show" : ""}`}>
          <li>
            <Link to="/dashboard/bannerimage" className="dropdown-item">
              <i className="bi bi-image me-2"></i>Banner Image
            </Link>
          </li>
          <li>
            <Link to="/dashboard/offerimage" className="dropdown-item">
              <i className="bi bi-file-image me-2"></i>Offer Image
            </Link>
          </li>
        </ul>
      </div>
      <div className="static-btn">
        <Link to="/dashboard/alert" className="static-btn-link">
          <i className="bi bi-people me-2"></i>Alert
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
