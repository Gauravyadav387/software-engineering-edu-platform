require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const videoRoutes = require("./routes/videoRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/videos", videoRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.listen(5000, () => console.log("Server running on port 5000"));