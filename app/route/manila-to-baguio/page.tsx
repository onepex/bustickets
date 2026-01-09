import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Thermometer, Navigation, Star, Camera, Armchair } from 'lucide-react'

export const metadata = {
  title: 'Manila to Baguio Bus: Schedule, Fare & Online Booking 2025',
  description: 'Book Manila to Baguio bus tickets online. Compare schedules, fares and operators. Book now for instant confirmation.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
        { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
        { '@type': 'ListItem', position: 3, name: 'Manila to Baguio', item: 'https://bustickets.ph/route/manila-to-baguio' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long is the bus ride from Manila to Baguio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Travel time is 4-6 hours depending on traffic and bus type. P2P/First Class buses via TPLEX are fastest at 4-5 hours. Regular buses with stops take 5-6 hours during day trips.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which terminal should I go to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cubao for QC/North Manila, Pasay for Makati/South Manila (fastest trips), PITX for Parañaque/Las Piñas. All have frequent departures.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I book tickets online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Victory Liner and Joy Bus offer online booking. Solid North tickets available via biyaheroes.com. Discounted fares (student/senior/PWD) must be purchased at terminals.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are pets allowed on the bus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, small to medium dogs and cats are allowed per LTFRB guidelines. Pets must be in a carrier/cage with diaper and pay full fare. Victory Liner has designated pet-friendly trips.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between Regular, First Class, and Royal Class?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Regular AC — Standard 2x2 seating, TV. First Class — 2x1 seating, more legroom, CR onboard, snacks, WiFi. Royal Class — Lie-flat sleeper beds with privacy curtains (Victory Liner only).',
          },
        },
      ],
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
  id: '82660',
  name: 'Baguio',
  slug: 'baguio',
  country: 'PH',
  type: 'city' as const,
  popular: true,
}

export default function ManilaToBaguioPage() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      <main className="min-h-screen">
        {/* Hero Section with Search */}
        <HeroBackground destination="baguio">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Manila to Baguio Bus
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">
              Find schedules, compare fares, and book your trip
            </p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
              From ₱480 · 4-6 hours
            </span>
          </div>
          
          <SearchWidgetV3 
            defaultFrom={originCity}
            defaultTo={destCity}
          />
        </HeroBackground>

        {/* Main Content */}
        
