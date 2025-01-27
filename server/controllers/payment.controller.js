import { razorpay } from "../server.js";
import crypto from "crypto";
import { Coupon } from "../models/coupen.js";
import CustomError from "../utils/error.utils.js";

export const razorpayKey = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in getting razorpay key",
      success: false,
    });
  }
};

export const checkout = async (req, res, next) => {
  try {
    const { code = "" } = req.body;
    const couponData = await Coupon.findOne({ code });
    console.log("couponData", couponData);
    const amount = 100;

    const razorAmount =
      amount - ((amount * couponData?.discountValue) / 100 || 0);
    console.log(razorAmount);
    const options = {
      amount: razorAmount * 100,
      currency: "INR",
    };
    console.log(options);
    console.log("object");
    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (e) {
    console.log(e);
    return next(new CustomError(e.message, 500));
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");
    console.log("expectedSignature", expectedSignature);
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Invalid signature",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment done successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in verifying payment",
      success: false,
    });
  }
};
