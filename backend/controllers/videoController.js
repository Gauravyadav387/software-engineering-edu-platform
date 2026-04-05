const Video = require("../models/video");
const cloudinary = require("../utils/cloudinary");

require("../models/user");

exports.uploadVideo = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video"
    });

    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      url: result.secure_url,
      teacher: null,
      subject: req.body.subject
    });

    res.json(video);
  } catch (err) {
  console.error("UPLOAD ERROR:", err);
  res.status(500).json({ error: err.message });
}
};

exports.getVideos = async (req, res) => {
  const videos = await Video.find().populate("teacher subject");
  res.json(videos);
};

exports.deleteVideo = async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};