"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Chrome } from "lucide-react"
import { toast } from "@/lib/toast-store"
import { setSession } from "@/lib/auth"
import { useRouter } from "next/navigation"

const authSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type AuthValues = z.infer<typeof authSchema>

interface AuthFormProps {
    type: "signin" | "signup"
    themeStyle: string
    accentColor?: string
}

export const AuthForm = ({ type, themeStyle, accentColor = "blue" }: AuthFormProps) => {
    const [isLogin, setIsLogin] = useState(type === "signin")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Sync state with prop if it changes externally
    React.useEffect(() => {
        setIsLogin(type === "signin")
    }, [type])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthValues>({
        resolver: zodResolver(authSchema),
    })

    const onSubmit = async (data: AuthValues) => {
        setLoading(true)
        const endpoint = isLogin ? "/api/auth/signin" : "/api/auth/signup"

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (res.ok) {
                toast.success(result.message, { style: themeStyle as any })
                setSession(result.user)
                setTimeout(() => {
                    router.push("/dashboard")
                }, 1500)
            } else {
                toast.error(result.message || "Something went wrong", { style: themeStyle as any })
            }
        } catch (error) {
            toast.error("Failed to connect to server")
        } finally {
            setLoading(false)
        }
    }

    // Common styling based on theme
    const inputBase = "w-full pl-10 pr-10 py-3 rounded-xl border transition-all outline-none focus:ring-2"
    const inputStyles: Record<string, string> = {
        minimal: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-500/20 focus:border-blue-500",
        glass: "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/20 focus:border-white/40",
        premium: "bg-zinc-900 border-zinc-800 text-white focus:ring-blue-500/20 focus:border-blue-500",
        army: "bg-stone-900 border-stone-700 text-stone-100 focus:ring-stone-500/20 focus:border-stone-500 rounded-none",
        neumorphism: "bg-zinc-100 dark:bg-zinc-800 border-transparent shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.05)]",
        floating: "bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 rounded-none focus:border-blue-500 px-0 pl-1 py-4",
    }

    const btnBase = "w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
    const btnStyles: Record<string, string> = {
        minimal: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
        glass: "bg-white text-zinc-900 hover:bg-opacity-90 shadow-xl",
        premium: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]",
        army: "bg-stone-100 text-stone-900 rounded-none hover:bg-stone-200 font-black uppercase tracking-widest",
        neumorphism: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-6px_-6px_12px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)]",
        floating: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
    }

    const currentInputStyle = inputStyles[themeStyle] || inputStyles.minimal
    const currentBtnStyle = btnStyles[themeStyle] || btnStyles.minimal

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <AnimatePresence mode="wait">
                    {!isLogin && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative"
                        >
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                {...register("name")}
                                placeholder="Full Name"
                                className={cn(inputBase, currentInputStyle)}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{(errors.name as any).message}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                        {...register("email")}
                        placeholder="Email Address"
                        className={cn(inputBase, currentInputStyle)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{(errors.email as any).message}</p>}
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={cn(inputBase, currentInputStyle)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{(errors.password as any).message}</p>}
                </div>

                {isLogin && (
                    <div className="flex justify-end">
                        <button type="button" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                            Forgot password?
                        </button>
                    </div>
                )}

                <button
                    disabled={loading}
                    type="submit"
                    className={cn(btnBase, currentBtnStyle)}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {isLogin ? "Sign In" : "Create Account"}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-transparent px-2 text-zinc-500 font-medium">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className={cn(
                        "flex items-center justify-center gap-2 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors font-medium",
                        themeStyle === 'glass' && 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                    )}>
                        <Github className="w-5 h-5" />
                        Github
                    </button>
                    <button type="button" className={cn(
                        "flex items-center justify-center gap-2 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors font-medium",
                        themeStyle === 'glass' && 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                    )}>
                        <Chrome className="w-5 h-5" />
                        Google
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <p className={cn(
                    "text-sm",
                    themeStyle === 'glass' ? 'text-white/60' : 'text-zinc-600 dark:text-zinc-500'
                )}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className={cn(
                            "font-bold hover:underline",
                            themeStyle === 'glass' ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'
                        )}
                    >
                        {isLogin ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    )
}

function cn(...inputs: (string | undefined | false)[]) {
    return inputs.filter(Boolean).join(" ")
}
