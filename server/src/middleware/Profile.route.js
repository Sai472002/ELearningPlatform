const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");
const fs = require("fs");
const { verifyToken } = require("./authToken");
const userDetails = require("../models/UserDetails..model");
const register = require("../models/Register.model");
const admindetails = require("../models/Admin.model");
const instructorDetails = require("../models/instructorDetails.model");

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profilephotos",
    allowed_formats: ["jpg", "png", "jpeg","avif"],
  },
});

const upload = multer({ storage });
const uploadImage = upload.single("profilepicture");

router.use(verifyToken);

router.post("/uploadimage", uploadImage, async (req, res) => {
  try {
    const imageFile = req.file;
    const userId = req.userId;
    console.log(imageFile);
    

    if (!imageFile) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const data = await register.findOne({ userId });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    let updateData;
    if (data.designation === "Admin") {
      updateData = await admindetails.findOne({ userId });
    } else if (data.designation === "Instructor") {
      updateData = await instructorDetails.findOne({ userId });
    } else {
      updateData = await userDetails.findOne({ userId });
    }

    if (!updateData) {
      return res.status(404).json({ message: `${data.designation} data not found` });
    }

    // Remove old image from Cloudinary if exists
    if (updateData.imagepath) {
      const publicId = updateData.imagepath.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`profilephotos/${publicId}`);
    }

    // Update with new image data
    updateData.imagename = imageFile.filename;
    updateData.imagepath = imageFile.path;
    await updateData.save();

    res.json({ message: "Image uploaded successfully", imagePath: imageFile.path });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
