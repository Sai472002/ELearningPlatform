const mongoose = require("mongoose");
const { v4 } = require("uuid");

const userSch = new mongoose.Schema(

{
    username:String,
    fullname:String,
    phonenumber: Number,
    age:Number,
    gender:String,
    email: String,
    address:String,
    designation: String,
    myCourses:[String],
    title: {
      type: [String],
      default: ["username","fullname","phonenumber","age","email"]
    },
    _id: {
      type: String,
      default: v4,
    },
    userId: {
      type: String
    }
  },
  { timestamps: true }
);

const userDetails = mongoose.model("UserDetails",userSch)

module.exports = userDetails