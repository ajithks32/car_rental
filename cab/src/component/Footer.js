import "./Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import logo from '../image/logo.png';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h2>
          <img className='logo' src={logo} alt="logo" />
            <span> RENTAL </span><FontAwesomeIcon icon={faCarSide} beatFade style={{ color: "white", fontSize: "1.5em" }} /> 
          </h2>
          <p>
            We provide the best cars at the best prices. We are experts in car rental. Enjoy your holidays with us. We make your drive memorable. We care for your safety.
          </p>
          {/* Social Icons */}
          <div className="footer-social">
            <a href="/"><i className="fab fa-facebook"></i></a>
            <a href="/"><i className="fab fa-twitter"></i></a>
            <a href="/"><i className="fab fa-instagram"></i></a>
            <a href="/"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="/">About</a></li>
            <li><a href="/">Gallery</a></li>
            <li><a href="/">Team</a></li>
            <li><a href="/">Cars</a></li>
            <li><a href="/">Testimonials</a></li>
            <li><a href="/">Blogs</a></li>
            <li><a href="/">FAQs</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Services</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-contact">
          <h3>Contact Info</h3>
          <ul>
            <li><i className="fas fa-phone-alt"></i>9876543210</li>
            <li><i className="fas fa-envelope"></i> abc@gmail.com</li>
            <li><i className="fas fa-map-marker-alt"></i> MASS, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>Designed By MASS | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
