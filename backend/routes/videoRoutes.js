const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadVideo, getVideos, deleteVideo } = require("../controllers/videoController");
const { protect, authorize } = require("../middleware/authMiddleware");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.delete("/:id", protect, authorize("teacher"), deleteVideo);

module.exports = router;