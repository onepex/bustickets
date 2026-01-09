/**
 * Weather Sync Script
 * Fetches weather forecasts for all destination cities using Open-Meteo (free, no API key)
 * Stores in local JSON cache - components should NEVER call API directly
 * 
 * Run: npx ts-node scripts/sync-weather.ts
 * Schedule: Once per day via cron
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WEATHER_DIR = path.join(__dirname, '../lib/weather')
const CITIES_FILE = path.join(__dirname, '../lib/cities-weather.json')

// Philippine cities with coordinates
// This will be expanded as we add more routes
interface CityWeatherConfig {
  slug: string
  name: string
  lat: number
  lon: number
}

const CITIES: CityWeatherConfig[] = [
  // Major destinations
  { slug: 'baguio', name: 'Baguio', lat: 16.4023, lon: 120.5960 },
  { slug: 'manila', name: 'Manila', lat: 14.5995, lon: 120.9842 },
  { slug: 'cebu', name: 'Cebu', lat: 10.3157, lon: 123.8854 },
  { slug: 'davao', name: 'Davao', lat: 7.1907, lon: 125.4553 },
  { slug: 'bohol', name: 'Bohol', lat: 9.8500, lon: 124.0000 },
  { slug: 'boracay', name: 'Boracay', lat: 11.9674, lon: 121.9248 },
  { slug: 'palawan', name: 'Palawan', lat: 9.8349, lon: 118.7384 },
  { slug: 'el-nido', name: 'El Nido', lat: 11.1785, lon: 119.3929 },
  { slug: 'coron', name: 'Coron', lat: 11.9986, lon: 120.2043 },
  { slug: 'puerto-galera', name: 'Puerto Galera', lat: 13.5000, lon: 120.9500 },
  { slug: 'vigan', name: 'Vigan', lat: 17.5747, lon: 120.3869 },
  { slug: 'sagada', name: 'Sagada', lat: 17.0833, lon: 120.9000 },
  { slug: 'banaue', name: 'Banaue', lat: 16.9167, lon: 121.0500 },
  { slug: 'iloilo', name: 'Iloilo', lat: 10.7202, lon: 122.5621 },
  { slug: 'bacolod', name: 'Bacolod', lat: 10.6407, lon: 122.9688 },
  { slug: 'dumaguete', name: 'Dumaguete', lat: 9.3068, lon: 123.3054 },
  { slug: 'tagaytay', name: 'Tagaytay', lat: 14.1153, lon: 120.9621 },
  { slug: 'batangas', name: 'Batangas', lat: 13.7565, lon: 121.0583 },
  { slug: 'calapan', name: 'Calapan', lat: 13.4115, lon: 121.1803 },
  { slug: 'caticlan', name: 'Caticlan', lat: 11.9333, lon: 121.9500 },
  { slug: 'cagayan-de-oro', name: 'Cagayan de Oro', lat: 8.4542, lon: 124.6319 },
  { slug: 'zamboanga', name: 'Zamboanga', lat: 6.9214, lon: 122.0790 },
  { slug: 'general-santos', name: 'General Santos', lat: 6.1108, lon: 125.1716 },
  { slug: 'tacloban', name: 'Tacloban', lat: 11.2543, lon: 124.9615 },
  { slug: 'legazpi', name: 'Legazpi', lat: 13.1391, lon: 123.7438 },
  { slug: 'naga', name: 'Naga', lat: 13.6192, lon: 123.1814 },
  { slug: 'puerto-princesa', name: 'Puerto Princesa', lat: 9.7392, lon: 118.7353 },
]

interface WeatherDay {
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

interface CityWeather {
  city: string
  slug: string
  lat: number
  lon: number
  timezone: string
  lastUpdated: string
  forecast: WeatherDay[]
}

// WMO Weather interpretation codes
const WEATHER_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Depositing rime fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌧️' },
  53: { label: 'Moderate drizzle', icon: '🌧️' },
  55: { label: 'Dense drizzle', icon: '🌧️' },
  61: { label: 'Slight rain', icon: '🌧️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  80: { label: 'Slight showers', icon: '🌦️' },
  81: { label: 'Moderate showers', icon: '🌦️' },
  82: { label: 'Violent showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
  96: { label: 'Thunderstorm with hail', icon: '⛈️' },
  99: { label: 'Thunderstorm with heavy hail', icon: '⛈️' },
}

function getWeatherInfo(code: number): { label: string; icon: string } {
  return WEATHER_CODES[code] || { label: 'Unknown', icon: '❓' }
}

async function fetchWeather(city: CityWeatherConfig): Promise<CityWeather | null> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max&timezone=Asia/Manila&forecast_days=7`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`  ✗ Failed to fetch weather for ${city.name}: ${response.status}`)
      return null
    }
    
    const data = await response.json()
    const daily = data.daily
    
    const forecast: WeatherDay[] = []
    for (let i = 0; i < daily.time.length; i++) {
      const weatherCode = daily.weather_code[i]
      const weatherInfo = getWeatherInfo(weatherCode)
      
      forecast.push({
        date: daily.time[i],
        tempMax: Math.round(daily.temperature_2m_max[i]),
        tempMin: Math.round(daily.temperature_2m_min[i]),
        weatherCode,
        weatherLabel: weatherInfo.label,
        weatherIcon: weatherInfo.icon,
        precipitation: daily.precipitation_sum[i] || 0,
        precipitationProbability: daily.precipitation_probability_max[i] || 0,
        windSpeed: Math.round(daily.wind_speed_10m_max[i]),
        uvIndex: Math.round(daily.uv_index_max[i]),
      })
    }
    
    return {
      city: city.name,
      slug: city.slug,
      lat: city.lat,
      lon: city.lon,
      timezone: data.timezone,
      lastUpdated: new Date().toISOString(),
      forecast,
    }
  } catch (err) {
    console.error(`  ✗ Error fetching weather for ${city.name}:`, err)
    return null
  }
}

async function syncAllWeather() {
  console.log('=' .repeat(60))
  console.log('Weather Sync - Open-Meteo → Local Cache')
  console.log('=' .repeat(60))
  console.log(`Time: ${new Date().toISOString()}`)
  console.log(`Cities: ${CITIES.length}`)
  console.log()
  
  // Ensure weather directory exists
  if (!fs.existsSync(WEATHER_DIR)) {
    fs.mkdirSync(WEATHER_DIR, { recursive: true })
  }
  
  let success = 0
  let failed = 0
  
  for (const city of CITIES) {
    process.stdout.write(`Fetching: ${city.name}... `)
    
    const weather = await fetchWeather(city)
    
    if (weather) {
      const filePath = path.join(WEATHER_DIR, `${city.slug}.json`)
      fs.writeFileSync(filePath, JSON.stringify(weather, null, 2))
      console.log(`✓ Saved`)
      success++
    } else {
      failed++
    }
    
    // Rate limiting - be nice to the free API
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  // Save city index
  const cityIndex = CITIES.map(c => ({ slug: c.slug, name: c.name }))
  fs.writeFileSync(CITIES_FILE, JSON.stringify(cityIndex, null, 2))
  
  console.log()
  console.log('=' .repeat(60))
  console.log(`Sync complete! Success: ${success}, Failed: ${failed}`)
  console.log('=' .repeat(60))
}

// Run
syncAllWeather().catch(console.error)
