const mongoose = require("mongoose");
const { v4 } = require("uuid");

const InstSch = new mongoose.Schema(
  {
    username: String,
    phonenumber: Number,
    age: Number,
    gender: String,
    email: String,
    address: String,
    designation: String,
    experience: String,
    expertise: String,
    title: {
      type: [String],
      default: ["username", "phonenumber", "age", "email", "experience"],
    },
    _id: {
      type: String,
      default: v4,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const instructorDetails = mongoose.model("InstructorDetails", InstSch);

module.exports = instructorDetails;
