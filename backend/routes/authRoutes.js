import express from "express";
import {
  signup,
  signin,
  verifyEmail,
  resendOTP,
  forgotPassword,
  resetPassword,
  logout,
  verifyResetOtp,
  changePassword,
  updateProfile,
  getProfile,
  refreshTokenController,
} from "../controllers/authController.js";

import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);

router.post("/signin", signin);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp );
router.post("/reset-password", resetPassword);


router.post("/change-password", changePassword);
router.put("/profile/update", authMiddleware, updateProfile);
router.get("/profile", authMiddleware, getProfile);

router.post("/refresh-token", refreshTokenController);

router.get("/me", authMiddleware, (req, res) => {
  res.json({ userId: req.user.id });
});

export default router;