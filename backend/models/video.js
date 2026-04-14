const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  subject: String,
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  format: {
    type: String,
    enum: ["MP4", "MKV"],
    default: "MP4"
  },
  cloudinary_id: String,
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

videoSchema.index({ subject: 1 });
videoSchema.index({ teacher: 1 });

module.exports = mongoose.model("Video", videoSchema);