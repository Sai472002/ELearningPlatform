const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/Cloudinary");
const { verifyToken } = require("../middleware/authToken");
const courseCtrl = require("../controllers/courseManagement.controller");

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "coursefiles",
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mkv"],
  },
});

const upload = multer({ storage });
const uploadFiles = upload.fields([{ name: "image" }, { name: "video" }]);

router.use(verifyToken); // Middleware to verify token

router.post("/addcourse", uploadFiles, courseCtrl.addCourse); // Add Course
router.put("/editcourse/:_id", uploadFiles, courseCtrl.editCourse); // Edit Course

module.exports = router;
