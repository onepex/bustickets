'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Image 
            src="/images/bustickets-logo.svg" 
            alt="BusTickets.ph" 
            width={160} 
            height={31} 
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/routes" className="text-sm font-medium text-gray-600 hover:text-[#046cbb] transition-colors">
            Routes
          </Link>
          <Link href="/destinations" className="text-sm font-medium text-gray-600 hover:text-[#046cbb] transition-colors">
            Destinations
          </Link>
          <Link href="/operators" className="text-sm font-medium text-gray-600 hover:text-[#046cbb] transition-colors">
            Operators
          </Link>
          <Link 
            href="https://12go.asia/en/travel?z=64932" 
            target="_blank"
            className="px-4 py-2 bg-[#046cbb] hover:bg-[#035a9e] text-white text-sm font-medium rounded-lg transition-colors"
          >
            Book Now
          </Link>
          <ThemeToggle size="sm" />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle size="sm" />
          <button className="p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
