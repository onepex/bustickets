import Link from 'next/link'
import Image from 'next/image'
import { Star, MapPin, Clock, Bus, Calendar, Wallet } from 'lucide-react'
import { getOperator } from '@/lib/operators'

interface DepartureTerminal {
  name: string
  address?: string
}

interface TerminalMarker {
  letter: string
  color: string
  name: string
}

interface OperatorCardProps {
  name: string
  rating?: number
  badge?: string
  description: string
  terminals?: string[]
  priceRange?: string
  href?: string
  variant?: 'compact' | 'detailed'
  travelTime?: string
  departureTerminals?: DepartureTerminal[]
  busClasses?: string[]
  schedule?: string
  frequency?: string
  departsFrom?: TerminalMarker
  arrivesAt?: TerminalMarker
  highlightedTerminal?: string | null
  onTerminalClick?: (terminalName: string) => void
}

export function OperatorCard({
  name,
  rating,
  badge,
  description,
  terminals,
  priceRange,
  href,
  variant = 'compact',
  travelTime,
  departureTerminals,
  busClasses,
  schedule,
  frequency,
  departsFrom,
  arrivesAt,
  highlightedTerminal,
  onTerminalClick,
}: OperatorCardProps) {
  const op = getOperator(name)
  const color = op?.color || '#6B7280'
  const logo = op?.logo
  const busPhoto = op?.busPhoto
  const displayName = op?.shortName || name

  const isDetailed = variant === 'detailed'

  const content = (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:border-amber-300 hover:shadow-md transition-all h-full group">
      {/* Header with logo + name left, badge + rating right */}
      <div 
        className={`w-full flex items-center justify-between px-4 ${isDetailed ? 'h-16' : 'h-14'}`}
        style={{ 
          background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        }}
      >
        <div className="flex items-center gap-3">
          {logo && (
            <Image 
              src={logo} 
              alt={displayName} 
              width={isDetailed ? 40 : 32} 
              height={isDetailed ? 40 : 32} 
              className={`object-contain bg-white rounded p-1 ${isDetailed ? 'w-10 h-10' : 'w-8 h-8'}`}
            />
          )}
          <span className={`text-white font-bold uppercase tracking-wide ${isDetailed ? 'text-xl' : 'text-lg'}`}>
            {op?.name || name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-xs font-medium bg-amber-400 text-amber-900 px-2 py-1 rounded">{badge}</span>
          )}
          {rating && (
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="font-bold text-white">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bus Photo - flush with header */}
      {busPhoto && (
        <div className={`relative overflow-hidden ${isDetailed ? 'h-64' : 'h-56'}`}>
          <Image
            src={busPhoto}
            alt={`${displayName} bus`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={isDetailed ? 'p-6' : 'p-5'}>
        {/* Description */}
        <p className={`text-gray-600 mb-4 ${isDetailed ? 'text-base' : 'text-sm line-clamp-2'}`}>{description}</p>

        {/* Detailed: Key Info Grid */}
        {isDetailed && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {travelTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-gray-500">Travel Time</p>
                  <p className="font-semibold text-gray-900">{travelTime}</p>
                </div>
              </div>
            )}
            {frequency && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-gray-500">Departures</p>
                  <p className="font-semibold text-gray-900">{frequency}</p>
                </div>
              </div>
            )}
            {priceRange && (
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-xs text-gray-500">Fare</p>
                  <p className="font-semibold text-gray-900">{priceRange}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed: Departure Terminals */}
        {isDetailed && departureTerminals && departureTerminals.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Departure Terminals
            </p>
            <div className="space-y-2">
              {departureTerminals.map((t, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-900">{t.name}</p>
                  {t.address && <p className="text-xs text-gray-500">{t.address}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed: Bus Classes */}
        {isDetailed && busClasses && busClasses.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Bus Classes</p>
            <div className="flex flex-wrap gap-2">
              {busClasses.map((c, i) => (
                <span key={i} className="text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detailed: Route Markers */}
        {isDetailed && (departsFrom || arrivesAt) && (
          <div className="mb-4 space-y-2">
            {departsFrom && (
              <div 
                className={`flex items-end gap-3 py-1.5 px-2 -mx-2 rounded-lg cursor-pointer transition-all ${highlightedTerminal === departsFrom.name ? 'bg-amber-50 border-l-2 border-amber-400' : 'hover:bg-gray-50 border-l-2 border-transparent'}`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTerminalClick?.(departsFrom.name) }}
              >
                <span 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0 transition-transform ${highlightedTerminal === departsFrom.name ? 'scale-110' : ''}`}
                  style={{ backgroundColor: departsFrom.color }}
                >
                  {departsFrom.letter}
                </span>
                <div>
                  <span className="text-xs text-gray-500">Departs from</span>
                  <p className="text-sm font-medium text-gray-900">{departsFrom.name}</p>
                </div>
              </div>
            )}
            {arrivesAt && (
              <div 
                className={`flex items-end gap-3 py-1.5 px-2 -mx-2 rounded-lg cursor-pointer transition-all ${highlightedTerminal === arrivesAt.name ? 'bg-amber-50 border-l-2 border-amber-400' : 'hover:bg-gray-50 border-l-2 border-transparent'}`}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTerminalClick?.(arrivesAt.name) }}
              >
                <span 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0 transition-transform ${highlightedTerminal === arrivesAt.name ? 'scale-110' : ''}`}
                  style={{ backgroundColor: arrivesAt.color }}
                >
                  {arrivesAt.letter}
                </span>
                <div>
                  <span className="text-xs text-gray-500">Arrives at</span>
                  <p className="text-sm font-medium text-gray-900">{arrivesAt.name}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Compact: Terminals */}
        {!isDetailed && terminals && terminals.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {terminals.map((t, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Price - only show in compact mode (detailed mode shows in grid above) */}
        {!isDetailed && priceRange && (
          <p className="font-semibold text-gray-900 text-sm">
            {priceRange}
          </p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    )
  }

  return content
}
