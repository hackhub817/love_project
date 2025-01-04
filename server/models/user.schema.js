import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "VENDOR"],
    default: "USER",
  },
  userEmail: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  userPassword: {
    type: String,
    minlength: 6,
  },
  phoneNumber: {
    type: Number,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPaymentDone: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
  },
  selectedDays: {
    type: [String], // Array of strings
    enum: [
      "Rose",
      "Propose ",
      "Chocolate ",
      "Teddy",
      "Promise",
      "Hug",
      "Kiss",
      "Valentine",
    ],
    required: [true, "At least one selected day is required"],
  },
  dayData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DayData", // Reference to the DayData model
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) {
    return next();
  }
  this.userPassword = await bcrypt.hash(this.userPassword, 10);
});

userSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.userPassword);
  },
};

export default mongoose.model("User", userSchema);
