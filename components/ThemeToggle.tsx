'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md'
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const padding = size === 'sm' ? 'p-1.5' : 'p-2'
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        ${padding} rounded-full transition-all duration-300
        ${theme === 'day' 
          ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
          : 'bg-indigo-900 text-indigo-200 hover:bg-indigo-800'
        }
        ${className}
      `}
      aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
      title={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
    >
      {theme === 'day' ? (
        <Sun className={iconSize} />
      ) : (
        <Moon className={iconSize} />
      )}
    </button>
  )
}
