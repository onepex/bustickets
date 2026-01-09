import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import { Clock, MapPin, Bus, Wallet, AlertCircle, Cloud, Thermometer, Navigation, Star, Camera, Armchair } from 'lucide-react'

export const metadata = {
  title: 'Manila to Legazpi Bus: Schedule, Fare & Booking 2025',
  description: 'Book Manila to Legazpi bus tickets online. Compare DLTB, Isarog, Penafrancia schedules. 10-13 hour overnight journey to Bicol.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
        { '@type': 'ListItem', position: 2, name: 'Routes', item: 'https://bustickets.ph/routes' },
        { '@type': 'ListItem', position: 3, name: 'Manila to Legazpi', item: 'https://bustickets.ph/route/manila-to-legazpi' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How long is the bus ride from Manila to Legazpi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The journey takes 10-13 hours depending on traffic and bus type. Isarog Single Seater is fastest at under 10 hours. Most overnight buses take 12-13 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which terminal should I go to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cubao (Aurora Blvd) has the most departures with DLTB and Isarog. Alabang is convenient for South Manila. PITX has limited DLTB departures.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are there sleeper buses to Legazpi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Penafrancia Tours offers Sleeper Bed buses with lie-flat beds. DLTB has Lazyboy reclining seats. Isarog has Elite class with 2x1 seating.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I book tickets online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can book DLTB, Isarog, and Penafrancia tickets online. Bring your printed voucher to exchange for the actual ticket at the terminal.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I bring for the overnight trip?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bring a jacket (AC is very cold), snacks, water, neck pillow, and entertainment. Some buses provide blankets on premium classes.',
          },
        },
      ],
    },
    {
      '@type': 'Product',
      name: 'Manila to Legazpi Bus Tickets',
      description: 'Book Manila to Legazpi bus tickets online.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.0',
        reviewCount: '1850',
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
  id: '82661',
  name: 'Legazpi',
  slug: 'legazpi',
  country: 'PH',
  type: 'city' as const,
  popular: true,
}

