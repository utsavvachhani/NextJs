import User from "../models/User.js";
import Otp from "../models/Otp.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { sendOTPEmail } from "../utils/mailer.js";

/* =======  HELPER: Token Generation & RefreshToken  ====== */
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "5m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
};
  
const verifySignupToken = (req) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new Error("Access token missing");
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET
  );

  return decoded.id;
};


/* =======  HELPER: Cookies  ====== */
const accessCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 5 * 60 * 1000,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/* =======  HELPER: Generate & Save OTP  ====== */
const generateAndSaveOTP = async (userId, email) => {
  // Delete previous unused OTPs (important)
  await Otp.deleteMany({
    userId,
    isUsed: false,
  });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    alphabets: false,
  });

  const hashedOtp = await bcrypt.hash(otp, 10);

  await Otp.create({
    userId,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
  });

  await sendOTPEmail(email, otp);
};

/* =======  HELPER: Hash Password  ====== */
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/* =======  SIGNUP  ====== */
export const signup = async (req, res) => {
  console.log("Signup Request Body:", req.body); // Debug log
  try {
    const { firstName, lastName, mobile, email, password, confirmedPassword } = req.body;

    if (
      !firstName ||
      !lastName ||
      !mobile ||
      !email ||
      !password ||
      !confirmedPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    if (password !== confirmedPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await hashPassword(password);


    const newUser = await User.create({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await Profile.create({
      userId: newUser._id,
    });

    await generateAndSaveOTP(newUser._id, email);

    const accessToken = generateAccessToken(newUser._id);

    res.cookie("accessToken", accessToken, accessCookieOptions);

    return res.status(201).json({
      success: true,
      email: newUser.email,
      message: "User registered successfully. OTP sent to email.",
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Signup failed. Please try again.",
    });
  }
};

/* =======  VERIFY EMAIL  ====== */
export const verifyEmail = async (req, res) => 
{
  console.log("Verify Email Request Body:", req.body); 
  try {
    const { otp } = req.body;

    
    const userId = verifySignupToken(req);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const otpRecord = await Otp.findOne({
      userId: user._id,
      isUsed: false,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isMatch = await bcrypt.compare(
      otp,
      otpRecord.otp
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpRecord.isUsed = true;
    otpRecord.verifiedAt = new Date();
    await otpRecord.save();

    user.isVerified = true;
    await user.save();

    const newAccessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", newAccessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    });

  } catch (error) {
    console.error("Verify Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Email verification failed",
    });
  }
};

/* =======  SIGNIN  ====== */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
    });

  } catch (error) {
    console.error("Signin Error:", error);

    return res.status(500).json({
      success: false,
      message: "Signin failed. Please try again.",
    });
  }
};

/* =======  RESEND OTP  ====== */
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    const oldToken = req.cookies.accessToken;

    if (oldToken) {
      try {
        // If still valid, do NOT allow resend
        jwt.verify(oldToken, process.env.JWT_ACCESS_SECRET);

        return res.status(400).json({
          success: false,
          message: "OTP already sent. Please wait until it expires.",
        });

      } catch (error) {
        // Token expired → allowed to resend
      }
    }``

    await Otp.deleteMany({
      userId: user._id,
      isUsed: false,
    });

    await generateAndSaveOTP(user._id, user.email);

    const newAccessToken = generateAccessToken(user._id);

    res.cookie("accessToken", newAccessToken, accessCookieOptions);

    return res.status(200).json({
      success: true,
      email: user.email,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
    });
  }
};

/* =======  LOGOUT  ====== */
export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

/* =======  FORGOT PASSWORD  ====== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Delete old unused OTP
    await Otp.deleteMany({
      userId: user._id,
      isUsed: false,
    });

    // Generate new OTP
    await generateAndSaveOTP(user._id, user.email);

    // 5 min temporary token
    const accessToken = generateAccessToken(user._id);

    res.cookie("accessToken", accessToken, accessCookieOptions);

    return res.status(200).json({
      success: true,
      email: user.email,
      message: "OTP sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Forgot password failed",
    });
  }
};

/* =======  VERIFY RESET OTP  ====== */
export const verifyResetOtp = async (req, res) => {
  console.log("Verify Reset OTP Request Body:", req.body);
  try {
    const { otp } = req.body;

    const userId = verifySignupToken(req);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otpRecord = await Otp.findOne({
      userId: user._id,
      isUsed: false,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isMatch = await bcrypt.compare(
      otp,
      otpRecord.otp
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    otpRecord.isUsed = true;
    await otpRecord.save();


    const resetToken = generateAccessToken(user._id);
    res.cookie("accessToken", resetToken, accessCookieOptions);

    return res.status(200).json({
      success: true,
      message: "OTP verified. You can now reset password.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};


/* =======  FORGOT PASSWORD  ====== */
export const resetPassword = async (req, res) => {
  console.log("Reset Password Request Body:", req.body);
  try {
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userId = verifySignupToken(req);

    const user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;

    await user.save();

    // Clear cookie after reset
    res.clearCookie("accessToken");

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please signin.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Reset password failed",
    });
  }
};

/* =======  FORGOT PASSWORD  ====== */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New passwords do not match",
      });
    }

    const userId = verifySignupToken(req);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const isSame = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (isSame) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be same as old password",
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Change password failed",
    });
  }
};

/* =======  UPDATE Profile  ====== */
export const updateProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const {
      photo,
      bio,
      address,
      dateOfBirth,
      note,
    } = req.body;

    // 1️⃣ Check verification
    if (!loggedInUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // 2️⃣ Find profile
    let profile = await Profile.findOne({
      userId: loggedInUser._id,
    });

    // 3️⃣ Auto create profile if not exists
    if (!profile) {
      profile = new Profile({
        userId: loggedInUser._id,
      });
    }

    // 4️⃣ Update only provided fields
    if (photo !== undefined) profile.photo = photo;
    if (bio !== undefined) profile.bio = bio;
    if (address !== undefined) profile.address = address;
    if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;

    // 5️⃣ Add history
    profile.updatedHistory.push({
      note: note || "Profile updated",
    });

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
    });
  }
};

/* =======  GET Profile  ====== */
export const getProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // 1️⃣ Check verification
    if (!loggedInUser.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // 2️⃣ Find profile using userId
    const profile = await Profile.findOne({
      userId: loggedInUser._id,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/* =======  REFRESH TOKEN (AUTO REGENERATE ACCESS TOKEN)  ====== */
export const refreshTokenController = (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Refresh token expired or invalid",
      });
    }

    const newAccessToken = generateAccessToken(decoded.id);

    res.cookie("accessToken", newAccessToken, accessCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Refresh token failed",
    });
  }
};