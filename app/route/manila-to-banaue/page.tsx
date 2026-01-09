import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Thermometer, Navigation, Star, Camera } from 'lucide-react'

export const metadata = {
  title: 'Manila to Banaue Bus: Ohayami, Coda Lines Schedule 2025',
  description: 'Book Manila to Banaue bus tickets online. Ohayami Trans and Coda Lines overnight buses to the UNESCO Rice Terraces. 8-9 hour journey.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
        { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
        { '@type': 'ListItem', position: 3, name: 'Manila to Banaue' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long is the bus ride from Manila to Banaue?',
          acceptedAnswer: { '@type': 'Answer', text: 'The overnight bus journey takes 8-9 hours. Most buses depart at 9-10 PM and arrive early morning around 5-6 AM.' },
        },
        {
          '@type': 'Question',
          name: 'Which bus company goes to Banaue?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ohayami Trans and Coda Lines operate direct buses from Manila/Quezon City to Banaue. Ohayami is the most popular choice.' },
        },
        {
          '@type': 'Question',
          name: 'Where do I catch the bus to Banaue?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ohayami Trans departs from their Sampaloc terminal in Manila. Coda Lines departs from Quezon City (HM Transport Terminal).' },
        },
        {
          '@type': 'Question',
          name: 'How much is the bus fare to Banaue?',
          acceptedAnswer: { '@type': 'Answer', text: 'Fares range from ₱650-1,200 depending on the bus class. Buses with CR (restroom) cost slightly more.' },
        },
        {
          '@type': 'Question',
          name: 'What should I bring for the trip?',
          acceptedAnswer: { '@type': 'Answer', text: 'Bring a jacket (mountain temperatures are cool), snacks, water, and a neck pillow. The terraces can be cold and misty in the morning.' },
        },
      ],
    },
    {
      '@type': 'Product',
      name: 'Manila to Banaue Bus Tickets',
      description: 'Book Manila to Banaue bus tickets online.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.3',
        reviewCount: '890',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
}

const originCity = {
  id: '328',
  name: 'Manila',
  slug: 'manila',
  country: 'PH',
  type: 'city' as const,
  popular: true,
}

const destCity = {
  id: '82700',
  name: 'Banaue',
  slug: 'banaue',
  country: 'PH',
  type: 'city' as const,
  popular: true,
}

