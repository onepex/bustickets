import Link from 'next/link'
import { Star, MapPin, Clock, Phone, Navigation, Bus } from 'lucide-react'
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

  return (
    <Link href={`/terminal/${terminal.slug}`} className="block group">
      <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:border-amber-300 transition-all hover:shadow-md ${highlight ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-100'}`}>
        <div className="flex">
          {/* Photo thumbnail */}
          {hasPhoto && (
            <div className="w-32 flex-shrink-0 bg-slate-100">
              <img 
                src={terminal.photos![0]} 
                alt={terminal.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 p-4">
            {/* Header: Name + Rating */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                {terminal.name}
              </h3>
              {terminal.rating && (
                <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-xs flex-shrink-0">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-amber-700">{terminal.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="flex items-start gap-1.5 text-sm text-gray-500 mb-2">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
              <span className="line-clamp-1">{terminal.formattedAddress || terminal.city}</span>
            </div>

            {/* Operators */}
            {terminal.operators && terminal.operators.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {terminal.operators.map((op, i) => (
                  <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium">
                    {op}
                  </span>
                ))}
              </div>
            )}

            {/* Schedule slot (page-specific) */}
            {(departures || firstBus || lastBus) && (
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {departures && <span className="text-amber-700 font-semibold">{departures}</span>}
                {firstBus && <span>First: <strong>{firstBus}</strong></span>}
                {lastBus && <span>Last: <strong>{lastBus}</strong></span>}
              </div>
            )}

            {/* Opening hours (if no schedule) */}
            {!(departures || firstBus || lastBus) && terminal.openingHours && terminal.openingHours.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span className="line-clamp-1">{terminal.openingHours[0]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs px-4 py-2 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {terminal.phone && (
              <div className="flex items-center gap-1 text-gray-500">
                <Phone className="w-3.5 h-3.5" />
                <span>{terminal.phone}</span>
              </div>
            )}
            {terminal.wheelchairAccessible && (
              <div className="flex items-center text-blue-600" title="Wheelchair accessible">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm7 18h-2.5l-1.5-5h-4.5l-.5-3h-2l.5 3H6l-.5 2H4v2h2.5l.5-2h4l1.5 5H7v2h12v-2z"/>
                </svg>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-amber-600 font-medium group-hover:underline">
            <Navigation className="w-3.5 h-3.5" />
            <span>Directions</span>
          </div>
        </div>
      </div>
    </Link>
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
