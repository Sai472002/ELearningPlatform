const mongoose = require("mongoose")
const {v4} = require("uuid")
const adminSchema = new mongoose.Schema({
    _id:{
        type:String,
        default:v4
    },
    username: String,
    phonenumber: Number,
    age: Number,
    gender: String,
    email: String,
    userId:String,
    imagename:String,
    imagepath:String

},{timestamps:true})

const admindetails = mongoose.model("AdminDetais",adminSchema)

module.exports = admindetails