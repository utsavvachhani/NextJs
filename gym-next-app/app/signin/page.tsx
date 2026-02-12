"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    router.push("/"); 
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

        {error && (
          <div className="mb-4 text-sm text-(--brand-red)">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm text-(--text-secondary) transition-colors">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-(--border-color) bg-(--bg-card) px-3 py-2 text-(--text-primary) placeholder-(--text-muted) focus:border-(--brand-red) outline-none transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm text-(--text-secondary) transition-colors">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-(--border-color) bg-(--bg-card) px-3 py-2 text-(--text-primary) placeholder-(--text-muted) focus:border-(--brand-red) outline-none transition-colors"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign In
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
