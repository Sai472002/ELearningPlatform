const mongoose = require("mongoose");
const { v4 } = require("uuid");
const ReqSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    courseid: String,
    coursename: String,
    imagePath:String,
    status: {
      type: String,
      default: "Pending",
    },
    requestat: String,
    description: { type: String, default: "Request To Delete This Course" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Requests", ReqSchema);

module.exports = Request;
