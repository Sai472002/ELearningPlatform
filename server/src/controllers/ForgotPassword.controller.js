const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const register = require("../models/Register.model");
const { forgotPassEmail } = require("../utils/verifyemail");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await register.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ userId: user.userId }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    await forgotPassEmail(email, resetToken);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await register.findOne({
      userId: decoded.userId,
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const encpass = await bcrypt.hash(password, 10);
    user.password = encpass;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { forgotPassword, resetPassword };
