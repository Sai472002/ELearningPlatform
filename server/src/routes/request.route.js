const express = require("express");
const fs = require("fs")
const Request = require("../models/Request.model");
const courseDetails = require("../models/course.model")
const router = express.Router();
const { format } = require("date-fns");
const { verifyToken } = require("../middleware/authToken");


router.use(verifyToken)
router.post("/request", async (req, res) => {
  const now = new Date();
  const Date1 = format(now, "MMM dd yyyy");

  try {
    const { courseid, coursename } = req.body;
    const temp = await Request.findOne({ courseid });
    console.log(temp);

    if (temp && temp.status === "Pending") {
      return res.json({ message: "Course Request already exist" });
    }
    const data = {
      courseid,
      coursename,
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
      const data1 = await courseDetails.findByIdAndDelete({_id:courseid});
      res.json({
        message: "course deleted successfully",
      });
      if (data.imageName && data.videoName) {
        fs.unlinkSync(`src/public/coursefiles/${data.imageName}`);
        fs.unlinkSync(`src/public/coursefiles/${data.videoName}`);
      }
      const data2 = await Request.findOne({ courseid });
      data2.status = "Approved";
      await data2.save();
    } else {
      const data2 = await Request.findOne({ courseid});
      data2.status = "Rejected";
      await data2.save();
      res.json({message:"Course request Rejected"})
    }
  } catch (error) {
    res.json(error.message);
  }
});
module.exports = router;
