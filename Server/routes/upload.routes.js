//routes/upload.routes.js

import express from "express";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

//multiple image upload
router.post("/upload/multiple", upload.array("images", 5), (req, res) => {
  const urls = req.files.map((f) => f.path);
  res.json({ success: true, imageUrls: urls });
});

// Single image upload
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    return res.json({
      success: true,
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;
