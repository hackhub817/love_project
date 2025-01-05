import User from "../models/user.schema.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import CustomError from "../utils/error.utils.js";
import sendEmail from "../utils/email.utils.js";
import otpService from "../utils/otpUtils.js";

const cookieOption = {
  secure: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
};

const sentOtp = async (req, res, next) => {
  try {
    const { userEmail } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate and save OTP
    const otp = otpService.generateOTP();
    otpService.saveOTP(userEmail, otp);
    const subject = "🔒 Otp Verification for registration";
    const message = `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 600px; background-color: #f4f4f4; border-radius: 8px; padding: 20px; box-sizing: border-box; font-family: Arial, sans-serif;">
  <tr>
    <td style="text-align: center; padding: 20px 0;">

      <img src="https://img.icons8.com/ios-filled/50/0074f9/lock.png" alt="Lock Icon" style="width: 50px; margin-bottom: 15px;">

      <h1 style="font-size: 1.5rem; font-weight: bold; margin: 0; color: #0074f9;">Verify Your Email</h1>

      <p style="font-size: 1rem; font-weight: normal; margin: 15px 0; color: #555555;">
        Welcome to <strong>Love Birds</strong>, ${userEmail}!
      </p>

      <p style="font-size: 1rem; font-weight: normal; margin: 15px 0; color: #555555;">
        Please use the OTP below to verify your email and complete your registration:
      </p>

      <div style="background-color: #0074f9; color: #ffffff; font-size: 1.2rem; font-weight: bold; text-align: center; padding: 10px; border-radius: 5px; margin: 20px auto; display: inline-block; width: 150px;">
        ${otp}
      </div>

      <p style="font-size: 0.9rem; font-weight: normal; margin: 15px 0; color: #555555;">
        This OTP is valid for the next 10 minutes. If you did not request this, you can safely ignore this email.
      </p>

      <div style="margin: 20px 0;">
        <a href="https://lovebirds-website.onrender.com" style="display: inline-block; background-color: #0074f9; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 1rem;">
          Visit Love Birds
        </a>
      </div>

      <p style="font-size: 0.9rem; color: #999999; margin: 20px 0;">
        For further assistance, please contact our <strong>Support Team</strong>.
      </p>

      <div style="text-align: center; margin-top: 20px;">
        <a href="#" style="text-decoration: none; margin: 0 10px;">
          <img src="https://img.icons8.com/ios-filled/30/0074f9/facebook.png" alt="Facebook" style="width: 25px;">
        </a>
        <a href="#" style="text-decoration: none; margin: 0 10px;">
          <img src="https://img.icons8.com/ios-filled/30/0074f9/x.png" alt="Twitter" style="width: 25px;">
        </a>
        <a href="#" style="text-decoration: none; margin: 0 10px;">
          <img src="https://img.icons8.com/ios-filled/30/0074f9/instagram.png" alt="Instagram" style="width: 25px;">
        </a>
        <a href="#" style="text-decoration: none; margin: 0 10px;">
          <img src="https://img.icons8.com/ios-filled/30/0074f9/linkedin.png" alt="LinkedIn" style="width: 25px;">
        </a>
      </div>

    </td>
  </tr>
</table>`;

    await sendEmail(userEmail, subject, message);

    res.status(200).json({
      status: true,
      message: "OTP sent successfully",
      userEmail,
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
// Resend OTP Route
const resendOtp = async (req, res, next) => {
  try {
    const { userEmail } = req.body;

    // Check if user exists (prevent spam)
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User Registered Successfully" });
    }

    // Generate and save new OTP
    const newOTP = otpService.resendOTP(userEmail);
    const subject = "🔒 Otp Verification for registration";
    const message = `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" 
  style="max-width: 600px; width: 100%; background-color: #f4f4f4; margin: 0 auto; padding: 20px; border-radius: 8px; font-family: Arial, sans-serif; color: #333; box-sizing: border-box;">
  <tr>
    <td align="center" style="padding: 20px;">
      <img src="https://img.icons8.com/ios-filled/50/0074f9/lock.png" alt="Lock Icon" 
        style="width: 50px; margin-bottom: 15px;">
      <h1 style="margin: 0; font-size: 1.5rem; color: #0074f9;">Hello, ${userEmail}</h1>
    </td>
  </tr>
  <tr>
    <td style="padding: 20px; text-align: center; background-color: #ffffff; border-radius: 8px;">
      <p style="margin: 0 0 20px; font-size: 1rem; color: #555;">
        We noticed you requested a new OTP. Here’s your new code:
      </p>
      <p style="margin: 0 0 20px; font-size: 1.5rem; font-weight: bold; color: #0074f9;">
        ${newOTP}
      </p>
      <p style="margin: 0 0 20px; font-size: 0.9rem; color: #999;">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <p style="margin: 0; font-size: 1rem; color: #555;">Stay safe,</p>
      <p style="margin: 5px 0 0; font-size: 1.2rem; font-weight: bold; color: #0074f9;">LoveBirds</p>
      <p style="margin: 0; font-size: 0.9rem; color: #999;">Support Team</p>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <a href="#" style="margin: 0 10px; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/30/0074f9/facebook.png" alt="Facebook" style="width: 25px;">
      </a>
      <a href="#" style="margin: 0 10px; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/30/0074f9/x.png" alt="X (formerly Twitter)" style="width: 25px;">
      </a>
      <a href="#" style="margin: 0 10px; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/30/0074f9/instagram.png" alt="Instagram" style="width: 25px;">
      </a>
      <a href="#" style="margin: 0 10px; text-decoration: none;">
        <img src="https://img.icons8.com/ios-filled/30/0074f9/linkedin.png" alt="LinkedIn" style="width: 25px;">
      </a>
    </td>
  </tr>
</table>`;

    await sendEmail(userEmail, subject, message);

    res.status(200).json({
      message: "New OTP sent successfully",
      userEmail,
    });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

const register = async (req, res, next) => {
  try {
    const { fullName, userEmail, userPassword, phoneNumber, otp } = req.body;
    console.log("body", req.body);
    const isValidOTP = otpService.verifyOTP(userEmail, otp);
    console.log("isValidOTP", isValidOTP);

    if (!isValidOTP) {
      return next(new CustomError("Otp is Invalid or Expired !!", 400));
    }

    if (!fullName || !userEmail || !userPassword) {
      return next(new CustomError("All Fields are required", 400));
    }

    const uniqueEmail = await User.findOne({ userEmail });
    if (uniqueEmail) {
      return next(new CustomError("Email is already registered", 400));
    }
    console.log("uniqueEmail", uniqueEmail);

    const user = await User.create({
      fullName,
      userEmail,
      userPassword,
      phoneNumber: phoneNumber && phoneNumber,
    });

    if (!user) {
      return next(new CustomError("Registration Failed!", 400));
    }
    console.log("user", user);

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOption);
    console.log("token", token);

    const userSubject =
      "Congratulation, Registered Successfully in Love Birds !! ";
    const userMessage = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 24rem; background-color: #f4f4f4; border-radius: 8px; padding: 20px; box-sizing: border-box; color-scheme: light dark;">
      <tr>
        <td style="text-align: center; padding: 20px 0;">

          <img src="https://img.icons8.com/ios-filled/50/0074f9/checked-checkbox.png" alt="Success Icon" style="width: 40px; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto;">

          <p style="font-size: 1.2rem; font-weight: bold; margin: 0; color: #333333;">
            Congratulations, <span style="color: #0074f9;">${fullName}</span>!
          </p>

          <p style="font-weight: 400; text-align: center; margin: 20px 0; color: #444444;">
            You have successfully registered with Lovebirds.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 1rem; color: #444444;">
            <tr>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Name:</td>
              <td style="padding: 10px; text-align: left;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Email:</td>
              <td style="padding: 10px; text-align: left;">${userEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: left; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; text-align: left;">${phoneNumber}</td>
            </tr>
          </table>

          <p style="font-weight: 400; text-align: center; margin: 20px 0; color: #444444;">
            Get started by exploring our platform and unlocking its features. Click below to visit our website:
          </p>

          <div style="text-align: center; margin: 20px 0;">
            <a href="https://lovebirds-website.onrender.com" style="display: inline-block; background-color: #0074f9; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Visit Lovebirds
            </a>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <p style="margin: 0; font-size: 1rem; color: #333333;">
              Stay connected with us,
            </p>

            <img src="https://img.icons8.com/ios-filled/50/0074f9/network.png" alt="Network Icon" style="width: 30px; margin: 10px 0;">
            <p style="margin: 0; color: #0074f9; font-weight: bold;">Lovebirds</p>
            <p style="margin: 0; color: #444444;">Support Team</p>
          </div>

          <div style="text-align: center; margin-top: 20px;">
            <a href="" style="text-decoration: none; margin: 0 10px;">
              <img src="https://img.icons8.com/ios-filled/30/0074f9/facebook.png" alt="Facebook" style="width: 25px; display: inline-block;">
            </a>
            <a href="" style="text-decoration: none; margin: 0 10px;">
              <img src="https://img.icons8.com/ios-filled/30/0074f9/x.png" alt="X (formerly Twitter)" style="width: 25px; display: inline-block;">
            </a>
            <a href="" style="text-decoration: none; margin: 0 10px;">
              <img src="https://img.icons8.com/ios-filled/30/0074f9/instagram.png" alt="Instagram" style="width: 25px; display: inline-block;">
            </a>
            <a href="" style="text-decoration: none; margin: 0 10px;">
              <img src="https://img.icons8.com/ios-filled/30/0074f9/linkedin.png" alt="LinkedIn" style="width: 25px; display: inline-block;">
            </a>
          </div>

        </td>
      </tr>
    </table>`;

    await sendEmail(userEmail, userSubject, userMessage);

    await user.save();

    user.userPassword = undefined;
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      return next(new CustomError("Email and Password is required", 400));
    }

    const user = await User.findOne({
      userEmail,
    }).select("+userPassword");

    if (!user) {
      return next(new CustomError("Email is not registered", 401));
    }

    const passwordCheck = await user.comparePassword(userPassword);
    if (!passwordCheck) {
      return next(new CustomError("Password is wrong", 400));
    }
    console.log(user.isBlocked);
    if (user.isBlocked) {
      return next(
        new CustomError("Admin has Blocked you . Please contact Admin", 400)
      );
    }
    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOption);
    console.log(res.cookie);
    res.status(200).json({
      success: true,
      message: "Login Successfull!",
      user,
    });
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};

const logout = (req, res, next) => {
  const token = "";
  const cookiesOption = {
    logoutAt: new Date(),
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };

  try {
    res.cookie("token", token, cookiesOption);
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};

const profile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "",
      user,
    });
  } catch (err) {
    return next(new CustomError("Failed to fetch" + err.message, 500));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "",
      user,
    });
  } catch (err) {
    return next(new CustomError("Failed to fetch" + err.message, 500));
  }
};
const forgotPassword = async (req, res, next) => {
  const { userEmail } = req.body;

  if (!userEmail) {
    return next(new CustomError("Email is Required", 400));
  }

  const user = await User.findOne({ userEmail });

  if (!user) {
    return next(new CustomError("Email is not registered", 400));
  }

  const uuid = uuidv4();

  const otp = uuid.replace(/\D/g, "").slice(0, 4);
  user.otp = await otp;
  user.otpExpiry = (await Date.now()) + 2 * 60 * 1000;

  await user.save();

  // const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
  const subject = "🔒 Password Reset Request";
  const message = `
 <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100% max-width: 24rem background-color: #f4f4f4 border-radius: 8px padding: 20px box-sizing: border-box color-scheme: light dark background-color: #ffffff background-color: #1a1a1a">
  <tr>
    <td style="text-align: center padding: 20px 0">
      
   
      <p style="font-size: 1.2rem font-weight: bold margin: 0 color: #000000 color: #ffffff">
        Hello, <span style="color: #0074f9">${user.fullName}</span>
      </p>

      <p style="font-weight: 400 text-align: center margin: 20px 0 color: #555555 color: #cccccc">
        Please Enter this otp for successful verification of the email
      </p>

     <p style="font-weight: 400 text-align: center margin: 20px 0 color: #555555 color: #cccccc">
        <strong>${otp}</strong>
      </p>

    </td>
  </tr>
</table>`;

  try {
    await sendEmail(userEmail, subject, message);
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your userEmail",
    });
  } catch (e) {
    await user.save();
    return next(new CustomError(e.message, 500));
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { userEmail, otp, newPassword } = req.body;

    if (!userEmail) {
      return next(new CustomError("Email is Required", 400));
    }

    if (!otp) {
      return next(new CustomError("OTP is required", 400));
    }

    if (!newPassword) {
      return next(new CustomError("New password is required", 400));
    }

    const user = await User.findOne({ userEmail });

    if (!user) {
      return next(new CustomError("Email is not registered", 400));
    }

    if (user.otp == otp) {
      if (Date.now() < user.otpExpiry) {
        user.userPassword = await newPassword;
      } else {
        return next(new CustomError("OTP is expired! Resend OTP"));
      }
    } else {
      return next(new CustomError("OTP is wrong!"));
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

export {
  register,
  login,
  getUserById,
  profile,
  logout,
  sentOtp,
  resendOtp,
  forgotPassword,
  verifyOTP,
};
