const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student"
  }
}, { timestamps: true });



module.exports = mongoose.models.User || mongoose.model("User", userSchema);
