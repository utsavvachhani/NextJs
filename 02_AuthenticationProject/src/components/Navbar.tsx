"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut, User, LayoutDashboard, ChevronRight } from "lucide-react"
import { ThemeToggle } from "./ui/theme-toggle"
import { logoWhite, logoBlack } from "@/sources"
import { useTheme } from "next-themes"
import { getSession, clearSession } from "@/lib/auth"
import { toast } from "@/lib/toast-store"

const Navbar = () => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(getSession())

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handleLogout = () => {
    clearSession()
    setUser(null)
    toast.success("Logged out successfully", { style: 'modern' })
    window.location.href = "/"
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "UI Components", href: "/#templates" },
  ]

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl transition-all duration-300 ${scrolled
      ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-zinc-200 dark:border-zinc-800 shadow-lg py-2"
      : "bg-transparent py-4"
      } rounded-2xl border border-transparent`}>
      <div className="px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-32 overflow-hidden">
            <Image
              src={logoBlack}
              alt="Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden"
              priority
            />
            <Image
              src={logoWhite}
              alt="Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105 hidden dark:block"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${pathname === link.href ? "text-blue-500" : "text-zinc-600 dark:text-zinc-400"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/perfect"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/auth/perfect"
                className="text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-600 dark:text-zinc-400"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium flex items-center justify-between"
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </Link>
              ))}
              <hr className="border-zinc-100 dark:border-zinc-800" />
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-lg font-medium text-red-500 text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/auth/perfect"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 font-medium border border-zinc-200 dark:border-zinc-800 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/perfect"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
