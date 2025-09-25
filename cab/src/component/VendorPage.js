import React from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "./VendorSidebar";
import "./VendorPage.css";

const VendorPage = () => {
  return (
    <div className="vendor-page">
      <VendorSidebar /> 
      <div className="vendor-container">
        <Outlet /> {/* Renders child routes */}
      </div>
    </div>
  );
};

export default VendorPage;
