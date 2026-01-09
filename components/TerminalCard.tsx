'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Clock, Phone, Bus, Share2 } from 'lucide-react'
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
  const hasPhoto = terminal.photos && terminal.photos.length > 0
  
  const mapsUrl = terminal.googleMapsUri || 
    `https://www.google.com/maps/search/?api=1&query=${terminal.lat},${terminal.lon}`

  const handleShare = async () => {
    const shareData = {
      title: `${terminal.name} - Pickup Location`,
      text: `Meet me at ${terminal.name}\n${terminal.formattedAddress || terminal.city}`,
      url: mapsUrl
    }
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(`${terminal.name}\n${terminal.formattedAddress}\n${mapsUrl}`)
      alert('Location copied to clipboard!')
    }
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${highlight ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-100'}`}>
      <div className="flex">
        {/* Larger square photo */}
        <div className="w-36 flex-shrink-0 bg-slate-100 relative">
          {hasPhoto ? (
            <Image 
              src={terminal.photos![0]} 
              alt={terminal.name}
              fill
              sizes="144px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Bus className="w-10 h-10 text-slate-300" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 min-w-0">
          {/* Header: Name + Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link href={`/terminal/${terminal.slug}`} className="group">
              <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                {terminal.name}
              </h3>
            </Link>
            {terminal.rating && (
              <div className="flex items-center gap-1 text-sm flex-shrink-0">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-bold text-gray-700">{terminal.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Address - clickable to Google Maps */}
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-2"
          >
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{terminal.formattedAddress || terminal.city}</span>
          </a>

          {/* Operators */}
          {terminal.operators && terminal.operators.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {terminal.operators.map((op, i) => (
                <span key={i} className="text-sm bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-medium">
                  {op}
                </span>
              ))}
            </div>
          )}

          {/* Schedule OR Opening hours */}
          {(departures || firstBus || lastBus) ? (
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-amber-600" />
              {departures && <span className="text-amber-700 font-semibold">{departures}</span>}
              {firstBus && <span>First: <strong>{firstBus}</strong></span>}
              {lastBus && <span>Last: <strong>{lastBus}</strong></span>}
            </div>
          ) : terminal.openingHours && terminal.openingHours.length > 0 ? (
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{terminal.openingHours[0]}</span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100">
        {/* Phone */}
        <div className="flex items-center gap-3">
          {terminal.phone && (
            <a href={`tel:${terminal.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-amber-600">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{terminal.phone}</span>
            </a>
          )}
          {terminal.wheelchairAccessible && (
            <span className="text-blue-600 text-lg" title="Wheelchair accessible">♿</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Share button with label */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-gray-600 hover:text-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Share</span>
          </button>
          
          {/* Google Maps button */}
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Directions</span>
          </a>
        </div>
      </div>
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
