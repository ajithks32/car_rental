import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react'; // Import the QR code generator
import bg from "../image/page-title.png";
import './payment.css';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success
  const [formData, setFormData] = useState({
    screenshot: null, // For storing the screenshot
  });
  const [imageSubmitted, setImageSubmitted] = useState(false); // To track whether the screenshot has been submitted

  // Handle payment method selection
  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  // Handle file upload (screenshot of payment)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, screenshot: file });
    }
  };

  // Handle screenshot submission
  const handleScreenshotSubmit = () => {
    // You can handle screenshot submission here, e.g., uploading to a server.
    setImageSubmitted(true); // Set image submission flag to true
  };

  // Handle payment submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // If QR is selected, set payment success and show the QR
    if (selectedPayment === "QR") {
      setPaymentSuccess(true); // Set payment success to true for QR code
    }

    // Handle Cash on Delivery
    else if (selectedPayment === "Cash on Delivery") {
      setPaymentSuccess(true); // Set payment success to true for Cash on Delivery
      navigate("/confirmation"); // Redirect to confirmation page
    }
  };

  return (
    <>
      {/* Background Banner */}
      <div className="pay-banner">
        <img src={bg} alt="Background" className="pay-banner-img" />
        <div className="pay-overlay">
          <h1 className="pay-title">Payment</h1>
          <p className="pay-breadcrumb">
            <a href="/">Home</a> &gt; <a href="/">Pages</a> &gt; <a href="/">Payment</a>
          </p>
        </div>
      </div>

      {/* Payment Form */}
      <div className="pay-container">
        {/* Only show this section if payment is not successful */}
        {!paymentSuccess && (
          <div className="pay-card">
            <div className="pay-card-body">
              <h2 className="pay-heading">Choose Your Payment Method</h2>

              {/* Payment Option Buttons */}
              <button 
                className="pay-option-btn" 
                onClick={() => handlePaymentSelection("QR")}
                disabled={selectedPayment === "QR"} // Disable if already selected
              >
                Pay via QR Code
              </button>

              <button 
                className="pay-option-btn" 
                onClick={() => handlePaymentSelection("Cash on Delivery")}
                disabled={selectedPayment === "Cash on Delivery"} // Disable if already selected
              >
                Cash on Delivery
              </button>

              {/* Generate QR Code for payment */}
              {selectedPayment === "QR" && (
                <div className="qr-code">
                  <QRCodeSVG
                    value={`upi://pay?pa=merchant@upi&pn=MerchantName&mc=12345&tid=1234567890&tr=${Math.random().toString(36).substr(2, 9)}`}
                    size={256}
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                  <p>Scan this QR Code with your payment app to complete the payment.</p>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="pay-submit-btn" onClick={handlePaymentSubmit}>
                Proceed
              </button>
            </div>
          </div>
        )}

        {/* Payment Success and Screenshot Upload */}
        {paymentSuccess && (
          <div className="pay-success-card">
            <div className="pay-success">
              <div className="success-title">Payment Successful!</div>
              <p>Your payment was completed successfully.</p>

              {/* Screenshot Upload Section */}
              <div className="upload-section">
                <label htmlFor="screenshot" className="upload-label">Upload Screenshot of Payment:</label>
                <input
                  type="file"
                  id="screenshot"
                  className="upload-input"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {formData.screenshot && (
                  <div className="screenshot-preview">
                    <img
                      src={URL.createObjectURL(formData.screenshot)}
                      alt="Screenshot Preview"
                      className="screenshot-image"
                    />
                  </div>
                )}

                {/* Submit Screenshot Button */}
                {!imageSubmitted && formData.screenshot && (
                  <button 
                    className="submit-screenshot-btn"
                    onClick={handleScreenshotSubmit}
                  >
                    Submit Screenshot
                  </button>
                )}

                {/* Confirmation Message After Submit */}
                {imageSubmitted && (
                  <div className="image-submission-message">
                    <p>Screenshot submitted successfully!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentMethod;
