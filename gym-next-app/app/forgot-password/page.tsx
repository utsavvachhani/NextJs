"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import LockResetIcon from "@mui/icons-material/LockReset";

const ForgotPasswordPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email.");
            return;
        }
        setError("");

        const result = await dispatch(forgotPassword(email));
        if (forgotPassword.fulfilled.match(result)) {
            localStorage.setItem("reset_email", email);
            router.push("/verify-reset-otp");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page)">
            <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
                        <LockResetIcon sx={{ color: "var(--text-primary)", fontSize: 32 }} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-(--text-primary) mb-2">
                    Forgot Password
                </h1>
                <p className="text-sm text-center text-(--text-secondary) mb-6">
                    Enter your email to receive a password reset OTP
                </p>

                {error && (
                    <div className="mb-4 text-sm text-(--brand-red) text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your Gmail address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full py-2.5 font-semibold transition-colors disabled:opacity-50"
                    >
                        {loading ? "Sending OTP..." : "Send Reset OTP"}
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-(--text-muted)">
                    Remember your password?{" "}
                    <Link href="/signin" className="font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
