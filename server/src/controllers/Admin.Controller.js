const express = require("express");
const userDetails = require("../models/UserDetails..model");
const payment = require("../models/Payments.model");
const instructorDetails = require("../models/instructorDetails.model");
const admindetails = require("../models/Admin.model");

const stats = async (req, res) => {
  try {

    const totalInstructors = await instructorDetails.countDocuments();
    const totalStudents = await userDetails.countDocuments();
    const payments = await payment.find();

    const totalRevenue = payments.reduce(
      (sum, value) => sum + value.amount,
      0
    );

    res.json({
      totalInstructors,
      totalStudents,
      totalRevenue,
    });

  }
   catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getadmindata = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId)
        // Check if userId exists in the request
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const data = await admindetails.findOne({ userId });
        
        // Handle case where data is not found
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        const datas = [data];
        
        console.log(datas);
        res.json(datas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {stats,getadmindata};
