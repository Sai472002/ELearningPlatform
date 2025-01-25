const express = require("express")
const router = express.Router()
const {verifyToken} =require("../middleware/authToken")
const admin = require("../controllers/Admin.Controller")
router.use(verifyToken) // Middleware to verify token


router.get("/adminstats",admin.stats)
router.get("/admindetails",admin.getadmindata)

module.exports = router