"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion } from "framer-motion"
import { ShieldAlert } from "lucide-react"

export default function Type7Page() {
    return (
        <PageWrapper title="Corporate Army UI">
            <div className="min-h-screen bg-stone-950 flex items-center justify-center p-6 pt-32 overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #78716c 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-lg bg-stone-900 border-4 border-stone-800 rounded-none shadow-[20px_20px_0px_#44403c] p-12 relative z-10"
                >
                    <div className="mb-10 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-stone-500 font-bold mb-2 uppercase tracking-[0.3em] text-xs">
                                <ShieldAlert className="w-4 h-4" />
                                Security Level 4
                            </div>
                            <h1 className="text-5xl font-black text-stone-100 uppercase italic tracking-tighter">Authorized <br /> Access</h1>
                        </div>
                        <div className="text-stone-800 font-black text-7xl select-none opacity-20">70-A</div>
                    </div>

                    <AuthForm type="signin" themeStyle="army" />

                    <div className="mt-12 pt-8 border-t-2 border-dashed border-stone-800">
                        <p className="text-[10px] text-stone-600 font-mono leading-relaxed">
                            WARNING: UNAUTHORIZED ACCESS TO THIS SYSTEM IS PROHIBITED BY FEDERAL LAW. ALL ACTIVITIES ARE MONITORED AND RECORDED.
                        </p>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    )
}
