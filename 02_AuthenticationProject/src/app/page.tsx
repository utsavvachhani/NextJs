"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Copy, Download, Zap, Shield, Smartphone, Palette } from "lucide-react"
import authData from "@/data/auth-ui.json"
import { toast } from "@/lib/toast-store"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const copyToClipboard = (route: string) => {
    // In a real app, you would copy the actual code. 
    // Here we'll just mock it.
    navigator.clipboard.writeText(`// Source code for ${route}`);
    toast.success("Code copied to clipboard!", { style: 'glass' });
  }

  const downloadUI = (name: string) => {
    toast.info(`Downloading ${name} template...`, { style: 'modern' });
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
        >
          <Zap className="w-4 h-4" />
          <span>Premium Authentication UI System</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-400 dark:to-white bg-clip-text text-transparent"
        >
          10 Pro Auth Layouts <br /> for Next.js
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto mb-10"
        >
          Ready-to-use, fully responsive, and beautifully designed authentication pages.
          Each design supports dark mode, accessibility, and smooth animations out of the box.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-10 opacity-50 select-none"
        >
          <div className="flex items-center gap-2 text-sm font-medium"><Shield className="w-4 h-4" /> Secure</div>
          <div className="flex items-center gap-2 text-sm font-medium"><Smartphone className="w-4 h-4" /> Responsive</div>
          <div className="flex items-center gap-2 text-sm font-medium"><Palette className="w-4 h-4" /> Customizable</div>
        </motion.div>
      </section>

      {/* Templates Grid */}
      <motion.div
        id="templates"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {authData.map((ui) => (
          <motion.div
            key={ui.id}
            variants={item}
            className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
          >
            {/* Preview Mock */}
            <div className={`aspect-[4/3] relative overflow-hidden bg-gradient-to-br transition-all duration-500 group-hover:scale-105 ${ui.theme === 'minimal' ? 'from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900' :
                ui.theme === 'glass' ? 'from-blue-400 to-purple-500' :
                  ui.theme === 'video' ? 'from-black to-zinc-800' :
                    ui.theme === 'gradient' ? 'from-orange-400 via-rose-500 to-purple-600' :
                      ui.theme === 'split' ? 'from-zinc-200 to-white dark:from-zinc-700 dark:to-zinc-900' :
                        ui.theme === 'neumorphism' ? 'from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900' :
                          ui.theme === 'army' ? 'from-stone-800 to-stone-900' :
                            ui.theme === 'premium' ? 'from-zinc-950 to-blue-900' :
                              ui.theme === 'floating' ? 'from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950' :
                                'from-indigo-900 to-blue-500'
              }`}>
              {/* Overlay with UI preview characteristics */}
              <div className="absolute inset-0 flex items-center justify-center p-8 opacity-40 group-hover:opacity-60 transition-opacity">
                <div className={`w-full h-full rounded-xl border border-white/20 flex flex-col p-4 gap-2 ${ui.theme === 'neumorphism' ? 'shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff]' :
                    ui.theme === 'glass' ? 'bg-white/10 backdrop-blur-md' : 'bg-white/5'
                  }`}>
                  <div className="w-1/2 h-4 bg-white/20 rounded ml-0" />
                  <div className="w-full h-8 bg-white/10 rounded mt-4" />
                  <div className="w-full h-8 bg-white/10 rounded" />
                  <div className="w-full h-10 bg-white/30 rounded mt-auto" />
                </div>
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Link
                  href={ui.route}
                  className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3">{ui.name}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-2">
                {ui.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {ui.features.map(f => (
                  <span key={f} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-2 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <Link
                  href={ui.route}
                  className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-bold py-3 rounded-xl hover:opacity-90 transition-opacity text-center"
                >
                  Live Preview
                </Link>
                <button
                  onClick={() => copyToClipboard(ui.route)}
                  className="p-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                  title="Copy Code"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={() => downloadUI(ui.name)}
                  className="p-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                  title="Download UI"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
