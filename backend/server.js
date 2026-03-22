require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const videoRoutes = require("./routes/videoRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/videos", videoRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const cors = require("cors");
app.use(cors());