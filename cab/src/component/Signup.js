import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./signin.css";
import bg from "../image/page-title.png";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", event.target.username.value);
    formData.append("email", event.target.email.value);
    formData.append("phone", event.target.phone.value);
    formData.append("password", event.target.password.value);

    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setMessage("Sign up successful!");
        setTimeout(() => {
          navigate("/signin"); // Redirect after 2 seconds
        }, 2000);
      } else {
        setMessage("Registration failed. Try again.");
      }
    } catch (error) {
      setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <>
      <div className="taxi-banner">
        <img src={bg} alt="Background" className="taxi-banner-img" />
        <div className="taxi-overlay">
          <h1 className="taxi-title">Sign Up</h1>
        </div>
      </div>

      <div className="taxi-form signin">
        <h1 className="taxi-form-title">Sign Up</h1>
        {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
        <form onSubmit={handleSignUp}>
          <div className="taxi-input-group">
            <input type="text" name="username" placeholder="Username" className="taxi-input" required />
            <input type="email" name="email" placeholder="Enter your Email" className="taxi-input" required />
            <input type="tel" name="phone" placeholder="Enter your Phone Number" className="taxi-input" required />
            <input type="password" name="password" placeholder="Enter your Password" className="taxi-input" required />
            
            {/* Profile Picture Upload */}
            <input type="file"  style={{ display: "block", visibility: "visible", opacity: 1 }}  accept="image/*" className="taxi-input" onChange={(e) => setProfilePic(e.target.files[0])} />
          </div>
          <button type="submit" className="taxi-submit-btn">Sign Up</button>
        </form>
        <p style={{ color: "black", textAlign: "center", marginTop: "2px", cursor: "pointer" }}>
          Already have an account?{" "}
          <span style={{ color: "blue" }} onClick={() => navigate("/signin")}>Sign In</span>
        </p>
      </div>
    </>
  );
};

export default Signup;
