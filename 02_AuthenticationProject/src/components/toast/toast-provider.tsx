"use client"

import { useToasts, toast, ToastStyle, ToastType, Toast } from "@/lib/toast-store"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertCircle, Info, Loader2, X, AlertTriangle } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    loading: <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />,
}

export function ToastProvider() {
    const toasts = useToasts()

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md w-full">
            <AnimatePresence mode="popLayout">
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="pointer-events-auto"
                    >
                        <ToastItem toast={t} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

function ToastItem({ toast: t }: { toast: Toast }) {
    const { id, message, type, style } = t

    const getStyleClass = (s: ToastStyle) => {
        switch (s) {
            case 'minimal':
                return "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-lg p-3"
            case 'glass':
                return "backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800/50 shadow-xl rounded-xl p-4"
            case 'premium':
                return "bg-zinc-950 text-white border border-zinc-800 shadow-2xl rounded-xl p-4 before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:rounded-xl before:-z-10"
            case 'slide':
                return "bg-zinc-900 text-white shadow-lg rounded-none border-l-4 border-blue-500 p-4"
            case 'modern':
            default:
                return "bg-white dark:bg-zinc-900 shadow-lg rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4"
        }
    }

    return (
        <div className={cn(
            "relative flex items-center gap-3 overflow-hidden",
            getStyleClass(style as ToastStyle)
        )}>
            <div className="shrink-0">
                {icons[type as ToastType]}
            </div>
            <div className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {message}
            </div>
            <button
                onClick={() => toast.dismiss(id)}
                className="shrink-0 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
                <X className="w-4 h-4 text-zinc-400" />
            </button>

            {/* Progress bar for non-loading toasts */}
            {type !== 'loading' && (
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: (t.duration || 3000) / 1000, ease: "linear" }}
                    className={cn(
                        "absolute bottom-0 left-0 h-[2px] opacity-50",
                        type === 'success' ? 'bg-green-500' :
                            type === 'error' ? 'bg-red-500' :
                                type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    )}
                />
            )}
        </div>
    )
}
