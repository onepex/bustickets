/**
 * Route Data Loaders
 * Functions to load route data and merge with shared reference data
 */

import type { RouteData, Operator, Terminal, City, BusClass } from './route-types'

// Import shared data
import operatorsData from '@/data/shared/operators.json'
import terminalsData from '@/data/shared/terminals.json'
import citiesData from '@/data/shared/cities.json'
import busClassesData from '@/data/shared/bus-classes.json'

// Type assertions for imported JSON
const operators = operatorsData.operators as Record<string, Operator>
const terminals = terminalsData.terminals as Record<string, Terminal>
const cities = citiesData.cities as Record<string, City>
const busClasses = busClassesData.classes as Record<string, BusClass>

/**
 * Get operator by slug
 */
export function getOperator(slug: string): Operator | null {
  return operators[slug] || null
}

/**
 * Get terminal by slug
 */
export function getTerminal(slug: string): Terminal | null {
  return terminals[slug] || null
}

/**
 * Get city by slug
 */
export function getCity(slug: string): City | null {
  return cities[slug] || null
}

/**
 * Get bus class by slug
 */
export function getBusClass(slug: string): BusClass | null {
  return busClasses[slug] || null
}

/**
 * Get multiple operators by slugs
 */
export function getOperators(slugs: string[]): Operator[] {
  return slugs.map(slug => operators[slug]).filter(Boolean) as Operator[]
}

/**
 * Get multiple terminals by slugs
 */
export function getTerminals(slugs: string[]): Terminal[] {
  return slugs.map(slug => terminals[slug]).filter(Boolean) as Terminal[]
}

/**
 * Enrich route data with shared reference data
 */
export function enrichRouteData(route: RouteData) {
  return {
    ...route,
    _enriched: {
      operators: route.operators.active.map(slug => ({
        ...operators[slug],
        routeSpecific: route.operators.details.find(d => d.slug === slug)?.routeSpecific
      })),
      originCity: cities[route.route.origin.citySlug],
      destinationCity: cities[route.route.destination.citySlug],
      originTerminals: route.route.origin.primaryTerminals.map(slug => terminals[slug]).filter(Boolean),
      destinationTerminals: route.route.destination.primaryTerminals.map(slug => terminals[slug]).filter(Boolean),
    }
  }
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = 'PHP'): string {
  if (currency === 'PHP') {
    return `₱${amount.toLocaleString()}`
  }
  return `${currency} ${amount.toLocaleString()}`
}

/**
 * Format duration for display
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

/**
 * Get badge display info
 */
export function getBadgeInfo(badge: string): { label: string; color: string } {
  const badges: Record<string, { label: string; color: string }> = {
    'best-value': { label: 'Best Value', color: 'bg-green-100 text-green-700' },
    'fastest': { label: 'Fastest', color: 'bg-blue-100 text-blue-700' },
    'popular': { label: 'Popular', color: 'bg-purple-100 text-purple-700' },
    'premium': { label: 'Premium', color: 'bg-amber-100 text-amber-700' },
    'night-trip': { label: 'Night Trip', color: 'bg-indigo-100 text-indigo-700' },
  }
  return badges[badge] || { label: badge, color: 'bg-gray-100 text-gray-700' }
}

/**
 * Get period display info
 */
export function getPeriodInfo(period: string): { label: string; icon: string; description: string } {
  const periods: Record<string, { label: string; icon: string; description: string }> = {
    'night': { label: 'Night', icon: '🌙', description: '12am - 5am' },
    'morning': { label: 'Morning', icon: '🌅', description: '5am - 12pm' },
    'afternoon': { label: 'Afternoon', icon: '☀️', description: '12pm - 6pm' },
    'evening': { label: 'Evening', icon: '🌆', description: '6pm - 12am' },
  }
  return periods[period] || { label: period, icon: '🚌', description: '' }
}
