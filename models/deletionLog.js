const mongoose = require("mongoose");

const deletionLogSchema = new mongoose.Schema({
  deletedUserEmail: String,
  deletedBy: String, // e.g., admin email or name
  reason: String,
  deletedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DeletionLog", deletionLogSchema);
