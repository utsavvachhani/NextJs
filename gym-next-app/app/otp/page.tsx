"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, resendOTP, clearError } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const OTPPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: reduxError, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    dispatch(clearError());
    inputsRef.current[0]?.focus();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value;

    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);

      if (value && idx < OTP_LENGTH - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "Enter" && idx === OTP_LENGTH - 1) {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < OTP_LENGTH) {
      setError("Please enter complete OTP.");
      return;
    }
    setError("");

    const result = await dispatch(verifyEmail({ otp: otpValue }));
    if (verifyEmail.fulfilled.match(result)) {
      localStorage.removeItem("unverified_email");
      router.push("/");
    }
  };

  const handleResend = () => {
    const email = localStorage.getItem("unverified_email");
    if (!email) {
      setError("Email not found. Please signup again.");
      return;
    }
    setOtp(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(300);
    setError("");
    dispatch(clearError());
    dispatch(resendOTP(email));
    inputsRef.current[0]?.focus();
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page)">
      <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8 text-center">

        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
            <AssignmentIndIcon sx={{ color: "var(--text-primary)" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
          Verify OTP
        </h1>
        <p className="text-sm text-(--text-secondary) mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        {(reduxError || error) && <p className="text-(--brand-red) mb-4 text-sm">{reduxError || error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                autoComplete="off"
                disabled={loading}
                ref={(el) => { if (el) inputsRef.current[idx] = el; }}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center text-(--text-primary) bg-(--bg-card) border border-(--border-color) rounded-lg text-lg focus:border-(--brand-red) outline-none disabled:opacity-50"
              />
            ))}
          </div>

          <p className="text-sm text-(--text-secondary)">
            Resend OTP in{" "}
            <span className="font-semibold text-(--brand-red)">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0 || loading}
            className={`w-full btn rounded-lg transition-colors py-2.5 font-semibold ${secondsLeft === 0
              ? "bg-(--brand-red) text-white hover:bg-red-700"
              : "bg-(--border-color) text-(--text-secondary) cursor-not-allowed opacity-50"
              }`}
          >
            Resend OTP
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-2.5 font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
