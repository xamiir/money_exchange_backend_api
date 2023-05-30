const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = (file) => {
  const res = cloudinary.uploader.upload(file, {
    folder: "inventory",
    public_id: "inventory",
  });
  return res;
};

module.exports = cloudinary;
