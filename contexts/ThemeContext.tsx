'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'day' | 'night'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('day')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check localStorage first
    const stored = localStorage.getItem('btp-theme') as Theme | null
    if (stored === 'day' || stored === 'night') {
      setTheme(stored)
      return
    }
    
    // Check browser preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'night' : 'day')
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('btp-theme')) {
        setTheme(e.matches ? 'night' : 'day')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('btp-theme', newTheme)
  }

  const toggleTheme = () => {
    handleSetTheme(theme === 'day' ? 'night' : 'day')
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return safe defaults when outside provider (SSR or before mount)
    return {
      theme: 'day' as Theme,
      setTheme: () => {},
      toggleTheme: () => {}
    }
  }
  return context
}
