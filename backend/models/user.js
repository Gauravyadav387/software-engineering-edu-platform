const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student"
  },
  resetOtp: String,
  resetOtpExpire: Date
}, { timestamps: true });



module.exports = mongoose.models.User || mongoose.model("User", userSchema);
