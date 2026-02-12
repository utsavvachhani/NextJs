"use client"

import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/assent"
import { NAVBAR_LINKS, USER_MENU } from "@/constants/Navbar"
import { useState, useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function Navbar() {
    const isUserLoggedIn = false;

    const user = {
        name: "John Doe",
        avatar: Logo,
    }

    const [open, setOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

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
                        {isUserLoggedIn ? (
                            <div
                                className="flex items-center gap-2 cursor-pointer relative"
                                onMouseEnter={() => setOpen(true)}
                                onMouseLeave={() => setOpen(false)}
                            >
                                <Image
                                    src={user.avatar}
                                    alt="User avatar"
                                    width={36}
                                    height={36}
                                    className="rounded-full object-cover"
                                />
                                <span className="font-medium text-[var(--text-primary)]">{user.name}</span>

                                {/* Dropdown */}
                                {open && (
                                    <div className="absolute right-0 top-12 w-40 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-[var(--shadow-md)] overflow-hidden">
                                        {USER_MENU.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="block px-4 py-3 text-[var(--text-primary)] no-underline transition-all duration-200 hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
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
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden bg-transparent border-none cursor-pointer text-[var(--text-primary)] flex items-center justify-center p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? (
                            <CloseIcon fontSize="medium" />
                        ) : (
                            <MenuIcon fontSize="medium" />
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
                        {isUserLoggedIn ? (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Image
                                        src={user.avatar}
                                        alt="User avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                    />
                                    <span className="font-medium text-[var(--text-primary)]">{user.name}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {USER_MENU.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="block px-4 py-3 text-[var(--text-primary)] no-underline rounded-lg transition-all duration-200 hover:bg-[var(--bg-page)] hover:text-[var(--brand-red)]"
                                            onClick={handleLinkClick}
                                        >
                                            {item.label}
                                        </Link>
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
