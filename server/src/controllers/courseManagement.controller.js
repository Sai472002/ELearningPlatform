const courseDetails = require("../models/course.model");
const instructorDetails = require("../models/instructorDetails.model");
const Request = require("../models/Request.model");
const cloudinary = require("../config/Cloudinary"); // Make sure you have a cloudinary config
const fs = require("fs"); // Only needed if you still do local file ops (likely remove now)

// CREATE or ADD a new Course
// CREATE or ADD a new Course
const addCourse = async (req, res) => {
  try {
    const instructorId = req.userId;
    const insdata = await instructorDetails.findOne({ userId: instructorId });
    const instructorName = insdata.username;

    // Retrieve uploaded files (if any)
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const videoFile = req.files["video"] ? req.files["video"][0] : null;

    // Prepare data for the new course
    const data = {
      ...req.body,
      instructorId,
      instructorName,
    };

    // If image was uploaded, upload to Cloudinary and store the URL and public ID
    if (imageFile) {
      const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'coursefiles/images', // Store image under coursefiles/images folder in Cloudinary
        resource_type: 'auto', // auto-detects file type (image/video)
      });
      data.imagePath = uploadedImage.secure_url; // Store the Cloudinary URL
      data.imageName = uploadedImage.public_id; // Store public ID for future deletions
    }

    // If video was uploaded, upload to Cloudinary and store the URL and public ID
    if (videoFile) {
      const uploadedVideo = await cloudinary.uploader.upload(videoFile.path, {
        folder: 'coursefiles/videos', // Store video under coursefiles/videos folder
        resource_type: 'auto',
      });
      data.videoPath = uploadedVideo.secure_url; // Store the Cloudinary URL
      data.videoName = uploadedVideo.public_id; // Store public ID for future deletions
    }

    // Create and save the course in DB
    const newCourse = await courseDetails.create(data);

    res.json({
      data: newCourse,
      message: "New Course Added Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE or EDIT an existing Course
// UPDATE or EDIT an existing Course
const editCourse = async (req, res) => {
  try {
    const { _id } = req.params;

    // Retrieve new files (if any)
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const videoFile = req.files["video"] ? req.files["video"][0] : null;

    // Fetch old course data
    const oldData = await courseDetails.findById(_id);
    if (!oldData) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Prepare updated data
    const newData = {
      ...req.body,
    };

    // If a new image is uploaded, remove the old one from Cloudinary
    if (imageFile) {
      if (oldData.imageName) {
        // Remove old image from Cloudinary
        await cloudinary.uploader.destroy(oldData.imageName, { resource_type: 'auto' });
      }
      const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'coursefiles/images',
        resource_type: 'auto',
      });
      newData.imagePath = uploadedImage.secure_url; // Cloudinary URL
      newData.imageName = uploadedImage.public_id; // Cloudinary public ID
    }

    // If a new video is uploaded, remove the old one from Cloudinary
    if (videoFile) {
      if (oldData.videoName) {
        // Remove old video from Cloudinary
        await cloudinary.uploader.destroy(oldData.videoName, { resource_type: 'auto' });
      }
      const uploadedVideo = await cloudinary.uploader.upload(videoFile.path, {
        folder: 'coursefiles/videos',
        resource_type: 'auto',
      });
      newData.videoPath = uploadedVideo.secure_url; // Cloudinary URL
      newData.videoName = uploadedVideo.public_id; // Cloudinary public ID
    }

    // Update the course in DB
    const updatedData = await courseDetails.findOneAndUpdate({ _id }, newData, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "No data found" });
    }
    res.json({
      updatedData,
      message: "Course edited Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all courses by Instructor
const getCoursebyId = async (req, res) => {
  try {
    const instructorId = req.userId;
    const data = await courseDetails.find({ instructorId });
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No courses found for this instructor" });
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
      await cloudinary.uploader.destroy(data.imageName, { resource_type: "auto" });
    }

    // If there is a video in Cloudinary, remove it
    if (data.videoName) {
      await cloudinary.uploader.destroy(data.videoName, { resource_type: "auto" });
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