<div className="max-w-6xl mx-auto px-4 py-10">
  {/* Breadcrumbs */}
  <Breadcrumbs items={[
    { label: 'Routes', href: '/routes' },
    { label: 'Manila to Baguio' }
  ]} />
  {/* Quick Summary + Weather */}
  <section className="mb-12">
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Summary */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Route Overview
        </h2>
        <p className="text-gray-600 mb-6">
          Escape to the Summer Capital of the Philippines! The Manila to Baguio route is one of the busiest in Luzon, with over 100 daily departures from multiple terminals. Travel time is 4-6 hours via TPLEX.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Travel Time</div>
            <div className="font-semibold text-gray-900">4-6 hours</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Wallet className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Fare From</div>
            <div className="font-semibold text-gray-900">₱480</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Bus className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Daily Trips</div>
            <div className="font-semibold text-gray-900">100+</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <MapPin className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Distance</div>
            <div className="font-semibold text-gray-900">~250 km</div>
          </div>
        </div>
        
        <a 
          href="#search" 
          className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl text-center block transition-colors"
        >
          Check Available Buses →
        </a>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5" />
          <span className="font-medium">Baguio Weather</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold">18°C</div>
            <div className="text-sky-100 text-sm">Partly Cloudy</div>
          </div>
          <div className="text-6xl">⛅</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-sky-100">Thu</div>
            <div className="font-medium">17°</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-sky-100">Fri</div>
            <div className="font-medium">19°</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-sky-100">Sat</div>
            <div className="font-medium">16°</div>
          </div>
        </div>
        <p className="text-xs text-sky-100 mt-3">
          <Thermometer className="w-3 h-3 inline mr-1" />
          Pack a jacket! Temps can drop to 12°C at night.
        </p>
      </div>
    </div>
  </section>

  {/* Your Journey */}
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <Navigation className="w-6 h-6 text-teal-600" />
      Your Journey
    </h2>
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 h-64 md:h-auto flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60Z' fill='none' stroke='%2314b8a6' stroke-width='1'/%3E%3C/svg%3E\")", backgroundSize: '30px 30px' }} />
          <div className="text-center z-10">
            <MapPin className="w-12 h-12 text-teal-500 mx-auto mb-2" />
            <p className="text-teal-700 font-medium">Interactive Map</p>
            <p className="text-teal-600 text-sm">Coming Soon</p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Journey Highlights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-bold text-sm">1</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Metro Manila</div>
                <div className="text-sm text-gray-500">Depart from Cubao, Pasay, or PITX</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-bold text-sm">2</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">TPLEX Expressway</div>
                <div className="text-sm text-gray-500">Fast toll road through Central Luzon</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-bold text-sm">3</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Kennon Road / Marcos Highway</div>
                <div className="text-sm text-gray-500">Scenic mountain ascent (bring jacket!)</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Baguio City</div>
                <div className="text-sm text-gray-500">Arrive at Gov. Pack Road Terminal</div>
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
              <td className="px-4 py-3">
                <Link href="/operator/victory-liner" className="text-teal-600 hover:underline font-medium">Victory Liner</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Regular AC</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱485-500</td>
              <td className="px-4 py-3 text-sm text-gray-500">Aircon, TV</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/victory-liner" className="text-teal-600 hover:underline font-medium">Victory Liner</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Deluxe</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱520-580</td>
              <td className="px-4 py-3 text-sm text-gray-500">Wider seats, WiFi</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/victory-liner" className="text-teal-600 hover:underline font-medium">Victory Liner</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">First Class</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱800</td>
              <td className="px-4 py-3 text-sm text-gray-500">2x1 seats, CR, snacks, WiFi</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/victory-liner" className="text-teal-600 hover:underline font-medium">Victory Liner</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Royal Class</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,500+</td>
              <td className="px-4 py-3 text-sm text-gray-500">Sleeper beds, privacy curtains</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/joy-bus" className="text-teal-600 hover:underline font-medium">Joy Bus</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Deluxe</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱695-730</td>
              <td className="px-4 py-3 text-sm text-gray-500">2x2, CR, WiFi, blanket</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/joy-bus" className="text-teal-600 hover:underline font-medium">Joy Bus</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Premier</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱740-880</td>
              <td className="px-4 py-3 text-sm text-gray-500">2x1, personal screen, USB</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Solid North</td>
              <td className="px-4 py-3 text-gray-700">Deluxe</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱525-750</td>
              <td className="px-4 py-3 text-sm text-gray-500">From <Link href="/terminal/pitx-terminal" className="text-teal-600 hover:underline">PITX</Link>, CR, WiFi</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Solid North</td>
              <td className="px-4 py-3 text-gray-700">Luxury</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱760-999</td>
              <td className="px-4 py-3 text-sm text-gray-500">2x1 LazyBoy, entertainment</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-3">
      * 20% discount available for students, seniors, and PWDs at terminal counters
    </p>
  </section>

  {/* Bus Operators */}
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Bus Operators</h2>
    <div className="grid md:grid-cols-3 gap-4">
      {/* Victory Liner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-300 transition-colors">
        <div className="w-full h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">VICTORY LINER</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.2 out of 5">4.2</span>
          </div>
          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">90+ daily trips</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Largest operator on this route. Multiple bus classes from Regular AC to Royal sleeper.</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Cubao</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Pasay</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Sampaloc</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">₱485 - ₱1,500+</span>
        </div>
      </div>

      {/* Joy Bus */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-300 transition-colors">
        <div className="w-full h-14 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">JOY BUS</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.5 out of 5">4.5</span>
          </div>
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Premium P2P</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Genesis Transport premium brand. Entertainment screens, snacks, blankets included.</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">WiFi</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">CR</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">USB</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Snacks</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">₱695 - ₱880</span>
        </div>
      </div>

      {/* Solid North */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-300 transition-colors">
        <div className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">SOLID NORTH</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.0 out of 5">4.0</span>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">29 daily trips</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Operates exclusively from PITX. Great for south Metro Manila residents.</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">PITX only</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">WiFi</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">CR</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">₱525 - ₱999</span>
        </div>
      </div>
    </div>
  </section>

  {/* Departure Terminals & Schedules */}
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <Camera className="w-6 h-6 text-teal-600" />
      Departure Terminals
    </h2>
    
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Terminal List */}
      <div className="lg:col-span-2 space-y-3">
        {/* Cubao Terminal */}
        <Link href="/terminal/cubao-terminal" className="block group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-teal-300 transition-colors">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-600">Victory Liner Cubao</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="text-xs text-gray-600" aria-label="Rating 4.1 out of 5">4.1</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">EDSA corner New York St. · Victory Liner & Joy Bus</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">46+ daily</span>
              <span className="text-gray-500">First: <strong>12:15 AM</strong></span>
              <span className="text-gray-500">Last: <strong>11:55 PM</strong></span>
            </div>
          </div>
        </Link>

        {/* Pasay Terminal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900">Victory Liner Pasay</h3>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
              <span className="text-xs text-gray-600" aria-label="Rating 4.0 out of 5">4.0</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">EDSA corner Apelo Cruz St. · Victory Liner</p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">44 daily</span>
            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded">⚡ Fastest</span>
            <span className="text-gray-500">First: <strong>12:30 AM</strong></span>
            <span className="text-gray-500">Last: <strong>11:55 PM</strong></span>
          </div>
        </div>

        {/* PITX Terminal */}
        <Link href="/terminal/pitx-terminal" className="block group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-teal-300 transition-colors">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-600">PITX Terminal</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="text-xs text-gray-600" aria-label="Rating 4.3 out of 5">4.3</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">Parañaque Integrated Terminal · Solid North Transit</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">29 daily</span>
              <span className="text-gray-500">First: <strong>12:00 AM</strong></span>
              <span className="text-gray-500">Last: <strong>11:00 PM</strong></span>
            </div>
          </div>
        </Link>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-full min-h-[280px] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center relative p-4">
          {/* Map placeholder with markers */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 20h40M20 0v40\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
          
          {/* Marker pins */}
          <div className="absolute top-[25%] left-[55%] flex flex-col items-center">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">1</div>
            <div className="text-[10px] font-medium text-gray-600 mt-1 bg-white/80 px-1 rounded">Cubao</div>
          </div>
          <div className="absolute top-[50%] left-[45%] flex flex-col items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">2</div>
            <div className="text-[10px] font-medium text-gray-600 mt-1 bg-white/80 px-1 rounded">Pasay</div>
          </div>
          <div className="absolute top-[70%] left-[35%] flex flex-col items-center">
            <div className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">3</div>
            <div className="text-[10px] font-medium text-gray-600 mt-1 bg-white/80 px-1 rounded">PITX</div>
          </div>
          
          <div className="z-10 text-center mt-auto">
            <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">Metro Manila Terminals</p>
            <a 
              href="https://www.google.com/maps/dir/Victory+Liner+Cubao/Victory+Liner+Pasay/PITX+Terminal" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-teal-600 hover:underline mt-1 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <strong>Pro tip:</strong> Night buses (10 PM - 2 AM departures) have less traffic and arrive 1-2 hours faster. Book online in advance during weekends and holidays.
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
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Bring a jacket</strong> — Baguio temps drop to 12-18°C. Bus AC can also be very cold.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Book First Class for overnight trips</strong> — Worth the extra ₱300 for the legroom and onboard CR.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Arrive 30 mins early</strong> — Especially at Cubao and Pasay terminals during peak hours.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Book online for holidays</strong> — Panagbenga Festival (Feb), Holy Week, and Christmas sell out fast.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>P2P buses are faster</strong> — No stopovers means you save 1-2 hours vs regular buses.</span>
        </li>
      </ul>
    </div>
  </section>

  {/* FAQ Section */}
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride from Manila to Baguio?</h3>
        <p className="text-gray-600 text-sm">
          Travel time is 4-6 hours depending on traffic and bus type. P2P/First Class buses via TPLEX are fastest at 4-5 hours. Regular buses with stops take 5-6 hours during day trips.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">Which terminal should I go to?</h3>
        <p className="text-gray-600 text-sm">
          <strong>Cubao</strong> for QC/North Manila, <strong>Pasay</strong> for Makati/South Manila (fastest trips), <strong><Link href="/terminal/pitx-terminal" className="text-teal-600 hover:underline">PITX</Link></strong> for Parañaque/Las Piñas. All have frequent departures.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">Can I book tickets online?</h3>
        <p className="text-gray-600 text-sm">
          Yes! <Link href="/operator/victory-liner" className="text-teal-600 hover:underline">Victory Liner</Link> and <Link href="/operator/joy-bus" className="text-teal-600 hover:underline">Joy Bus</Link> offer online booking. Solid North tickets available via biyaheroes.com. Discounted fares (student/senior/PWD) must be purchased at terminals.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">Are pets allowed on the bus?</h3>
        <p className="text-gray-600 text-sm">
          Yes, small to medium dogs and cats are allowed per LTFRB guidelines. Pets must be in a carrier/cage with diaper and pay full fare. Victory Liner has designated pet-friendly trips.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">What's the difference between Regular, First Class, and Royal Class?</h3>
        <p className="text-gray-600 text-sm">
          <strong>Regular AC</strong> — Standard 2x2 seating, TV. <strong>First Class</strong> — 2x1 seating, more legroom, CR onboard, snacks, WiFi. <strong>Royal Class</strong> — Lie-flat sleeper beds with privacy curtains (Victory Liner only).
        </p>
      </div>
    </div>
  </section>

  {/* Destination Teaser */}
  <section className="mb-12">
    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Arriving in Baguio?</h2>
          <p className="text-teal-100 mb-4">
            The Summer Capital awaits! Explore Session Road, Burnham Park, and the famous strawberry farms in La Trinidad.
          </p>
          <Link href="/destination/baguio" className="inline-flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors">
            Explore Baguio Guide →
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <div className="w-24 h-24 flex-shrink-0 bg-white/20 rounded-lg flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/60" />
          </div>
          <div className="w-24 h-24 flex-shrink-0 bg-white/20 rounded-lg flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/60" />
          </div>
          <div className="w-24 h-24 flex-shrink-0 bg-white/20 rounded-lg flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/60" />
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Related Routes */}
  <section className="mb-8">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Related Routes & Pages</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Link href="/route/baguio-to-manila" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Baguio to Manila →</span>
        <p className="text-sm text-gray-500 mt-1">Return trip schedules & fares</p>
      </Link>
      <Link href="/destination/baguio-destination" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Baguio Travel Guide →</span>
        <p className="text-sm text-gray-500 mt-1">Things to do, where to stay</p>
      </Link>
      <Link href="/operator/victory-liner" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Victory Liner →</span>
        <p className="text-sm text-gray-500 mt-1">All routes & terminal info</p>
      </Link>
      <Link href="/operator/genesis-bus" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Genesis Bus →</span>
        <p className="text-sm text-gray-500 mt-1">Routes & schedules</p>
      </Link>
      <Link href="/terminal/pitx-terminal" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">PITX Terminal →</span>
        <p className="text-sm text-gray-500 mt-1">Terminal guide & directions</p>
      </Link>
      <Link href="/terminal/cubao-terminal" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Cubao Terminal →</span>
        <p className="text-sm text-gray-500 mt-1">Terminal guide & directions</p>
      </Link>
    </div>
  </section>
</div>
      </main>
      
      {/* Sticky Book Now CTA */}
      <StickyBookCTA 
        fromSlug="manila"
        toSlug="baguio"
        fromName="Manila"
        toName="Baguio"
      />
      
      <Footer />
    </>
  )
}
