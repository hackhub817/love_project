import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware.js";
import cloudinary from "cloudinary";
import morgan from "morgan";
import http from "http";
import userRoute from "./routes/user.routes.js";
import dayDataRoute from "./routes/daydata.routes.js";
import CouponRoute from "./routes/coupon.routes.js";
import PaymentRoute from "./routes/payment.routes.js";
import Razorpay from "razorpay";
const app = express();

app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
config();

const res = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(morgan("dev"));

app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       process.env.FRONTEND_URL,
//       "https: //love-bird.onrender.com",
//       "http://localhost:5174",
//       "https://bobbuilder.shop",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: ["https: //love-bird.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());

mongoose.set("strictQuery", false);
const connectDB = async () => {
  console.log("data");
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection) {
      console.log(connection.host);
    }
  } catch (err) {
    console.log(err, "error");
    process.exit(1);
  }
};
connectDB();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.use("/api/user", userRoute);
app.use("/api/day-data", dayDataRoute);
app.use("/api/coupon", CouponRoute);
app.use("/api/payment", PaymentRoute);

app.get("/", (req, res) => {
  res.send("API is running");
});
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
