const Video = require("../models/video");
const fs = require("fs");
const path = require("path");

require("../models/user");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const videoUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      url: videoUrl,
      teacher: req.user ? req.user.id : null, 
      subject: req.body.subject
    });

    res.json(video);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const query = req.query.subject ? { subject: new RegExp(`^${req.query.subject}$`, "i") } : {};
    const videos = await Video.find(query).populate("teacher", "name email");
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Video.distinct("subject");
    // Filter out null or empty subjects if any
    const validSubjects = subjects.filter(sub => sub && sub.trim() !== "");
    res.json(validSubjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("teacher", "name email");
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    // Check ownership or admin role
    if (req.user.role !== "admin" && video.teacher?.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this video" });
    }

    // Delete physical file
    if (video.url) {
      const fileName = video.url.split("/").pop();
      const filePath = path.join(__dirname, "../uploads", fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Video.findByIdAndDelete(req.params.id);
    res.json({ msg: "Video and associated file deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};