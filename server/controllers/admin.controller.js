import Admin from "../models/admin.schema.js";
import CustomError from "../utils/error.utils.js";

const cookieOption = {
  secure: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "None",
};

export const login = async (req, res, next) => {
  try {
    const { adminEmail, adminPassword } = req.body;
    console.log(" adminEmail, adminPassword", adminEmail, adminPassword);
    if (!adminEmail || !adminPassword) {
      return next(new CustomError("Email and Password is required", 400));
    }

    const user = await Admin.findOne({
      adminEmail,
    }).select("+adminPassword");
    console.log("user", user);
    if (!user) {
      return next(new CustomError("Email is not registered", 401));
    }

    const passwordCheck = await user.comparePassword(adminPassword);
    if (!passwordCheck) {
      return next(new CustomError("Password is wrong", 400));
    }

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "Login Successfull!",
      user,
    });
  } catch (err) {
    return next(new CustomError(err.message, 500));
  }
};

export const logout = (req, res, next) => {
  const token = "";
  console.log("logout");
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

export const profile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await Admin.findById(userId);

    res.status(200).json({
      success: true,
      message: "",
      user,
    });
  } catch (err) {
    return next(new CustomError("Failed to fetch" + err.message, 500));
  }
};

export const register = async (req, res, next) => {
  try {
    const { adminEmail, adminPassword, adminName } = req.body;
    console.log(req.body);

    const uniqueEmail = await Admin.findOne({ adminEmail });
    if (uniqueEmail) {
      return next(new CustomError("Email is already registered", 400));
    }

    const user = await Admin.create({
      adminEmail,
      adminPassword,
      adminName,
    });

    if (!user) {
      return next(new CustomError("Registration Failed!", 400));
    }

    const token = await user.generateJWTToken();
    res.cookie("token", token, cookieOption);
    await user.save();

    user.adminPassword = undefined;
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return next(new CustomError(err.message, 500));
  }
};
