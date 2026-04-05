const Video = require("../models/video");
const View = require("../models/viewanalytics");

exports.addView = async (req, res) => {
  const { videoId } = req.body;

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
};

exports.getAnalytics = async (req, res) => {
  const videos = await Video.find({ teacher: req.user.id });

  res.json(videos.map(v => ({
    title: v.title,
    views: v.views
  })));
};