const express = require("express");
const app = express();
require("dotenv").config();
const Connection = require("./src/config/connection");
const router = require("./src/routes/register.route")
const insrouter = require("./src/routes/instrutor.route")
const filerouter = require("./src/middleware/file.route")
const courserouter = require("./src/routes/course.routes")
const paymentrouter = require("./src/routes/payment.routes")
const adminroute = require("./src/routes/admin.route")
const cors = require("cors")

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/upload",express.static("src/public/coursefiles/"))
Connection()
app.use(router)
app.use(insrouter)
app.use(filerouter)
app.use(courserouter)
app.use(paymentrouter)
app.use(adminroute)

app.listen(3000, () => {
    try {
        console.log("Server Connected");      
    } catch (error) {
        console.log("Connection Failed");
    }
})