export default function ManilaToLegazpiPage() {
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
        <HeroBackground destination="legazpi">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Manila to Legazpi Bus
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-2">
              Overnight buses to the gateway of Mayon Volcano
            </p>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
              From ₱950 · 10-13 hours
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
    { label: 'Manila to Legazpi' }
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
          Travel to the gateway of Mayon Volcano! The Manila to Legazpi route connects Metro Manila to Albay in the Bicol Region. Most buses depart in the evening for overnight travel, arriving early morning.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Travel Time</div>
            <div className="font-semibold text-gray-900">10-13 hours</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Wallet className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Fare From</div>
            <div className="font-semibold text-gray-900">₱950</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <Bus className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Daily Trips</div>
            <div className="font-semibold text-gray-900">20+</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-4 text-center">
            <MapPin className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <div className="text-sm text-gray-500">Distance</div>
            <div className="font-semibold text-gray-900">~650 km</div>
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
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5" />
          <span className="font-medium">Legazpi Weather</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-4xl font-bold">28°C</div>
            <div className="text-orange-100 text-sm">Partly Cloudy</div>
          </div>
          <div className="text-6xl">⛅</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-orange-100">Thu</div>
            <div className="font-medium">29°</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-orange-100">Fri</div>
            <div className="font-medium">28°</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-orange-100">Sat</div>
            <div className="font-medium">30°</div>
          </div>
        </div>
        <p className="text-xs text-orange-100 mt-3">
          <Thermometer className="w-3 h-3 inline mr-1" />
          Tropical climate. Best Mayon views Dec-May.
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
        <div className="bg-gradient-to-br from-orange-50 to-red-100 h-64 md:h-auto flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 L30 0 L60 30 L30 60Z' fill='none' stroke='%23f97316' stroke-width='1'/%3E%3C/svg%3E\")", backgroundSize: '30px 30px' }} />
          <div className="text-center z-10">
            <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
            <p className="text-orange-700 font-medium">Mayon Volcano Route</p>
            <p className="text-orange-600 text-sm">650 km overnight journey</p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Journey Highlights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-sm">1</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Metro Manila</div>
                <div className="text-sm text-gray-500">Depart from Cubao, Alabang, or PITX</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-sm">2</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">SLEX & STAR Tollway</div>
                <div className="text-sm text-gray-500">Expressway through Calabarzon region</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-sm">3</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">Maharlika Highway</div>
                <div className="text-sm text-gray-500">Scenic route through Quezon & Camarines Sur</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Legazpi City</div>
                <div className="text-sm text-gray-500">Arrive at Grand Central Terminal</div>
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
                <Link href="/operator/isarog-bus" className="text-teal-600 hover:underline font-medium">Isarog Line</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Regular AC</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱950-1,400</td>
              <td className="px-4 py-3 text-sm text-gray-500">Aircon, reclining seats</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/isarog-bus" className="text-teal-600 hover:underline font-medium">Isarog Line</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Elite</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,250-1,900</td>
              <td className="px-4 py-3 text-sm text-gray-500">2x1 seating, CR, snacks</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/isarog-bus" className="text-teal-600 hover:underline font-medium">Isarog Line</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Single Seater</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,740</td>
              <td className="px-4 py-3 text-sm text-gray-500">Fastest at 9h 44m, individual seats</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/dltb-bus" className="text-teal-600 hover:underline font-medium">DLTB Co.</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Regular</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,553</td>
              <td className="px-4 py-3 text-sm text-gray-500">Aircon, standard seating</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/dltb-bus" className="text-teal-600 hover:underline font-medium">DLTB Co.</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Lazyboy</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,792</td>
              <td className="px-4 py-3 text-sm text-gray-500">Reclining Lazyboy seats, CR</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/penafrancia-bus" className="text-teal-600 hover:underline font-medium">Penafrancia Tours</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Skybus WC</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,400-1,500</td>
              <td className="px-4 py-3 text-sm text-gray-500">Aircon, CR onboard</td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <Link href="/operator/penafrancia-bus" className="text-teal-600 hover:underline font-medium">Penafrancia Tours</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">Sleeper Bed</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₱1,800-2,600</td>
              <td className="px-4 py-3 text-sm text-gray-500">Lie-flat beds for overnight</td>
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
      {/* DLTB */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-300 transition-colors">
        <div className="w-full h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">DLTB CO.</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700" aria-label="Rating 3.9 out of 5">3.9</span>
          </div>
          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">Lazyboy Seats</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Major Bicol operator with Lazyboy recliner buses. Departs from Cubao and PITX terminals.</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Cubao</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">PITX</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">₱1,553 - ₱1,792</span>
        </div>
      </div>

      {/* Isarog */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-300 transition-colors">
        <div className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">ISAROG LINE</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.0 out of 5">4.0</span>
          </div>
          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Fastest Option</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Offers Elite and Sleeper classes. Single Seater is the fastest bus option at under 10 hours.</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">WiFi</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">CR</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Sleeper</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">₱950 - ₱1,900</span>
        </div>
      </div>

      {/* Penafrancia */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:border-teal-300 transition-colors">
        <div className="w-full h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">PENAFRANCIA</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700" aria-label="Rating 4.0 out of 5">4.0</span>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Most Trips</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">Founded 1989. Major Bicol operator with wide variety of seat classes including Sleeper beds.</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Aircon</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">CR</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Sleeper</span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">₱1,400 - ₱2,600</span>
        </div>
      </div>
    </div>
  </section>

  {/* Departure Terminals */}
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
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-600">DLTB Cubao Terminal</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="text-xs text-gray-600" aria-label="Rating 4.0 out of 5">4.0</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">821 Aurora Blvd, Cubao · DLTB, Isarog</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">10+ daily</span>
              <span className="text-gray-500">First: <strong>8:00 AM</strong></span>
              <span className="text-gray-500">Last: <strong>10:00 PM</strong></span>
            </div>
          </div>
        </Link>

        {/* Alabang Terminal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900">Alabang Terminal</h3>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
              <span className="text-xs text-gray-600" aria-label="Rating 3.9 out of 5">3.9</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">Alabang, Muntinlupa · Isarog, Penafrancia</p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">8+ daily</span>
            <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">South Manila</span>
            <span className="text-gray-500">First: <strong>8:00 AM</strong></span>
            <span className="text-gray-500">Last: <strong>9:30 PM</strong></span>
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
            <p className="text-sm text-gray-500 mb-2">Parañaque Integrated Terminal · DLTB</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded">2 daily</span>
              <span className="text-gray-500">Departure: <strong>9:15 PM</strong></span>
            </div>
          </div>
        </Link>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-full min-h-[280px] bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center relative p-4">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 20h40M20 0v40\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '40px 40px' }} />
          
          {/* Marker pins */}
          <div className="absolute top-[30%] left-[55%] flex flex-col items-center">
            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">1</div>
            <div className="text-[10px] font-medium text-gray-600 mt-1 bg-white/80 px-1 rounded">Cubao</div>
          </div>
          <div className="absolute top-[60%] left-[40%] flex flex-col items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">2</div>
            <div className="text-[10px] font-medium text-gray-600 mt-1 bg-white/80 px-1 rounded">Alabang</div>
          </div>
          <div className="absolute top-[70%] left-[30%] flex flex-col items-center">
            <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">3</div>
            <div className="text-[10px] font-medium text-gray-600 mt-1 bg-white/80 px-1 rounded">PITX</div>
          </div>
          
          <div className="z-10 text-center mt-auto">
            <MapPin className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">Metro Manila Terminals</p>
            <a 
              href="https://www.google.com/maps/dir/DLTB+Cubao/Alabang+Bus+Terminal/PITX+Terminal" 
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

    {/* Arrival Info */}
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-orange-800">
          <strong>Arrival:</strong> Legazpi Grand Central Terminal (Landco Access Road, Barangay Bitano). Near SM City Legazpi (10 min), Embarcadero (15 min), Cagsawa Ruins (20 min).
        </div>
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <strong>Pro tip:</strong> Most buses depart 6-10 PM for overnight travel. Book Sleeper or Lazyboy class for the most comfortable 10-13 hour journey.
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
          <span className="text-gray-700"><strong>Book overnight trips</strong> — 10-13 hour journey is best done sleeping. Most buses depart 6-10 PM, arrive early morning.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Try Sleeper or Lazyboy</strong> — Worth the extra ₱300-500 for lie-flat beds or reclining seats on this long route.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Bring snacks and water</strong> — Limited food stops. Some buses have brief stopovers but don't count on it.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Check-in 1 hour early</strong> — Especially for evening departures. Terminals can get busy.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Best Mayon views at sunrise</strong> — If arriving early morning, look right as you enter Legazpi for volcano views.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Luggage allowance</strong> — 7kg per passenger included. Extra bags may incur fees. Large bags stored underneath.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-teal-500 mt-1">✓</span>
          <span className="text-gray-700"><strong>Best time to visit</strong> — December-May for dry season and clearest Mayon views. Avoid typhoon months (Aug-Oct).</span>
        </li>
      </ul>
    </div>
  </section>

  {/* FAQ Section */}
  <section className="mb-12">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">How long is the bus ride from Manila to Legazpi?</h3>
        <p className="text-gray-600 text-sm">
          The journey takes 10-13 hours depending on traffic and bus type. Isarog Single Seater is fastest at under 10 hours. Most overnight buses take 12-13 hours.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">Which terminal should I go to?</h3>
        <p className="text-gray-600 text-sm">
          <strong>Cubao</strong> (Aurora Blvd) has the most departures with DLTB and Isarog. <strong>Alabang</strong> is convenient for South Manila. <strong><Link href="/terminal/pitx-terminal" className="text-teal-600 hover:underline">PITX</Link></strong> has limited DLTB departures.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">Are there sleeper buses to Legazpi?</h3>
        <p className="text-gray-600 text-sm">
          Yes! Penafrancia Tours offers Sleeper Bed buses with lie-flat beds. DLTB has Lazyboy reclining seats. Isarog has Elite class with 2x1 seating.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">Can I book tickets online?</h3>
        <p className="text-gray-600 text-sm">
          Yes, you can book DLTB, Isarog, and Penafrancia tickets online. Bring your printed voucher to exchange for the actual ticket at the terminal.
        </p>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-2">What should I bring for the overnight trip?</h3>
        <p className="text-gray-600 text-sm">
          Bring a jacket (AC is very cold), snacks, water, neck pillow, and entertainment. Some buses provide blankets on premium classes.
        </p>
      </div>
    </div>
  </section>

  {/* Destination Teaser */}
  <section className="mb-12">
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Arriving in Legazpi?</h2>
          <p className="text-orange-100 mb-4">
            The gateway to Mayon Volcano awaits! Explore Cagsawa Ruins, Embarcadero de Legazpi, and sample authentic Bicolano cuisine.
          </p>
          <Link href="/destination/legazpi" className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
            Explore Legazpi Guide →
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
      <Link href="/route/legazpi-to-manila" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Legazpi to Manila →</span>
        <p className="text-sm text-gray-500 mt-1">Return trip schedules & fares</p>
      </Link>
      <Link href="/route/manila-to-naga" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Manila to Naga →</span>
        <p className="text-sm text-gray-500 mt-1">Shorter Bicol route (8-10 hrs)</p>
      </Link>
      <Link href="/destination/legazpi" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Legazpi Travel Guide →</span>
        <p className="text-sm text-gray-500 mt-1">Mayon Volcano, Cagsawa Ruins</p>
      </Link>
      <Link href="/operator/dltb-bus" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">DLTB Co. →</span>
        <p className="text-sm text-gray-500 mt-1">All routes & terminal info</p>
      </Link>
      <Link href="/operator/isarog-bus" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">Isarog Line →</span>
        <p className="text-sm text-gray-500 mt-1">Bicol bus operator</p>
      </Link>
      <Link href="/terminal/pitx-terminal" className="bg-gray-50 hover:bg-teal-50 rounded-xl p-4 transition-colors">
        <span className="text-teal-600 font-medium">PITX Terminal →</span>
        <p className="text-sm text-gray-500 mt-1">Terminal guide & directions</p>
      </Link>
    </div>
  </section>
</div>
      </main>
      
      {/* Sticky Book Now CTA */}
      <StickyBookCTA 
        fromSlug="manila"
        toSlug="legazpi"
        fromName="Manila"
        toName="Legazpi"
      />
      
      <Footer />
    </>
  )
}
