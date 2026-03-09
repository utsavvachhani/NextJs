"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type8Page() {
    return (
        <PageWrapper title="Dark Premium SaaS UI">
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 pt-32 relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2.5rem] shadow-2xl p-10 relative z-10 before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-blue-500/50 before:via-transparent before:to-purple-500/50 before:rounded-[2.5rem] before:-z-10"
                >
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                            <div className="w-6 h-6 border-2 border-white rounded-md" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Premium Access</h1>
                        <p className="text-zinc-500">The ultimate developer platform</p>
                    </div>

                    <AuthForm type="signin" themeStyle="premium" />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
