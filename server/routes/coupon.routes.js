import { Router } from "express";
const router = Router();
import {
  addCoupon,
  applyCoupen,
  removeCoupon,
} from "../controllers/coupen.controller.js";

router.post("/add-coupon", addCoupon);
router.post("/apply-coupon", applyCoupen);
router.post("/removeCoupon", removeCoupon);

export default router;
