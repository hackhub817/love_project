import { Router } from "express";
import multer from "multer";
import {
  uploadImages,
  createDayData,
  getDayDataByUsername,
} from "../controllers/daydata.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = Router();

// Configure multer for handling file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 20 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

router.post(
  "/upload-images",
  isLoggedIn,
  upload.array("images", 5),
  uploadImages
);
router.post("/create", isLoggedIn, createDayData);
router.get("/:day/:username", getDayDataByUsername);

export default router;
