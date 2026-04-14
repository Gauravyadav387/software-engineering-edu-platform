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
  },
  session_id: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substring(2, 15)
  }
});

// Prevent duplicate views per session
viewSchema.index({ user: 1, video: 1, session_id: 1 });

module.exports = mongoose.model("ViewAnalytics", viewSchema);