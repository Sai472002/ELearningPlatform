const bcrypt = require("bcrypt");
const register = require("../models/Register.model");
const { tokenGen } = require("../middleware/authToken");
const otpgen = require("../utils/otpGen");
const { sendVerificationEmail } = require("../utils/verifyemail");

const jwt = require("jsonwebtoken");

// Registers the user data
const regPost = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, username } = req.body;
    const checkmail = await register.findOne({ email });
    if (checkmail) {
      return res.status(404).json({ message: "email already exist" });
    }
    const encpass = await bcrypt.hash(password, 10);
    let data = {
      ...req.body,
      password: encpass,
    };
    const userdata = await register.create(data);
    console.log(userdata, "created");
    const verificationToken = jwt.sign(
      { userId: userdata.userId },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    await sendVerificationEmail(email, verificationToken, username);

    res.json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    res.json(error.message);
  }
};

// login function
const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkmail = await register.findOne({ email });
    if (!checkmail) {
      return res.status(403).json({ message: "Invalid Email Id" });
    }
    if (!checkmail.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first" });
    }

    const checkpass = await bcrypt.compare(password, checkmail.password);
    if (!checkpass) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    const userId = checkmail.userId;
    const token = await tokenGen(checkmail.userId);
    // console.log(token)
    let navigate;

    checkmail.designation === "Student"
      ? (navigate = "/")
      : checkmail.designation === "Instructor"
      ? (navigate = "/instructordashboard")
      : (navigate = "/adminpanel");

    res.json({
      message: "Login Successfully",
      token,
      navigate,
      userId,
      designation: checkmail.designation,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// const otpLogin = async(req,res) => {
//     try {
//         const {number} = req.body
//         const checknum = await register.findOne({number})
//         if(!checknum){return res.status(404).json({message:"Invalid Number"})}

//         const otp = otpgen()
//         res.json({
//             otp
//         })

//     } catch (error) {
//         res.json(error.message)

//     }
// }

module.exports = {
  regPost,
  loginPost,
  // otpLogin
};
