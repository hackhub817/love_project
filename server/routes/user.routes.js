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
  handleLockToggle,
  handlePasswordToggle,
  contactUs,
  handleSocialLogin,
} from "../controllers/user.controller.js";
import passport from "passport";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res, next) => {
    console.log(req.user);
    res.send("Redirecting to google login!");
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  handleSocialLogin
);

router.post("/sent-otp", sentOtp);
router.post("/resend-otp", resendOtp);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-user/:id", isLoggedIn, getUserById);
router.get("/", isLoggedIn, profile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyOTP);
router.get("/verify-token", isLoggedIn, verifyToken);
router.post("/verify-passcode", verifyPasscode);
router.get("/verify-user/:username", verifyUser);
router.get("/details", isLoggedIn, getUserDetails);
router.patch("/toggle-lock", isLoggedIn, handleLockToggle);
router.patch("/toggle-password", isLoggedIn, handlePasswordToggle);
router.post("/contact", contactUs);
router.get("/updatePaymentStatus", isLoggedIn, paymentStatus);

export default router;
