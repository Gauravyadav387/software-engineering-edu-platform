const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },
  viewedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate views
viewSchema.index({ user: 1, video: 1 });

module.exports = mongoose.model("ViewAnalytics", viewSchema);