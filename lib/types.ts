export interface City {
  id: string
  name: string
  slug: string
  country: string
  type: string
  popular?: boolean
  source?: string
}

export interface Route {
  from: string
  to: string
}

export interface CitiesData {
  version: string
  generated: string
  country: string
  cities: City[]
  routes: Route[]
  stations: Station[]
}

export interface Station {
  id: string
  name: string
  slug: string
  type: string
}

export interface SearchState {
  from: City | null
  to: City | null
  date: Date
  passengers: number
}
