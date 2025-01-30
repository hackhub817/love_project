import { Router } from "express";
import multer from "multer";
import {
  uploadImages,
  createDayData,
  getRoseDayData,
  getProposeDayData,
  getChocolateDayData,
  getTeddyDayData,
  getPromiseDayData,
  getHugDayData,
  getKissDayData,
  getValentineDayData,
} from "../controllers/daydata.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";
import cors from "cors";

const router = Router();

// Configure multer
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1000 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
}).array("images", 12);

// Wrap upload middleware to handle errors
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: `Server error: ${err.message}`,
      });
    }
    next();
  });
};

// Upload and create routes
router.post("/upload-images", isLoggedIn, uploadMiddleware, uploadImages);
router.post("/create", isLoggedIn, createDayData);

// Get day data routes
router.get("/Rose/:username", getRoseDayData);
router.get("/Propose/:username", getProposeDayData);
router.get("/Chocolate/:username", getChocolateDayData);
router.get("/Teddy/:username", getTeddyDayData);
router.get("/Promise/:username", getPromiseDayData);
router.get("/Hug/:username", getHugDayData);
router.get("/Kiss/:username", getKissDayData);
router.get("/Valentine/:username", getValentineDayData);

// Add OPTIONS handler for preflight requests
router.options("/upload-images", cors()); // Handle preflight for upload endpoint

export default router;
