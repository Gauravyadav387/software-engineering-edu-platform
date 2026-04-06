const express = require("express");
const router = express.Router();

const { register, login } = require("./AuthController");
const { verifyToken, checkRole } = require("./middleware");

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/student", verifyToken, checkRole("student"), (req, res) => {
  res.json({ msg: "Welcome Student" });
});

router.get("/teacher", verifyToken, checkRole("teacher"), (req, res) => {
  res.json({ msg: "Welcome Teacher" });
});

module.exports = router;