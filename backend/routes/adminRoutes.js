const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Admin routes for managing users
router.get("/users", protect, authorize("admin"), getAllUsers);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
