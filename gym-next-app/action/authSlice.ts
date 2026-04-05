import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { 
  signupAPI, 
  signinAPI, 
  getCurrentUser, 
  verifyEmailAPI, 
  resendOTPAPI, 
  forgotPasswordAPI, 
  verifyResetOtpAPI, 
  resetPasswordAPI, 
  changePasswordAPI, 
  logoutAPI,
  getProfileAPI,
  updateProfileAPI 
} from "../api/authApi";
import { showAlert } from "./alertSlice";

interface AuthState {
  user: any;
  profile: any;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: typeof window !== "undefined" ? (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null) : null,
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("user") : false,
};

// Async Thunks
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await signupAPI(userData);
      dispatch(showAlert({ message: data.message || "OTP sent to your email", type: "success" }));
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Signup failed";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (credentials: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await signinAPI(credentials);
      if (data.success) {
        dispatch(showAlert({ message: "Welcome back!", type: "success" }));
      }
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Signin failed";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (otpData: { otp: string }, { rejectWithValue, dispatch }) => {
    try {
      const data = await verifyEmailAPI(otpData);
      dispatch(showAlert({ message: "Email verified successfully!", type: "success" }));
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Verification failed";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email: string, { rejectWithValue, dispatch }) => {
    try {
      const data = await resendOTPAPI(email);
      dispatch(showAlert({ message: "OTP resent successfully", type: "success" }));
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to resend OTP";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue, dispatch }) => {
    try {
      const data = await forgotPasswordAPI(email);
      dispatch(showAlert({ message: "Reset OTP sent to your email", type: "success" }));
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to send reset OTP";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async (otpData: { otp: string }, { rejectWithValue, dispatch }) => {
    try {
      const data = await verifyResetOtpAPI(otpData);
      dispatch(showAlert({ message: "OTP verified. You can now reset your password.", type: "success" }));
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Invalid or expired OTP";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await resetPasswordAPI(data);
      dispatch(showAlert({ message: "Password reset successful! Please sign in.", type: "success" }));
      return res;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to reset password";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      const res = await changePasswordAPI(data);
      dispatch(showAlert({ message: "Password changed successfully!", type: "success" }));
      return res;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to change password";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfileAPI();
      return data.profile;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (formData: FormData, { rejectWithValue, dispatch }) => {
    try {
      const data = await updateProfileAPI(formData);
      dispatch(showAlert({ message: "Profile updated successfully!", type: "success" }));
      return data.profile;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update profile";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await logoutAPI();
      localStorage.removeItem("user");
      dispatch(showAlert({ message: "Logged out successfully", type: "info" }));
    } catch (err) {
      localStorage.removeItem("user");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCurrentUser();
      return data;
    } catch (err: any) {
      localStorage.removeItem("user");
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success && action.payload.email && !action.payload.firstName) {
          // Likely needs verification
          return;
        }
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        // Also update user info if present in populated profile
        if (action.payload.userId) {
          state.user = {
            ...state.user,
            ...action.payload.userId,
            _id: action.payload.userId._id || state.user._id
          };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        if (action.payload.userId) {
          state.user = {
            ...state.user,
            ...action.payload.userId,
            _id: action.payload.userId._id || state.user._id
          };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
        state.isAuthenticated = false;
      })
      // Global loading states for other actions
      .addMatcher(
        (action) => action.type.endsWith("/pending") && !action.type.startsWith("auth/fetchCurrentUser"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

