"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logged in", { email, password });
    router.push("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-md shadow-md flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md border border-slate-700 bg-slate-900 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md border border-slate-700 bg-slate-900 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-white font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
