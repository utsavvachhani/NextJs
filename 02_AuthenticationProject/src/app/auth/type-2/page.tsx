"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type2Page() {
    return (
        <PageWrapper title="Glassmorphism UI">
            <div className="min-h-screen relative flex items-center justify-center p-6 pt-32 overflow-hidden bg-zinc-950">
                {/* Background Decorative Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md backdrop-blur-2xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-[2.5rem] shadow-2xl p-10 relative z-10"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Glass UI</h1>
                        <p className="text-white/60">Experience the frosted glass look</p>
                    </div>

                    <AuthForm type="signin" themeStyle="glass" />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
