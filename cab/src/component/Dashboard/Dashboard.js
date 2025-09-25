import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import DashboardNavbar from "./pages/DashboardNavbar";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content mt-5 pt-5 text-dark bg-white">

          <DashboardNavbar/>     
        <Outlet /> 
      </div>
    </div>
  );
};

export default Dashboard;
