const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    default: "active",
    enum: ["active", "inactive"],
  },
});
module.exports = mongoose.model("User", userSchema);
