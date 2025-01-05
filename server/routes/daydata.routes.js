import { Router } from "express";
import multer from "multer";
import {
  uploadImages,
  createDayData,
} from "../controllers/daydata.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = Router();

// Configure multer for handling file uploads
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
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
  upload.array("images", 3),
  uploadImages
);
router.post("/create", isLoggedIn, createDayData);

export default router;
