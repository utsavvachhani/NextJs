"use client"

import React from "react"
import { Copy, Download, Home } from "lucide-react"
import { toast } from "@/lib/toast-store"
import Link from "next/link"

interface PageWrapperProps {
    children: React.ReactNode
    title: string
}

export function PageWrapper({ children, title }: PageWrapperProps) {
    const handleCopyCode = () => {
        toast.success("Page code copied to clipboard!", { style: 'modern' })
    }

    const handleDownload = () => {
        toast.info("Downloading template...", { style: 'modern' })
    }

    return (
        <div className="relative min-h-screen">
            <h1 className="sr-only">{title}</h1>
            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform font-bold"
                >
                    <Download className="w-5 h-5" />
                    Download UI
                </button>
                <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-6 py-3 rounded-full shadow-2xl border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform font-bold"
                >
                    <Copy className="w-5 h-5" />
                    Copy Page Code
                </button>
            </div>

            {/* Back to Home Button */}
            <div className="fixed top-24 left-6 z-[200]">
                <Link
                    href="/"
                    className="flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-all"
                >
                    <Home className="w-4 h-4" />
                    Home
                </Link>
            </div>

            {children}
        </div>
    )
}
