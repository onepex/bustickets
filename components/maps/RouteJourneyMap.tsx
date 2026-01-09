'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoib25lcGV4IiwiYSI6ImNtazZrcmE0ZTA4c2EzZHFyNjltemZjam0ifQ.mmbP9P7LG52ZUiEFp6JYTA'

interface Waypoint {
  name: string
  coordinates: [number, number]
  icon?: string
  description?: string
}

interface RouteJourneyMapProps {
  origin: Waypoint
  destination: Waypoint
  waypoints?: Waypoint[]
  duration?: string
  distance?: string
}

export function RouteJourneyMap({
  origin,
  destination,
  waypoints = [],
  duration = '7-11 hours',
  distance = '407 km',
}: RouteJourneyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [120.5, 15.5],
      zoom: 6.5,
      pitch: 20,
      bearing: 0,
      interactive: true,
      attributionControl: false,
    })

    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

    map.current.on('load', () => {
      if (!map.current) return
      setMapLoaded(true)

      const allPoints = [origin, ...waypoints, destination]
      const routeCoordinates = allPoints.map(p => p.coordinates)

      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates,
          },
        },
      })

      map.current.addLayer({
        id: 'route-bg',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f59e0b',
          'line-width': 8,
          'line-opacity': 0.3,
        },
      })

      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f59e0b',
          'line-width': 4,
          'line-opacity': 1,
        },
      })

      map.current.addSource('animated-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [routeCoordinates[0]],
          },
        },
      })

      map.current.addLayer({
        id: 'animated-route-line',
        type: 'line',
        source: 'animated-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ea580c',
          'line-width': 5,
        },
      })

      // Step 1: Origin marker with number
      const originEl = document.createElement('div')
      originEl.className = 'origin-marker'
      originEl.innerHTML = `
        <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span class="text-amber-600 font-bold text-sm">1</span>
        </div>
        <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold text-gray-800">${origin.name}</div>
      `
      new mapboxgl.Marker({ element: originEl, anchor: 'center' })
        .setLngLat(origin.coordinates)
        .addTo(map.current)

      // Waypoints with numbers (2, 3, etc.)
      waypoints.forEach((wp, index) => {
        const wpEl = document.createElement('div')
        wpEl.className = 'waypoint-marker'
        wpEl.innerHTML = `
          <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span class="text-amber-600 font-bold text-sm">${index + 2}</span>
          </div>
          <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold text-gray-800">${wp.name}</div>
        `
        new mapboxgl.Marker({ element: wpEl, anchor: 'center' })
          .setLngLat(wp.coordinates)
          .addTo(map.current!)
      })

      // Destination marker with location icon (teal)
      const destEl = document.createElement('div')
      destEl.className = 'destination-marker'
      destEl.innerHTML = `
        <div class="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold text-gray-800">${destination.name}</div>
      `
      new mapboxgl.Marker({ element: destEl, anchor: 'center' })
        .setLngLat(destination.coordinates)
        .addTo(map.current)

      map.current.addSource('bus-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: routeCoordinates[0],
          },
        },
      })

      const busEl = document.createElement('div')
      busEl.className = 'bus-marker'
      busEl.innerHTML = `
        <div class="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl border-2 border-white transform -rotate-12 animate-pulse">
          <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
          </svg>
        </div>
      `
      const busMarker = new mapboxgl.Marker({ element: busEl, anchor: 'center' })
        .setLngLat(routeCoordinates[0])
        .addTo(map.current)

      let step = 0
      const numSteps = 800
      let lastTime = 0
      const frameInterval = 50
      
      const animateBus = (timestamp: number) => {
        if (!map.current) return
        
        if (timestamp - lastTime < frameInterval) {
          animationRef.current = requestAnimationFrame(animateBus)
          return
        }
        lastTime = timestamp
        
        step++
        if (step > numSteps) step = 0

        const progress = step / numSteps

        const currentCoords = interpolateRoute(routeCoordinates, progress)
        const animatedCoords = getRouteUpToProgress(routeCoordinates, progress)

        busMarker.setLngLat(currentCoords as [number, number])
        
        const source = map.current.getSource('animated-route') as mapboxgl.GeoJSONSource
        if (source) {
          source.setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: animatedCoords,
            },
          })
        }

        animationRef.current = requestAnimationFrame(animateBus)
      }

      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animateBus)
      }, 1500)

      const bounds = new mapboxgl.LngLatBounds()
      routeCoordinates.forEach(coord => bounds.extend(coord as [number, number]))
      map.current.fitBounds(bounds, { padding: 60, duration: 2000 })
    })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [origin, destination, waypoints])

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <div ref={mapContainer} className="w-full h-[400px]" />
      
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-[200px]">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Your Journey</div>
        <div className="text-lg font-bold text-gray-900">{origin.name} → {destination.name}</div>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {distance}
          </span>
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

function getRouteUpToProgress(coordinates: number[][], progress: number): number[][] {
  if (coordinates.length < 2) return coordinates
  
  const totalSegments = coordinates.length - 1
  const segmentProgress = progress * totalSegments
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1)
  const segmentFraction = segmentProgress - segmentIndex
  
  const result = coordinates.slice(0, segmentIndex + 1)
  
  if (segmentFraction > 0 && segmentIndex < totalSegments) {
    const start = coordinates[segmentIndex]
    const end = coordinates[segmentIndex + 1]
    result.push([
      start[0] + (end[0] - start[0]) * segmentFraction,
      start[1] + (end[1] - start[1]) * segmentFraction,
    ])
  }
  
  return result
}
