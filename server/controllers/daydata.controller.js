import cloudinary from "cloudinary";
import DayData from "../models/daydata.schema.js";
import User from "../models/user.schema.js";
import fs from "fs/promises";
import CustomError from "../utils/error.utils.js";

export const uploadImages = async (req, res, next) => {
  try {
    // Add CORS headers explicitly for upload responses
    res.header("Access-Control-Allow-Origin", "https://bobbuilder.shop");
    res.header("Access-Control-Allow-Credentials", "true");

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided",
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      try {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "valentine_days",
          width: 320,
          height: 360,
          gravity: "faces",
          crop: "fill",
          timeout: 120000, // Increase timeout to 120 seconds
        });

        await fs.unlink(file.path);
        return result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        await fs
          .unlink(file.path)
          .catch((err) =>
            console.error(`Failed to delete file ${file.path}:`, err)
          );
        throw uploadError;
      }
    });

    const imageUrls = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      imageUrls,
    });
  } catch (error) {
    console.error("Upload controller error:", error);

    // Cleanup any remaining files
    if (req.files) {
      await Promise.all(
        req.files.map((file) =>
          fs
            .unlink(file.path)
            .catch((err) =>
              console.error(`Failed to delete file ${file.path}:`, err)
            )
        )
      );
    }

    res.status(500).json({
      success: false,
      message: error.message || "Error uploading images",
    });
  }
};

export const createDayData = async (req, res, next) => {
  try {
    const {
      day,
      messages,
      images,
      needToTellSomething,
      secretPromise,
      secretMessage,
      specialMessage,
      passcode,
      partnerName,
      gender,
    } = req.body;
    const userId = req.user.id;

    if (!day || !images) {
      return next(
        new CustomError("Day, messages, and images are required", 400)
      );
    }

    if (!Array.isArray(messages) || !Array.isArray(images)) {
      return next(new CustomError("Messages and images must be arrays", 400));
    }

    // Create day data with all possible fields
    const dayData = await DayData.create({
      day,
      messages,
      images,
      needToTellSomething,
      secretPromise,
      secretMessage,
      specialMessage,
      user: userId,
    });

    // Update user's dayData array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { dayData: dayData._id }, // Push only inside the array field
        $set: {
          isSubmittedData: true,
          passcode,
          partnerName,
          gender,
        }, // Set values for non-array fields
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(new CustomError("User not found", 400));
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

// Add specific day data fetching functions
export const getRoseDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Rose");
};

export const getProposeDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Propose");
};

export const getChocolateDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Chocolate");
};

export const getTeddyDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Teddy");
};

export const getPromiseDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Promise");
};

export const getHugDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Hug");
};

export const getKissDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Kiss");
};

export const getValentineDayData = async (req, res, next) => {
  await getDayDataByType(req, res, next, "Valentine");
};

// Helper function for getting day specific data
const getDayDataByType = async (req, res, next, dayType) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    const dayData = await DayData.findOne({
      day: dayType,
      user: user._id,
    });

    if (!dayData) {
      return next(new CustomError(`${dayType} day data not found`, 404));
    }

    res.status(200).json({
      success: true,
      dayData,
    });
  } catch (error) {
    next(
      new CustomError(
        error.message || `Error fetching ${dayType} day data`,
        500
      )
    );
  }
};
