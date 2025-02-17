const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dm4njjwyv",
  api_key: "187156224511677",
  api_secret: "MPRGYXQkOBDEGDAgVVCrHEiKWKQ",
});

module.exports = cloudinary;
