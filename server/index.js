const express = require("express");
const app = express();
require("dotenv").config();
const Connection = require("./src/config/connection");
const router = require("./src/routes/register.route");
const insrouter = require("./src/routes/instrutor.route");
const filerouter = require("./src/middleware/file.route");
const courserouter = require("./src/routes/course.routes");
const paymentrouter = require("./src/routes/payment.routes");
const adminroute = require("./src/routes/admin.route");
const requestrouter = require("./src/routes/request.route");
const profilepicturerouter = require("./src/middleware/Profile.route");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
Connection();

app.get("/", (req, res) => {
  res.send("Welcome to E-Learning Platform");
  
});
app.use(courserouter);
app.use(router);
app.use(profilepicturerouter);
app.use(paymentrouter);
app.use(adminroute);
app.use(requestrouter);
app.use(insrouter);
app.use(filerouter);

app.listen(3000, () => {
  try {
    console.log("Server Connected");
  } catch (error) {
    console.log("Connection Failed");
  }
});
