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

const router = Router();

// Configure multer
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Upload and create routes
router.post(
  "/upload-images",
  isLoggedIn,
  upload.array("images", 12),
  uploadImages
);
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

export default router;
