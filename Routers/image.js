const express = require("express");
const { UploadAnImage } = require("../Controllers/ImageController");
const Multer = require("multer");

const router = express.Router();

// Set up Multer for memory storage
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post("/", upload.single("my_file"), UploadAnImage);

module.exports = router;
