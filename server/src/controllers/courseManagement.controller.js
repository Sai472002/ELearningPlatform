const courseDetails = require("../models/course.model");
const instructorDetails = require("../models/instructorDetails.model");
const Request = require("../models/Request.model");
const cloudinary = require("../config/Cloudinary");
const fs = require("fs");

const uploadToCloudinary = (fileBuffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

const addCourse = async (req, res) => {
  try {
    console.log("Course hit")
    const instructorId = req.userId;
    const insdata = await instructorDetails.findOne({ userId: instructorId });
    const instructorName = insdata.username;

    const data = {
      ...req.body,
      instructorId,
      instructorName,
    };

    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const videoFile = req.files["video"] ? req.files["video"][0] : null;

    if (imageFile) {
      const imageResult = await uploadToCloudinary(
        imageFile.buffer,
        "coursefiles/images",
        "image"
      );

      data.imagePath = imageResult.secure_url;
      data.imageName = imageResult.public_id;
    }

    if (videoFile) {
      const videoResult = await uploadToCloudinary(
        videoFile.buffer,
        "coursefiles/videos",
        "video"
      );

      data.videoPath = videoResult.secure_url;
      data.videoName = videoResult.public_id;
    }

    const newCourse = await courseDetails.create(data);

    res.json({
      data: newCourse,
      message: "New Course Added Successfully",
    });
  } catch (error) {
    console.error("Error occurred during course addition:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE or EDIT an existing Course
const editCourse = async (req, res) => {
  try {
    const { _id } = req.params;

    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const videoFile = req.files["video"] ? req.files["video"][0] : null;

    const oldData = await courseDetails.findById(_id);
    if (!oldData) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newData = {
      ...req.body,
    };

    if (imageFile) {
      if (oldData.imageName) {
        await cloudinary.uploader.destroy(oldData.imageName, {
          resource_type: "image",
        });
      }

      const imageResult = await uploadToCloudinary(
        imageFile.buffer,
        "coursefiles/images",
        "image"
      );
      newData.imagePath = imageResult.secure_url;
      newData.imageName = imageResult.public_id;
    }

    if (videoFile) {
      if (oldData.videoName) {
        await cloudinary.uploader.destroy(oldData.videoName, {
          resource_type: "video",
        });
      }

      const videoResult = await uploadToCloudinary(
        videoFile.buffer,
        "coursefiles/videos",
        "video"
      );
      newData.videoPath = videoResult.secure_url;
      newData.videoName = videoResult.public_id;
    }

    const updatedData = await courseDetails.findByIdAndUpdate(_id, newData, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json({
      updatedData,
      message: "Course edited successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET all courses by Instructor
const getCoursebyId = async (req, res) => {
  try {
    const instructorId = req.userId;
    const data = await courseDetails.find({ instructorId });
    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this instructor" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all courses (Admin or public view)
const getAllCourse = async (req, res) => {
  try {
    const data = await courseDetails.find();
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single course by _id
const getCourse = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await courseDetails.findOne({ _id });
    if (!data) {
      return res.status(404).json({ message: "No course found" });
    }
    res.json([data]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a course
const deleteCourse = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await courseDetails.findById(_id);
    if (!data) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Remove course from DB
    await courseDetails.findByIdAndDelete(_id);

    // If there is an image in Cloudinary, remove it
    if (data.imageName) {
      await cloudinary.uploader.destroy(data.imageName, {
        resource_type: "auto",
      });
    }

    // If there is a video in Cloudinary, remove it
    if (data.videoName) {
      await cloudinary.uploader.destroy(data.videoName, {
        resource_type: "auto",
      });
    }

    res.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCourse,
  editCourse,
  getAllCourse,
  getCoursebyId,
  getCourse,
  deleteCourse,
};
