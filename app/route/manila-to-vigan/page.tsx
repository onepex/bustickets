import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TerminalCard } from '@/components/TerminalCard'
import { OperatorCard } from '@/components/OperatorCard'
import { RouteJourneyMap, TerminalLocationMap } from '@/components/maps'
import { TerminalData } from '@/lib/terminal-types'
import { kv } from '@vercel/kv'
import Link from 'next/link'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Navigation, Star, Camera, Sun, Droplets } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Manila to Vigan Bus: Partas, Farinas Schedule 2025',
  description: 'Book Manila to Vigan bus tickets online. Partas and Farinas buses to the UNESCO Heritage City. 7-11 hour journey via Ilocos Sur.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
        { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
        { '@type': 'ListItem', position: 3, name: 'Manila to Vigan' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long is the bus ride from Manila to Vigan?',
          acceptedAnswer: { '@type': 'Answer', text: 'Travel time is 7-11 hours depending on bus class. Luxury buses take 7 hours via TPLEX, while Deluxe buses take 9-11 hours with more stops.' },
        },
        {
          '@type': 'Question',
          name: 'Which bus company goes to Vigan?',
          acceptedAnswer: { '@type': 'Answer', text: 'Partas Transportation is the main operator with 10+ daily departures from Cubao and Pasay. Farinas Trans also operates this route.' },
        },
        {
          '@type': 'Question',
          name: 'How much is the bus fare to Vigan?',
          acceptedAnswer: { '@type': 'Answer', text: 'Fares range from ₱950-1,350. Luxury class costs around ₱1,200-1,350, while Deluxe is ₱950-1,000.' },
        },
        {
          '@type': 'Question',
          name: 'Are there overnight buses to Vigan?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes! Night departures at 21:00-23:55 arrive in Vigan early morning (4-8 AM), perfect for maximizing your day.' },
        },
        {
          '@type': 'Question',
          name: 'What can I see in Vigan?',
          acceptedAnswer: { '@type': 'Answer', text: 'Vigan is a UNESCO World Heritage City famous for Calle Crisologo cobblestone streets, Spanish colonial architecture, empanadas, and the Bantay Bell Tower.' },
        },
      ],
    },
    {
      '@type': 'Product',
      name: 'Manila to Vigan Bus Tickets',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.4', reviewCount: '1250', bestRating: '5', worstRating: '1' },
    },
  ],
}

const originCity = { id: '328', name: 'Manila', slug: 'manila', country: 'PH', type: 'city' as const, popular: true }
const destCity = { id: '82750', name: 'Vigan', slug: 'vigan', country: 'PH', type: 'city' as const, popular: true }

async function getTerminalData(slug: string): Promise<TerminalData | null> {
  try {
    const [cached, photos] = await Promise.all([
      kv.get<TerminalData>(`terminal:${slug}`),
      kv.get<string[]>(`terminal-photos:${slug}`),
    ])
    if (cached) {
      return { ...cached, photos: photos || [] }
    }
    return null
  } catch {
    return null
  }
}

