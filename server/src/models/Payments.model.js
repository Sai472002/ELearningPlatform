const mongoose = require("mongoose")
const {v4} = require("uuid")
const paymentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
      },
    userId: String,
    courseId: String,
    sessionId: String,
    paymentIntentId: String,
    amount: Number,
    currency: String,
    paymentStatus: String


},{timestamps:true})

const payment = mongoose.model("Payments",paymentSchema)

module.exports = payment