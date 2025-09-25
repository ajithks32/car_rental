import { useState, useEffect } from "react";
import axios from "axios";
import "./BannerImage.css"; // Import the updated CSS file

const BannerImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch existing banners
  useEffect(() => {
    const fetchBanners = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/carsbanner");
        setUploadedImages(response.data);
      } catch (error) {
        setError("Error fetching banners. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5000/carsbanner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedImages(response.data.images);
      setSelectedFiles([]);
      setSuccess("Images uploaded successfully!");
    } catch (error) {
      setError("Error uploading images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (imageUrl) => {
    const imageName = imageUrl.split("/").pop();

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`http://localhost:5000/carsbanner/${imageName}`);
      setUploadedImages((prev) => prev.filter((img) => img !== imageUrl));
      setSuccess("Image deleted successfully!");
    } catch (error) {
      setError("Error deleting image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="banner-image-container">
      <h2>Upload Banner Images</h2>

      <div className="banner-upload-section">
        <label className="banner-file-label">
          <input type="file" multiple onChange={handleFileChange} className="banner-file-input" />
          <span>Choose Images</span>
        </label>
        <button onClick={handleUpload} className="banner-upload-button" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload All Images"}
        </button>
      </div>

      {error && <p className="banner-error-message">{error}</p>}
      {success && <p className="banner-success-message">{success}</p>}

      <div className="uploaded-banners-section">
        <h3>Uploaded Banners</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : uploadedImages.length === 0 ? (
          <p>No images uploaded yet.</p>
        ) : (
          <div className="banner-grid">
            {uploadedImages.map((img, index) => (
              <div key={index} className="banner-image-wrapper">
                <img src={img} alt="Uploaded" className="banner-uploaded-image" />
                <button onClick={() => handleDelete(img)} className="banner-delete-button">
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerImage;
