const express = require("express");
const router = express.Router();
const multer = require("multer");
const { verifyToken } = require("../middleware/authToken");
const courseCtrl = require("../controllers/courseManagement.controller");

// Configure Multer to use Memory Storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
});

const uploadFiles = upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]);

router.use(verifyToken); // Middleware to verify token

router.post("/addcourse", uploadFiles, courseCtrl.addCourse);
router.put("/editcourse/:_id", uploadFiles, courseCtrl.editCourse); // Edit Course

module.exports = router;
