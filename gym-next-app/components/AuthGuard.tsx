"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { fetchCurrentUser, logout } from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

    const publicRoutes = [
        "/signin",
        "/signup",
        "/",
        "/about",
        "/otp",
        "/forgot-password",
        "/verify-reset-otp",
        "/reset-password"
    ];
    const isProtectedRoute = !publicRoutes.includes(pathname);

    useEffect(() => {
        // Try to fetch user on mount if we think we might be authenticated or if user is missing
        if (!user && !loading) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !isAuthenticated && isProtectedRoute) {
            router.push("/signin");
        }
    }, [isAuthenticated, isProtectedRoute, router, loading]);

    return <>{children}</>;
}

