'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1Ijoib25lcGV4IiwiYSI6ImNtazZrcmE0ZTA4c2EzZHFyNjltemZjam0ifQ.mmbP9P7LG52ZUiEFp6JYTA'

interface Terminal {
  name: string
  coordinates: [number, number]
  operator?: string
  address?: string
}

interface TerminalLocationMapProps {
  terminals: Terminal[]
  title?: string
  zoom?: number
  height?: string
}

export function TerminalLocationMap({
  terminals,
  title,
  zoom = 13,
  height = '250px',
}: TerminalLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current || terminals.length === 0) return

    const center = terminals.length === 1 
      ? terminals[0].coordinates 
      : [
          terminals.reduce((sum, t) => sum + t.coordinates[0], 0) / terminals.length,
          terminals.reduce((sum, t) => sum + t.coordinates[1], 0) / terminals.length,
        ] as [number, number]

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom: terminals.length === 1 ? zoom : zoom - 1,
      interactive: true,
      attributionControl: false,
    })

    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

    map.current.on('load', () => {
      if (!map.current) return

      terminals.forEach((terminal, index) => {
        const el = document.createElement('div')
        el.className = 'terminal-marker'
        el.innerHTML = `
          <div class="relative group cursor-pointer">
            <div class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-3 border-white transform transition-transform group-hover:scale-110">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
              </svg>
            </div>
            <div class="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div class="bg-white rounded-lg shadow-xl p-3 min-w-[180px] border border-gray-100">
                <div class="font-semibold text-gray-900 text-sm">${terminal.name}</div>
                ${terminal.operator ? `<div class="text-xs text-amber-600 font-medium mt-0.5">${terminal.operator}</div>` : ''}
                ${terminal.address ? `<div class="text-xs text-gray-500 mt-1">${terminal.address}</div>` : ''}
              </div>
              <div class="w-3 h-3 bg-white border-l border-t border-gray-100 transform rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        `

        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(terminal.coordinates)
          .addTo(map.current!)
      })

      if (terminals.length > 1) {
        const bounds = new mapboxgl.LngLatBounds()
        terminals.forEach(t => bounds.extend(t.coordinates))
        map.current.fitBounds(bounds, { padding: 50, duration: 1000 })
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [terminals, zoom])

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-gray-200">
      {title && (
        <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-md px-3 py-1.5">
          <span className="text-sm font-semibold text-gray-800">{title}</span>
        </div>
      )}
      <div ref={mapContainer} style={{ height }} className="w-full" />
    </div>
  )
}