export default function ManilaToBanauePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <Header />
      <main className="min-h-screen">
        <HeroBackground destination="banaue">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Manila to Banaue Bus</h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">Overnight buses to the UNESCO Rice Terraces</p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
              From ₱650 · 8-9 hours overnight
            </span>
          </div>
          <SearchWidgetV3 defaultFrom={originCity} defaultTo={destCity} />
        </HeroBackground>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <Breadcrumbs items={[{ label: 'Routes', href: '/routes' }, { label: 'Manila to Banaue' }]} />

          {/* Quick Summary + Weather */}
          <section className="mb-12">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Route Overview</h2>
                <p className="text-gray-600 mb-6">
                  Journey to the 2,000-year-old Banaue Rice Terraces, a UNESCO World Heritage Site carved into the mountains of Ifugao. Overnight buses depart Manila in the evening and arrive at dawn for stunning sunrise views over the terraces.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Travel Time</div>
                    <div className="font-semibold text-gray-900">8-9 hours</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Wallet className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Fare From</div>
                    <div className="font-semibold text-gray-900">₱650</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <Bus className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Daily Trips</div>
                    <div className="font-semibold text-gray-900">4-6</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="font-semibold text-gray-900">~350 km</div>
                  </div>
                </div>
                <a href="#search" className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl text-center block transition-colors">
                  Check Available Buses →
                </a>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Cloud className="w-5 h-5" />
                  <span className="font-medium">Banaue Weather</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold">18°C</div>
                    <div className="text-green-100 text-sm">Cool & Misty</div>
                  </div>
                  <div className="text-6xl">🌄</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-white/20 rounded-lg p-2"><div className="text-green-100">Thu</div><div className="font-medium">17°</div></div>
                  <div className="bg-white/20 rounded-lg p-2"><div className="text-green-100">Fri</div><div className="font-medium">19°</div></div>
                  <div className="bg-white/20 rounded-lg p-2"><div className="text-green-100">Sat</div><div className="font-medium">16°</div></div>
                </div>
                <p className="text-xs text-green-100 mt-3">
                  <Thermometer className="w-3 h-3 inline mr-1" />
                  Mountain climate. Pack warm layers and rain gear.
                </p>
              </div>
            </div>
          </section>

          {/* Your Journey */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Navigation className="w-6 h-6 text-green-600" />
              Your Journey
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 h-64 md:h-auto flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60Z' fill='none' stroke='%2316a34a' stroke-width='1'/%3E%3C/svg%3E\")", backgroundSize: '30px 30px' }} />
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 font-medium">Mountain Province Route</p>
                    <p className="text-green-600 text-sm">8-9 hour overnight journey</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Journey Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Manila / Quezon City</div>
                        <div className="text-sm text-gray-500">Evening departure (9-10 PM)</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Nueva Vizcaya</div>
                        <div className="text-sm text-gray-500">Brief stop for passengers</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Ifugao Mountain Roads</div>
                        <div className="text-sm text-gray-500">Winding ascent through Cordillera</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Banaue</div>
                        <div className="text-sm text-gray-500">Arrive at dawn (5-6 AM)</div>
                      </div>
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
                      <td className="px-4 py-3"><span className="text-green-600 font-medium">Ohayami Trans</span></td>
                      <td className="px-4 py-3 text-gray-700">45-Seater AC</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱648-1,042</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Aircon, no CR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><span className="text-green-600 font-medium">Ohayami Trans</span></td>
                      <td className="px-4 py-3 text-gray-700">35-Seater with CR</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱1,018-1,176</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Aircon, onboard restroom</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><span className="text-green-600 font-medium">Coda Lines</span></td>
                      <td className="px-4 py-3 text-gray-700">Regular AC</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">₱700-900</td>
                      <td className="px-4 py-3 text-sm text-gray-500">Aircon, reclining seats</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">* Senior/PWD discounts available at terminal counters</p>
          </section>

          {/* Bus Operators */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Operators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-green-300 transition-colors">
                <div className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">OHAYAMI TRANS</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.2 out of 5">4.2</span>
                  </div>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Most Popular</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Founded by Ifugao native Mr. Rafael Imayaho in 1998. The most trusted operator for the Banaue route.</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Sampaloc</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">9-10 PM</span>
                </div>
                <div className="text-sm text-gray-500"><span className="font-medium text-gray-700">₱648 - ₱1,176</span></div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-green-300 transition-colors">
                <div className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">CODA LINES</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.0 out of 5">4.0</span>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">QC Departure</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Alternative option departing from Quezon City. Also services Sagada and Mountain Province.</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Quezon City</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">HM Terminal</span>
                </div>
                <div className="text-sm text-gray-500"><span className="font-medium text-gray-700">₱700 - ₱900</span></div>
              </div>
            </div>
          </section>

          {/* Departure Terminals */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-green-600" />
              Departure Terminals
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">Ohayami Sampaloc Terminal</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                      <span className="text-xs text-gray-600">4.2</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Lacson Ave, Sampaloc, Manila · Ohayami Trans</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded">2-3 daily</span>
                    <span className="text-gray-500">Departure: <strong>9:00 PM, 10:00 PM</strong></span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">HM Transport Terminal (QC)</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                      <span className="text-xs text-gray-600">4.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Quezon City · Coda Lines</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded">2 daily</span>
                    <span className="text-gray-500">Departure: <strong>8:00 PM, 9:00 PM</strong></span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-full min-h-[200px] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
                  <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Manila Terminals</p>
                  <a href="https://www.google.com/maps/search/ohayami+trans+sampaloc" target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline mt-1">
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800">
                  <strong>Arrival:</strong> Banaue Town Center. From here, take tricycles to your hotel or the Rice Terraces viewpoints.
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Pro tip:</strong> Book the bus with CR for long overnight trips. Arrive at the terminal 30 minutes early as buses fill up fast during peak season.
                </div>
              </div>
            </div>
          </section>

          {/* Travel Tips */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Travel Tips</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Bring warm clothing</strong> — Banaue temperatures drop to 12-18°C. Mornings are misty and cool.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Book buses with CR</strong> — 8-9 hour journey with limited stops. Worth the extra ₱200-300.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Bring snacks and water</strong> — Few stops along the mountain route. Pack food for the journey.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Best time to visit</strong> — March-May and October-November for terraces at their greenest.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Motion sickness alert</strong> — Mountain roads are winding. Take medication if prone to car sickness.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700"><strong>Book return early</strong> — Limited buses back to Manila. Book at Banaue terminal upon arrival.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride from Manila to Banaue?</h3>
                <p className="text-gray-600 text-sm">The overnight bus journey takes 8-9 hours. Most buses depart at 9-10 PM and arrive early morning around 5-6 AM.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Which bus company goes to Banaue?</h3>
                <p className="text-gray-600 text-sm">Ohayami Trans and Coda Lines operate direct buses. Ohayami is the most popular, departing from Sampaloc, Manila.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Where do I catch the bus to Banaue?</h3>
                <p className="text-gray-600 text-sm">Ohayami Trans departs from Lacson Ave, Sampaloc. Coda Lines departs from HM Transport Terminal in Quezon City.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How much is the bus fare to Banaue?</h3>
                <p className="text-gray-600 text-sm">Fares range from ₱650-1,200 depending on bus class. Buses with CR (restroom) cost around ₱1,000-1,200.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">What should I bring for the trip?</h3>
                <p className="text-gray-600 text-sm">Bring a jacket, snacks, water, and a neck pillow. Banaue is cool and misty—temperatures can drop to 12°C.</p>
              </div>
            </div>
          </section>

          {/* Destination Teaser */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">Arriving in Banaue?</h2>
                  <p className="text-green-100 mb-4">
                    Explore the 2,000-year-old Rice Terraces, trek to Batad and Bangaan villages, and experience authentic Ifugao culture in the Cordillera mountains.
                  </p>
                  <Link href="/destination/banaue" className="inline-flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    Explore Banaue Guide →
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
              <Link href="/route/banaue-to-manila" className="bg-gray-50 hover:bg-green-50 rounded-xl p-4 transition-colors">
                <span className="text-green-600 font-medium">Banaue to Manila →</span>
                <p className="text-sm text-gray-500 mt-1">Return trip schedules</p>
              </Link>
              <Link href="/route/manila-to-sagada" className="bg-gray-50 hover:bg-green-50 rounded-xl p-4 transition-colors">
                <span className="text-green-600 font-medium">Manila to Sagada →</span>
                <p className="text-sm text-gray-500 mt-1">Nearby mountain destination</p>
              </Link>
              <Link href="/destination/banaue" className="bg-gray-50 hover:bg-green-50 rounded-xl p-4 transition-colors">
                <span className="text-green-600 font-medium">Banaue Travel Guide →</span>
                <p className="text-sm text-gray-500 mt-1">Rice Terraces, Batad, Bangaan</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
      
      <StickyBookCTA fromSlug="manila" toSlug="banaue" fromName="Manila" toName="Banaue" />
      <Footer />
    </>
  )
}
