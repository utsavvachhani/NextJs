"use client"

import React, { useRef, useState } from "react"
import { AuthForm } from "@/components/auth/auth-form"
import { PageWrapper } from "@/components/auth/page-wrapper"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function Type10Page() {
    const containerRef = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <PageWrapper title="3D Animated UI">
            <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-6 pt-32 overflow-hidden perspective-1000">
                <motion.div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl border border-zinc-200 dark:border-zinc-800 p-10 relative group"
                >
                    <div style={{ transform: "translateZ(50px)" }} className="text-center mb-10 transition-transform duration-500">
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">3D Dimension</h1>
                        <p className="text-zinc-500 font-medium">Interactive perspective login</p>
                    </div>

                    <div style={{ transform: "translateZ(30px)" }} className="transition-transform duration-500">
                        <AuthForm type="signin" themeStyle="premium" />
                    </div>

                    {/* Floating decorative elements with different Z-index */}
                    <div
                        style={{ transform: "translateZ(80px)" }}
                        className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/50 transition-transform duration-500"
                    />
                    <div
                        style={{ transform: "translateZ(60px)" }}
                        className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 transition-transform duration-500"
                    />
                </motion.div>
            </div>
        </PageWrapper>
    )
}
