import cloudinary from "cloudinary";
import DayData from "../models/daydata.schema.js";
import User from "../models/user.schema.js";
import fs from "fs/promises";
import CustomError from "../utils/error.utils.js";

export const uploadImages = async (req, res, next) => {
  try {
    // Check if files exist
    if (!req.files || req.files.length === 0) {
      return next(new CustomError("No images provided", 400));
    }

    // Upload each file to cloudinary
    const uploadPromises = req.files.map(async (file) => {
      try {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "valentine_days",
        });
        // Delete the local file after upload
        await fs.unlink(file.path);
        return result.secure_url;
      } catch (error) {
        // If upload fails, delete the local file
        await fs.unlink(file.path);
        throw error;
      }
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      imageUrls,
    });
  } catch (error) {
    // Clean up any remaining files in case of error
    if (req.files) {
      await Promise.all(
        req.files.map((file) => fs.unlink(file.path).catch(() => {}))
      );
    }
    next(new CustomError(error.message || "Error uploading images", 500));
  }
};

export const createDayData = async (req, res, next) => {
  try {
    const { day, messages, images, needToTellSomething } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!day || !messages || !images) {
      return next(
        new CustomError("Day, messages, and images are required", 400)
      );
    }

    // Validate arrays
    if (!Array.isArray(messages) || !Array.isArray(images)) {
      return next(new CustomError("Messages and images must be arrays", 400));
    }

    // Create day data
    const dayData = await DayData.create({
      day,
      messages,
      images,
      needToTellSomething,
      user: userId,
    });

    // Update user's dayData array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { dayData: dayData._id },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(new CustomError("User not found", 404));
    }

    res.status(201).json({
      success: true,
      message: "Day data created successfully",
      dayData,
    });
  } catch (error) {
    next(new CustomError(error.message || "Error creating day data", 500));
  }
};

// Optional: Get day data for a specific day
export const getDayData = async (req, res, next) => {
  try {
    const { day } = req.params;
    const userId = req.user.id;

    const dayData = await DayData.findOne({ day, user: userId });

    if (!dayData) {
      return next(new CustomError("Day data not found", 404));
    }

    res.status(200).json({
      success: true,
      dayData,
    });
  } catch (error) {
    next(new CustomError(error.message || "Error fetching day data", 500));
  }
};
