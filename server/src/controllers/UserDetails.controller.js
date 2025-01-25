const register = require("../models/Register.model")
const userDetails = require("../models/UserDetails..model")
const bcrypt = require("bcrypt")

// Get User Data
const getData = async(req,res) =>{
    try{
        const userId = req.userId
        // console.log(userId);
        
        const data = await userDetails.findOne({userId})
        const datas = [data]
        if(!data ){
            return res.status(404).json({message:"data not found"})
        }
        // console.log(datas)
        res.json(datas)
    }
    catch(error){
        res.json(error.message)
    }
}
const getallData = async(req,res) =>{
    try{ 
        const data = await userDetails.find()
        if(!data ){
            return res.status(404).json({message:"data not found"})
        }
        // console.log(datas)
        res.json(data)
    }
    catch(error){
        res.json(error.message)
    }
}

// Edit User Data
const editData = async(req,res) =>{
    try{
        const userId = req.userId
        const{age} = req.body
        age==null||undefined? null : parseInt(age)
        const data = await userDetails.findOneAndUpdate({userId},{...req.body,age},{new:true})
        const datas = [data]
        res.json(datas)
        // console.log(data);
        
    }
    catch(error){
        res.json(error.message)
    }
}

const deleteData = async(req,res) =>{
    try{
        const {userId} = req.body
        // console.log(userId)
        const data = await userDetails.find({userId})
        const data1 = await register.find({userId})
        if(!data || !data1){
            return res.json({message:"no such data"})
        }
        await userDetails.deleteOne({userId})
        await register.deleteOne({userId})
        res.json({
            message:"User Deleted ",
            id:data,
            uid:data1
        })
    }
    catch(error){
        res.json(error.message)
    }
}

module.exports = {
    getData,editData,deleteData,getallData
}