const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

videoSchema.index({ subject: 1 });
videoSchema.index({ teacher: 1 });

module.exports = mongoose.model("Video", videoSchema);