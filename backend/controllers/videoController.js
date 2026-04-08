const Video = require("../models/video");
const cloudinary = require("../utils/cloudinary");

require("../models/user");

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    const videoUrl = "http://localhost:5000/uploads/" + req.file.filename;

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
  const query = req.query.subject ? { subject: new RegExp(`^${req.query.subject}$`, "i") } : {};
  const videos = await Video.find(query).populate("teacher", "name email");
  res.json(videos);
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
  await Video.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};