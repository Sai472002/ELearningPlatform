const express =require("express");
const router = express.Router()
const {verifyToken} = require("../middleware/authToken")
const instructor = require("../controllers/instructorDetails.controller")

router.get("/getinsdata",verifyToken,instructor.insgetData)
router.get("/getallinsdata",verifyToken,instructor.getallinsData)
router.put("/editinsdata",verifyToken,instructor.inseditData)
router.delete("/deleteinsdata",verifyToken,instructor.insdeleteData)

module.exports = router