const mongoose = require("mongoose");

const certSchema = new mongoose.Schema({
  name: String,
  certId: String,
  score: Number,
  level: String,
  date: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certificate", certSchema);
