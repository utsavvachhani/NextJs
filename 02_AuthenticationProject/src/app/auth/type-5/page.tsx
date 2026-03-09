"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Type5Page() {
    return (
        <PageWrapper title="Split Screen UI">
            <div className="min-h-screen flex flex-col md:flex-row pt-20 md:pt-0 overflow-hidden bg-white dark:bg-zinc-950">
                {/* Left Side: Image/Info */}
                <div className="md:w-1/2 relative bg-zinc-900 overflow-hidden min-h-[40vh] md:min-h-screen">
                    <Image
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                        alt="Office"
                        fill
                        className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-12 flex flex-col justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-4">The Professional Way</h2>
                            <p className="text-zinc-300 text-lg max-w-md"> Join 10,000+ teams who scale their business with our premium tools.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full max-w-md"
                    >
                        <div className="mb-10">
                            <h1 className="text-4xl font-bold tracking-tight mb-2">Sign In</h1>
                            <p className="text-zinc-500 dark:text-zinc-400">Welcome back! Please enter your details.</p>
                        </div>

                        <AuthForm type="signin" themeStyle="minimal" />
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    )
}
