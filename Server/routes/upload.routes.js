// //routes/upload.routes.js

// import express from "express";
// import { upload } from "../config/cloudinary.js";

// const router = express.Router();

// //multiple image upload
// router.post("/upload/multiple", upload.array("images", 5), (req, res) => {
//   const urls = req.files.map((f) => f.path);
//   res.json({ success: true, imageUrls: urls });
// });

// // Single image upload
// router.post("/upload", upload.single("image"), (req, res) => {
//   try {
//     return res.json({
//       success: true,
//       imageUrl: req.file.path, // Cloudinary URL
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Upload failed" });
//   }
// });

// export default router;





// routes/upload.routes.js

import express from "express";
import { upload, compressAndUpload } from "../config/cloudinary.js";

const router = express.Router();

// Multiple image upload with compression
router.post("/upload/multiple", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    // Compress and upload all images
    const uploadPromises = req.files.map((file) =>
      compressAndUpload(file, {
        quality: 80,
        maxWidth: 1920,
        maxHeight: 1080,
      })
    );

    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((result) => result.url);

    res.json({
      success: true,
      imageUrls,
      count: imageUrls.length,
    });
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
      error: error.message,
    });
  }
});

// Single image upload with compression
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Compress and upload image
    const result = await compressAndUpload(req.file, {
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    });

    res.json({
      success: true,
      imageUrl: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
});

export default router;