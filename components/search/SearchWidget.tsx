'use client'

import { useState, useCallback } from 'react'
import { ArrowRightLeft, Search, Sparkles } from 'lucide-react'
import LocationInput from './LocationInput'
import DatePicker from './DatePicker'
import PassengerSelector from './PassengerSelector'
import { build12goUrl } from '@/lib/search-utils'
import type { City } from '@/lib/types'

interface SearchWidgetProps {
  defaultFrom?: City | null
  defaultTo?: City | null
  variant?: 'default' | 'compact' | 'hero'
}

export default function SearchWidget({
  defaultFrom = null,
  defaultTo = null,
  variant = 'default',
}: SearchWidgetProps) {
  const [from, setFrom] = useState<City | null>(defaultFrom)
  const [to, setTo] = useState<City | null>(defaultTo)
  const [date, setDate] = useState<Date>(new Date())
  const [passengers, setPassengers] = useState(1)
  const [isSearching, setIsSearching] = useState(false)

  const handleSwap = useCallback(() => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }, [from, to])

  const handleSearch = useCallback(() => {
    if (!from || !to) return

    setIsSearching(true)
    const url = build12goUrl({ from, to, date, passengers })
    
    setTimeout(() => {
      window.open(url, '_blank')
      setIsSearching(false)
    }, 300)
  }, [from, to, date, passengers])

  const isValid = from && to && from.slug !== to.slug

  if (variant === 'hero') {
    return (
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20 overflow-visible">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#046cbb]" />
            <span className="text-sm font-medium text-gray-600">
              Book bus & ferry tickets across the Philippines
            </span>
          </div>

          {/* Row 1: From and To */}
          <div className="flex flex-col md:flex-row gap-4 items-end mb-4">
            <div className="flex-1 w-full">
              <LocationInput
                label="From"
                placeholder="Where are you leaving from?"
                value={from}
                onChange={setFrom}
                excludeSlug={to?.slug}
              />
            </div>

            <div className="hidden md:flex items-center justify-center pb-1">
              <button
                onClick={handleSwap}
                className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all hover:rotate-180 duration-300 group"
                title="Swap locations"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-500 group-hover:text-[#035a9e]" />
              </button>
            </div>

            <div className="flex-1 w-full">
              <LocationInput
                label="To"
                placeholder="Where are you going?"
                value={to}
                onChange={setTo}
                excludeSlug={from?.slug}
              />
            </div>
          </div>

          {/* Row 2: Date, Passengers, Search */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-48">
              <DatePicker
                label="Date"
                value={date}
                onChange={setDate}
              />
            </div>
            
            <div className="w-full md:w-44">
              <PassengerSelector
                label="Passengers"
                value={passengers}
                onChange={setPassengers}
              />
            </div>

            <div className="flex-1 w-full md:w-auto">
              <button
                onClick={handleSearch}
                disabled={!isValid || isSearching}
                className={`w-full py-3.5 px-8 rounded-xl font-semibold text-base flex items-center justify-center gap-3 transition-all ${
                  isValid && !isSearching
                    ? 'bg-[#046cbb] hover:bg-[#035a9e] text-white shadow-lg shadow-[#046cbb]/30 hover:shadow-[#046cbb]/40 hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search Tickets
                  </>
                )}
              </button>
            </div>
          </div>

          {from && to && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Finding routes from <span className="font-medium text-gray-700">{from.name}</span> to <span className="font-medium text-gray-700">{to.name}</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-3 items-end">
          <div className="flex-1 w-full md:w-auto">
            <LocationInput
              label="From"
              placeholder="Departure city"
              value={from}
              onChange={setFrom}
              excludeSlug={to?.slug}
            />
          </div>

          <button
            onClick={handleSwap}
            className="hidden md:flex p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all hover:rotate-180 duration-300 group self-end mb-1"
            title="Swap locations"
          >
            <ArrowRightLeft className="w-5 h-5 text-gray-500 group-hover:text-[#035a9e]" />
          </button>

          <div className="flex-1 w-full md:w-auto">
            <LocationInput
              label="To"
              placeholder="Destination"
              value={to}
              onChange={setTo}
              excludeSlug={from?.slug}
            />
          </div>

          <div className="w-full md:w-40">
            <DatePicker
              label="Date"
              value={date}
              onChange={setDate}
            />
          </div>

          <div className="w-full md:w-36">
            <PassengerSelector
              label="Passengers"
              value={passengers}
              onChange={setPassengers}
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={!isValid || isSearching}
            className={`w-full md:w-auto px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              isValid && !isSearching
                ? 'bg-[#046cbb] hover:bg-[#035a9e] text-white shadow-lg shadow-[#046cbb]/25 hover:shadow-[#046cbb]/35'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            <span className="md:hidden">Search</span>
          </button>
        </div>
      </div>
    </div>
  )
}
