import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <Navbar bg="custom" expand="lg" className="change fixed-top">
      <Container fluid className="change">
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/dashboard" className="fw-bold text-white">
          My Dashboard
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="text-white ms-4">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard/analytics" className="text-white">
              Analytics
            </Nav.Link>
            <Nav.Link as={Link} to="/settings" className="text-white">
              Settings
            </Nav.Link>

            {/* More Dropdown */}
            <NavDropdown title={<span className="text-white">More</span>} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/reports">
                Reports
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/help">
                Help
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* User Profile */}
          {user ? (
            <Nav className="align-items-center gaplow">
              <img
                src={`http://localhost:5000/uploads/${user.profilePic}`}
                alt="Profile"
                className="profile-pic"
              />
              <span className="text-white ms-2">{user.username}</span>
            </Nav>
          ) : (
            <Nav>
              <Link to="/signin" className="text-white">
                Login
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
