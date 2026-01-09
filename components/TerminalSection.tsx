'use client'

import { TerminalCard } from '@/components/TerminalCard'
import { TerminalData } from '@/lib/terminal-types'

interface TerminalSectionProps {
  departureCards: {
    terminal: TerminalData | null
    departures?: string
    firstBus?: string
    lastBus?: string
    markerLetter: string
    markerColor: string
    fallbackName: string
    fallbackAddress: string
  }[]
  arrivalCards: {
    terminal: TerminalData | null
    markerLetter: string
    markerColor: string
    fallbackName: string
    fallbackAddress: string
  }[]
  highlightedTerminal?: string | null
  onTerminalSelect?: (terminalName: string) => void
}

export function TerminalSection({
  departureCards,
  arrivalCards,
  highlightedTerminal,
  onTerminalSelect,
}: TerminalSectionProps) {
  const handleSelect = (terminalName: string) => {
    onTerminalSelect?.(terminalName)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Departure Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Departure Terminals</h3>
        {departureCards.map((card, i) => (
          <div key={i} id={`terminal-${card.terminal?.name.replace(/\s+/g, '-').toLowerCase() || card.fallbackName.replace(/\s+/g, '-').toLowerCase()}`}>
            {card.terminal ? (
              <TerminalCard 
                terminal={card.terminal} 
                departures={card.departures}
                firstBus={card.firstBus}
                lastBus={card.lastBus}
                highlight={highlightedTerminal === card.terminal.name}
                markerLetter={card.markerLetter}
                markerColor={card.markerColor}
                onClick={() => handleSelect(card.terminal!.name)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h4 className="font-semibold text-gray-900">{card.fallbackName}</h4>
                <p className="text-sm text-gray-500">{card.fallbackAddress}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Arrival Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Arrival Terminal</h3>
        {arrivalCards.map((card, i) => (
          <div key={i} id={`terminal-${card.terminal?.name.replace(/\s+/g, '-').toLowerCase() || card.fallbackName.replace(/\s+/g, '-').toLowerCase()}`}>
            {card.terminal ? (
              <TerminalCard 
                terminal={card.terminal}
                highlight={highlightedTerminal === card.terminal.name}
                markerLetter={card.markerLetter}
                markerColor={card.markerColor}
                onClick={() => handleSelect(card.terminal!.name)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h4 className="font-semibold text-gray-900">{card.fallbackName}</h4>
                <p className="text-sm text-gray-500">{card.fallbackAddress}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
