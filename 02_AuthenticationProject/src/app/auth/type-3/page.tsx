"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"

export default function Type3Page() {
    return (
        <PageWrapper title="Video Background UI">
            <div className="min-h-screen relative flex items-center justify-center p-6 pt-32 overflow-hidden">
                {/* Mock Video Background using a high-quality CSS animation or fallback */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
                    >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-waves-of-light-8656-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl shadow-2xl p-10 relative z-10"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900">Cinematic Login</h1>
                        <p className="text-zinc-500">Immersive authentication experience</p>
                    </div>

                    <AuthForm type="signin" themeStyle="minimal" />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
