'use client'

import { useState } from 'react'
import { Bus, Ship, Car, Calendar, ExternalLink, Clock, ArrowRight, Info } from 'lucide-react'
import type { RouteSchedule } from '@/lib/schedule-types'

interface SampleSchedulesProps {
  routeSchedule: RouteSchedule
}

const transportIcons: Record<string, React.ElementType> = {
  bus: Bus,
  ferry: Ship,
  van: Car,
  taxi: Car,
}

const classLabels: Record<string, string> = {
  'regular': 'Regular',
  'deluxe': 'Deluxe',
  'first-class': 'First Class',
  'royal-class': 'Royal Class',
  'executive': 'Executive',
  'sleeper': 'Sleeper',
}

const classColors: Record<string, string> = {
  'regular': 'bg-gray-100 text-gray-700',
  'deluxe': 'bg-blue-100 text-blue-700',
  'first-class': 'bg-amber-100 text-amber-700',
  'royal-class': 'bg-purple-100 text-purple-700',
  'executive': 'bg-emerald-100 text-emerald-700',
  'sleeper': 'bg-indigo-100 text-indigo-700',
}

function formatPrice(amount: number): string {
  return `₱${amount.toLocaleString()}`
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

function formatDateForUrl(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDateInput(date: Date): string {
  return formatDateForUrl(date)
}

export default function SampleSchedules({ routeSchedule }: SampleSchedulesProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  })

  // Filter to only show bus schedules with actual times (not "Various")
  const busSchedules = routeSchedule.schedules.filter(
    s => s.transportType === 'bus' && s.departure.time !== 'Various'
  )

  // Get price range
  const prices = busSchedules.map(s => s.price.amount)
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0

  // Get duration range  
  const durations = busSchedules.map(s => s.duration)
  const minDuration = durations.length > 0 ? Math.min(...durations) : 0
  const maxDuration = durations.length > 0 ? Math.max(...durations) : 0

  // Build the main booking URL with selected date
  const mainBookingUrl = routeSchedule.subRoutes?.[0]?.bookingUrl?.split('?')[0] 
    ? `${routeSchedule.subRoutes[0].bookingUrl.split('?')[0]}?date=${formatDateForUrl(selectedDate)}&z=64932&curr=PHP`
    : `https://book.bustickets.ph/en/travel/${routeSchedule.from.toLowerCase()}/${routeSchedule.to.toLowerCase()}?date=${formatDateForUrl(selectedDate)}&z=64932&curr=PHP`

  // Min date for picker (today)
  const today = new Date()
  const minDateStr = formatDateInput(today)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-5 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bus className="w-5 h-5" />
          {routeSchedule.from} → {routeSchedule.to}
        </h2>
        <p className="text-emerald-100 text-sm mt-1">
          Daily buses from {formatPrice(minPrice)} • {formatDuration(minDuration)} - {formatDuration(maxDuration)} travel
        </p>
      </div>

      {/* Typical Schedule - Static info */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Typical Daily Schedule</h3>
        </div>

        <div className="space-y-2">
          {busSchedules.slice(0, 4).map((schedule) => {
            const TransportIcon = transportIcons[schedule.transportType] || Bus

            return (
              <div
                key={schedule.id}
                className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-50"
              >
                {/* Time */}
                <div className="font-bold text-gray-900 min-w-[50px]">
                  {schedule.departure.time}
                </div>

                {/* Route */}
                <div className="flex-1 flex items-center gap-2 text-sm text-gray-600">
                  <span className="truncate">{schedule.departure.terminal.city}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{schedule.arrival.terminal.city}</span>
                </div>

                {/* Class badge */}
                {schedule.busClass && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${classColors[schedule.busClass] || 'bg-gray-100 text-gray-700'}`}>
                    {classLabels[schedule.busClass] || schedule.busClass}
                  </span>
                )}

                {/* Price */}
                <div className="font-semibold text-emerald-600 min-w-[60px] text-right">
                  {formatPrice(schedule.price.amount)}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-400 mt-3 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          These are typical departure times. Actual availability varies by date.
        </p>
      </div>

      {/* Book Section */}
      <div className="px-6 py-5 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Check availability & book</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Date input */}
          <div className="flex-1">
            <label className="sr-only">Travel date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="date"
                value={formatDateInput(selectedDate)}
                min={minDateStr}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Book button */}
          <a
            href={mainBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
          >
            Check Schedules
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          See all departures, live availability & book on our booking page
        </p>
      </div>
    </div>
  )
}
