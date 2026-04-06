const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes"); // ✅ fixed

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});