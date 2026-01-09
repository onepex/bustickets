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

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 400px)
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bookingUrl = `https://12go.asia/en/travel/${fromSlug}/${toSlug}?z=64932`

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 transition-all duration-300
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}
      `}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
      >
        <Ticket className="w-5 h-5" />
        <span>Book {fromName} → {toName}</span>
      </a>
    </div>
  )
}
