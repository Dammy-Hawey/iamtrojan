// const mongoose = require("mongoose");

// const certSchema = new mongoose.Schema({
//   name: String,
//   certId: String,
//   score: Number,
//   level: String,
//   date: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Certificate", certSchema);

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  certId: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  level: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certificate", certificateSchema);
