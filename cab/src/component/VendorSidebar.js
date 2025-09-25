import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Vendorsidebar.css";

const VendorSidebar = () => {
  return (
    <div className="vendor-sidebar">
      <h3 className="sidebar-title">Admin Panel</h3>
      <h3 className="sidebar-title">Menu</h3>

      <NavLink to="/vendor/vendor-add-car" className="vendor-link">
        <i className="bi bi-plus-circle me-2"></i>Add Cars
      </NavLink>

      <NavLink to="/vendor/vendor-car-list" className="vendor-link">
        <i className="bi bi-car-front me-2"></i>Car List
      </NavLink>

      <NavLink to="/logout" className="vendor-link">
        <FontAwesomeIcon icon={faSignOutAlt} className="vendor-logout-icon" style={{ color: "#ffee02" }} /> Log Out
      </NavLink>
    </div>
  );
};

export default VendorSidebar;
