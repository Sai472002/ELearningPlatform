const express = require("express")
const router = express.Router()
const {verifyToken} =require("../middleware/authToken")
const courseCtrl = require("../controllers/courseManagement.controller")
router.use(verifyToken) // Middleware to verify token


router.get("/getinstcourse",courseCtrl.getCoursebyId);              // Gets Course created by Instructor
router.get("/getallcourse",courseCtrl.getAllCourse);                // Gets all Courses
router.get("/getcourse/:_id",courseCtrl.getCourse);                 // Gets Particular Course
router.delete("/deletecourse/:_id",courseCtrl.deleteCourse);        //Delete Course

module.exports = router