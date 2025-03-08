const express = require("express");
const fs = require("fs")
const Request = require("../models/Request.model");
const courseDetails = require("../models/course.model")
const router = express.Router();
const { format } = require("date-fns");
const { verifyToken } = require("../middleware/authToken");
const { log } = require("console");
const cloudinary = require("../config/Cloudinary");


router.use(verifyToken)
router.post("/request", async (req, res) => {
  const now = new Date();
  const Date1 = format(now, "MMM dd yyyy");

  try {
    const { courseid, coursename,imagepath } = req.body;
    const temp = await Request.findOne({ courseid });
    const data1 = await courseDetails.findOne({_id:courseid}) 
    if (temp && temp.status === "Pending") {
      return res.json({ message: "Course Request already exist" });
    }
    const data = {
      courseid,
      coursename,
      imagePath:data1.imagePath,
      requestat: Date1,
    };
    await Request.create(data);
    res.json({
      message: "Request has been submitted",
    });
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/getRequests", async (req, res) => {
  try {
    const data = await Request.find();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
});


router.delete("/deleterequest/:courseid/:reqid", async(req,res)=>{
  try {
    const { courseid, reqid } = req.params;
    console.log(courseid)
    if (reqid == 1) {
      var data = await courseDetails.findById({_id : courseid });
      if (!data) {
        return res.status(404).json({ message: "Id doesnt match" });
      }
      
      if (data.imageName && data.videoName) {
        await cloudinary.uploader.destroy(data.videoName, { resource_type: 'video' });
        await cloudinary.uploader.destroy(data.imageName, { resource_type: 'image' });
      }
      log("files deleted")
      const data1 = await courseDetails.findByIdAndDelete({_id:courseid});
      const data2 = await Request.findOne({ courseid });
      data2.status = "Approved";
      log("status changed")
      await data2.save();
      res.json({ message: "Course Deleted" });  
    } else {
      const data2 = await Request.findOne({ courseid});
      data2.status = "Rejected";
      await data2.save();
      res.json({message:"Course request Rejected"})
    }
  } catch (error) {
    res.json({message:error.message});
  }
});
module.exports = router;
