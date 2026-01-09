'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { searchCities } from '@/lib/search-utils'
import type { City } from '@/lib/types'

interface LocationInputProps {
  label: string
  placeholder: string
  value: City | null
  onChange: (city: City | null) => void
  excludeSlug?: string
  autoFocus?: boolean
}

export default function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  excludeSlug,
  autoFocus = false,
}: LocationInputProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<City[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const search = useCallback((q: string) => {
    const cities = searchCities(q, excludeSlug)
    setResults(cities)
    setHighlightedIndex(0)
  }, [excludeSlug])

  useEffect(() => {
    if (isOpen) {
      search(query)
    }
  }, [query, isOpen, search])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (city: City) => {
    onChange(city)
    setQuery('')
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true)
        search('')
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(i => Math.min(i + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (results[highlightedIndex]) {
          handleSelect(results[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const handleFocus = () => {
    setIsOpen(true)
    search(query)
  }

  return (
    <div className="relative flex-1">
      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? query : (value?.name || '')}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!isOpen) setIsOpen(true)
          }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label}
          className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        />
        <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform pointer-events-none ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-72 overflow-y-auto"
          style={{ animation: 'fadeIn 0.15s ease-out' }}
        >
          {!query && (
            <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
              Popular Destinations
            </div>
          )}
          {query && results.length > 0 && (
            <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </div>
          )}
          {results.map((city, index) => (
            <button
              key={city.id}
              onClick={() => handleSelect(city)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={index === highlightedIndex}
              className={`w-full px-3 py-3 flex items-center gap-3 text-left transition-colors ${
                index === highlightedIndex
                  ? 'bg-emerald-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <MapPin className={`w-4 h-4 flex-shrink-0 ${index === highlightedIndex ? 'text-emerald-500' : 'text-gray-400'}`} />
              <div className="min-w-0">
                <div className={`font-medium truncate ${index === highlightedIndex ? 'text-emerald-700' : 'text-gray-900'}`}>
                  {city.name}
                </div>
                {city.popular && (
                  <span className="text-xs text-emerald-600">Popular</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
