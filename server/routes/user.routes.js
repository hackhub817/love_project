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
} from "../controllers/user.controller.js";

router.post("/sent-otp", sentOtp);
router.post("/resend-otp", resendOtp);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-user/:id", isLoggedIn, getUserById);
router.get("/", isLoggedIn, profile);

export default router;
