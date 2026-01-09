'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { MapPin, Calendar, Users, Search, ArrowRightLeft, ChevronDown, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react'
import { searchCities, build12goUrl, formatDate, addDays } from '@/lib/search-utils'
import type { City } from '@/lib/types'

type TripType = 'oneway' | 'roundtrip'

interface RecentSearch {
  from: City
  to: City
  timestamp: number
}

const RECENT_SEARCHES_KEY = 'bustickets_recent_searches'
const MAX_RECENT_SEARCHES = 5

function getRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveRecentSearch(from: City, to: City): void {
  if (typeof window === 'undefined') return
  try {
    const searches = getRecentSearches()
    const newSearch: RecentSearch = { from, to, timestamp: Date.now() }
    const filtered = searches.filter(s => !(s.from.slug === from.slug && s.to.slug === to.slug))
    const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  } catch {
    // Ignore localStorage errors
  }
}

interface SearchWidgetV3Props {
  defaultFrom?: City
  defaultTo?: City
  defaultDate?: Date
}

export default function SearchWidgetV3({ defaultFrom, defaultTo, defaultDate }: SearchWidgetV3Props = {}) {
  const [tripType, setTripType] = useState<TripType>('oneway')
  const [from, setFrom] = useState<City | null>(defaultFrom || null)
  const [to, setTo] = useState<City | null>(defaultTo || null)
  const [departDate, setDepartDate] = useState<Date>(defaultDate || new Date())
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [passengers, setPassengers] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  
  const [activeDropdown, setActiveDropdown] = useState<'from' | 'to' | 'dates' | 'return' | 'passengers' | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (activeDropdown === 'from' || activeDropdown === 'to') {
      const exclude = activeDropdown === 'from' ? to?.slug : from?.slug
      const results = searchCities(searchQuery, exclude)
      setSearchResults(results)
      setHighlightedIndex(0)
    }
  }, [searchQuery, activeDropdown, from?.slug, to?.slug])


  const handleSwap = useCallback(() => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }, [from, to])

  const handleSearch = useCallback(() => {
    if (!from || !to) return
    setIsSearching(true)
    
    saveRecentSearch(from, to)
    
    const url = build12goUrl({ 
      from, 
      to, 
      date: departDate, 
      passengers,
      returnDate: tripType === 'roundtrip' ? returnDate : null 
    })
    
    window.location.href = url
  }, [from, to, departDate, returnDate, passengers, tripType])

  const handleSelectCity = (city: City, field: 'from' | 'to') => {
    if (field === 'from') setFrom(city)
    else setTo(city)
    setActiveDropdown(null)
    setSearchQuery('')
  }

  const handleSelectRecent = (recent: RecentSearch) => {
    if (!recent.from || !recent.to) return
    setFrom(recent.from)
    setTo(recent.to)
    setActiveDropdown(null)
    setSearchQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent, field: 'from' | 'to') => {
    if (activeDropdown !== field) return
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(i => Math.min(i + 1, searchResults.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (searchResults[highlightedIndex]) {
          handleSelectCity(searchResults[highlightedIndex], field)
        }
        break
      case 'Escape':
        setActiveDropdown(null)
        break
    }
  }

  const isValid = from && to && from.slug !== to.slug
  const isDropdownOpen = activeDropdown !== null

  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-emerald-100 text-emerald-800 font-semibold">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <>
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setActiveDropdown(null)}
          aria-hidden="true"
        />
      )}
      
      <div className="w-full max-w-5xl mx-auto relative z-50" ref={containerRef}>
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Trip Type Toggle */}
          <div className="flex gap-4 mb-6" role="radiogroup" aria-label="Trip type">
            <button
              type="button"
              role="radio"
              aria-checked={tripType === 'oneway'}
              onClick={() => setTripType('oneway')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tripType === 'oneway'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                tripType === 'oneway' ? 'border-white' : 'border-gray-400'
              }`}>
                {tripType === 'oneway' && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              One-way
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={tripType === 'roundtrip'}
              onClick={() => setTripType('roundtrip')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tripType === 'roundtrip'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                tripType === 'roundtrip' ? 'border-white' : 'border-gray-400'
              }`}>
                {tripType === 'roundtrip' && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              Round-trip
            </button>
          </div>

          {/* Row 1: From / To */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* From Field */}
            <div className="flex-1 relative">
              <label htmlFor="from-input" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">From</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
                <input
                  id="from-input"
                  type="text"
                  value={activeDropdown === 'from' ? searchQuery : (from?.name || '')}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setActiveDropdown('from'); setSearchQuery(''); }}
                  onKeyDown={(e) => handleKeyDown(e, 'from')}
                  placeholder="City or station"
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={activeDropdown === 'from'}
                  aria-haspopup="listbox"
                  aria-label="Departure city"
                  className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                {from && activeDropdown !== 'from' && (
                  <button
                    type="button"
                    onClick={() => setFrom(null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                    aria-label="Clear departure city"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
              
              {activeDropdown === 'from' && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto" role="listbox">
                  {!searchQuery && recentSearches.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Recent searches
                      </div>
                      {recentSearches.slice(0, 3).map((recent, idx) => (
                        <button
                          key={`recent-${idx}`}
                          type="button"
                          onClick={() => handleSelectRecent(recent)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-emerald-50 border-b border-gray-50 transition-colors"
                          role="option"
                        >
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-900">{recent.from.name}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-gray-900">{recent.to.name}</span>
                        </button>
                      ))}
                    </>
                  )}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Popular destinations'}
                  </div>
                  {searchResults.map((city, index) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleSelectCity(city, 'from')}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                        index === highlightedIndex ? 'bg-emerald-50' : 'hover:bg-gray-50'
                      }`}
                      role="option"
                      aria-selected={index === highlightedIndex}
                    >
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${index === highlightedIndex ? 'text-emerald-500' : 'text-gray-400'}`} />
                      <div className="min-w-0">
                        <div className={`font-medium ${index === highlightedIndex ? 'text-emerald-700' : 'text-gray-900'}`}>
                          {highlightMatch(city.name, searchQuery)}
                        </div>
                        {city.popular && <span className="text-xs text-emerald-600">Popular</span>}
                      </div>
                    </button>
                  ))}
                  {searchResults.length === 0 && searchQuery && (
                    <div className="px-4 py-6 text-center text-gray-500">No destinations found</div>
                  )}
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="hidden md:flex items-end pb-2">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 bg-gray-100 hover:bg-emerald-100 rounded-full transition-all group min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Swap departure and destination"
              >
                <ArrowRightLeft className="w-5 h-5 text-gray-500 group-hover:text-emerald-600" />
              </button>
            </div>

            {/* To Field */}
            <div className="flex-1 relative">
              <label htmlFor="to-input" className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">To</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
                <input
                  id="to-input"
                  type="text"
                  value={activeDropdown === 'to' ? searchQuery : (to?.name || '')}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { setActiveDropdown('to'); setSearchQuery(''); }}
                  onKeyDown={(e) => handleKeyDown(e, 'to')}
                  placeholder="City or station"
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={activeDropdown === 'to'}
                  aria-haspopup="listbox"
                  aria-label="Destination city"
                  className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
                {to && activeDropdown !== 'to' && (
                  <button
                    type="button"
                    onClick={() => setTo(null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                    aria-label="Clear destination city"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
              
              {activeDropdown === 'to' && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto" role="listbox">
                  {!searchQuery && recentSearches.length > 0 && (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Recent searches
                      </div>
                      {recentSearches.slice(0, 3).map((recent, idx) => (
                        <button
                          key={`recent-${idx}`}
                          type="button"
                          onClick={() => handleSelectRecent(recent)}
                          className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-emerald-50 border-b border-gray-50 transition-colors"
                          role="option"
                        >
                          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-900">{recent.from.name}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-gray-900">{recent.to.name}</span>
                        </button>
                      ))}
                    </>
                  )}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 border-b">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Popular destinations'}
                  </div>
                  {searchResults.map((city, index) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleSelectCity(city, 'to')}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                        index === highlightedIndex ? 'bg-emerald-50' : 'hover:bg-gray-50'
                      }`}
                      role="option"
                      aria-selected={index === highlightedIndex}
                    >
                      <MapPin className={`w-4 h-4 flex-shrink-0 ${index === highlightedIndex ? 'text-emerald-500' : 'text-gray-400'}`} />
                      <div className="min-w-0">
                        <div className={`font-medium ${index === highlightedIndex ? 'text-emerald-700' : 'text-gray-900'}`}>
                          {highlightMatch(city.name, searchQuery)}
                        </div>
                        {city.popular && <span className="text-xs text-emerald-600">Popular</span>}
                      </div>
                    </button>
                  ))}
                  {searchResults.length === 0 && searchQuery && (
                    <div className="px-4 py-6 text-center text-gray-500">No destinations found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Dates / Passengers / Search */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Date Selection */}
            {tripType === 'oneway' ? (
              <div className="flex-1 relative">
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Departure</label>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'dates' ? null : 'dates')}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium text-left focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all relative min-h-[56px]"
                  aria-label="Select departure date"
                  aria-expanded={activeDropdown === 'dates'}
                >
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  {formatDate(departDate)}
                  <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${activeDropdown === 'dates' ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === 'dates' && (
                  <DateRangePicker
                    departDate={departDate}
                    returnDate={null}
                    isRoundTrip={false}
                    onSelect={(depart) => {
                      setDepartDate(depart)
                      setActiveDropdown(null)
                    }}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </div>
            ) : (
              <>
                <div className="flex-1 relative">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Depart</label>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'dates' ? null : 'dates')}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium text-left focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all relative min-h-[56px]"
                    aria-label="Select departure date"
                  >
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    {formatDate(departDate)}
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${activeDropdown === 'dates' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'dates' && (
                    <DateRangePicker
                      departDate={departDate}
                      returnDate={returnDate}
                      isRoundTrip={true}
                      onSelect={(depart, returnD) => {
                        setDepartDate(depart)
                        if (returnD) setReturnDate(returnD)
                        if (returnD) setActiveDropdown(null)
                      }}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </div>
                <div className="flex-1 relative">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Return</label>
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'return' ? null : 'return')}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 font-medium text-left focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all relative min-h-[56px]"
                    aria-label="Select return date"
                  >
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    {returnDate ? formatDate(returnDate) : <span className="text-gray-400">Add return</span>}
                    <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform ${activeDropdown === 'return' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'return' && (
                    <DateRangePicker
                      departDate={departDate}
                      returnDate={returnDate}
                      isRoundTrip={true}
                      onSelect={(depart, returnD) => {
                        setDepartDate(depart)
                        if (returnD) setReturnDate(returnD)
                        if (returnD) setActiveDropdown(null)
                      }}
                      onClose={() => setActiveDropdown(null)}
                      startWithReturn
                    />
                  )}
                </div>
              </>
            )}

            {/* Passengers - Inline Stepper */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Passengers</label>
              <div className="flex items-center justify-between bg-gray-50 border-2 border-gray-200 rounded-xl pl-4 pr-2 min-h-[56px]">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-900 font-medium">{passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {passengers > 1 && (
                    <button
                      type="button"
                      onClick={() => setPassengers(passengers - 1)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-base font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all active:scale-95"
                      aria-label="Decrease passengers"
                    >
                      −
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => passengers < 10 && setPassengers(passengers + 1)}
                    disabled={passengers >= 10}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-base font-medium transition-all ${
                      passengers >= 10 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-sm'
                    }`}
                    aria-label="Increase passengers"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="w-full md:w-auto">
              <label className="block text-xs font-semibold text-gray-500/0 mb-2 uppercase tracking-wide">&nbsp;</label>
              <button
                type="button"
                onClick={handleSearch}
                disabled={!isValid || isSearching}
                className={`w-full md:w-auto px-10 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-3 transition-all min-h-[56px] ${
                  isValid && !isSearching
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                aria-label="Search for tickets"
              >
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DateRangePicker({ 
  departDate, 
  returnDate, 
  isRoundTrip, 
  onSelect, 
  onClose,
  startWithReturn = false
}: { 
  departDate: Date
  returnDate: Date | null
  isRoundTrip: boolean
  onSelect: (depart: Date, returnDate: Date | null) => void
  onClose: () => void
  startWithReturn?: boolean
}) {
  const [viewDate, setViewDate] = useState(departDate)
  const [selecting, setSelecting] = useState<'depart' | 'return'>(startWithReturn ? 'return' : 'depart')
  const [tempDepart, setTempDepart] = useState(departDate)
  const [tempReturn, setTempReturn] = useState(returnDate)
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (Date | null)[] = []
    for (let i = 0; i < startingDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))
    return days
  }

  const isToday = (date: Date) => date.toDateString() === new Date().toDateString()
  const isPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }
  const isBeforeDepart = (date: Date) => {
    const d = new Date(tempDepart)
    d.setHours(0, 0, 0, 0)
    return date < d
  }
  const isDepart = (date: Date) => date.toDateString() === tempDepart.toDateString()
  const isReturn = (date: Date) => tempReturn && date.toDateString() === tempReturn.toDateString()
  const isInRange = (date: Date) => {
    if (!tempReturn || !isRoundTrip) return false
    return date > tempDepart && date < tempReturn
  }

  const handleDateClick = (date: Date) => {
    if (isPast(date)) return
    
    if (!isRoundTrip) {
      onSelect(date, null)
      return
    }
    
    if (selecting === 'depart') {
      setTempDepart(date)
      setTempReturn(null)
      setSelecting('return')
      onSelect(date, null)
    } else {
      if (isBeforeDepart(date)) {
        setTempDepart(date)
        setTempReturn(null)
        setSelecting('return')
        onSelect(date, null)
      } else {
        setTempReturn(date)
        onSelect(tempDepart, date)
      }
    }
  }

  return (
    <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 left-0 w-full md:w-[340px] max-w-[90vw] md:max-w-none">
      {/* Selection indicator */}
      {isRoundTrip && (
        <div className="flex gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <button
            type="button"
            onClick={() => setSelecting('depart')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              selecting === 'depart' 
                ? 'bg-white shadow text-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="text-xs text-gray-400 mb-0.5">Departure</div>
            {formatDate(tempDepart)}
          </button>
          <button
            type="button"
            onClick={() => setSelecting('return')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              selecting === 'return' 
                ? 'bg-white shadow text-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="text-xs text-gray-400 mb-0.5">Return</div>
            {tempReturn ? formatDate(tempReturn) : 'Select'}
          </button>
        </div>
      )}

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="font-semibold text-gray-900">
          {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(viewDate).map((date, i) => (
          <div key={i} className="flex items-center justify-center">
            {date ? (
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                disabled={isPast(date) || (selecting === 'return' && isBeforeDepart(date))}
                className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-all ${
                  isDepart(date)
                    ? 'bg-emerald-500 text-white font-semibold rounded-r-none'
                    : isReturn(date)
                    ? 'bg-emerald-500 text-white font-semibold rounded-l-none'
                    : isInRange(date)
                    ? 'bg-emerald-100 text-emerald-700'
                    : isToday(date)
                    ? 'ring-2 ring-emerald-300 text-emerald-700 font-medium'
                    : isPast(date) || (selecting === 'return' && isBeforeDepart(date))
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </div>
        ))}
      </div>

      {/* Quick select for one-way */}
      {!isRoundTrip && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          {[
            { label: 'Today', days: 0 },
            { label: 'Tomorrow', days: 1 },
            { label: '+3 days', days: 3 },
            { label: '+1 week', days: 7 },
          ].map((q) => {
            const qDate = addDays(new Date(), q.days)
            return (
              <button
                key={q.label}
                type="button"
                onClick={() => onSelect(qDate, null)}
                disabled={isPast(qDate)}
                className="flex-1 py-2 text-xs font-medium rounded-lg bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors disabled:opacity-50"
              >
                {q.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

