const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_KEY,
    },
});

const sendVerificationEmail = async (email, token,name,sessionid,sessionemail,price) => {
    try {
        const verificationUrl = `http://localhost:3000/verify-email/${token}`;
        await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<h2>Hi ${name} Click <a href="${verificationUrl}">here</a> to verify your email.</h2>`,
        });
        console.log("mail sent Successfull ")
    } catch (error) {
        console.log(error)
    }
};

const sendReciptEmail = async (name,email,id,price) => {
    const amount = price/100
    try {
        await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: email,
            subject: "Reciept ",
            html: `<h2>Hi ${name} </h2>
            <h3> Your payment for the course with the payment Id :${id} for the price of ${amount} is Successfull.<br></h3>`,
        });
        console.log("mail sent Successfull ")
    } catch (error) {
        console.log(error)
    }
};


const forgotPassEmail = async (email, token) => {
    try {
        const verificationUrl = `http://localhost:3001/resetpass/${token}`;
        await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: email,
            subject: "Reset Password",
            html: `<h2>Click <a href="${verificationUrl}">Here</a> to reset your password.</h2>`,
        });
        console.log("mail sent Successfull")
    } catch (error) {
        console.log(error)
    }
};


module.exports = {sendVerificationEmail
    ,forgotPassEmail,sendReciptEmail
};
