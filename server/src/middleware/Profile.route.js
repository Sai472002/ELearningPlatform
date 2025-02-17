const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs")
const { verifyToken } = require("./authToken");
const userDetails = require("../models/UserDetails..model");
const register = require("../models/Register.model");
const admindetails = require("../models/Admin.model");
const instructorDetails = require("../models/instructorDetails.model");
const { log } = require("console");

const storage = multer.diskStorage({
  destination: "src/public/profilephotos/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

const uploadimage = upload.single("profilepicture");

router.use(verifyToken);


router.post("/uploadimage", uploadimage, async (req, res) => {
  try {
    const imagefile = req.file;
    const userId = req.userId;
    console.log(imagefile.filename);
    

    if (!imagefile) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const data = await register.findOne({ userId });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    if (data.designation === "Admin") {
      const admindata = await admindetails.findOne({ userId });
      if (!admindata) {
        return res.status(404).json({ message: "Admin data not found" });
      }
      if(admindata.imagename){
        fs.unlinkSync(`src/public/profilephotos/${admindata.imagename}`);
      }
      admindata.imagename = imagefile.filename;
      admindata.imagepath = `/uploadimage/${imagefile.filename}`;
      console.log("success");
      
      await admindata.save();
    } else if (data.designation === "Instructor") {
      const insdata = await instructorDetails.findOne({ userId });
      if (!insdata) {
        return res.status(404).json({ message: "Instructor data not found" });
      }
      if(insdata.imagename){
        fs.unlinkSync(`src/public/profilephotos/${insdata.imagename}`);      }
      insdata.imagename = imagefile.filename;
      insdata.imagepath = `/uploadimage/${imagefile.filename}`;
      await insdata.save();
    } else {
      const userdata = await userDetails.findOne({ userId });
      if (!userdata) {
        return res.status(404).json({ message: "Instructor data not found" });
      }
      if(userdata.imagename){
        fs.unlinkSync(`src/public/profilephotos/${userdata.imagename}`);      }
      userdata.imagename = imagefile.filename;
      userdata.imagepath = `/uploadimage/${imagefile.filename}`;
      await userdata.save();
    }
    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
