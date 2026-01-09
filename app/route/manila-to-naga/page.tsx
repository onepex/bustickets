import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Thermometer, Navigation, Star, Camera } from 'lucide-react'

export const metadata = {
  title: 'Manila to Naga Bus: DLTB, Isarog, ALPS Schedule 2025',
  description: 'Book Manila to Naga bus tickets online. DLTB, Bicol Isarog, and ALPS buses to the heart of Bicol. 8-10 hour journey.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
        { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
        { '@type': 'ListItem', position: 3, name: 'Manila to Naga' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How long is the bus ride from Manila to Naga?', acceptedAnswer: { '@type': 'Answer', text: 'The journey takes 8-10 hours depending on traffic and bus type. Overnight buses depart evening and arrive early morning.' } },
        { '@type': 'Question', name: 'Which bus companies go to Naga?', acceptedAnswer: { '@type': 'Answer', text: 'DLTB, Bicol Isarog, Penafrancia Tours, ALPS The Bus, Philtranco, Raymond, and RSL operate this route.' } },
        { '@type': 'Question', name: 'How much is the bus fare to Naga?', acceptedAnswer: { '@type': 'Answer', text: 'Fares start at ₱757 for Regular AC. Elite and Sleeper classes cost ₱1,000-1,800.' } },
        { '@type': 'Question', name: 'Where can I catch the bus to Naga?', acceptedAnswer: { '@type': 'Answer', text: 'Main terminals are LRT Buendia (DLTB), Cubao (multiple operators), PITX, and Alabang.' } },
        { '@type': 'Question', name: 'Is Naga closer than Legazpi?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Naga is about 2 hours closer. Manila to Naga is 8-10 hours vs Manila to Legazpi at 10-13 hours.' } },
      ],
    },
    {
      '@type': 'Product',
      name: 'Manila to Naga Bus Tickets',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.2', reviewCount: '2100', bestRating: '5', worstRating: '1' },
    },
  ],
}

const originCity = { id: '328', name: 'Manila', slug: 'manila', country: 'PH', type: 'city' as const, popular: true }
const destCity = { id: '82680', name: 'Naga', slug: 'naga', country: 'PH', type: 'city' as const, popular: true }

