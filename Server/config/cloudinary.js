// //config/cloudinary.js

// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";

// // Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// // Configure storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "preventive_maintenance",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// // Initialize multer
// const upload = multer({ storage });

// // Correct ESM export
// export { upload, cloudinary };





// config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import sharp from "sharp";
import path from "path";

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

// Initialize multer with memory storage for compression
const memoryStorage = multer.memoryStorage();

// Multer configuration
const upload = multer({
  storage: memoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
  },
});

// Compression middleware
export const compressImage = async (buffer, options = {}) => {
  const {
    quality = 80,
    maxWidth = 1920,
    maxHeight = 1080,
    format = "jpeg",
  } = options;

  try {
    let sharpInstance = sharp(buffer);

    // Get image metadata
    const metadata = await sharpInstance.metadata();

    // Resize if image is larger than max dimensions
    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // Compress based on format
    if (format === "jpeg" || format === "jpg") {
      sharpInstance = sharpInstance.jpeg({
        quality,
        progressive: true,
        mozjpeg: true,
      });
    } else if (format === "png") {
      sharpInstance = sharpInstance.png({
        quality,
        compressionLevel: 9,
        progressive: true,
      });
    }

    return await sharpInstance.toBuffer();
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

// Upload compressed image to Cloudinary
export const uploadToCloudinary = async (buffer, filename, folder = "preventive_maintenance") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: filename,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// Combined compress and upload function
export const compressAndUpload = async (file, options = {}) => {
  try {
    // Extract file extension
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    const format = ext === "jpg" ? "jpeg" : ext;

    // Compress image
    const compressedBuffer = await compressImage(file.buffer, {
      ...options,
      format,
    });

    // Generate unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      compressedBuffer,
      filename,
      options.folder || "preventive_maintenance"
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Error in compress and upload:", error);
    throw error;
  }
};

export { upload, cloudinary };