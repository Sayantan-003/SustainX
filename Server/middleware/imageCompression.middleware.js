// middleware/imageCompression.middleware.js

import { compressAndUpload } from "../config/cloudinary.js";

/**
 * Middleware to compress and upload images before proceeding with the request
 * Use this in routes that handle file uploads
 */
export const compressUploadedImages = async (req, res, next) => {
  try {
    // Skip if no files uploaded
    if (!req.files || req.files.length === 0) {
      return next();
    }

    // Compression options
    const compressionOptions = {
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    };

    // Compress and upload all images
    const uploadPromises = req.files.map((file) =>
      compressAndUpload(file, compressionOptions)
    );

    const results = await Promise.all(uploadPromises);

    // Replace req.files with compressed versions
    req.files = results.map((result, index) => ({
      ...req.files[index],
      path: result.url,
      filename: result.publicId,
    }));

    next();
  } catch (error) {
    console.error("Error in image compression middleware:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process images",
      error: error.message,
    });
  }
};

/**
 * Middleware for single image compression
 */
export const compressSingleImage = async (req, res, next) => {
  try {
    // Skip if no file uploaded
    if (!req.file) {
      return next();
    }

    const compressionOptions = {
      quality: 80,
      maxWidth: 1920,
      maxHeight: 1080,
    };

    const result = await compressAndUpload(req.file, compressionOptions);

    // Replace req.file with compressed version
    req.file = {
      ...req.file,
      path: result.url,
      filename: result.publicId,
    };

    next();
  } catch (error) {
    console.error("Error in single image compression middleware:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process image",
      error: error.message,
    });
  }
};