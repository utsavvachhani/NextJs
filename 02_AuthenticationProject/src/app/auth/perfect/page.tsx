"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"
import { Shield, Lock, CheckCircle2 } from "lucide-react"

export default function PerfectAuthPage() {
    return (
        <PageWrapper title="Perfect Authentication UI">
            <div className="min-h-screen bg-background flex flex-col lg:flex-row items-stretch justify-center p-0 overflow-hidden">
                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-2 relative overflow-hidden bg-zinc-950">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    <div className="relative z-10 text-center max-w-md">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-3xl mb-8 inline-block"
                        >
                            <Shield className="w-12 h-12 text-blue-400" />
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-6"
                        >
                            The Standard for Modern Auth
                        </motion.h2>

                        <div className="space-y-4 text-left">
                            {[
                                "Enterprise-grade security standards",
                                "Seamless Dark & Light mode transition",
                                "Optimized for conversion and speed",
                                "Fully accessible and responsive"
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + (idx * 0.1) }}
                                    className="flex items-center gap-3 text-zinc-400"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                    <span>{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="flex-1 flex items-center justify-center p-6 bg-background relative">
                    <div className="absolute top-8 left-8 lg:hidden">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg" />
                            <span>AuthUI</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full max-w-md"
                    >
                        <div className="mb-10 lg:text-left text-center">
                            <h1 className="text-4xl font-black tracking-tight mb-3">Get Started</h1>
                            <p className="text-muted-foreground text-lg">
                                Experience the perfectly working authentication system.
                            </p>
                        </div>

                        <div className="p-8 lg:p-0 rounded-3xl border border-border lg:border-none shadow-xl lg:shadow-none bg-card lg:bg-transparent">
                            <AuthForm type="signin" themeStyle="minimal" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageWrapper>
    )
}
