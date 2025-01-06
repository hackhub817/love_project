import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This enables sending cookies with requests
});

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const forgetPassword = async (credentials) => {
  try {
    const response = await axiosInstance.post("/forgot-password", credentials);
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const resetPassword = async (credentials) => {
  try {
    const response = await axiosInstance.post("/reset-password", credentials);
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/logout");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const sendOtp = async (userData) => {
  try {
    const response = await axiosInstance.post("/sent-otp", userData);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const resendOtp = async (userData) => {
  try {
    const response = await axiosInstance.post("/resend-otp", userData);
    return response.data;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await axiosInstance.get("/verify-token");
    return response.data;
  } catch (error) {
    console.error("Token verification failed:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    throw error;
  }
};

export const uploadImages = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export const submitTeddyDayData = async (data) => {
  try {
    const response = await axiosInstance.post("/day-data", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting teddy day data:", error);
    throw error;
  }
};