export default function ManilaToNagaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen">
        <HeroBackground destination="naga">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Manila to Naga Bus</h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">Direct buses to the heart of Bicol Region</p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
              From ₱757 · 8-10 hours
            </span>
          </div>
          <SearchWidgetV3 defaultFrom={originCity} defaultTo={destCity} />
        </HeroBackground>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <Breadcrumbs items={[{ label: 'Routes', href: '/routes' }, { label: 'Manila to Naga' }]} />

          {/* Quick Summary + Weather */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Route Overview</h2>
                <p className="text-gray-600 mb-6">
                  Travel to Naga City, the pilgrimage capital of the Philippines and gateway to Bicol. Home to the famous Peñafrancia Festival and authentic Bicolano cuisine like laing, pinangat, and Bicol Express.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Travel Time</div>
                    <div className="font-semibold text-gray-900">8-10 hours</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <Wallet className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Fare From</div>
                    <div className="font-semibold text-gray-900">₱757</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <Bus className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Daily Trips</div>
                    <div className="font-semibold text-gray-900">30+</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="font-semibold text-gray-900">~450 km</div>
                  </div>
                </div>
                <a href="#search" className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl text-center block transition-colors">
                  Check Available Buses →
                </a>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Cloud className="w-5 h-5" />
                  <span className="font-medium">Naga Weather</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold">29°C</div>
                    <div className="text-purple-100 text-sm">Warm & Humid</div>
                  </div>
                  <div className="text-6xl">⛅</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-white/20 rounded-lg p-2"><div className="text-purple-100">Thu</div><div className="font-medium">30°</div></div>
                  <div className="bg-white/20 rounded-lg p-2"><div className="text-purple-100">Fri</div><div className="font-medium">28°</div></div>
                  <div className="bg-white/20 rounded-lg p-2"><div className="text-purple-100">Sat</div><div className="font-medium">29°</div></div>
                </div>
                <p className="text-xs text-purple-100 mt-3">
                  <Thermometer className="w-3 h-3 inline mr-1" />
                  Peñafrancia Festival in September is the biggest!
                </p>
              </div>
            </div>
          </section>

          {/* Your Journey */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-purple-600" />
              Your Journey
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-purple-50 to-violet-100 h-64 md:h-auto flex items-center justify-center relative">
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-purple-700 font-medium">Bicol Express Route</p>
                    <p className="text-purple-600 text-sm">8-10 hour journey</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Journey Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-purple-600 font-bold text-sm">1</span></div>
                      <div><div className="font-medium text-gray-900">Metro Manila</div><div className="text-sm text-gray-500">Depart from Buendia, Cubao, PITX, or Alabang</div></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-purple-600 font-bold text-sm">2</span></div>
                      <div><div className="font-medium text-gray-900">SLEX & STAR Tollway</div><div className="text-sm text-gray-500">Expressway through Calabarzon</div></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><span className="text-purple-600 font-bold text-sm">3</span></div>
                      <div><div className="font-medium text-gray-900">Quezon & Camarines Sur</div><div className="text-sm text-gray-500">Scenic route through Bicol</div></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4 text-white" /></div>
                      <div><div className="font-medium text-gray-900">Naga City</div><div className="text-sm text-gray-500">Arrive at Naga Central Bus Terminal</div></div>
                    </div>
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
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/dltb-bus" className="text-purple-600 hover:underline font-medium">DLTB Co.</Link></td>
                      <td className="px-4 py-3 text-gray-700">Regular AC</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱757+</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Aircon, standard seating</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/isarog-bus" className="text-purple-600 hover:underline font-medium">Bicol Isarog</Link></td>
                      <td className="px-4 py-3 text-gray-700">Regular AC</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱800-950</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Aircon, reclining seats</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/isarog-bus" className="text-purple-600 hover:underline font-medium">Bicol Isarog</Link></td>
                      <td className="px-4 py-3 text-gray-700">Elite</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱1,100-1,250</td>
                      <td className="px-4 py-3 text-sm text-gray-500">2x1 seating, CR, snacks</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><Link href="/operator/isarog-bus" className="text-purple-600 hover:underline font-medium">Bicol Isarog</Link></td>
                      <td className="px-4 py-3 text-gray-700">Sleeper</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱1,500-1,800</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Lie-flat beds, overnight</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><span className="text-purple-600 font-medium">Penafrancia Tours</span></td>
                      <td className="px-4 py-3 text-gray-700">Skybus WC</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱900-1,000</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Aircon, onboard CR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><span className="text-purple-600 font-medium">ALPS The Bus</span></td>
                      <td className="px-4 py-3 text-gray-700">Sleeper</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱1,800-2,200</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Premium lie-flat, WiFi, blanket</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">* 20% discount for seniors, students, PWD at terminal counters</p>
          </section>

          {/* Bus Operators */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Operators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-purple-300 transition-colors">
                <div className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">DLTB CO.</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="text-sm font-medium text-gray-700">3.9</span></div>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">Most Affordable</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Major Bicol operator. Departs from LRT Buendia, Cubao, and PITX.</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Buendia</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Cubao</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">PITX</span>
                </div>
                <div className="text-sm"><span className="font-medium text-gray-700">₱757+</span></div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-purple-300 transition-colors">
                <div className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">BICOL ISAROG</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="text-sm font-medium text-gray-700">4.0</span></div>
                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Sleeper Buses</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Offers Elite and Sleeper classes with lie-flat beds for overnight trips.</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Cubao</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Alabang</span>
                </div>
                <div className="text-sm"><span className="font-medium text-gray-700">₱800 - ₱1,800</span></div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-purple-300 transition-colors">
                <div className="w-full h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">PENAFRANCIA</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="text-sm font-medium text-gray-700">4.0</span></div>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Most Trips</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Naga-based operator. Multiple daily departures with Skybus WC class.</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Cubao</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Pasay</span>
                </div>
                <div className="text-sm"><span className="font-medium text-gray-700">₱900 - ₱1,500</span></div>
              </div>
            </div>
          </section>

          {/* Departure Terminals */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-purple-600" />
              Departure Terminals
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">LRT Buendia Terminal (DLTB)</h3>
                    <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs text-gray-600">4.0</span></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Next to LRT-1 Gil Puyat Station · DLTB</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">4 daily</span>
                    <span className="text-gray-500">First: <strong>7:30 AM</strong></span>
                    <span className="text-gray-500">Last: <strong>9:15 PM</strong></span>
                  </div>
                </div>

                <Link href="/terminal/cubao-terminal" className="block group">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">Cubao Terminals</h3>
                      <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs text-gray-600">4.1</span></div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Aurora Blvd area · DLTB, Isarog, Penafrancia, Raymond</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">15+ daily</span>
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Most Options</span>
                    </div>
                  </div>
                </Link>

                <Link href="/terminal/pitx-terminal" className="block group">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">PITX Terminal</h3>
                      <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-xs text-gray-600">4.3</span></div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Parañaque Integrated Terminal · DLTB</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Modern facility</span>
                      <span className="text-gray-500">Departure: <strong>8:45 AM</strong></span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-full min-h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
                  <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Manila Terminals</p>
                  <a href="https://www.google.com/maps/search/dltb+buendia" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline mt-1">Open in Google Maps →</a>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <strong>Arrival:</strong> Naga Central Bus Terminal (CBD II). Walking distance to SM City Naga and the city center.
                </div>
              </div>
            </div>
          </section>

          {/* Travel Tips */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Travel Tips</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✓</span><span className="text-gray-700"><strong>Book Sleeper for overnight</strong> — 8-10 hours is long. Lie-flat beds worth the premium for a good night's sleep.</span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✓</span><span className="text-gray-700"><strong>Naga is 2 hours closer than Legazpi</strong> — If visiting Bicol, consider stopping in Naga first.</span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✓</span><span className="text-gray-700"><strong>Try Bicol Express and laing</strong> — Naga is the home of spicy Bicolano cuisine. Don't miss it!</span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✓</span><span className="text-gray-700"><strong>Visit during Peñafrancia</strong> — September festival is the biggest religious event in Bicol.</span></li>
                <li className="flex items-start gap-3"><span className="text-purple-500 mt-1">✓</span><span className="text-gray-700"><strong>Bring jacket for bus AC</strong> — Buses can be very cold. Pack a light jacket or blanket.</span></li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride from Manila to Naga?</h3>
                <p className="text-gray-600 text-sm">The journey takes 8-10 hours depending on traffic. Overnight buses depart evening and arrive early morning.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Which bus companies go to Naga?</h3>
                <p className="text-gray-600 text-sm">DLTB, Bicol Isarog, Penafrancia Tours, ALPS The Bus, Philtranco, Raymond, and RSL all operate this route.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How much is the bus fare to Naga?</h3>
                <p className="text-gray-600 text-sm">Fares start at ₱757 for Regular AC. Elite class is ₱1,100-1,250 and Sleeper beds cost ₱1,500-2,200.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Where can I catch the bus to Naga?</h3>
                <p className="text-gray-600 text-sm">Main terminals: LRT Buendia (DLTB), Cubao area (multiple operators), PITX, and Alabang (Isarog, Penafrancia).</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Is Naga closer than Legazpi?</h3>
                <p className="text-gray-600 text-sm">Yes! Manila to Naga is 8-10 hours (450km) vs Manila to Legazpi at 10-13 hours (650km). Naga is about 2 hours closer.</p>
              </div>
            </div>
          </section>

          {/* Destination Teaser */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Arriving in Naga?</h2>
                  <p className="text-purple-100 mb-4">
                    Explore the pilgrimage capital of the Philippines! Visit the Peñafrancia Basilica, CWC Wake Park, and taste authentic Bicolano cuisine.
                  </p>
                  <Link href="/destination/naga" className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Explore Naga Guide →
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
              <Link href="/route/naga-to-manila" className="bg-gray-50 hover:bg-purple-50 rounded-xl p-4 transition-colors">
                <span className="text-purple-600 font-medium">Naga to Manila →</span>
                <p className="text-sm text-gray-500 mt-1">Return trip schedules</p>
              </Link>
              <Link href="/route/manila-to-legazpi" className="bg-gray-50 hover:bg-purple-50 rounded-xl p-4 transition-colors">
                <span className="text-purple-600 font-medium">Manila to Legazpi →</span>
                <p className="text-sm text-gray-500 mt-1">Continue to Mayon Volcano</p>
              </Link>
              <Link href="/destination/naga" className="bg-gray-50 hover:bg-purple-50 rounded-xl p-4 transition-colors">
                <span className="text-purple-600 font-medium">Naga Travel Guide →</span>
                <p className="text-sm text-gray-500 mt-1">Peñafrancia, food, hotels</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <StickyBookCTA fromSlug="manila" toSlug="naga" fromName="Manila" toName="Naga" />
      <Footer />
    </>
  )
}
