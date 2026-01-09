'use client'

import Link from 'next/link'
import { Bus, Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            BusTickets<span className="text-emerald-500">.ph</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/routes" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
            Routes
          </Link>
          <Link href="/destinations" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
            Destinations
          </Link>
          <Link href="/operators" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
            Operators
          </Link>
          <Link 
            href="https://12go.asia/en/travel?z=64932" 
            target="_blank"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
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
