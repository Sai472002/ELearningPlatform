const nodemailer = require("nodemailer");

const mailtouser = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASS_KEY,
    },
  });
  await transporter.sendMail(data);
};

const sendmail = async (userName, email, token) => {
  try {
    let content = {
      from: process.env.USER_MAIL,
      to: email,
      subject: "An Authentication mail",
      text: `Hi ${userName} ,Welcome to our website .This is your password :${pass}`,
    };

    await mailtouser(content);
    console.log("mail sent");
  } catch (error) {
    console.log("mail unsuccessfull");
  }
};

module.exports = sendmail;
