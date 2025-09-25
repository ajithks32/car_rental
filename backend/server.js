require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const { connectRabbit, publishToQueue } = require("./config/rabbit");
app.use(express.json());

// Connect to DB
connectDB();
app.use(cors());

// connect rabbitmq at startup
connectRabbit().catch(console.error);

app.post("/alerts/send", (req, res) => {
  console.log("Received request to send emails:", req.body);
  const { emails, message } = req.body;
  if (!emails || !message)
    return res.status(400).json({ msg: "Emails and message required" });

  publishToQueue({ emails, message });
  res.json({ msg: "Emails queued successfully" });
});

// Routes

app.get("/", (req, res) => {
  res.send("API is running...");
});
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/auth", require("./routes/authRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/bikes", require("./routes/bikeRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/rental", require("./routes/rentalcarbooking"));
app.use("/offers", require("./routes/offerRoutes"));
app.use("/taxis", require("./routes/taxiRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/analytics", require("./routes/analyticsRoutes"));
app.use("/carsbanner", require("./routes/carsbannerRoutes"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
