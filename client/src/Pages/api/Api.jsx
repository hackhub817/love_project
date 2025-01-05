import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const forgetPassword = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_URL}/forgot-password`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const resetPassword = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const logout = async () => {
  try {
    const response = await axios.delete(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const sendOtp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sent-otp`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const resendOtp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
