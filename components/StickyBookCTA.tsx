'use client'

import { useState, useEffect } from 'react'
import { Ticket } from 'lucide-react'

interface StickyBookCTAProps {
  fromSlug: string
  toSlug: string
  fromName: string
  toName: string
}

export function StickyBookCTA({ fromSlug, toSlug, fromName, toName }: StickyBookCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 400px)
      const scrollY = window.scrollY
      setIsVisible(scrollY > 400)
      
      // Gradually scale from 100% to 120% as user scrolls
      // Start growing at 400px, reach max at ~3000px scroll (slower = smoother)
      const scrollStart = 400
      const scrollEnd = 3000
      const minScale = 1
      const maxScale = 1.2
      
      if (scrollY <= scrollStart) {
        setScale(minScale)
      } else if (scrollY >= scrollEnd) {
        setScale(maxScale)
      } else {
        const progress = (scrollY - scrollStart) / (scrollEnd - scrollStart)
        setScale(minScale + progress * (maxScale - minScale))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bookingUrl = `https://12go.asia/en/travel/${fromSlug}/${toSlug}?z=64932`

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 transition-all duration-300 origin-bottom-right
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}
      `}
      style={{ 
        transform: isVisible ? `scale(${scale})` : 'translateY(4rem)',
        transition: 'transform 0.5s ease-out, opacity 0.3s'
      }}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#046cbb] hover:bg-[#035a9e] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
      >
        <Ticket className="w-5 h-5" />
        <span>Book {fromName} → {toName}</span>
      </a>
    </div>
  )
}
