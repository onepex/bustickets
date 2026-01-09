export interface WeatherDay {
  date: string
  tempMax: number
  tempMin: number
  weatherCode: number
  weatherLabel: string
  weatherIcon: string
  precipitation: number
  precipitationProbability: number
  windSpeed: number
  uvIndex: number
}

export interface CityWeather {
  city: string
  slug: string
  lat: number
  lon: number
  timezone: string
  lastUpdated: string
  forecast: WeatherDay[]
}
