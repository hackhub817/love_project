import { Coupon } from "../models/coupen.js";

export const applyCoupen = async (req, res) => {
  const { code } = req.body;

  const amount = 200;
  if (!code) {
    return res
      .status(400)
      .json({ message: "Amount and coupon code are required" });
  }

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res
        .status(400)
        .json({ message: "Coupon not found or is inactive" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    const discountedAmount = amount - (amount * coupon.discountValue) / 100;

    if (discountedAmount < 0) {
      discountedAmount = 0;
    }

    coupon.usedCount += 1;
    await coupon.save();

    res.status(200).json({
      originalAmount: amount,
      discountApplied: amount - discountedAmount,
      discountedAmount: discountedAmount,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addCoupon = async (req, res) => {
  const { code, discountValue, usageLimit, isActive } = req.body;
  console.log("req.bod", req.body);
  if (!code || !discountValue) {
    return res.status(400).json({
      message:
        "Code, discount type, discount value, and expiration date are required",
    });
  }

  if (discountValue <= 0) {
    return res
      .status(400)
      .json({ message: "Discount value must be greater than 0" });
  }

  try {
    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Create the new coupon
    const newCoupon = new Coupon({
      code,
      discountValue,
      usageLimit: usageLimit || 1, // Default to 1 if not provided
      isActive: isActive !== undefined ? isActive : true, // Default to true if not provided
    });

    // Save the coupon to the database
    const savedCoupon = await newCoupon.save();

    // Send a success response
    res.status(201).json({
      message: "Coupon added successfully",
      coupon: savedCoupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
