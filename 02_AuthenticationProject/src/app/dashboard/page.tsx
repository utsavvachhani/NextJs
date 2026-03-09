"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession, clearSession } from "@/lib/auth"
import { motion } from "framer-motion"
import { LogOut, User, LayoutDashboard, Settings, Bell, Shield, BarChart3, Users, Zap } from "lucide-react"
import { toast } from "@/lib/toast-store"

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const session = getSession()
        if (!session) {
            toast.error("Please login to access this page")
            router.push("/auth/type-1")
        } else {
            setUser(session)
        }
        setLoading(false)
    }, [router])

    const handleLogout = () => {
        clearSession()
        toast.success("Logged out successfully")
        router.push("/")
    }

    if (loading) return null
    if (!user) return null

    const stats = [
        { name: "Total Users", value: "1,240", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Active Sessions", value: "482", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
        { name: "Security Score", value: "98%", icon: Shield, color: "text-green-500", bg: "bg-green-500/10" },
        { name: "Traffic", value: "+12.5%", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" },
    ]

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold tracking-tight mb-2"
                        >
                            Welcome back, {user.name}!
                        </motion.h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Manage your authentication templates and profile settings.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl relative">
                            <Bell className="w-5 h-5 text-zinc-500" />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-4"
                        >
                            <div className={`p-4 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{stat.name}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <LayoutDashboard className="w-5 h-5 text-blue-500" />
                            Recent Activity
                        </h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-zinc-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Security audit completed</p>
                                            <p className="text-xs text-zinc-500">2 hours ago • Successful</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-blue-500 hover:underline px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">View Details</button>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-zinc-400" />
                            Quick Actions
                        </h3>
                        <div className="flex flex-col gap-3">
                            <button className="w-full py-4 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left font-medium transition-colors border border-zinc-200 dark:border-zinc-800">
                                Update Security Settings
                            </button>
                            <button className="w-full py-4 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left font-medium transition-colors border border-zinc-200 dark:border-zinc-800">
                                Manage Trust Devices
                            </button>
                            <button className="w-full py-4 px-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left font-medium transition-colors border border-zinc-200 dark:border-zinc-800">
                                Audit Log Export
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
