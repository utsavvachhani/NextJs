"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type4Page() {
    return (
        <PageWrapper title="Gradient Animated UI">
            <div className="min-h-screen relative flex items-center justify-center p-6 pt-32 overflow-hidden bg-white dark:bg-zinc-950">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_50%)] from-rose-500/20 via-orange-500/20 to-purple-500/20 blur-[100px]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-[3rem] shadow-2xl p-10 relative z-10"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Lively Auth</h1>
                        <p className="text-zinc-500 font-medium">Dynamic transitions and colors</p>
                    </div>

                    <AuthForm type="signin" themeStyle="floating" />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
