"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type9Page() {
    return (
        <PageWrapper title="Floating Label UI">
            <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6 pt-32">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm"
                >
                    <div className="mb-12">
                        <h1 className="text-4xl font-light tracking-tight mb-3">Hello.</h1>
                        <p className="text-zinc-500 font-medium">Please enter your credentials to continue the journey.</p>
                    </div>

                    <AuthForm type="signin" themeStyle="floating" />

                    <div className="mt-12 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-400">
                        <span>© 2024 AUTH UI</span>
                        <span className="flex gap-4">
                            <button className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</button>
                            <button className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</button>
                        </span>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}
