const express = require("express");
const router = express.Router();

const { addView, getAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

router.post("/view", protect, addView);
router.get("/", protect, getAnalytics);

module.exports = router;