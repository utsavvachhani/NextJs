import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: serverUrl,
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
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and not already a retry
    // Also ensure we don't try to refresh if the request itself is the refresh token request
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token") &&
      !originalRequest.url?.includes("/auth/signin") &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshTokenAPI();
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Optional: clear local storage if refresh fails
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


