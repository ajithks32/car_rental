import React, { useState, useEffect } from "react";
import axios from "axios";
import "./offers.css";

const Offers = () => {
  const [files, setFiles] = useState(Array(6).fill(null)); // Array for 6 images
  const [message, setMessage] = useState("");
  const [offers, setOffers] = useState([]); // Store uploaded offers

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/offers");
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleFileChange = (index, e) => {
    const selectedFile = e.target.files[0];
    const newFiles = [...files];
    newFiles[index] = selectedFile;
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.every((file) => file === null)) {
      setMessage("Please select at least one image file.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      if (file) {
        formData.append("images", file);
      }
    });

    try {
      await axios.post("http://localhost:5000/offers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Offer images uploaded successfully!");
      setFiles(Array(6).fill(null)); // Reset fields
      fetchOffers(); // Refresh offer list after upload
    } catch (error) {
      setMessage("Error uploading offer images.");
      console.error("Upload error:", error);
    }
  };

  const handleDelete = async (imageUrl) => {
    try {
      await axios.delete("http://localhost:5000/offers", {
        data: { imageUrl },
      });

      setMessage("Image deleted successfully!");
      fetchOffers(); // Refresh list after deletion
    } catch (error) {
      setMessage("Error deleting image.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="offer-container">
      {/* Left Side - Upload Form */}
      <div className="offer-upload-form">
        <h2 className="form-title">Upload Offer Images</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {files.map((file, index) => (
              <label key={index} className="file-input">
                <span className="file-label">Select Image {index + 1}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                  required={index === 0} // At least one file is required
                />
                {file && <span className="file-preview">{file.name}</span>}
              </label>
            ))}
          </div>
          <button type="submit" className="upload-button">
            Upload Images
          </button>
        </form>

        {message && (
          <p className={`message ${message.includes("Error") ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>

      {/* Right Side - Uploaded Offer Images */}
      <div className="offer-gallery">
        <h3 className="gallery-title">Uploaded Offer Images</h3>
        <div className="offer-grid">
          {offers.map((offer) =>
            offer.images.map((img, index) => (
              <div key={index} className="offer-item">
                <img src={img} alt="Offer" className="offer-image" />
                <button className="delete-button" onClick={() => handleDelete(img)}>
                  🗑
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Offers;
