'use client'

import { useState, useMemo } from 'react'
import { Bus, Ship, Car, Filter, ChevronDown, ChevronUp, MapPin, ExternalLink } from 'lucide-react'
import type { Schedule, RouteSchedule } from '@/lib/schedule-types'

interface TimetableProps {
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

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

function formatPrice(amount: number, currency: string): string {
  if (currency === 'PHP') {
    return `₱${amount.toLocaleString()}`
  }
  return `$${amount.toFixed(2)}`
}

type SortOption = 'departure' | 'price' | 'duration'

export default function Timetable({ routeSchedule }: TimetableProps) {
  const [sortBy, setSortBy] = useState<SortOption>('departure')
  const [sortAsc, setSortAsc] = useState(true)
  const [filterClass, setFilterClass] = useState<string>('all')
  const [filterTransport, setFilterTransport] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const busClasses = useMemo(() => {
    const classes = new Set<string>()
    routeSchedule.schedules.forEach(s => {
      if (s.busClass) classes.add(s.busClass)
    })
    return Array.from(classes)
  }, [routeSchedule])

  const transportTypes = useMemo(() => {
    const types = new Set<string>()
    routeSchedule.schedules.forEach(s => {
      types.add(s.transportType)
    })
    return Array.from(types)
  }, [routeSchedule])

  const sortedSchedules = useMemo(() => {
    let filtered = [...routeSchedule.schedules]
    
    // Filter out "Various" time entries for cleaner display
    filtered = filtered.filter(s => s.departure.time !== 'Various')
    
    if (filterClass !== 'all') {
      filtered = filtered.filter(s => s.busClass === filterClass)
    }
    if (filterTransport !== 'all') {
      filtered = filtered.filter(s => s.transportType === filterTransport)
    }

    filtered.sort((a, b) => {
      let cmp = 0
      switch (sortBy) {
        case 'departure':
          cmp = a.departure.time.localeCompare(b.departure.time)
          break
        case 'price':
          cmp = a.price.amount - b.price.amount
          break
        case 'duration':
          cmp = a.duration - b.duration
          break
      }
      return sortAsc ? cmp : -cmp
    })

    return filtered
  }, [routeSchedule, sortBy, sortAsc, filterClass, filterTransport])

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(option)
      setSortAsc(true)
    }
  }

  const SortButton = ({ option, label }: { option: SortOption; label: string }) => (
    <button
      onClick={() => handleSort(option)}
      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
        sortBy === option 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
      {sortBy === option && (
        sortAsc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
      )}
    </button>
  )

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {routeSchedule.from} → {routeSchedule.to}
          </h2>
          <p className="text-sm text-gray-500">
            {sortedSchedules.length} departures available
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors sm:hidden"
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Filters & Sort */}
      <div className={`flex flex-col sm:flex-row gap-4 mb-6 ${showFilters ? '' : 'hidden sm:flex'}`}>
        <div className="flex flex-wrap gap-2">
          <SortButton option="departure" label="Departure" />
          <SortButton option="price" label="Price" />
          <SortButton option="duration" label="Duration" />
        </div>

        <div className="flex gap-2 sm:ml-auto">
          <select
            value={filterTransport}
            onChange={(e) => setFilterTransport(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Transport</option>
            {transportTypes.map((type) => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Classes</option>
            {busClasses.map((cls) => (
              <option key={cls} value={cls}>{classLabels[cls] || cls}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-3">
        {sortedSchedules.map((schedule) => {
          const TransportIcon = transportIcons[schedule.transportType] || Bus

          return (
            <div
              key={schedule.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Time & Route */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-center min-w-[60px]">
                    <div className="text-xl font-bold text-gray-900">{schedule.departure.time}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {schedule.departure.terminal.city}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-2">
                    <div className="text-xs text-gray-400 mb-1">{formatDuration(schedule.duration)}</div>
                    <div className="w-full flex items-center gap-2">
                      <div className="h-0.5 flex-1 bg-gray-200" />
                      <TransportIcon className="w-4 h-4 text-gray-400" />
                      <div className="h-0.5 flex-1 bg-gray-200" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{schedule.frequency}</div>
                  </div>

                  <div className="text-center min-w-[60px]">
                    <div className="text-xl font-bold text-gray-900">{schedule.arrival.time}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {schedule.arrival.terminal.city}
                    </div>
                  </div>
                </div>

                {/* Terminal & Class */}
                <div className="flex items-center gap-3 sm:w-52">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate text-sm">
                      {schedule.departure.terminal.name}
                    </div>
                    {schedule.busClass && (
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${classColors[schedule.busClass] || 'bg-gray-100 text-gray-700'}`}>
                        {classLabels[schedule.busClass] || schedule.busClass}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Book */}
                <div className="flex items-center gap-3 sm:w-44 justify-end">
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-600">
                      {formatPrice(schedule.price.amount, schedule.price.currency)}
                    </div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                  <a
                    href={schedule.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Book
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )
        })}

        {sortedSchedules.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Bus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No schedules match your filters</p>
            <button
              onClick={() => { setFilterClass('all'); setFilterTransport('all') }}
              className="mt-2 text-emerald-600 hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Schedule last updated: {new Date(routeSchedule.lastUpdated).toLocaleDateString()}
      </div>
    </div>
  )
}
