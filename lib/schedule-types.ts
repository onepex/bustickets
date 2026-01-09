export type TransportType = 'bus' | 'ferry' | 'van' | 'taxi'

export type BusClass = 
  | 'regular' 
  | 'deluxe' 
  | 'first-class' 
  | 'royal-class' 
  | 'executive'
  | 'sleeper'

export interface Operator {
  id: string
  name: string
  slug: string
  rating?: number
  reviewCount?: number
  logo?: string
}

export interface Terminal {
  id: string
  name: string
  city: string
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Schedule {
  id: string
  operator: {
    id: string
    name: string
    slug: string
  }
  transportType: string
  busClass?: string
  departure: {
    time: string
    terminal: {
      id: string
      name: string
      city: string
    }
  }
  arrival: {
    time: string
    terminal: {
      id: string
      name: string
      city: string
    }
  }
  duration: number
  price: {
    amount: number
    currency: string
  }
  frequency: string
  bookingUrl: string
}

export interface SubRoute {
  subRoute: string
  fromCity: string
  toCity: string
  transportType: string
  bookingUrl: string
  priceMin: number
  priceMax: number
  duration: string
  classes: {
    name: string
    departures: string[]
  }[]
}

export interface RouteSchedule {
  from: string
  to: string
  slug: string
  subRoutes?: SubRoute[]
  schedules: Schedule[]
  lastUpdated: string
}
