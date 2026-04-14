const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const { uploadVideo, getVideos, deleteVideo, getVideoById, getSubjects } = require("../controllers/videoController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "edubridge_videos",
    resource_type: "video" // Specifically required for Cloudinary video assets
  }
});

const upload = multer({ storage });

router.post("/upload", protect, authorize("teacher", "admin"), upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.get("/subjects", getSubjects);
router.get("/:id", getVideoById);
router.delete("/:id", protect, authorize("teacher"), deleteVideo);

module.exports = router;