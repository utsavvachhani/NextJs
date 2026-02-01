'use client'

import { useTheme } from './useTheme'
import { useEffect, useState } from 'react'
import { CustomizedSwitches } from './SwitchingUi'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <CustomizedSwitches
      checked={theme === 'dark'}
      onChange={toggle}
    />
  )
}
