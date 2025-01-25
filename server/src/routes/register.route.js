const express =require("express");
const router = express.Router()
const registerCtrl = require("../controllers/register.controller")
const verifyEmail = require("../controllers/Verifyemail.controller")
const UserDetails = require("../controllers/UserDetails.controller")
const {forgotPassword,resetPassword} = require("../controllers/ForgotPassword.controller")
const {verifyToken} = require("../middleware/authToken")


router.post("/register",registerCtrl.regPost)
router.post("/login",registerCtrl.loginPost)
// router.post("/otplogin",registerCtrl.otpLogin)
router.get("/verify-email/:token", verifyEmail);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpass/:token", resetPassword);

router.get("/getdata",verifyToken,UserDetails.getData)
router.put("/editdata",verifyToken,UserDetails.editData)
router.delete("/deletedata",verifyToken,UserDetails.deleteData)
router.get("/getalldata",verifyToken,UserDetails.getallData)

module.exports = router