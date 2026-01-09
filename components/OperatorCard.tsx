import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { getOperator } from '@/lib/operators'

interface OperatorCardProps {
  name: string
  rating?: number
  badge?: string
  description: string
  terminals?: string[]
  priceRange?: string
  href?: string
}

export function OperatorCard({
  name,
  rating,
  badge,
  description,
  terminals,
  priceRange,
  href,
}: OperatorCardProps) {
  const op = getOperator(name)
  const color = op?.color || '#6B7280'
  const logo = op?.logo
  const displayName = op?.shortName || name

  const content = (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-amber-300 transition-colors h-full">
      {/* Header with logo + brand color */}
      <div 
        className="w-full h-14 rounded-lg flex items-center justify-center gap-3 mb-4"
        style={{ backgroundColor: color }}
      >
        {logo && (
          <Image 
            src={logo} 
            alt={displayName} 
            width={32} 
            height={32} 
            className="w-8 h-8 object-contain bg-white rounded p-1"
          />
        )}
        <span className="text-white font-bold text-lg uppercase tracking-wide">
          {displayName}
        </span>
      </div>

      {/* Rating + Badge */}
      <div className="flex items-center justify-between mb-3">
        {rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
          </div>
        )}
        {badge && (
          <span className="text-xs font-medium text-amber-600">{badge}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      {/* Terminals */}
      {terminals && terminals.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {terminals.map((t, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Price */}
      {priceRange && (
        <p className="text-sm font-semibold text-gray-900">{priceRange}</p>
      )}
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
