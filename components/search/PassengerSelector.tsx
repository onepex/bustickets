'use client'

import { useState, useRef, useEffect } from 'react'
import { Users, Plus, Minus } from 'lucide-react'

interface PassengerSelectorProps {
  label: string
  value: number
  onChange: (count: number) => void
  min?: number
  max?: number
}

export default function PassengerSelector({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: PassengerSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const increment = () => {
    if (value < max) onChange(value + 1)
  }

  const decrement = () => {
    if (value > min) onChange(value - 1)
  }

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all relative"
      >
        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
        {value} {value === 1 ? 'Passenger' : 'Passengers'}
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-56 right-0"
          style={{ animation: 'fadeIn 0.15s ease-out' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Passengers</span>
            <div className="flex items-center gap-3">
              <button
                onClick={decrement}
                disabled={value <= min}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  value <= min
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600'
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-lg text-gray-900">
                {value}
              </span>
              <button
                onClick={increment}
                disabled={value >= max}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  value >= max
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600'
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Maximum {max} passengers per booking
          </p>
        </div>
      )}
    </div>
  )
}
