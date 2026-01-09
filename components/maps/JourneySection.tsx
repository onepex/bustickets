'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin, Bus } from 'lucide-react'

mapboxgl.accessToken = 'pk.eyJ1Ijoib25lcGV4IiwiYSI6ImNtazZrcmE0ZTA4c2EzZHFyNjltemZjam0ifQ.mmbP9P7LG52ZUiEFp6JYTA'

interface Stop {
  name: string
  coordinates: [number, number]
  description: string
  isDestination?: boolean
}

interface JourneySectionProps {
  origin: string
  destination: string
  duration: string
  distance: string
  stops: Stop[]
  tip?: string
}

export function JourneySection({
  origin,
  destination,
  duration,
  distance,
  stops,
  tip,
}: JourneySectionProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const busMarker = useRef<mapboxgl.Marker | null>(null)
  const animationRef = useRef<number | null>(null)
  const [hoveredStop, setHoveredStop] = useState<number | null>(null)
  const [mapReady, setMapReady] = useState(false)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [120.5, 15.5],
      zoom: 6.5,
      pitch: 20,
      interactive: true,
      attributionControl: false,
    })

    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    map.current.on('load', async () => {
      if (!map.current) return
      setMapReady(true)

      // Fetch actual road route from Mapbox Directions API (simplified for smooth animation)
      const coordinates = stops.map(s => s.coordinates.join(',')).join(';')
      let routeGeometry: [number, number][] = stops.map(s => s.coordinates) // fallback to straight line
      
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&overview=simplified&access_token=${mapboxgl.accessToken}`
        )
        const data = await response.json()
        if (data.routes && data.routes[0]?.geometry?.coordinates) {
          // Downsample to ~100 points for smooth animation
          const fullRoute = data.routes[0].geometry.coordinates as [number, number][]
          const targetPoints = 100
          if (fullRoute.length > targetPoints) {
            const step = Math.floor(fullRoute.length / targetPoints)
            routeGeometry = fullRoute.filter((_, i) => i % step === 0 || i === fullRoute.length - 1)
          } else {
            routeGeometry = fullRoute
          }
        }
      } catch (error) {
        console.warn('Failed to fetch route, using straight line:', error)
      }

      // Route background
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: routeGeometry },
        },
      })

      map.current.addLayer({
        id: 'route-bg',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#f59e0b', 'line-width': 6, 'line-opacity': 0.4 },
      })

      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#f59e0b', 'line-width': 3 },
      })

      // Add stop markers (clickable)
      stops.forEach((stop, index) => {
        const el = document.createElement('div')
        el.className = 'stop-marker cursor-pointer'
        el.style.cursor = 'pointer'
        
        if (stop.isDestination) {
          el.innerHTML = `
            <div class="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `
        } else {
          el.innerHTML = `
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <span class="text-[#046cbb] font-bold text-sm">${index + 1}</span>
            </div>
          `
        }
        
        // Click handler to highlight menu
        el.addEventListener('click', () => {
          setHoveredStop(index)
        })
        
        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(stop.coordinates)
          .addTo(map.current!)
      })

      // Create bus marker (visible, animating by default)
      const busEl = document.createElement('div')
      busEl.className = 'bus-marker'
      busEl.innerHTML = `
        <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl border-2 border-white transform -rotate-12">
          <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
          </svg>
        </div>
      `
      busMarker.current = new mapboxgl.Marker({ element: busEl, anchor: 'center' })
        .setLngLat(stops[0].coordinates)
        .addTo(map.current)
      
      // Start bus animation along route
      let step = 0
      const numSteps = 800
      let lastTime = 0
      const frameInterval = 50
      
      const animateBus = (timestamp: number) => {
        if (!map.current || !busMarker.current) return
        
        if (timestamp - lastTime < frameInterval) {
          animationRef.current = requestAnimationFrame(animateBus)
          return
        }
        lastTime = timestamp
        
        step++
        if (step >= numSteps) {
          // Stop at destination
          busMarker.current.setLngLat(routeGeometry[routeGeometry.length - 1] as [number, number])
          return
        }

        const progress = step / numSteps
        const currentCoords = interpolateRoute(routeGeometry, progress)
        busMarker.current.setLngLat(currentCoords as [number, number])

        animationRef.current = requestAnimationFrame(animateBus)
      }

      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animateBus)
      }, 1500)

      // Fit bounds immediately (no animation on load)
      const bounds = new mapboxgl.LngLatBounds()
      routeGeometry.forEach((coord: [number, number]) => bounds.extend(coord))
      map.current.fitBounds(bounds, { padding: 60, duration: 0 })
    })

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [stops])

  // Handle hover/click - pause animation and jump bus to stop
  useEffect(() => {
    if (!busMarker.current || !mapReady) return
    
    if (hoveredStop !== null) {
      // Pause animation, jump bus to selected stop
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      busMarker.current.setLngLat(stops[hoveredStop].coordinates)
      
      // Pan map to show the stop
      map.current?.flyTo({
        center: stops[hoveredStop].coordinates,
        zoom: 9,
        duration: 600,
      })
    } else {
      // Reset view (animation continues from useEffect in map load)
      if (map.current) {
        const bounds = new mapboxgl.LngLatBounds()
        stops.forEach(s => bounds.extend(s.coordinates))
        map.current.fitBounds(bounds, { padding: 60, duration: 600 })
      }
    }
  }, [hoveredStop, mapReady, stops])

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <div ref={mapContainer} className="w-full h-[400px]" />
          
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-[200px]">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Your Journey</div>
            <div className="text-lg font-bold text-gray-900">{origin} → {destination}</div>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#046cbb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#046cbb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {distance}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
          <h3 className="font-semibold text-gray-900 mb-4">Journey Highlights</h3>
          <div className="space-y-3">
            {stops.map((stop, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  hoveredStop === index 
                    ? 'bg-blue-50 scale-[1.02]' 
                    : 'hover:bg-gray-50'
                }`}
                onMouseEnter={() => setHoveredStop(index)}
                onMouseLeave={() => setHoveredStop(null)}
              >
                {stop.isDestination ? (
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[#046cbb] font-bold text-sm">{index + 1}</span>
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-900">{stop.name}</div>
                  <div className="text-sm text-gray-500">{stop.description}</div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

function interpolateRoute(coordinates: number[][], progress: number): number[] {
  if (coordinates.length < 2) return coordinates[0]
  
  const totalSegments = coordinates.length - 1
  const segmentProgress = progress * totalSegments
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1)
  const segmentFraction = segmentProgress - segmentIndex
  
  const start = coordinates[segmentIndex]
  const end = coordinates[segmentIndex + 1]
  
  return [
    start[0] + (end[0] - start[0]) * segmentFraction,
    start[1] + (end[1] - start[1]) * segmentFraction,
  ]
}
