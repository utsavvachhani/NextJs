"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ResetPasswordPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (formData.newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setError("");

        const result = await dispatch(resetPassword(formData));
        if (resetPassword.fulfilled.match(result)) {
            localStorage.removeItem("reset_email");
            router.push("/signin");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page)">
            <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
                        <LockIcon sx={{ color: "var(--text-primary)", fontSize: 32 }} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-(--text-primary) mb-2">Reset Password</h1>
                <p className="text-sm text-center text-(--text-secondary) mb-6">Create a new secure password</p>

                {error && <div className="mb-4 text-sm text-(--brand-red) text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type={showPassword.new ? "text" : "password"}
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                        >
                            {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                        >
                            {showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn btn-primary py-2.5 font-semibold transition-colors disabled:opacity-50"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
