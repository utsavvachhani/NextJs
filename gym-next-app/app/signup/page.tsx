"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmedPassword: string;
};

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: reduxError } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<SignUpData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmedPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmedPassword: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const { firstName, lastName, email, mobile, password, confirmedPassword } = formData;

    const nameRegex = /^[A-Za-z]+$/;
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!firstName || !lastName || !email || !mobile || !password || !confirmedPassword) {
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
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirmedPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await dispatch(signup(formData));
    if (signup.fulfilled.match(result)) {
      localStorage.setItem("unverified_email", formData.email);
      router.push("/otp");
    }
  };

  const renderPasswordInput = (
    field: "password" | "confirmedPassword",
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

        {(reduxError || error) && (
          <div className="mb-4 text-sm text-(--brand-red)">
            {reduxError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Gmail address"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            placeholder="Mobile number"
            value={formData.mobile}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-(--text-primary) bg-(--bg-card) focus:border-(--brand-red) outline-none disabled:opacity-50"
          />

          {/* Password */}
          {renderPasswordInput("password", "Password")}
          {renderPasswordInput("confirmedPassword", "Confirm Password")}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
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
