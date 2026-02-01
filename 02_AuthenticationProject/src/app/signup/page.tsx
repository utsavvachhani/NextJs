/* eslint-disable prefer-const */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stack,
  FormHelperText,
} from "@mui/material";

const countries = [
  { code: "IN", name: "India", dial_code: "+91", flag: "🇮🇳" },
  { code: "US", name: "United States", dial_code: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial_code: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dial_code: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial_code: "+61", flag: "🇦🇺" },
];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+1",
    mobile: "",
    email: "",
    username: "",
    dob: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    // Mobile number validation
    if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits.";
    }

    // Age validation
    const birthDate = new Date(form.dob);
    const today = new Date();
    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);

    if (isNaN(age) || age < 18) {
      newErrors.dob = "You must be at least 18 years old.";
    }

    if (!form.firstName) newErrors.firstName = "First name is required.";
    if (!form.lastName) newErrors.lastName = "Last name is required.";
    if (!form.username) newErrors.username = "Username is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Signup successful ✅");
      router.push("/login");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        marginTop: 1.5,
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backgroundColor: "body.default",
          boxShadow: 3,
          borderRadius: 2,
        }}
        className="signUpForm"
      >
        <Typography variant="h5" textAlign="center" mb={2}>
          Sign Up
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
 
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
          <Stack direction="row" spacing={1}>
            <TextField
              select
              label="Code"
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              sx={{ width: "35%" }}
            >
              {countries.map((c) => (
                <MenuItem key={c.code} value={c.dial_code}>
                  {c.flag} {c.dial_code}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              fullWidth
            />
          </Stack>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>

          <Typography textAlign="center" variant="body2">
            Already have an account?{" "}
            <Button variant="text" onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
