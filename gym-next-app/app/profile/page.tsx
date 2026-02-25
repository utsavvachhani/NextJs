"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import {
    Person,
    Email,
    Phone,
    Lock,
    Security,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    const [pwData, setPwData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPw, setShowPw] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [error, setError] = useState("");

    const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwData({ ...pwData, [e.target.name]: e.target.value });
    };

    const handleSubmitPw = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwData.newPassword !== pwData.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (pwData.newPassword.length < 8) {
            setError("New password must be at least 8 characters.");
            return;
        }
        setError("");

        const result = await dispatch(changePassword(pwData));
        if (changePassword.fulfilled.match(result)) {
            setPwData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-(--bg-page)">
                <p className="text-(--text-secondary)">Please sign in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 bg-(--bg-page)">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex items-center gap-6 p-8 bg-(--bg-card) border border-(--border-color) rounded-2xl shadow-(--shadow-sm)">
                    <div className="h-24 w-24 rounded-full bg-(--brand-red) flex items-center justify-center text-white text-4xl font-bold border-4 border-(--bg-page) shadow-lg">
                        {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-(--text-primary)">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-(--text-secondary) flex items-center gap-2 mt-1">
                            <Email sx={{ fontSize: 18 }} /> {user.email}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* User Details */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-(--text-primary) flex items-center gap-2">
                            <Security className="text-(--brand-red)" /> Account Details
                        </h2>
                        <div className="space-y-4">
                            <DetailItem icon={<Person />} label="First Name" value={user.firstName} />
                            <DetailItem icon={<Person />} label="Last Name" value={user.lastName} />
                            <DetailItem icon={<Email />} label="Email Address" value={user.email} />
                            <DetailItem icon={<Phone />} label="Mobile Number" value={user.mobile || "N/A"} />
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl p-6 shadow-(--shadow-sm)">
                        <h2 className="text-xl font-semibold text-(--text-primary) mb-6 flex items-center gap-2">
                            <Lock className="text-(--brand-red)" /> Change Password
                        </h2>

                        {error && <div className="mb-4 text-sm text-(--brand-red)">{error}</div>}

                        <form onSubmit={handleSubmitPw} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPw.old ? "text" : "password"}
                                    name="oldPassword"
                                    placeholder="Current Password"
                                    value={pwData.oldPassword}
                                    onChange={handlePwChange}
                                    disabled={loading}
                                    className="w-full rounded-lg border border-(--border-color) px-3 py-2.5 text-(--text-primary) bg-(--bg-page) focus:border-(--brand-red) outline-none disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw({ ...showPw, old: !showPw.old })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                                >
                                    {showPw.old ? <VisibilityOff /> : <Visibility />}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPw.new ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="New Password"
                                    value={pwData.newPassword}
                                    onChange={handlePwChange}
                                    disabled={loading}
                                    className="w-full rounded-lg border border-(--border-color) px-3 py-2.5 text-(--text-primary) bg-(--bg-page) focus:border-(--brand-red) outline-none disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw({ ...showPw, new: !showPw.new })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                                >
                                    {showPw.new ? <VisibilityOff /> : <Visibility />}
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPw.confirm ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm New Password"
                                    value={pwData.confirmPassword}
                                    onChange={handlePwChange}
                                    disabled={loading}
                                    className="w-full rounded-lg border border-(--border-color) px-3 py-2.5 text-(--text-primary) bg-(--bg-page) focus:border-(--brand-red) outline-none disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw({ ...showPw, confirm: !showPw.confirm })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                                >
                                    {showPw.confirm ? <VisibilityOff /> : <Visibility />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-primary py-2.5 font-semibold transition-transform active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center gap-4 p-4 bg-(--bg-card) border border-(--border-color) rounded-xl">
        <div className="text-(--brand-red)">{icon}</div>
        <div>
            <p className="text-xs text-(--text-secondary) font-medium uppercase tracking-wider">{label}</p>
            <p className="text-(--text-primary) font-semibold">{value}</p>
        </div>
    </div>
);

export default ProfilePage;
