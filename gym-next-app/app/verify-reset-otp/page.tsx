"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetOtp, resendOTP } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const VerifyResetOtpPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    const OTP_LENGTH = 6;
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const [secondsLeft, setSecondsLeft] = useState(300);
    const [error, setError] = useState("");
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length < OTP_LENGTH) {
            setError("Please enter complete OTP.");
            return;
        }
        setError("");

        const result = await dispatch(verifyResetOtp({ otp: otpValue }));
        if (verifyResetOtp.fulfilled.match(result)) {
            router.push("/reset-password");
        }
    };

    const handleResend = () => {
        const email = localStorage.getItem("reset_email");
        if (email) {
            dispatch(resendOTP(email));
            setSecondsLeft(300);
            setOtp(Array(OTP_LENGTH).fill(""));
            inputsRef.current[0]?.focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page)">
            <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
                        <MarkEmailReadIcon sx={{ color: "var(--text-primary)", fontSize: 32 }} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-(--text-primary) mb-2">Verify Reset OTP</h1>
                <p className="text-sm text-(--text-secondary) mb-6">Enter the OTP sent for password reset</p>

                {error && <p className="text-(--brand-red) mb-4 text-sm">{error}</p>}

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
                            {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, "0")}
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
                        disabled={loading || otp.join("").length < OTP_LENGTH}
                        className="w-full btn btn-primary py-2.5 font-semibold transition-colors disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyResetOtpPage;
