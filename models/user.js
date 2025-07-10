const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  message: String,
  securityQuestion: String,
  securityAnswer: String,
  profileImage: String,
  role: { type: String, default: "user" },
  progress: { type: Number, default: 0 },
  completedLessons: [String],
  createdAt: { type: Date, default: Date.now }
  deletedAt: { type: Date, default: null }

});

module.exports = mongoose.model("User", userSchema);
