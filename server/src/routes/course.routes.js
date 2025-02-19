const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authToken");
const courseCtrl = require("../controllers/courseManagement.controller");

router.get("/getallcourse", courseCtrl.getAllCourse); // Gets all Courses
router.get("/getinstcourse", verifyToken, courseCtrl.getCoursebyId); // Gets Course created by Instructor
router.get("/getcourse/:_id", verifyToken, courseCtrl.getCourse); // Gets Particular Course
router.delete("/deletecourse/:_id", verifyToken, courseCtrl.deleteCourse); //Delete Course

module.exports = router;
