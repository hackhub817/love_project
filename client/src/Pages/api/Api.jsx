import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This enables sending cookies with requests
});

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/user/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const forgetPassword = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      "/user/forgot-password",
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const resetPassword = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      "/user/reset-password",
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/user/logout");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const sendOtp = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/sent-otp", userData);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const resendOtp = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/resend-otp", userData);
    return response.data;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    const response = await axiosInstance.get("/user/verify-token");
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
    const response = await axiosInstance.post(
      "/day-data/upload-images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

export const createDayData = async (data) => {
  try {
    const response = await axiosInstance.post("/day-data/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating day data:", error);
    throw error;
  }
};

export const getRoseDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Rose/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rose day data:", error);
    throw error;
  }
};

export const getProposeDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Propose/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching propose day data:", error);
    throw error;
  }
};

export const getChocolateDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Chocolate/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chocolate day data:", error);
    throw error;
  }
};

export const getTeddyDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Teddy/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching teddy day data:", error);
    throw error;
  }
};

export const getPromiseDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Promise/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching promise day data:", error);
    throw error;
  }
};

export const getHugDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Hug/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hug day data:", error);
    throw error;
  }
};

export const getKissDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Kiss/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching kiss day data:", error);
    throw error;
  }
};

export const getValentineDayData = async (username) => {
  try {
    const response = await axiosInstance.get(`/day-data/Valentine/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching valentine day data:", error);
    throw error;
  }
};
