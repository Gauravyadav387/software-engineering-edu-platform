const Video = require("../models/video");
const View = require("../models/viewanalytics");

exports.addView = async (req, res) => {
  try {
    const { videoId } = req.body;

    // Optional validation to gracefully handle bad IDs
    if (!videoId || videoId.length < 12) {
      return res.status(400).json({ error: "Invalid video ID format" });
    }

    const existing = await View.findOne({
      user: req.user.id,
      video: videoId
    });

    if (!existing) {
      await View.create({
        user: req.user.id,
        video: videoId
      });

      await Video.findByIdAndUpdate(videoId, {
        $inc: { views: 1 }
      });
    }

    res.json({ msg: "View counted" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid Video ID" });
    }
    console.error("Add View Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const videos = await Video.find({ teacher: req.user.id });

    res.json(videos.map(v => ({
      title: v.title,
      views: v.views
    })));
  } catch (error) {
    console.error("Get Analytics Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};