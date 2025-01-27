import { Router } from "express";
import {
  checkout,
  razorpayKey,
  verifyPayment,
} from "../controllers/payment.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const paymentRouter = Router();

paymentRouter.get("/key", isLoggedIn, razorpayKey);

paymentRouter.post("/checkout", isLoggedIn, checkout);

paymentRouter.post("/verify", isLoggedIn, verifyPayment);

export default paymentRouter;
