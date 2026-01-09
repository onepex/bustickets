import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Thermometer, Navigation, Star, Camera } from 'lucide-react'

export const metadata = {
  title: 'Manila to La Union Bus: Partas Schedule 2025',
  description: 'Book Manila to La Union bus tickets online. Partas buses to San Juan surf beach. 5-7 hour journey.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
      { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
      { '@type': 'ListItem', position: 3, name: 'Manila to La Union' },
    ]},
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'How long is the bus ride?', acceptedAnswer: { '@type': 'Answer', text: '5-7 hours via TPLEX.' }},
      { '@type': 'Question', name: 'How much is the fare?', acceptedAnswer: { '@type': 'Answer', text: '₱670-790 depending on class.' }},
    ]},
    { '@type': 'Product', name: 'Manila to La Union Bus Tickets', aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.4', reviewCount: '1560' }},
  ],
}

const originCity = { id: '328', name: 'Manila', slug: 'manila', country: 'PH', type: 'city' as const, popular: true }
const destCity = { id: '82720', name: 'La Union', slug: 'la-union', country: 'PH', type: 'city' as const, popular: true }

export default function ManilaToLaUnionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="min-h-screen">
        <HeroBackground destination="la-union">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Manila to La Union Bus</h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">Direct buses to the surfing capital</p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">From ₱670 · 5-7 hours</span>
          </div>
          <SearchWidgetV3 defaultFrom={originCity} defaultTo={destCity} />
        </HeroBackground>

        <div className="max-w-6xl mx-auto px-4 py-10">
          <Breadcrumbs items={[{ label: 'Routes', href: '/routes' }, { label: 'Manila to La Union' }]} />

          <section className="mb-12">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Route Overview</h2>
                <p className="text-gray-600 mb-6">Head to San Juan, La Union—the Philippines' surfing capital! Whether you're a beginner or a pro, La Union's beaches await just 5-7 hours north of Manila.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-cyan-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-cyan-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Travel Time</div><div className="font-semibold text-gray-900">5-7 hours</div>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-4 text-center">
                    <Wallet className="w-6 h-6 text-cyan-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Fare From</div><div className="font-semibold text-gray-900">₱670</div>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-4 text-center">
                    <Bus className="w-6 h-6 text-cyan-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Daily Trips</div><div className="font-semibold text-gray-900">14+</div>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-4 text-center">
                    <MapPin className="w-6 h-6 text-cyan-600 mx-auto mb-2" /><div className="text-sm text-gray-500">Distance</div><div className="font-semibold text-gray-900">~200 km</div>
                  </div>
                </div>
                <a href="#search" className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-xl text-center block transition-colors">Check Available Buses →</a>
              </div>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-2 mb-4"><Cloud className="w-5 h-5" /><span className="font-medium">La Union Weather</span></div>
                <div className="flex items-center justify-between mb-4">
                  <div><div className="text-4xl font-bold">28°C</div><div className="text-cyan-100 text-sm">Perfect Beach Weather</div></div>
                  <div className="text-6xl">🏄</div>
                </div>
                <p className="text-xs text-cyan-100 mt-3"><Thermometer className="w-3 h-3 inline mr-1" />Surf season: Oct-Mar</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Fares & Classes</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Operator</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Class</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3"><Link href="/operator/partas-bus" className="text-cyan-600 hover:underline font-medium">Partas</Link></td><td className="px-4 py-3">Deluxe</td><td className="px-4 py-3 font-semibold">₱670</td></tr>
                  <tr><td className="px-4 py-3"><Link href="/operator/partas-bus" className="text-cyan-600 hover:underline font-medium">Partas</Link></td><td className="px-4 py-3">Super Deluxe W/CR</td><td className="px-4 py-3 font-semibold">₱680</td></tr>
                  <tr><td className="px-4 py-3"><Link href="/operator/partas-bus" className="text-cyan-600 hover:underline font-medium">Partas</Link></td><td className="px-4 py-3">Luxury 28</td><td className="px-4 py-3 font-semibold">₱790</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Operators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/operator/partas-bus" className="block group">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-cyan-300 transition-colors">
                  <div className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center mb-4"><span className="text-white font-bold text-lg">PARTAS</span></div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="text-sm font-medium text-gray-700">4.4</span></div>
                    <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">Most Popular</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Premium Ilocos operator with 14+ daily trips. Deluxe and Super Deluxe W/CR classes.</p>
                  <div className="text-sm"><span className="font-medium text-gray-700">₱670 - ₱790</span></div>
                </div>
              </Link>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4"><span className="text-white font-bold text-lg">MARIA DE LEON</span></div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /><span className="text-sm font-medium text-gray-700">4.1</span></div>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Budget Option</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Affordable alternative with regular AC buses.</p>
                <div className="text-sm"><span className="font-medium text-gray-700">₱600 - ₱650</span></div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Travel Tips</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">✓</span><span className="text-gray-700"><strong>Print your voucher</strong> — Partas requires printed vouchers for online bookings.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">✓</span><span className="text-gray-700"><strong>Surf season Oct-Mar</strong> — Best waves during this period. Morning sessions are ideal.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">✓</span><span className="text-gray-700"><strong>San Juan is 15 min from terminal</strong> — Take a tricycle from San Fernando to the surf beach.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">✓</span><span className="text-gray-700"><strong>Book Super Deluxe W/CR</strong> — Has onboard restroom. Only ₱10 more than Deluxe.</span></li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride?</h3>
                <p className="text-gray-600 text-sm">5-7 hours via TPLEX. Deluxe buses take about 6 hours.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Which bus goes to San Juan?</h3>
                <p className="text-gray-600 text-sm">Partas buses go to San Fernando. San Juan surf beach is 15 min south by tricycle.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">When is surf season?</h3>
                <p className="text-gray-600 text-sm">October-March has the best waves. July-September has smaller waves but fewer crowds.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-6 md:p-8 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-2">Arriving in La Union?</h2>
              <p className="text-cyan-100 mb-4">Catch waves at San Juan, chill at beach bars, and enjoy the surf town vibes!</p>
              <Link href="/destination/la-union" className="inline-flex items-center gap-2 bg-white text-cyan-600 px-4 py-2 rounded-lg font-medium hover:bg-cyan-50 transition-colors">Explore La Union Guide →</Link>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Related Routes</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/route/la-union-to-manila" className="bg-gray-50 hover:bg-cyan-50 rounded-xl p-4 transition-colors"><span className="text-cyan-600 font-medium">La Union to Manila →</span><p className="text-sm text-gray-500 mt-1">Return trip</p></Link>
              <Link href="/route/manila-to-vigan" className="bg-gray-50 hover:bg-cyan-50 rounded-xl p-4 transition-colors"><span className="text-cyan-600 font-medium">Manila to Vigan →</span><p className="text-sm text-gray-500 mt-1">Continue north</p></Link>
              <Link href="/destination/la-union" className="bg-gray-50 hover:bg-cyan-50 rounded-xl p-4 transition-colors"><span className="text-cyan-600 font-medium">La Union Guide →</span><p className="text-sm text-gray-500 mt-1">Surf spots, hotels</p></Link>
            </div>
          </section>
        </div>
      </main>
      <StickyBookCTA fromSlug="manila" toSlug="la-union" fromName="Manila" toName="La Union" />
      <Footer />
    </>
  )
}
