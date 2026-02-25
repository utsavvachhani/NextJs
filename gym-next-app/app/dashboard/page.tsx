"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { logout } from "@/action/authSlice";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/signin");
    };

    return (
        <div className="min-h-screen p-8 bg-(--bg-page)">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-(--text-primary)">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-(--brand-red) text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Logout
                    </button>
                </div>

                {loading ? (
                    <p className="text-(--text-secondary)">Loading user data...</p>
                ) : user ? (
                    <div className="bg-(--bg-card) p-6 rounded-xl border border-(--border-color) shadow-(--shadow-sm)">
                        <h2 className="text-xl font-semibold mb-4 text-(--text-primary)">User Profile</h2>
                        <div className="space-y-2">
                            <p className="text-(--text-secondary)">
                                <span className="font-semibold text-(--text-primary)">Name:</span> {user.firstName} {user.lastName}
                            </p>
                            <p className="text-(--text-secondary)">
                                <span className="font-semibold text-(--text-primary)">Email:</span> {user.email}
                            </p>
                            <p className="text-(--text-secondary)">
                                <span className="font-semibold text-(--text-primary)">Mobile:</span> {user.mobile || "N/A"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-(--text-secondary)">No user data found.</p>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
