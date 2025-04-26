const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleCloudinaryUpload(file) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;
  const res = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  return res;
}

const UploadAnImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const cldRes = await handleCloudinaryUpload(req.file);
    return res.status(201).json({
      message: "Image uploaded successfully",
      url: cldRes.url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Failed to upload image",
      error: err,
    });
  }
};
const removeImage = (imageId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

// Export both the main function and the Multer middleware
module.exports = {
  UploadAnImage,
  removeImage,
};
