const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { uploadVideo, getVideos, deleteVideo, getVideoById, getSubjects } = require("../controllers/videoController");
const { protect, authorize } = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post("/upload", protect, authorize("teacher", "admin"), upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.get("/subjects", getSubjects);
router.get("/:id", getVideoById);
router.delete("/:id", protect, authorize("teacher"), deleteVideo);

module.exports = router;