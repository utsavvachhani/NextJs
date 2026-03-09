"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type1Page() {
    return (
        <PageWrapper title="Simple Clean UI">
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 pt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl border border-zinc-100 dark:border-zinc-800 p-10"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Enter your details to access your account</p>
                    </div>

                    <AuthForm type="signin" themeStyle="minimal" />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