export default async function ManilaToViganPage() {
  const [partasCubao, farinasSampaloc, viganTerminal] = await Promise.all([
    getTerminalData('partas-cubao'),
    getTerminalData('farinas-sampaloc'),
    getTerminalData('vigan-bus-terminal'),
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen">
        <HeroBackground destination="vigan">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Manila to Vigan Bus</h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">Direct buses to the UNESCO Heritage City</p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
              From ₱950 · 7-11 hours
            </span>
          </div>
          <SearchWidgetV3 defaultFrom={originCity} defaultTo={destCity} />
        </HeroBackground>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <Breadcrumbs items={[{ label: 'Routes', href: '/routes' }, { label: 'Manila to Vigan' }]} />

          {/* Quick Summary + Weather */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Route Overview</h2>
                <p className="text-gray-600 mb-6">
                  Travel to Vigan, the best-preserved Spanish colonial town in Asia and a UNESCO World Heritage Site. Walk the cobblestone streets of Calle Crisologo, ride a kalesa, and taste authentic Ilocano cuisine.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Travel Time</div>
                    <div className="font-semibold text-gray-900">7-11 hours</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <Wallet className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Fare From</div>
                    <div className="font-semibold text-gray-900">₱950</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <Bus className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Daily Trips</div>
                    <div className="font-semibold text-gray-900">12+</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="font-semibold text-gray-900">~325 km</div>
                  </div>
                </div>
                <a href="#search" className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-xl text-center block transition-colors">
                  Check Available Buses →
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium opacity-90">Vigan City</div>
                      <div className="text-2xl font-bold">5-Day Forecast</div>
                    </div>
                    <Cloud className="w-10 h-10 opacity-90" />
                  </div>
                </div>

                {/* 5-Day Forecast */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Sun className="w-6 h-6 text-amber-500" />
                      <span className="font-medium text-gray-900 w-12">Today</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>10%</span>
                      <Droplets className="w-3 h-3" />
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">31°</span>
                      <span className="text-gray-400 ml-1">24°</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Sun className="w-6 h-6 text-amber-500" />
                      <span className="font-medium text-gray-900 w-12">Fri</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>5%</span>
                      <Droplets className="w-3 h-3" />
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">30°</span>
                      <span className="text-gray-400 ml-1">23°</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-6 h-6 text-gray-400" />
                      <span className="font-medium text-gray-900 w-12">Sat</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>25%</span>
                      <Droplets className="w-3 h-3" />
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">29°</span>
                      <span className="text-gray-400 ml-1">24°</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Cloud className="w-6 h-6 text-gray-400" />
                      <span className="font-medium text-gray-900 w-12">Sun</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>40%</span>
                      <Droplets className="w-3 h-3" />
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">28°</span>
                      <span className="text-gray-400 ml-1">23°</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Sun className="w-6 h-6 text-amber-500" />
                      <span className="font-medium text-gray-900 w-12">Mon</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>15%</span>
                      <Droplets className="w-3 h-3" />
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">30°</span>
                      <span className="text-gray-400 ml-1">24°</span>
                    </div>
                  </div>
                </div>

                {/* Best Time */}
                <div className="px-4 pb-4">
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-amber-800 text-sm font-medium mb-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      Best Time to Visit
                    </div>
                    <p className="text-xs text-amber-700">November–February for cooler weather. January for Vigan Longganisa Festival!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Your Journey - Interactive Map */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-amber-600" />
              Your Journey
            </h2>
            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <RouteJourneyMap
                  origin={{ name: 'Manila', coordinates: [121.0, 14.6] }}
                  destination={{ name: 'Vigan', coordinates: [120.39, 17.57] }}
                  waypoints={[
                    { name: 'Tarlac', coordinates: [120.6, 15.5] },
                    { name: 'La Union', coordinates: [120.32, 16.62] },
                  ]}
                  duration="7-11 hours"
                  distance="407 km"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                  <h3 className="font-semibold text-gray-900 mb-4">Journey Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-amber-600 font-bold text-sm">1</span></div>
                      <div><div className="font-medium text-gray-900">Metro Manila</div><div className="text-sm text-gray-500">Depart from Cubao or Sampaloc</div></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-amber-600 font-bold text-sm">2</span></div>
                      <div><div className="font-medium text-gray-900">TPLEX & SCTEX</div><div className="text-sm text-gray-500">Fast expressway through Central Luzon</div></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-amber-600 font-bold text-sm">3</span></div>
                      <div><div className="font-medium text-gray-900">La Union Coast</div><div className="text-sm text-gray-500">Scenic coastal highway</div></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4 text-white" /></div>
                      <div><div className="font-medium text-gray-900">Vigan City</div><div className="text-sm text-gray-500">UNESCO World Heritage Site</div></div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                    <div className="flex items-center gap-2 text-amber-800 font-medium text-sm mb-1">
                      <Bus className="w-4 h-4" />
                      Pro Tip
                    </div>
                    <p className="text-xs text-amber-700">Take the Luxury class for a direct 7-hour trip. Deluxe buses make more stops but are ₱300 cheaper.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fare Table */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Fares & Classes</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Operator</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Class</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Fare</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/partas-bus" className="text-amber-600 hover:underline font-medium">Partas</Link></td>
                      <td className="px-4 py-3 text-gray-700">Luxury</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱1,200-1,350</td>
                      <td className="px-4 py-3 text-sm text-gray-500">7 hours (fastest)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/partas-bus" className="text-amber-600 hover:underline font-medium">Partas</Link></td>
                      <td className="px-4 py-3 text-gray-700">Super Deluxe W/CR</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱1,000</td>
                      <td className="px-4 py-3 text-sm text-gray-500">7 hours, with restroom</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/partas-bus" className="text-amber-600 hover:underline font-medium">Partas</Link></td>
                      <td className="px-4 py-3 text-gray-700">Deluxe</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱950-980</td>
                      <td className="px-4 py-3 text-sm text-gray-500">9 hours</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><span className="text-amber-600 font-medium">Farinas Trans</span></td>
                      <td className="px-4 py-3 text-gray-700">Regular AC</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱900-950</td>
                      <td className="px-4 py-3 text-sm text-gray-500">9-11 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Bus Operators */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Operators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <OperatorCard
                name="Partas"
                rating={4.4}
                badge="Most Popular"
                description="Premium Ilocos operator. Multiple daily departures with Luxury, Super Deluxe, and Deluxe classes."
                terminals={['Cubao', 'Pasay', 'CR Option']}
                priceRange="₱950 - ₱1,350"
                href="/operator/partas-bus"
              />
              <OperatorCard
                name="Farinas"
                rating={4.0}
                badge="Budget Option"
                description="Ilocos-based operator with affordable fares. Makes more stops along the route."
                terminals={['Sampaloc', 'Cubao']}
                priceRange="₱900 - ₱950"
              />
            </div>
          </section>

          {/* Departure Terminals */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-amber-600" />
              Departure & Arrival Terminals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Departure */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Departure (Manila)</h3>
                <TerminalLocationMap
                  terminals={[
                    { 
                      name: 'Partas Cubao', 
                      coordinates: [121.0523, 14.6207], 
                      operator: 'Partas',
                      address: 'Aurora Blvd, Cubao'
                    },
                    { 
                      name: 'Farinas Sampaloc', 
                      coordinates: [120.9845, 14.6117], 
                      operator: 'Farinas',
                      address: 'Lacson Ave, Sampaloc'
                    },
                  ]}
                  title="Manila Terminals"
                  zoom={12}
                  height="200px"
                />
                {partasCubao ? (
                  <TerminalCard 
                    terminal={partasCubao} 
                    departures="6 daily to Vigan"
                    firstBus="9:00 AM"
                    lastBus="11:55 PM"
                    highlight
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h4 className="font-semibold text-gray-900">Partas Cubao Terminal</h4>
                    <p className="text-sm text-gray-500">Aurora Blvd, Cubao, Quezon City</p>
                  </div>
                )}
                {farinasSampaloc ? (
                  <TerminalCard 
                    terminal={farinasSampaloc} 
                    departures="4 daily to Vigan"
                    firstBus="7:00 AM"
                    lastBus="9:00 PM"
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h4 className="font-semibold text-gray-900">Farinas Sampaloc Terminal</h4>
                    <p className="text-sm text-gray-500">1238 Lacson Ave, Sampaloc, Manila</p>
                  </div>
                )}
              </div>

              {/* Arrival */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Arrival (Vigan)</h3>
                <TerminalLocationMap
                  terminals={[
                    { 
                      name: 'Vigan Bus Terminal', 
                      coordinates: [120.3869, 17.5747], 
                      operator: 'All operators',
                      address: 'Vigan City, Ilocos Sur'
                    },
                  ]}
                  title="Vigan Terminal"
                  zoom={14}
                  height="200px"
                />
                {viganTerminal ? (
                  <TerminalCard 
                    terminal={viganTerminal}
                  />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h4 className="font-semibold text-gray-900">Vigan City Bus Terminal</h4>
                    <p className="text-sm text-gray-500">Vigan City, Ilocos Sur</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>From Vigan Terminal:</strong> Calle Crisologo and the heritage district are a 5-minute tricycle ride (₱50) from the bus terminal.
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Pro tip:</strong> Night departures (21:00-23:55) arrive at dawn—perfect for catching sunrise at Bantay Bell Tower!
                </div>
              </div>
            </div>
          </section>

          {/* Travel Tips */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Travel Tips</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">✓</span><span className="text-gray-700"><strong>Book Luxury for speed</strong> — 7 hours vs 9-11 hours on Deluxe. Worth the extra ₱250 if time matters.</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">✓</span><span className="text-gray-700"><strong>Super Deluxe W/CR</strong> — Has onboard restroom. Great for the 7-hour journey without stops.</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">✓</span><span className="text-gray-700"><strong>Print your voucher</strong> — Partas requires printed vouchers for online bookings.</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">✓</span><span className="text-gray-700"><strong>Arrive 15 min early</strong> — Buses depart on time. Seat selection is first-come.</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">✓</span><span className="text-gray-700"><strong>Best time to visit</strong> — November-February for cool weather. January for Longganisa Festival!</span></li>
                <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">✓</span><span className="text-gray-700"><strong>Try Vigan empanada</strong> — Get the orange empanadas at Plaza Burgos upon arrival.</span></li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride from Manila to Vigan?</h3>
                <p className="text-gray-600 text-sm">Travel time is 7-11 hours. Luxury class takes 7 hours via TPLEX, while Deluxe buses take 9-11 hours with more stops.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Which bus company goes to Vigan?</h3>
                <p className="text-gray-600 text-sm">Partas Transportation is the main operator with 10+ daily departures from Cubao and Pasay. Farinas Trans also operates this route.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How much is the bus fare to Vigan?</h3>
                <p className="text-gray-600 text-sm">Fares range from ₱950-1,350. Luxury costs ₱1,200-1,350, Super Deluxe W/CR is ₱1,000, and Deluxe is ₱950-980.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Are there overnight buses to Vigan?</h3>
                <p className="text-gray-600 text-sm">Yes! Night departures at 21:00-23:55 arrive in Vigan early morning (4-8 AM), perfect for maximizing your day.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">What can I see in Vigan?</h3>
                <p className="text-gray-600 text-sm">Vigan is a UNESCO World Heritage City famous for Calle Crisologo cobblestone streets, Spanish colonial architecture, empanadas, and the Bantay Bell Tower.</p>
              </div>
            </div>
          </section>

          {/* Destination Teaser */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Arriving in Vigan?</h2>
                  <p className="text-amber-100 mb-4">
                    Step back in time on Calle Crisologo, ride a kalesa through cobblestone streets, and taste authentic Ilocano cuisine in this UNESCO Heritage City.
                  </p>
                  <Link href="/destination/vigan" className="inline-flex items-center gap-2 bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors">
                    Explore Vigan Guide →
                  </Link>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  <div className="w-24 h-24 flex-shrink-0 bg-white/20 rounded-lg flex items-center justify-center"><Camera className="w-8 h-8 text-white/60" /></div>
                  <div className="w-24 h-24 flex-shrink-0 bg-white/20 rounded-lg flex items-center justify-center"><Camera className="w-8 h-8 text-white/60" /></div>
                  <div className="w-24 h-24 flex-shrink-0 bg-white/20 rounded-lg flex items-center justify-center"><Camera className="w-8 h-8 text-white/60" /></div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Routes */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Related Routes & Pages</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/route/vigan-to-manila" className="bg-gray-50 hover:bg-amber-50 rounded-xl p-4 transition-colors">
                <span className="text-amber-600 font-medium">Vigan to Manila →</span>
                <p className="text-sm text-gray-500 mt-1">Return trip schedules</p>
              </Link>
              <Link href="/route/manila-to-laoag" className="bg-gray-50 hover:bg-amber-50 rounded-xl p-4 transition-colors">
                <span className="text-amber-600 font-medium">Manila to Laoag →</span>
                <p className="text-sm text-gray-500 mt-1">Continue to Ilocos Norte</p>
              </Link>
              <Link href="/destination/vigan" className="bg-gray-50 hover:bg-amber-50 rounded-xl p-4 transition-colors">
                <span className="text-amber-600 font-medium">Vigan Travel Guide →</span>
                <p className="text-sm text-gray-500 mt-1">Heritage sites, food, hotels</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <StickyBookCTA fromSlug="manila" toSlug="vigan" fromName="Manila" toName="Vigan" />
      <Footer />
    </>
  )
}
