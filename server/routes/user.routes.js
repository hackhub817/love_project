import isLoggedIn from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();
import {
  register,
  login,
  logout,
  profile,
  getUserById,
  sentOtp,
  resendOtp,
  forgotPassword,
  verifyOTP,
  verifyToken,
  verifyPasscode,
  verifyUser,
  toggleUserLock,
  getUserDetails,
  paymentStatus,
} from "../controllers/user.controller.js";

router.post("/sent-otp", sentOtp);
router.post("/resend-otp", resendOtp);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-user/:id", isLoggedIn, getUserById);
router.get("/", isLoggedIn, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyOTP);
router.get("/verify-token", verifyToken);
router.post("/verify-passcode", verifyPasscode);
router.get("/verify-user/:username", verifyUser);
router.patch("/toggle-lock/:userId", toggleUserLock);
router.get("/details", isLoggedIn, getUserDetails);
router.get("/updatePaymentStatus", isLoggedIn, paymentStatus);

export default router;
