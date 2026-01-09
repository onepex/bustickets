import citiesData from './cities.json'
import type { City, Route } from './types'

const data = citiesData as {
  cities: City[]
  routes: Route[]
}

export function searchCities(query: string, excludeSlug?: string): City[] {
  if (!query || query.length < 1) {
    return data.cities
      .filter(c => c.popular && c.slug !== excludeSlug)
      .slice(0, 8)
  }

  const q = query.toLowerCase()
  return data.cities
    .filter(c => 
      c.slug !== excludeSlug && 
      (c.name.toLowerCase().includes(q) || c.slug.includes(q))
    )
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q)
      const bStarts = b.name.toLowerCase().startsWith(q)
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
      if (a.popular && !b.popular) return -1
      if (!a.popular && b.popular) return 1
      return a.name.localeCompare(b.name)
    })
    .slice(0, 10)
}

export function getValidDestinations(fromSlug: string): string[] {
  return data.routes
    .filter(r => r.from === fromSlug)
    .map(r => r.to)
}

export function getCityBySlug(slug: string): City | undefined {
  return data.cities.find(c => c.slug === slug)
}

export function getPopularCities(): City[] {
  return data.cities.filter(c => c.popular).slice(0, 10)
}

export function build12goUrl(params: {
  from: City
  to: City
  date: Date
  returnDate?: Date | null
  passengers: number
}): string {
  const baseUrl = 'https://book.bustickets.ph/en/travel'
  const fromSlug = params.from.slug
  const toSlug = params.to.slug
  
  const formatDateParam = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const dateStr = formatDateParam(params.date)
  let url = `${baseUrl}/${fromSlug}/${toSlug}?date=${dateStr}&people=${params.passengers}`

  if (params.returnDate) {
    url += `&return_date=${formatDateParam(params.returnDate)}`
  }

  return url
}

export function buildLocalRouteUrl(from: City, to: City): string {
  return `/route/${from.slug}-to-${to.slug}`
}

export function buildWhitelabelUrl(params: {
  from: string
  to: string
  date?: Date
  passengers?: number
}): string {
  const baseUrl = 'https://book.bustickets.ph/en/travel'
  const fromSlug = params.from.toLowerCase().replace(/\s+/g, '-')
  const toSlug = params.to.toLowerCase().replace(/\s+/g, '-')
  
  let url = `${baseUrl}/${fromSlug}/${toSlug}`
  
  const queryParams: string[] = []
  if (params.date) {
    const year = params.date.getFullYear()
    const month = String(params.date.getMonth() + 1).padStart(2, '0')
    const day = String(params.date.getDate()).padStart(2, '0')
    queryParams.push(`date=${year}-${month}-${day}`)
  }
  if (params.passengers) {
    queryParams.push(`people=${params.passengers}`)
  }
  
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`
  }
  
  return url
}

export function getAllCities(): City[] {
  return data.cities
}

export function getRouteCount(): number {
  return data.routes.length
}

export function getCityCount(): number {
  return data.cities.length
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('en-US', options)
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
