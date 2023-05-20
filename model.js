const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your userid!"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please enter your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
  },
});

module.exports = mongoose.model("hts", userSchema);
