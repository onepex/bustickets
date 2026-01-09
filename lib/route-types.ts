/**
 * Route Data Types (v2.0)
 * Based on Claude Opus data architecture recommendation
 */

export interface RouteData {
  version: string
  lastUpdated: string

  meta: RouteMeta
  seo: RouteSeo
  route: RouteInfo
  pricing: RoutePricing
  bookingLinks: RouteBookingLinks
  schedules: RouteSchedules
  operators: RouteOperators
  content: RouteContent
  weather: RouteWeather
  internalLinks: RouteInternalLinks
  media: RouteMedia
  schema_org: RouteSchemaOrg
  _synthesis?: RouteSynthesis
}

export interface RouteMeta {
  slug: string
  status: 'active' | 'inactive' | 'draft'
  tier: 'flagship' | 'primary' | 'secondary' | 'tertiary'
  earnings_score: number
  keyword_volume: number
  keyword_difficulty: number
}

export interface RouteSeo {
  title: string
  description: string
  h1: string
  canonical: string
  breadcrumbs: Array<{
    label: string
    href: string
  }>
}

export interface RouteInfo {
  origin: RouteEndpoint
  destination: RouteEndpoint
  distance: {
    km: number
    display: string
  }
  typicalDuration: {
    minMinutes: number
    maxMinutes: number
    display: string
  }
  reverseRouteSlug: string | null
}

export interface RouteEndpoint {
  citySlug: string
  displayName: string
  alternateNames: string[]
  primaryTerminals: string[]
}

export interface RoutePricing {
  currency: string
  lastSynced: string
  source: string
  bus: {
    min: number
    max: number
    typical: number
    display: string
  }
  charter?: {
    min: number
    max: number
    display: string
  }
}

export interface RouteBookingLinks {
  primary: {
    url: string
    label: string
    type: 'search' | 'direct'
  }
  charter?: {
    url: string
    label: string
    type: 'charter'
  }
}

export interface RouteSchedules {
  lastSynced: string
  source: string
  totalDepartures: number
  featured: FeaturedSchedule[]
  byPeriod: Record<string, {
    count: number
    range: string
    note?: string
  }>
}

export interface FeaturedSchedule {
  id: string
  operatorSlug: string
  busClass: string
  departure: {
    time: string
    period: 'night' | 'morning' | 'afternoon' | 'evening'
    terminalSlug: string
  }
  arrival: {
    time: string
    terminalSlug: string
  }
  duration: {
    minutes: number
    display: string
  }
  price: {
    amount: number
    display: string
  }
  bookingUrl: string
  badges: string[]
}

export interface RouteOperators {
  active: string[]
  primary: string
  details: OperatorDetail[]
}

export interface OperatorDetail {
  slug: string
  routeSpecific: {
    terminals: string[]
    classes: string[]
    priceRange: string
    frequency: string
    rating: number
    reviewCount: number
    highlight: string | null
  }
}

export interface RouteContent {
  heroSubtitle: string
  quickFacts: Array<{
    icon: string
    label: string
    value: string
  }>
  introduction: string | null
  sections: ContentSection[]
  faqs: FAQ[]
  travelTips: TravelTip[]
}

export interface ContentSection {
  id: string
  title: string
  icon?: string
  content: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface TravelTip {
  title: string
  content: string
}

export interface RouteWeather {
  destination: string
  note: string
  lastSynced: string | null
}

export interface RouteInternalLinks {
  related: Array<{
    slug: string
    label: string
    type: 'reverse' | 'similar' | 'extended'
  }>
  operators: string[]
  terminals: string[]
  destinations: string[]
}

export interface RouteMedia {
  heroImage: string | null
  gallery: string[]
}

export interface RouteSchemaOrg {
  BusTrip: {
    departureTime: string
    arrivalTime: string
    departureBusStop: string
    arrivalBusStop: string
    provider: string[]
  }
  FAQPage: boolean
}

export interface RouteSynthesis {
  status: 'pending' | 'processing' | 'complete'
  contentSources: string[]
  lastProcessed: string | null
  needsReview: boolean
  notes: string
}

// Shared data types

export interface Operator {
  slug: string
  name: string
  shortName: string
  logo: string
  founded?: number
  headquarters?: string
  website?: string
  description: string
  rating: {
    score: number
    source: string
    reviewCount: number
  }
  amenities: Record<string, string[]>
  busClasses: string[]
  uniqueFeatures?: string[]
  regions: string[]
  bookingUrl: string
  contactPhone?: string
  socialMedia?: Record<string, string>
  seoPage: string
}

export interface Terminal {
  slug: string
  name: string
  shortName: string
  city: string
  region: string
  address: string
  coordinates: {
    lat: number
    lon: number
  }
  description?: string
  operatorTerminals?: Array<{
    operator: string
    specificAddress: string
    contact?: string
  }>
  nearbyLandmarks?: string[]
  transitAccess?: {
    mrt?: string | null
    lrt?: string | null
    grab?: boolean
    p2pBus?: string
  }
  facilities: string[]
  seoPage: string
}

export interface City {
  slug: string
  name: string
  displayName: string
  alternateNames: string[]
  region: string
  province: string | null
  coordinates: {
    lat: number
    lon: number
  }
  timezone: string
  weatherSlug: string
  description: string
  elevation?: string
  climate?: {
    type: string
    avgTempHigh: number
    avgTempLow: number
    note: string
  }
  isOriginHub?: boolean
  isDestinationHub?: boolean
  majorTerminals?: string[]
  popularRoutes?: string[]
  attractions?: string[]
  bestTimeToVisit?: string
  seoPage: string
  image: string
}

export interface BusClass {
  slug: string
  name: string
  tier: number
  description: string
  typicalPriceMultiplier: number
  seatingConfig: string
  seatsPerRow?: number
  typicalCapacity: number | string
  reclineAngle?: string
  amenities: Array<{
    id: string
    name: string
    icon: string
  }>
  suitableFor: string[]
}
