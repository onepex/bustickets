'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'

interface HeroBackgroundProps {
  destination: string
  children: ReactNode
  className?: string
}

export function HeroBackground({ 
  destination, 
  children, 
  className = ''
}: HeroBackgroundProps) {
  const { theme } = useTheme()
  
  const dayImage = `/images/heroes/${destination}-day.webp`
  const nightImage = `/images/heroes/${destination}-night.webp`
  const currentImage = theme === 'day' ? dayImage : nightImage
  
  const overlayGradient = theme === 'day'
    ? 'from-teal-900/60 to-teal-800/80'
    : 'from-indigo-950/70 to-slate-900/85'

  return (
    <section 
      className={`relative text-white py-12 md:py-16 bg-cover bg-center transition-all duration-700 ${className}`}
      style={{ backgroundImage: `url(${currentImage})` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradient} transition-all duration-700`} />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  )
}
