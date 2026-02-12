"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REDIRECT_TIME = 300; // 5 minutes

const NotFound: React.FC = () => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState<number>(REDIRECT_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, REDIRECT_TIME * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-(--bg-page)">
      {/* SVG Illustration */}
      <svg
        width="260"
        height="200"
        viewBox="0 0 260 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-8"
      >
        <rect
          x="20"
          y="30"
          width="220"
          height="140"
          rx="12"
          fill="var(--bg-card)"
          stroke="var(--border-color)"
        />
        <path
          d="M60 90h140M60 110h100"
          stroke="var(--text-muted)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text
          x="130"
          y="80"
          textAnchor="middle"
          fontSize="32"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          404
        </text>
        <circle cx="90" cy="150" r="6" fill="var(--text-muted)" />
        <circle cx="170" cy="150" r="6" fill="var(--text-muted)" />
      </svg>

      <h1 className="text-3xl font-bold mb-2 text-(--text-primary)">
        Page Not Found
      </h1>

      <p className="mb-4 text-(--text-secondary)">
        Oops! The page you’re trying to access doesn’t exist.
      </p>

      <p className="mb-6 text-sm text-(--text-muted)">
        Redirecting to home in{" "}
        <span className="font-semibold text-(--text-primary)">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </p>

      <button
        onClick={() => router.push("/")}
        className="btn btn-primary"
      >
        Go Home Now
      </button>
    </div>
  );
};

export default NotFound;
