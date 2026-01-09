'use client'

import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react'

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
  forecast: WeatherDay[]
  lastUpdated: string
}

interface WeatherForecastProps {
  weather: CityWeather
  showDays?: number
}

function formatDate(dateStr: string): { label: string; date: string } {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const isToday = date.getTime() === today.getTime()
  const isTomorrow = date.getTime() === tomorrow.getTime()
  
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const dayNum = date.getDate().toString()
  
  if (isToday) return { label: 'Today', date: dayNum }
  if (isTomorrow) return { label: 'Tmrw', date: dayNum }
  
  return { label: weekday, date: dayNum }
}

function getWeatherIcon(code: number): React.ReactNode {
  if (code === 0 || code === 1) return <Sun className="w-6 h-6 text-yellow-400" />
  if (code === 2 || code === 3) return <Cloud className="w-6 h-6 text-gray-400" />
  if (code >= 51 && code <= 99) return <CloudRain className="w-6 h-6 text-blue-400" />
  return <Cloud className="w-6 h-6 text-gray-400" />
}

function getWeatherBg(code: number): string {
  if (code === 0 || code === 1) return 'bg-gradient-to-br from-yellow-50 to-orange-50'
  if (code === 2 || code === 3) return 'bg-gradient-to-br from-gray-50 to-slate-100'
  if (code >= 51 && code <= 99) return 'bg-gradient-to-br from-blue-50 to-indigo-50'
  return 'bg-gray-50'
}

export default function WeatherForecast({ weather, showDays = 5 }: WeatherForecastProps) {
  const forecast = weather.forecast.slice(0, showDays)
  
  if (forecast.length === 0) {
    return null
  }

  const today = forecast[0]

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header with current weather */}
      <div className={`px-6 py-5 ${getWeatherBg(today.weatherCode)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Weather in {weather.city}</h3>
            <p className="text-sm text-gray-600 mt-1">{today.weatherLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{today.weatherIcon}</span>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">{today.tempMax}°</div>
              <div className="text-sm text-gray-500">{today.tempMin}°</div>
            </div>
          </div>
        </div>
        
        {/* Today's details */}
        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span>{today.precipitationProbability}% rain</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="w-4 h-4" />
            <span>{today.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun className="w-4 h-4" />
            <span>UV {today.uvIndex}</span>
          </div>
        </div>
      </div>

      {/* 5-day forecast */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, i) => {
            const { label, date } = formatDate(day.date)
            return (
              <div key={day.date} className={`text-center py-3 px-2 rounded-lg ${i === 0 ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
                <div className="text-sm font-semibold text-gray-700">{date}</div>
                <div className="text-2xl my-2">{day.weatherIcon}</div>
                <div className="text-sm font-semibold text-gray-900">{day.tempMax}°</div>
                <div className="text-xs text-gray-400">{day.tempMin}°</div>
                {day.precipitationProbability > 20 && (
                  <div className="text-xs text-blue-500 mt-1 flex items-center justify-center gap-0.5">
                    <Droplets className="w-3 h-3" />
                    {day.precipitationProbability}%
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Weather data updated daily. Pack accordingly for your trip!
        </p>
      </div>
    </div>
  )
}
