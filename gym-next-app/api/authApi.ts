import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});





export const signupAPI = async (data: any) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const verifyEmailAPI = async (data: { otp: string }) => {
  const response = await axiosInstance.post("/auth/verify-email", data);
  return response.data;
};

export const signinAPI = async (data: any) => {
  const response = await axiosInstance.post("/auth/signin", data);
  return response.data;
};

export const resendOTPAPI = async (email: string) => {
  const response = await axiosInstance.post("/auth/resend-otp", { email });
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const forgotPasswordAPI = async (email: string) => {
  const response = await axiosInstance.post("/auth/forgot-password", { email });
  return response.data;
};

export const verifyResetOtpAPI = async (data: { otp: string }) => {
  const response = await axiosInstance.post("/auth/verify-reset-otp", data);
  return response.data;
};

export const resetPasswordAPI = async (data: any) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};

export const changePasswordAPI = async (data: any) => {
  const response = await axiosInstance.post("/auth/change-password", data);
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.post("/auth/refresh-token");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshTokenAPI();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, user needs to login again
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


