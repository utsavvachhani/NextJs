"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signin, clearError } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: reduxError, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    const result = await dispatch(signin({ email, password }));

    if (signin.fulfilled.match(result)) {
      // If user is unverified, backend might return success: true but missing details
      if (result.payload.success && result.payload.email && !result.payload.firstName) {
        localStorage.setItem("unverified_email", result.payload.email);
        router.push("/otp");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page) transition-colors">
      <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8 transition-colors">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
            <AssignmentIndIcon
              fontSize="medium"
              sx={{ color: "var(--text-primary)" }}
            />
          </div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-(--text-primary)">
          Sign in
        </h1>

        <p className="mb-6 text-center text-sm text-(--text-secondary)">
          Continue to your account
        </p>

        {(reduxError || error) && (
          <div className="mb-4 text-sm text-(--brand-red) text-center">
            {reduxError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm text-(--text-secondary)">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-(--border-color) bg-(--bg-card) px-3 py-2 text-(--text-primary) placeholder-(--text-muted) focus:border-(--brand-red) outline-none transition-colors disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-(--text-secondary)">
                Password
              </label>
              <Link href="/forgot-password" title="Forgot password" className="text-xs text-(--brand-red) hover:underline font-medium">
                Forgot password?
              </Link>

            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full rounded-lg border border-(--border-color) bg-(--bg-card) px-3 py-2 text-(--text-primary) placeholder-(--text-muted) focus:border-(--brand-red) outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary w-full py-2.5 font-semibold transition-colors disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-(--text-muted) transition-colors">
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
