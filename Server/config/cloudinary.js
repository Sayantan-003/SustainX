//config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "preventive_maintenance",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Initialize multer
const upload = multer({ storage });

// Correct ESM export
export { upload, cloudinary };
