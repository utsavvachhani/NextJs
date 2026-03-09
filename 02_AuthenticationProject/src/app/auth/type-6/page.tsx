"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type6Page() {
    return (
        <PageWrapper title="Neumorphism UI">
            <div className="min-h-screen bg-[#e0e0e0] dark:bg-zinc-900 flex items-center justify-center p-6 pt-32 transition-colors duration-500">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-[#e0e0e0] dark:bg-zinc-900 rounded-[3rem] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#111111,-20px_-20px_60px_#222222] p-12 border border-white/20 dark:border-zinc-800"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-100">Soft UI</h1>
                        <p className="text-zinc-600 dark:text-zinc-400">Tactile & modern aesthetic</p>
                    </div>

                    <AuthForm type="signin" themeStyle="neumorphism" />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
