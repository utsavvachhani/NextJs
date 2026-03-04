"use client"

import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/assent"
import { NAVBAR_LINKS, USER_MENU } from "@/constants/Navbar"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/action/authSlice"
import { RootState, AppDispatch } from "@/store"
import { useRouter } from "next/navigation"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import ListAltIcon from '@mui/icons-material/ListAlt'

function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const isUserLoggedIn = isAuthenticated;


    const [open, setOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setOpen(false);
        setMobileMenuOpen(false);
        router.push("/signin");
    };

    // Load theme from cookies on mount
    useEffect(() => {
        const savedTheme = getCookie('theme') as 'light' | 'dark' | null
        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.setAttribute('data-theme', savedTheme)
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const defaultTheme = prefersDark ? 'dark' : 'light'
            setTheme(defaultTheme)
            document.documentElement.setAttribute('data-theme', defaultTheme)
            setCookie('theme', defaultTheme, 365)
        }
    }, [])

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        setCookie('theme', newTheme, 365)
    }

    // Cookie helpers
    const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date()
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
    }

    const getCookie = (name: string): string | null => {
        const nameEQ = name + "="
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    // Close mobile menu when clicking a link
    const handleLinkClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <nav className="sticky top-0 z-[1000] bg-[var(--bg-navbar)] border-b border-[var(--border-color)] shadow-[var(--shadow-sm)]">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 no-underline text-[var(--text-primary)]">
                        <Image src={Logo} alt="Fitnezz logo" width={40} height={40} priority />
                        <p className="font-bold text-xl m-0">Fitnezz</p>
                    </Link>
                </div>

                {/* Desktop Navbar Links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAVBAR_LINKS.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            className="flex items-center gap-2 text-[var(--text-secondary)] no-underline font-medium transition-all duration-200 hover:text-[var(--brand-red)] hover:-translate-y-0.5"
                        >
                            <item.icon fontSize="small" />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right Section: Theme Toggle + Auth */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="bg-transparent border-2 border-[var(--border-color)] rounded-lg p-2 cursor-pointer flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] hover:rotate-[15deg]"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <DarkModeIcon fontSize="small" />
                        ) : (
                            <LightModeIcon fontSize="small" />
                        )}
                    </button>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center">
                        {mounted && (
                            isUserLoggedIn ? (
                                <div
                                    className="flex items-center gap-2 cursor-pointer relative"
                                    onMouseEnter={() => setOpen(true)}
                                    onMouseLeave={() => setOpen(false)}
                                >
                                    {user?.image ? (
                                        <Image
                                            src={user.image}
                                            alt="User avatar"
                                            width={36}
                                            height={36}
                                            className="rounded-full object-cover"
                                            onError={(e) => {
                                                // If image fails to load, we can set a flag or just let it fall back
                                                // Since we don't have easy state here for each image, we might want a small component
                                            }}
                                        />
                                    ) : (
                                        <div className="h-9 w-9 rounded-full bg-[var(--brand-red)] flex items-center justify-center text-white font-bold text-lg">
                                            {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                                        </div>
                                    )}
                                    <span className="font-medium text-[var(--text-primary)]">
                                        {user?.firstName ? `${user.firstName} ${user.lastName}` : "User"}
                                    </span>

                                    {/* Dropdown with absolute positioning and transition */}
                                    <div className={`absolute right-0 top-full pt-2 w-56 transition-all duration-300 origin-top-right ${open ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                                        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden">
                                            {/* Profile Header */}
                                            <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-page)]/50">
                                                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                                                    {user?.firstName ? `${user.firstName} ${user.lastName}` : "User"}
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)] truncate">
                                                    {user?.email || "No email provided"}
                                                </p>
                                            </div>

                                            {/* menu links */}
                                            <div className="py-1">
                                                {USER_MENU.map((item) => (
                                                    item.label === "Sign Out" ? (
                                                        <button
                                                            key={item.label}
                                                            onClick={handleLogout}
                                                            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-primary)] bg-transparent border-none cursor-pointer transition-all duration-200 hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                                        >
                                                            <div className="w-5 flex justify-center">
                                                                <CloseIcon sx={{ fontSize: 18 }} />
                                                            </div>
                                                            {item.label}
                                                        </button>
                                                    ) : (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-primary)] no-underline transition-all duration-200 hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                                        >
                                                            <div className="w-5 flex justify-center text-[var(--text-secondary)] group-hover:text-[var(--brand-red)]">
                                                                {item.label === "Profile" && <AssignmentIndIcon sx={{ fontSize: 18 }} />}
                                                                {item.label === "Dashboard" && <FitnessCenterIcon sx={{ fontSize: 18 }} />}
                                                                {item.label === "Todo" && <ListAltIcon sx={{ fontSize: 18 }} />}
                                                            </div>
                                                            {item.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <Link href="/signin" className="btn btn-outline">
                                        Sign In
                                    </Link>
                                    <Link href="/signup" className="btn btn-primary">
                                        Sign Up
                                    </Link>
                                </div>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden bg-transparent border-none cursor-pointer text-[var(--text-primary)] flex items-center justify-center p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mounted && (
                            isUserLoggedIn ? (
                                <CloseIcon fontSize="medium" />
                            ) : (
                                <MenuIcon fontSize="medium" />
                            )
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`fixed top-0 ${mobileMenuOpen ? 'right-0' : '-right-full'} w-[280px] sm:w-[320px] max-[480px]:w-full h-screen bg-[var(--bg-navbar)] shadow-[var(--shadow-md)] transition-all duration-300 ease-in-out z-[1100] overflow-y-auto`}>
                <div className="p-8 flex flex-col gap-8">
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-2">
                        {NAVBAR_LINKS.map((item) => (
                            <Link
                                key={item.name}
                                href={item.link}
                                className="flex items-center gap-3 px-4 py-3 text-[var(--text-primary)] no-underline rounded-lg transition-all duration-200 font-medium hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                onClick={handleLinkClick}
                            >
                                <item.icon fontSize="small" />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Auth Section */}
                    <div className="border-t border-[var(--border-color)] pt-6">
                        {mounted && (
                            isUserLoggedIn ? (
                                <div>
                                    <div className="flex items-center gap-3 mb-6 p-4 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt="User avatar"
                                                width={48}
                                                height={48}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-[var(--brand-red)] flex items-center justify-center text-white font-bold text-2xl">
                                                {user?.firstName ? user.firstName[0].toUpperCase() : "U"}
                                            </div>
                                        )}
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-bold text-[var(--text-primary)] truncate block">
                                                {user?.firstName ? `${user.firstName} ${user.lastName}` : "User"}
                                            </span>
                                            <span className="text-xs text-[var(--text-secondary)] truncate block">
                                                {user?.email || "No email provided"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {USER_MENU.map((item) => (
                                            item.label === "Sign Out" ? (
                                                <button
                                                    key={item.label}
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center gap-4 px-4 py-3.5 text-[var(--text-primary)] bg-transparent border-none cursor-pointer rounded-xl transition-all duration-200 hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                                >
                                                    <CloseIcon fontSize="small" />
                                                    <span className="font-medium">{item.label}</span>
                                                </button>
                                            ) : (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className="flex items-center gap-4 px-4 py-3.5 text-[var(--text-primary)] no-underline rounded-xl transition-all duration-200 hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                                    onClick={handleLinkClick}
                                                >
                                                    {item.label === "Profile" && <AssignmentIndIcon fontSize="small" />}
                                                    {item.label === "Dashboard" && <FitnessCenterIcon fontSize="small" />}
                                                    {item.label === "Todo" && <ListAltIcon fontSize="small" />}
                                                    <span className="font-medium">{item.label}</span>
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/signin"
                                        className="btn btn-outline w-full text-center"
                                        onClick={handleLinkClick}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="btn btn-primary w-full text-center"
                                        onClick={handleLinkClick}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-screen bg-black/50 z-[1050]"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </nav>
    )
}

export default Navbar
