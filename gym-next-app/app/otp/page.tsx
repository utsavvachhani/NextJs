"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const OTPPage: React.FC = () => {
  const router = useRouter();
  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 mins
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Auto-focus the first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && idx < OTP_LENGTH - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }

    // Submit on Enter if last input is filled
    if (e.key === "Enter" && idx === OTP_LENGTH - 1) {
      handleSubmit(e as unknown as React.FormEvent<Element>);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < OTP_LENGTH) {
      setError("Please enter complete OTP.");
      return;
    }
    setError("");
    console.log("Entered OTP:", otpValue);
    // Verify OTP logic
    router.push("/success");
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setSecondsLeft(300);
    console.log("OTP resent");
    inputsRef.current[0]?.focus();
    // Resend OTP API call
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page)">
      <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8 text-center">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
            <AssignmentIndIcon sx={{ color: "var(--text-primary)" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-(--text-primary) mb-2">
          Verify OTP
        </h1>
        <p className="text-sm text-(--text-secondary) mb-6">
          Enter the 6-digit OTP sent to your email or mobile.
        </p>

        {error && <p className="text-(--brand-red) mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 mb-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  if (el) inputsRef.current[idx] = el;
                }}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 text-center text-(--text-primary) bg-(--bg-card) border border-(--border-color) rounded-lg text-lg focus:border-(--brand-red) outline-none"
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
            disabled={seconds > 0}
            className={`w-full btn rounded-lg ${
              seconds === 0
                ? "bg-(--brand-red) text-white"
                : "bg-(--border-color) text-(--text-secondary) cursor-not-allowed"
            }`}
          >
            Resend OTP
          </button>

          <button type="submit" className="w-full btn btn-primary">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
