'use client'

import { useState } from 'react'
import { Search, ArrowRightLeft, Calendar, Users } from 'lucide-react'

interface BookingWidgetProps {
  defaultFrom?: string
  defaultTo?: string
}

export default function BookingWidget({ defaultFrom = '', defaultTo = '' }: BookingWidgetProps) {
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway')
  const [from, setFrom] = useState(defaultFrom)
  const [to, setTo] = useState(defaultTo)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [passengers, setPassengers] = useState(1)

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSearch = () => {
    const baseUrl = 'https://12go.asia/en/travel'
    const fromSlug = from.toLowerCase().replace(/\s+/g, '-')
    const toSlug = to.toLowerCase().replace(/\s+/g, '-')
    const affiliateCode = '64932'
    
    const url = `${baseUrl}/${fromSlug}/${toSlug}?z=${affiliateCode}&people=${passengers}&date=${date}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === 'oneway'}
            onChange={() => setTripType('oneway')}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">One Way</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="tripType"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm text-gray-700">Round Trip</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-3">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <div className="relative">
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Where from?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-1 flex items-end justify-center">
          <button
            onClick={handleSwap}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Swap locations"
          >
            <ArrowRightLeft className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Where to?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500 mb-1">People</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              min={1}
              max={10}
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
