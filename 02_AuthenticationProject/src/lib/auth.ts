"use client"

// This is a client-side mock auth helper
// Since we are doing a demo, we will use localStorage for session persistence in the browser

export interface User {
  id: string
  email: string
  name: string
  expires?: string
}

export const getSession = (): User | null => {
  if (typeof window === 'undefined') return null
  const session = localStorage.getItem('auth_session')
  return session ? JSON.parse(session) : null
}

export const setSession = (user: User) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_session', JSON.stringify({
    ...user,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  }))
}

export const clearSession = () => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_session')
}
