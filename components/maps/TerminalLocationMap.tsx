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
  markerLetter?: string
  markerColor?: string
}

interface TerminalLocationMapProps {
  terminals: Terminal[]
  title?: string
  zoom?: number
  height?: string
  onMarkerClick?: (terminalName: string) => void
  highlightedTerminal?: string | null
}

export function TerminalLocationMap({
  terminals,
  title,
  zoom = 13,
  height = '320px',
  onMarkerClick,
  highlightedTerminal,
}: TerminalLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Map<string, HTMLDivElement>>(new Map())

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
        const letter = terminal.markerLetter || terminal.name.charAt(0) || (index + 1).toString()
        const color = terminal.markerColor || '#F59E0B'
        
        const el = document.createElement('div')
        el.className = 'terminal-marker'
        el.dataset.terminalName = terminal.name
        el.innerHTML = `
          <div class="relative group cursor-pointer">
            <div class="marker-ring absolute -inset-1 rounded-full transition-all opacity-0" style="background-color: rgba(251, 191, 36, 0.4);"></div>
            <div class="marker-circle w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white transform transition-all group-hover:scale-110 relative" style="background-color: ${color}">
              <span class="text-white font-bold text-lg">${letter}</span>
            </div>
            <div class="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <div class="bg-white rounded-lg shadow-xl p-3 min-w-[180px] border border-gray-100">
                <div class="font-semibold text-gray-900 text-sm">${terminal.name}</div>
                ${terminal.operator ? `<div class="text-xs font-medium mt-0.5" style="color: ${color}">${terminal.operator}</div>` : ''}
                ${terminal.address ? `<div class="text-xs text-gray-500 mt-1">${terminal.address}</div>` : ''}
              </div>
              <div class="w-3 h-3 bg-white border-l border-t border-gray-100 transform rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        `

        el.addEventListener('click', () => {
          onMarkerClick?.(terminal.name)
        })

        markersRef.current.set(terminal.name, el)

        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat(terminal.coordinates)
          .addTo(map.current!)
      })

      if (terminals.length > 1) {
        const bounds = new mapboxgl.LngLatBounds()
        terminals.forEach(t => bounds.extend(t.coordinates))
        map.current.fitBounds(bounds, { padding: 80, duration: 0 })
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [terminals, zoom])

  useEffect(() => {
    markersRef.current.forEach((el, name) => {
      const circle = el.querySelector('.marker-circle') as HTMLElement
      const ring = el.querySelector('.marker-ring') as HTMLElement
      if (circle && ring) {
        if (name === highlightedTerminal) {
          circle.style.transform = 'scale(1.2)'
          ring.style.opacity = '1'
          ring.style.transform = 'scale(1.5)'
        } else {
          circle.style.transform = ''
          ring.style.opacity = '0'
          ring.style.transform = ''
        }
      }
    })
  }, [highlightedTerminal])

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
