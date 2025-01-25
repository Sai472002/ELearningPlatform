const mongoose = require("mongoose");
const { v4 } = require("uuid");

const RegSch = new mongoose.Schema(
  {
    username: String,
    number: Number,
    email: String,
    password: String,
    designation: String,
    _id: {
      type: String,
      default: v4,
    },
    userId: {
      type: String,
      default: v4,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const register = mongoose.model("UserRegister", RegSch);

module.exports = register;
