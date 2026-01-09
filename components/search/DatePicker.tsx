'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate, addDays } from '@/lib/search-utils'

interface DatePickerProps {
  label: string
  value: Date
  onChange: (date: Date) => void
  minDate?: Date
}

export default function DatePicker({
  label,
  value,
  onChange,
  minDate = new Date(),
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(value)
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (Date | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return date.toDateString() === value.toDateString()
  }

  const isPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handleSelectDate = (date: Date) => {
    onChange(date)
    setIsOpen(false)
  }

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  const quickDates = [
    { label: 'Today', date: new Date() },
    { label: 'Tomorrow', date: addDays(new Date(), 1) },
    { label: 'In 3 days', date: addDays(new Date(), 3) },
    { label: 'In a week', date: addDays(new Date(), 7) },
  ]

  return (
    <div className="relative" ref={containerRef} style={{ overflow: 'visible' }}>
      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all relative"
      >
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
        {formatDate(value)}
      </button>

      {isOpen && (
        <div 
          className="absolute z-[100] mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 left-0"
          style={{ animation: 'fadeIn 0.15s ease-out', width: '280px' }}
        >
          <div className="flex gap-2 mb-4">
            {quickDates.map((q) => (
              <button
                key={q.label}
                onClick={() => handleSelectDate(q.date)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  isSelected(q.date)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-emerald-100'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="font-semibold text-gray-900">
              {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(viewDate).map((date, i) => (
              <div key={i} className="h-9 w-9">
                {date && (
                  <button
                    type="button"
                    onClick={() => !isPast(date) && handleSelectDate(date)}
                    disabled={isPast(date)}
                    className={`w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors ${
                      isSelected(date)
                        ? 'bg-emerald-500 text-white font-semibold'
                        : isToday(date)
                        ? 'bg-emerald-100 text-emerald-700 font-medium'
                        : isPast(date)
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
