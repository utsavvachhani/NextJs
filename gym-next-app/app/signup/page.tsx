"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { firstName, lastName, email, mobile, password, confirmPassword } =
      formData;

    const nameRegex = /^[A-Za-z]+$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const mobileRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return false;
    }
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError("Names should contain letters only.");
      return false;
    }
    if (!gmailRegex.test(email)) {
      setError("Please enter a valid Gmail address.");
      return false;
    }
    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be 10 digits.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters with uppercase, lowercase, and a special character."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save to localStorage or send to API
    const userPayload = { ...formData, createdAt: new Date().toISOString() };
    console.log("SIGN UP DATA:", userPayload);

    router.push("/signin");
  };

  const renderPasswordInput = (
    field: "password" | "confirmPassword",
    placeholder: string
  ) => (
    <div className="relative">
      <input
        type={showPassword[field] ? "text" : "password"}
        name={field}
        placeholder={placeholder}
        value={formData[field]}
        onChange={handleChange}
        className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none"
      />
      <button
        type="button"
        onClick={() =>
          setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
        }
        className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
      >
        {showPassword[field] ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--bg-page)">
      <div className="w-full max-w-md rounded-xl border border-(--border-color) bg-(--bg-card) shadow-(--shadow-sm) p-6 sm:p-8">

        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-(--border-color) bg-(--bg-page)">
            <AssignmentIndIcon sx={{ color: "var(--text-primary)" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-(--text-primary) mb-2">
          Create account
        </h1>
        <p className="text-sm text-center text-(--text-secondary) mb-6">
          Fill in your details to get started
        </p>

        {error && <div className="mb-4 text-sm text-(--brand-red)">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Gmail address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none"
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            placeholder="Mobile number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none"
          />

          {/* Password */}
          {renderPasswordInput("password", "Password")}
          {renderPasswordInput("confirmPassword", "Confirm Password")}

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-(--text-muted)">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
