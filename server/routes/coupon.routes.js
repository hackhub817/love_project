import { Router } from "express";
const router = Router();
import { addCoupon, applyCoupen } from "../controllers/coupen.controller.js";

router.post("/add-coupon", addCoupon);
router.post("/apply-coupon", applyCoupen);

export default router;
