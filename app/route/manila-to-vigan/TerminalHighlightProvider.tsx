'use client'

import { useState, useMemo } from 'react'
import { MapPin } from 'lucide-react'
import { TerminalLocationMap } from '@/components/maps/TerminalLocationMap'
import { TerminalSection } from '@/components/TerminalSection'
import { OperatorCard } from '@/components/OperatorCard'
import { TerminalData } from '@/lib/terminal-types'

interface TerminalHighlightProviderProps {
  partasCubao: TerminalData | null
  farinasSampaloc: TerminalData | null
  viganTerminal: TerminalData | null
}

// Memoized terminal data for maps (prevents re-render)
const MANILA_TERMINALS = [
  { name: 'Partas Cubao Terminal', coordinates: [121.0523, 14.6207] as [number, number], markerLetter: 'P', markerColor: '#29166F' },
  { name: 'Farinas Sampaloc Terminal', coordinates: [120.9845, 14.6117] as [number, number], markerLetter: 'F', markerColor: '#035A30' },
]

const VIGAN_TERMINALS = [
  { name: 'Vigan City Bus Terminal', coordinates: [120.3869, 17.5747] as [number, number], markerLetter: 'V', markerColor: '#DC2626' },
]

export function TerminalHighlightProvider({
  partasCubao,
  farinasSampaloc,
  viganTerminal,
}: TerminalHighlightProviderProps) {
  const [highlightedTerminal, setHighlightedTerminal] = useState<string | null>(null)

  const handleTerminalSelect = (terminalName: string) => {
    setHighlightedTerminal(prev => prev === terminalName ? null : terminalName)
  }

  return (
    <>
      {/* Bus Operators */}
      <section className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Operators</h2>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <OperatorCard
            name="Partas"
            rating={4.4}
            variant="detailed"
            description="Premium Ilocos operator with the most departures to Vigan. Known for comfortable seats and punctual service."
            travelTime="7-9 hours"
            frequency="10+ daily"
            busClasses={['Luxury', 'Super Deluxe', 'Deluxe']}
            priceRange="₱950 - ₱1,350"
            departsFrom={{ 
              letter: 'P', 
              color: '#29166F', 
              name: 'Partas Cubao Terminal',
            }}
            arrivesAt={{ 
              letter: 'V', 
              color: '#DC2626', 
              name: 'Vigan City Bus Terminal',
            }}
            highlightedTerminal={highlightedTerminal}
            onTerminalClick={handleTerminalSelect}
          />
          <OperatorCard
            name="Farinas"
            rating={4.0}
            variant="detailed"
            description="Ilocos-based family operator with affordable fares. Great budget option with friendly crew."
            travelTime="9-11 hours"
            frequency="4 daily"
            busClasses={['Deluxe', 'Regular']}
            priceRange="₱900 - ₱950"
            departsFrom={{ 
              letter: 'F', 
              color: '#035A30', 
              name: 'Farinas Sampaloc Terminal',
            }}
            arrivesAt={{ 
              letter: 'V', 
              color: '#DC2626', 
              name: 'Vigan City Bus Terminal',
            }}
            highlightedTerminal={highlightedTerminal}
            onTerminalClick={handleTerminalSelect}
          />
        </div>
      </section>

      {/* Departure Terminals */}
      <section id="terminals" className="mb-12 scroll-mt-20">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-amber-600" />
          Departure & Arrival Terminals
        </h2>

        {/* Maps */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Departure (Manila)</h3>
            <TerminalLocationMap
              terminals={MANILA_TERMINALS}
              title="Manila Terminals"
              zoom={11}
              height="220px"
              onMarkerClick={handleTerminalSelect}
              highlightedTerminal={highlightedTerminal}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Arrival (Vigan)</h3>
            <TerminalLocationMap
              terminals={VIGAN_TERMINALS}
              title="Vigan Terminal"
              zoom={14}
              height="220px"
              onMarkerClick={handleTerminalSelect}
              highlightedTerminal={highlightedTerminal}
            />
          </div>
        </div>

        {/* Terminal explainer */}
        <div className="mb-10 space-y-6 text-gray-600 leading-relaxed">
          <p>
            <button 
              onClick={() => handleTerminalSelect('Partas Cubao Terminal')}
              className={`inline-flex items-center gap-2 font-semibold transition-all ${highlightedTerminal === 'Partas Cubao Terminal' ? 'text-amber-600 underline decoration-amber-400 decoration-2 underline-offset-2' : 'text-gray-900 hover:text-amber-600'}`}
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shadow" style={{ backgroundColor: '#29166F' }}>P</span>
              Partas Cubao Terminal
            </button>
            {' '}is the go-to choice for most travelers. Located along Aurora Boulevard in Quezon City, it's easily accessible via MRT (Cubao station) and offers the most departures—6 daily trips including late-night options up to 11:55 PM. If you're coming from anywhere in Metro Manila's east side (Makati, BGC, Ortigas, Pasig), Cubao cuts your travel time significantly. The terminal has a waiting lounge, nearby food options, and secure parking if you're being dropped off.
          </p>
          <p>
            <button 
              onClick={() => handleTerminalSelect('Farinas Sampaloc Terminal')}
              className={`inline-flex items-center gap-2 font-semibold transition-all ${highlightedTerminal === 'Farinas Sampaloc Terminal' ? 'text-amber-600 underline decoration-amber-400 decoration-2 underline-offset-2' : 'text-gray-900 hover:text-amber-600'}`}
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shadow" style={{ backgroundColor: '#035A30' }}>F</span>
              Farinas Sampaloc Terminal
            </button>
            {' '}serves the university belt and Manila's western areas. Located on Lacson Avenue near España, it's ideal if you're coming from Manila proper, Quezon City's west side, or areas along LRT-2. Farinas offers 4 daily departures with the earliest at 7:00 AM—perfect if you want to arrive in Vigan by late afternoon and still catch the sunset at Calle Crisologo.
          </p>
          <p>
            <button 
              onClick={() => handleTerminalSelect('Vigan City Bus Terminal')}
              className={`inline-flex items-center gap-2 font-semibold transition-all ${highlightedTerminal === 'Vigan City Bus Terminal' ? 'text-amber-600 underline decoration-amber-400 decoration-2 underline-offset-2' : 'text-gray-900 hover:text-amber-600'}`}
            >
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shadow" style={{ backgroundColor: '#DC2626' }}>V</span>
              Vigan City Bus Terminal
            </button>
            {' '}is where all buses arrive. It's located about 1.5 km from the heritage zone. Tricycles wait outside (₱50-70 to Calle Crisologo) or you can walk in 20 minutes if traveling light. Pro tip: some hotels offer free pickup if you book directly—just message them your bus schedule.
          </p>
          <p className="text-[#046cbb] bg-blue-50 px-4 py-3 rounded-lg">
            <strong>💡 Our recommendation:</strong> Book from Partas Cubao if you want schedule flexibility, especially for overnight trips (the 9:55 PM and 11:55 PM departures arrive at dawn). Choose Farinas Sampaloc for early morning departures or if you're staying near UST/Manila area.
          </p>
        </div>

        {/* Terminal Cards */}
        <TerminalSection
          departureCards={[
            {
              terminal: partasCubao,
              departures: '6 daily to Vigan',
              firstBus: '9:00 AM',
              lastBus: '11:55 PM',
              markerLetter: 'P',
              markerColor: '#29166F',
              fallbackName: 'Partas Cubao Terminal',
              fallbackAddress: 'Aurora Blvd, Cubao, Quezon City'
            },
            {
              terminal: farinasSampaloc,
              departures: '4 daily to Vigan',
              firstBus: '7:00 AM',
              lastBus: '9:00 PM',
              markerLetter: 'F',
              markerColor: '#035A30',
              fallbackName: 'Farinas Sampaloc Terminal',
              fallbackAddress: '1238 Lacson Ave, Sampaloc, Manila'
            }
          ]}
          arrivalCards={[
            {
              terminal: viganTerminal,
              markerLetter: 'V',
              markerColor: '#DC2626',
              fallbackName: 'Vigan City Bus Terminal',
              fallbackAddress: 'Vigan City, Ilocos Sur'
            }
          ]}
          highlightedTerminal={highlightedTerminal}
          onTerminalSelect={handleTerminalSelect}
        />
      </section>
    </>
  )
}
