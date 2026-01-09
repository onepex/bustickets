import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Thermometer, Navigation, Star, Camera } from 'lucide-react'

export const metadata = {
  title: 'Manila to Tagaytay Bus: PITX, Cubao Schedule 2025',
  description: 'Book Manila to Tagaytay bus. San Agustin, DLTB buses from PITX, Buendia, Cubao. 1-2 hour day trip to Taal Volcano.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
      { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
      { '@type': 'ListItem', position: 3, name: 'Manila to Tagaytay' },
    ]},
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How long is the bus ride?', acceptedAnswer: { '@type': 'Answer', text: '1-2 hours depending on traffic.' }},
      { '@type': 'Question', name: 'How much is the fare?', acceptedAnswer: { '@type': 'Answer', text: '₱80-120 depending on terminal.' }},
    ]},
    { '@type': 'Product', name: 'Manila to Tagaytay Bus Tickets', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.2', reviewCount: '2800' }},
  ],
}

const originCity = { id: '328', name: 'Manila', slug: 'manila', country: 'PH', type: 'city' as const, popular: true }
const destCity = { id: '82800', name: 'Tagaytay', slug: 'tagaytay', country: 'PH', type: 'city' as const, popular: true }

export default function ManilaToTagaytayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen">
        <HeroBackground destination="tagaytay">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Manila to Tagaytay Bus</h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">Quick escape to cool weather & Taal Volcano views</p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">From ₱80 · 1-2 hours</span>
          </div>
          <SearchWidgetV3 defaultFrom={originCity} defaultTo={destCity} />
        </HeroBackground>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <Breadcrumbs items={[{ label: 'Routes', href: '/routes' }, { label: 'Manila to Tagaytay' }]} />

          <section className="mb-12">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Route Overview</h2>
                <p className="text-gray-600 mb-6">Escape Manila's heat with a quick trip to Tagaytay! Just 1-2 hours south, enjoy cool mountain air, stunning views of Taal Volcano, bulalo restaurants, and weekend getaway vibes.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Travel Time</div><div className="font-semibold text-gray-900">1-2 hours</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <Wallet className="w-6 h-6 text-emerald-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Fare From</div><div className="font-semibold text-gray-900">₱80</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <Bus className="w-6 h-6 text-emerald-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Daily Trips</div><div className="font-semibold text-gray-900">Frequent</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Distance</div><div className="font-semibold text-gray-900">~60 km</div>
                  </div>
                </div>
                <a href="#search" className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-center block transition-colors">Check Available Buses →</a>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-2 mb-4"><Cloud className="w-5 h-5" /><span className="font-medium">Tagaytay Weather</span></div>
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-4xl font-bold">23°C</div><div className="text-emerald-100 text-sm">Cool & Breezy</div></div>
                  <div className="text-6xl">🌄</div>
                </div>
                <p className="text-xs text-emerald-100 mt-3"><Thermometer className="w-3 h-3 inline mr-1" />5-10°C cooler than Manila year-round!</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Fares by Terminal</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">From</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Operators</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-medium"><Link href="/terminal/pitx-terminal" className="text-emerald-600 hover:underline">PITX Terminal</Link></td><td className="px-4 py-3">San Agustin, Starliner</td><td className="px-4 py-3 font-semibold">₱80+</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Buendia (LRT)</td><td className="px-4 py-3">San Agustin, DLTB, JAM</td><td className="px-4 py-3 font-semibold">₱90+</td></tr>
                  <tr><td className="px-4 py-3 font-medium">Cubao (Araneta)</td><td className="px-4 py-3">Various operators</td><td className="px-4 py-3 font-semibold">₱120+</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-3">* Board buses bound for Nasugbu/Batangas with "Tagaytay" signboard</p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Navigation className="w-6 h-6 text-emerald-600" />Departure Points</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/terminal/pitx-terminal" className="block group">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-emerald-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 mb-1">PITX Terminal</h3>
                  <p className="text-sm text-gray-500 mb-2">Parañaque · Cheapest option</p>
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">₱80+ · San Agustin, Starliner</span>
                </div>
              </Link>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Buendia Terminal</h3>
                <p className="text-sm text-gray-500 mb-2">Next to LRT-1 Gil Puyat</p>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">₱90+ · DLTB, JAM, San Agustin</span>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Cubao (Araneta)</h3>
                <p className="text-sm text-gray-500 mb-2">Araneta City Bus Port</p>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">₱120+ · Buses to Nasugbu</span>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800"><strong>How to ride:</strong> Look for buses with "Tagaytay" signboard, or ask conductor to drop you at Tagaytay Rotonda. Confirm with driver before boarding.</div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Travel Tips</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1">✓</span><span className="text-gray-700"><strong>PITX is cheapest</strong> — ₱80 vs ₱90-120 from other terminals. Modern facility with organized boarding.</span></li>
                <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1">✓</span><span className="text-gray-700"><strong>Avoid weekend traffic</strong> — Friday PM and Sunday PM can add 1-2 hours to your trip. Go early Saturday.</span></li>
                <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1">✓</span><span className="text-gray-700"><strong>No Grab/taxi in Tagaytay</strong> — Use jeepneys or hire tricycles to get around. Restaurants are spread out.</span></li>
                <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1">✓</span><span className="text-gray-700"><strong>Try bulalo!</strong> — Leslie's and Mahogany Market are famous for beef bone marrow soup.</span></li>
                <li className="flex items-start gap-3"><span className="text-emerald-500 mt-1">✓</span><span className="text-gray-700"><strong>Taal Volcano hike</strong> — Boat charter + guide required. Best in early morning for clear views.</span></li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride to Tagaytay?</h3>
                <p className="text-gray-600 text-sm">1-2 hours depending on traffic. Weekdays are faster. Weekends can take 2-3 hours.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Is there a direct bus to Tagaytay?</h3>
                <p className="text-gray-600 text-sm">No dedicated Tagaytay buses. Board buses going to Nasugbu, Batangas, or Calatagan and ask to be dropped at Tagaytay.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Which terminal is best?</h3>
                <p className="text-gray-600 text-sm">PITX is cheapest (₱80) and most organized. Buendia is convenient if you're near LRT-1.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">What to do in Tagaytay?</h3>
                <p className="text-gray-600 text-sm">View Taal Volcano, hike to the crater, visit Sky Ranch, eat bulalo, buy buko pie at Rowena's, relax at spas.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Things to Do in Tagaytay</h2>
              <p className="text-emerald-100 mb-4">Taal Volcano crater hike, Sky Ranch rides, bulalo at Mahogany Market, buko pie at Rowena's, spa day, picnic at People's Park!</p>
              <Link href="/destination/tagaytay" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">Explore Tagaytay Guide →</Link>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Related Routes</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/route/tagaytay-to-manila" className="bg-gray-50 hover:bg-emerald-50 rounded-xl p-4 transition-colors"><span className="text-emerald-600 font-medium">Tagaytay to Manila →</span><p className="text-sm text-gray-500 mt-1">Return trip</p></Link>
              <Link href="/route/manila-to-batangas" className="bg-gray-50 hover:bg-emerald-50 rounded-xl p-4 transition-colors"><span className="text-emerald-600 font-medium">Manila to Batangas →</span><p className="text-sm text-gray-500 mt-1">Beach destinations</p></Link>
              <Link href="/terminal/pitx-terminal" className="bg-gray-50 hover:bg-emerald-50 rounded-xl p-4 transition-colors"><span className="text-emerald-600 font-medium">PITX Terminal Guide →</span><p className="text-sm text-gray-500 mt-1">Directions, routes</p></Link>
            </div>
          </section>
        </div>
      </main>
      <StickyBookCTA fromSlug="manila" toSlug="tagaytay" fromName="Manila" toName="Tagaytay" />
      <Footer />
    </>
  )
}
