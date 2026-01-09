'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Star, MapPin, Clock, Phone, Navigation, Bus, ChevronDown, ChevronUp } from 'lucide-react'
import { TerminalData } from '@/lib/terminal-types'

interface TerminalCardProps {
  terminal: TerminalData
  departures?: string
  firstBus?: string
  lastBus?: string
  highlight?: boolean
}

export function TerminalCard({ 
  terminal, 
  departures, 
  firstBus, 
  lastBus,
  highlight = false 
}: TerminalCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasPhoto = terminal.photos && terminal.photos.length > 0
  
  const mapsUrl = terminal.googleMapsUri || 
    `https://www.google.com/maps/search/?api=1&query=${terminal.lat},${terminal.lon}`

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${highlight ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-100'}`}>
      <div className="flex">
        {/* Square photo thumbnail */}
        <div className="w-28 h-28 flex-shrink-0 bg-slate-100 relative">
          {hasPhoto ? (
            <Image 
              src={terminal.photos![0]} 
              alt={terminal.name}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Bus className="w-8 h-8 text-slate-300" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          {/* Header: Name + Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link href={`/terminal/${terminal.slug}`} className="group">
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1 text-sm">
                {terminal.name}
              </h3>
            </Link>
            {terminal.rating && (
              <div className="flex items-center gap-0.5 text-xs flex-shrink-0">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-gray-700">{terminal.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Address - clickable to Google Maps */}
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1 text-xs text-gray-500 hover:text-amber-600 mb-2"
          >
            <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{terminal.formattedAddress || terminal.city}</span>
          </a>

          {/* Operators */}
          {terminal.operators && terminal.operators.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {terminal.operators.map((op, i) => (
                <span key={i} className="text-xs bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                  {op}
                </span>
              ))}
            </div>
          )}

          {/* Schedule slot (page-specific) */}
          {(departures || firstBus || lastBus) && (
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
              <Clock className="w-3 h-3 text-amber-600" />
              {departures && <span className="text-amber-700 font-semibold">{departures}</span>}
              {firstBus && <span>First: <strong>{firstBus}</strong></span>}
              {lastBus && <span>Last: <strong>{lastBus}</strong></span>}
            </div>
          )}

          {/* Opening hours (if no schedule provided) */}
          {!(departures || firstBus || lastBus) && terminal.openingHours && terminal.openingHours.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span className="line-clamp-1">{terminal.openingHours[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer - always visible */}
      <div className="flex items-center justify-between text-xs px-3 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {terminal.phone && (
            <a href={`tel:${terminal.phone}`} className="flex items-center gap-1 text-gray-500 hover:text-amber-600">
              <Phone className="w-3 h-3" />
              <span>{terminal.phone}</span>
            </a>
          )}
          {terminal.wheelchairAccessible && (
            <span className="text-blue-600" title="Wheelchair accessible">♿</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amber-600 font-medium hover:underline"
          >
            <Navigation className="w-3 h-3" />
            <span>Directions</span>
          </a>
          {(terminal.reviews?.length || terminal.openingHours?.length) && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-0.5 text-gray-400 hover:text-gray-600 ml-1"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Expandable section */}
      {expanded && (
        <div className="px-3 py-3 border-t border-gray-100 text-xs space-y-2">
          {/* Full opening hours */}
          {terminal.openingHours && terminal.openingHours.length > 0 && (
            <div>
              <div className="font-medium text-gray-700 mb-1">Opening Hours</div>
              <div className="text-gray-500 space-y-0.5">
                {terminal.openingHours.map((h, i) => (
                  <div key={i}>{h}</div>
                ))}
              </div>
            </div>
          )}
          {/* Top review */}
          {terminal.reviews && terminal.reviews.length > 0 && (
            <div>
              <div className="font-medium text-gray-700 mb-1">Recent Review</div>
              <div className="text-gray-500 italic line-clamp-2">
                "{terminal.reviews[0].text}"
              </div>
              <div className="text-gray-400 mt-0.5">— {terminal.reviews[0].authorName}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function TerminalCardCompact({ 
  terminal, 
  departures, 
  firstBus, 
  lastBus 
}: TerminalCardProps) {
  return (
    <Link href={`/terminal/${terminal.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-amber-300 transition-colors">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            {terminal.name}
          </h3>
          {terminal.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-gray-600">{terminal.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">
          {terminal.formattedAddress || `${terminal.city} · ${terminal.operators?.join(', ')}`}
        </p>
        
        {(departures || firstBus || lastBus) && (
          <div className="flex flex-wrap gap-3 text-xs">
            {departures && (
              <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                {departures}
              </span>
            )}
            {firstBus && (
              <span className="text-gray-500">First: <strong>{firstBus}</strong></span>
            )}
            {lastBus && (
              <span className="text-gray-500">Last: <strong>{lastBus}</strong></span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

export function TerminalCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-32 bg-gray-200" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-3" />
        <div className="flex gap-2">
          <div className="h-5 bg-gray-100 rounded w-16" />
          <div className="h-5 bg-gray-100 rounded w-20" />
        </div>
      </div>
    </div>
  )
}
