"use client"

import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'
export type ToastStyle = 'minimal' | 'glass' | 'modern' | 'premium' | 'slide'

export interface Toast {
  id: string
  message: string
  type: ToastType
  style?: ToastStyle
  duration?: number
}

let subscribers: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

const notify = () => {
  subscribers.forEach((callback) => callback([...toasts]))
}

export const toast = {
  subscribe: (callback: (toasts: Toast[]) => void) => {
    subscribers.push(callback)
    callback([...toasts])
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback)
    }
  },
  show: (message: string, type: ToastType = 'info', options: { style?: ToastStyle; duration?: number } = {}) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      message,
      type,
      style: options.style || 'modern',
      duration: options.duration || 3000,
    }
    toasts = [...toasts, newToast]
    notify()

    if (newToast.type !== 'loading') {
      setTimeout(() => {
        toast.dismiss(id)
      }, newToast.duration)
    }
    return id
  },
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id)
    notify()
  },
  success: (msg: string, opts?: { style?: ToastStyle; duration?: number }) => toast.show(msg, 'success', opts),
  error: (msg: string, opts?: { style?: ToastStyle; duration?: number }) => toast.show(msg, 'error', opts),
  warning: (msg: string, opts?: { style?: ToastStyle; duration?: number }) => toast.show(msg, 'warning', opts),
  info: (msg: string, opts?: { style?: ToastStyle; duration?: number }) => toast.show(msg, 'info', opts),
  loading: (msg: string, opts?: { style?: ToastStyle; duration?: number }) => toast.show(msg, 'loading', opts),
}

export function useToasts() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([])

  useEffect(() => {
    return toast.subscribe(setCurrentToasts)
  }, [])

  return currentToasts
}
