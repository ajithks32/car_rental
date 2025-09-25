import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './Header.css';
import logo from '../image/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className='logo' src={logo} alt="logo" />
          RENTAL
          <FontAwesomeIcon icon={faCarSide} beatFade style={{ color:"rgb(255, 238, 0)", fontSize: "1.5em" }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
  <li className="nav-item">
    <Link className="nav-link" to="/">HOME</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/about">ABOUT</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/contact">CONTACT</Link>
  </li>
  {user && user.role === "admin" && (
    <li className="nav-item">
      <Link className="nav-link" to="/dashboard/analytics">DASHBOARD</Link>
    </li>
  )}
</ul>
<button className="login-btn" type="submit">
    <Link className="nav-link" to="/vendor">
          Vendor
      </Link>
    </button>

          {/* User Profile on the Right Side */}
          {user ? (
            <div className="user-profile">
              <img 
                src={`http://localhost:5000/uploads/${user.profilePic}`} 
                alt="Profile" 
                className="profile-pic"
              />
              <span className="username">{user.username}</span>
              <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" onClick={handleLogout} />
            </div>
          ) : (
            <Link to="/signin" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
