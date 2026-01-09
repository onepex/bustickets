import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import { HeroBackground } from '@/components/HeroBackground'
import { StickyBookCTA } from '@/components/StickyBookCTA'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import Link from 'next/link'
import { 
  Star, 
  MapPin, 
  Bus, 
  Clock, 
  Phone, 
  Users, 
  Check, 
  X, 
  ChevronRight, 
  Wifi, 
  Tv, 
  ThermometerSnowflake,
  Armchair,
  BatteryCharging,
  Camera,
  Navigation,
  Toilet,
  Calendar,
  Shield,
  Award,
  ExternalLink,
  Info,
  Zap
} from 'lucide-react'

export const metadata = {
  title: 'Partas Bus Online Booking: Ilocos Routes Schedule 2025 | BusTickets.ph',
  description: 'Book Partas Bus tickets online. 24/7 service to La Union, Vigan, Laoag, Tuguegarao & Abra. Luxury, Super Deluxe & Deluxe buses. Check schedules, fares & terminal info.',
  keywords: 'Partas Bus, Partas Bus booking, Partas Pasay, Partas Cubao, Manila to Laoag bus, Manila to Vigan bus, Manila to La Union bus, Ilocos bus'
}

const busClasses = [
  {
    name: 'Luxury',
    capacity: 26,
    layout: '2×1',
    priceRange: '₱900 - ₱1,650',
    color: 'bg-amber-500',
    amenities: ['Individual LCD TV', 'USB Charging', 'Onboard CR', 'WiFi', 'Extra Legroom'],
    rating: 4.4,
    icon: <Armchair className="w-6 h-6" />
  },
  {
    name: 'Super Deluxe W/CR',
    capacity: 28,
    layout: '2×1',
    priceRange: '₱750 - ₱1,100',
    color: 'bg-teal-500',
    amenities: ['LCD TV', 'Onboard CR', 'Reclining Seats', 'GPS Monitored'],
    rating: 4.5,
    icon: <Armchair className="w-5 h-5" />
  },
  {
    name: 'Deluxe',
    capacity: 45,
    layout: '2×2',
    priceRange: '₱596 - ₱900',
    color: 'bg-blue-500',
    amenities: ['Air-conditioned', 'TV', 'GPS Monitored', 'Reclining Seats'],
    rating: 4.3,
    icon: <Bus className="w-5 h-5" />
  },
  {
    name: 'Regular with CR',
    capacity: 48,
    layout: '2×2',
    priceRange: '₱500 - ₱850',
    color: 'bg-gray-500',
    amenities: ['Air-conditioned', 'Onboard CR', 'TV'],
    rating: 3.7,
    icon: <Bus className="w-5 h-5" />
  }
]

const fareTable = [
  { route: 'Manila to La Union', routeSlug: 'manila-to-la-union', busClass: 'Super Deluxe W/CR', duration: '6-7h', price: '₱680', departure: '20:00, 21:00, 22:00' },
  { route: 'Manila to La Union', routeSlug: 'manila-to-la-union', busClass: 'Deluxe', duration: '6h', price: '₱596', departure: '09:00, 16:00, 23:55' },
  { route: 'Manila to Vigan', routeSlug: 'manila-to-vigan', busClass: 'Luxury', duration: '7h', price: '₱1,200', departure: '09:00, 19:00, 22:00' },
  { route: 'Manila to Vigan', routeSlug: 'manila-to-vigan', busClass: 'Super Deluxe W/CR', duration: '7h', price: '₱975', departure: '21:00' },
  { route: 'Manila to Vigan', routeSlug: 'manila-to-vigan', busClass: 'Deluxe', duration: '9h', price: '₱975', departure: '16:00, 23:55' },
  { route: 'Manila to Laoag', routeSlug: 'manila-to-laoag', busClass: 'Luxury', duration: '9h', price: '₱1,000', departure: '22:00' },
  { route: 'Manila to Laoag', routeSlug: 'manila-to-laoag', busClass: 'Regular with CR', duration: '12h', price: '₱850', departure: '16:00, 23:55' },
  { route: 'Manila to Tuguegarao', routeSlug: 'manila-to-tuguegarao', busClass: 'Deluxe', duration: '10-11h', price: '₱1,360', departure: '18:00, 21:00' },
  { route: 'Manila to Abra', routeSlug: null, busClass: 'Super Deluxe W/CR', duration: '10h', price: '₱980', departure: '22:00' },
  { route: 'Manila to Abra', routeSlug: null, busClass: 'Deluxe', duration: '10h', price: '₱908', departure: '23:55' },
  { route: 'La Union to Manila', routeSlug: null, busClass: 'Deluxe', duration: '6h', price: '₱650', departure: '13:00, 15:30, 21:00' },
  { route: 'La Union to Manila', routeSlug: null, busClass: 'Luxury with CR', duration: '7h', price: '₱900', departure: '19:30' }
]

const popularRoutes = [
  { from: 'Manila', to: 'La Union', slug: 'manila-to-la-union', duration: '6-7 hours', price: '₱596', trips: 42 },
  { from: 'Manila', to: 'Vigan', slug: 'manila-to-vigan', duration: '7-9 hours', price: '₱975', trips: 10 },
  { from: 'Manila', to: 'Laoag', slug: 'manila-to-laoag', duration: '9-12 hours', price: '₱850', trips: 8 },
  { from: 'Manila', to: 'Tuguegarao', slug: 'manila-to-tuguegarao', duration: '10-11 hours', price: '₱1,350', trips: 2 },
  { from: 'Vigan', to: 'Manila', slug: null, duration: '7-10 hours', price: '₱975', trips: 6 },
  { from: 'La Union', to: 'Manila', slug: null, duration: '6-7 hours', price: '₱650', trips: 19 }
]

const terminals = [
  {
    name: 'Partas Pasay Terminal',
    address: 'Aurora Blvd. cor. EDSA, Pasay City, Metro Manila',
    phone: '(02) 8851-4025',
    dailyTrips: 27,
    isMain: true,
    slug: 'pasay-terminal',
    coordinates: '14.5378,121.0014'
  },
  {
    name: 'Partas Cubao Terminal',
    address: 'Aurora Blvd., Cubao, Quezon City, Metro Manila',
    phone: '(02) 8421-1424',
    dailyTrips: 15,
    isMain: true,
    slug: null,
    coordinates: '14.6181,121.0543'
  },
  {
    name: 'San Fernando Partas Terminal',
    address: 'San Fernando City, La Union',
    phone: '(072) 242-0548',
    dailyTrips: 12,
    isMain: false,
    slug: null,
    coordinates: '16.6159,120.3187'
  },
  {
    name: 'Vigan City Terminal',
    address: 'Quezon Avenue, Vigan City, Ilocos Sur',
    phone: '(077) 722-2848',
    dailyTrips: 8,
    isMain: false,
    slug: null,
    coordinates: '17.5747,120.3869'
  },
  {
    name: 'Laoag City Terminal',
    address: 'General Segundo Ave., Laoag City, Ilocos Norte',
    phone: '(077) 770-3588',
    dailyTrips: 8,
    isMain: false,
    slug: null,
    coordinates: '18.1985,120.5930'
  },
  {
    name: 'Bangued Terminal',
    address: 'Bangued, Abra',
    phone: '(074) 752-8080',
    dailyTrips: 4,
    isMain: false,
    slug: null,
    coordinates: '17.5980,120.6180'
  }
]

const faqs = [
  {
    question: 'How much is the Partas bus fare from Manila to La Union?',
    answer: 'Partas bus fares from Manila to La Union range from ₱596 (Deluxe class) to ₱900 (Luxury with CR). The Super Deluxe W/CR is popular at around ₱680. Travel time is approximately 6-7 hours depending on traffic and bus class.'
  },
  {
    question: 'Where is the Partas bus terminal in Pasay?',
    answer: 'The Partas Pasay Terminal is located along Aurora Boulevard corner EDSA, Pasay City. It\'s easily accessible via the EDSA carousel. The terminal operates 24/7 with 27 daily departures to various Northern Luzon destinations.'
  },
  {
    question: 'Does Partas bus have online booking?',
    answer: 'Yes, Partas Bus offers online booking through their official website and partner platforms like BusTickets.ph. Note that some tickets require a printed voucher when boarding - digital confirmation may not always be accepted.'
  },
  {
    question: 'What is the travel time from Manila to Vigan by Partas bus?',
    answer: 'Partas Luxury buses take approximately 7 hours from Manila to Vigan, while Regular and Deluxe buses take 9-10 hours due to more stops. Overnight departures at 9PM-10PM are popular as you arrive early morning in Vigan.'
  },
  {
    question: 'Does Partas bus have a toilet onboard?',
    answer: 'Yes, select Partas buses have onboard comfort rooms (CR). Look for "Luxury with CR," "Super Deluxe W/CR," or "Regular with CR" classes when booking. Luxury and Super Deluxe buses typically have better-maintained restroom facilities.'
  },
  {
    question: 'What amenities are available on Partas Luxury bus?',
    answer: 'Partas Luxury buses feature La-Z-Boy style reclining seats in a 2×1 configuration (26 seats), individual LCD TV screens, USB charging ports, onboard restroom (CR), GPS monitoring, CCTV cameras, and air conditioning. These are the most comfortable option for long trips.'
  }
]

const relatedOperators = [
  { name: 'Solid North', slug: 'solid-north', routes: 'Baguio, Ilocos' },
  { name: 'Farinas Bus', slug: 'farinas-bus', routes: 'Ilocos, Abra' },
  { name: 'Dominion Bus', slug: 'dominion-bus', routes: 'Ilocos, Abra' },
  { name: 'Victory Liner', slug: 'victory-liner', routes: 'Baguio, Pangasinan' }
]

export default function PartasBusPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bustickets.ph' },
          { '@type': 'ListItem', position: 2, name: 'Bus Operators', item: 'https://bustickets.ph/operators' },
          { '@type': 'ListItem', position: 3, name: 'Partas Bus', item: 'https://bustickets.ph/operator/partas-bus' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer }
        }))
      },
      {
        '@type': 'Organization',
        name: 'Partas Transportation Company',
        alternateName: 'Partas Bus',
        url: 'https://bustickets.ph/operator/partas-bus',
        logo: 'https://bustickets.ph/images/operators/partas-logo.png',
        description: '24/7 cargo and passenger transport service connecting Metro Manila to Northern Luzon provinces including La Union, Ilocos Sur, Ilocos Norte, Abra, and Cagayan Valley.',
        foundingDate: '1970',
        areaServed: ['Metro Manila', 'La Union', 'Ilocos Sur', 'Ilocos Norte', 'Abra', 'Cagayan Valley'],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.4',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '359',
          reviewCount: '359'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      {/* Hero Section */}
      <HeroBackground destination="partas-bus">
        <div className="max-w-4xl mx-auto text-center pt-12 pb-8 px-4">
          {/* Logo Placeholder */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-lg mb-6">
            <Bus className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Partas Bus
          </h1>
          
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            The Road Runner of Northern Luzon — Fast, Reliable, 24/7 Service
          </p>
          
          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Since 1970s
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4" />
              50+ Routes
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              4.4★ Rating
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              24/7 Service
            </span>
          </div>
          
          {/* Search Widget */}
          <div className="max-w-3xl mx-auto">
            <SearchWidgetV3 />
          </div>
        </div>
      </HeroBackground>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Bus Operators', href: '/operators' },
              { label: 'Partas Bus' }
            ]}
          />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-10">
        
        {/* About + Rating Section */}
        <section className="mb-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* About - 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  About Partas Bus
                </h2>
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    <strong className="text-gray-900">Partas Bus</strong> gets its name from the Persian word <em>"satrap"</em>, meaning "governor" — a fitting tribute to its owner, <strong>Mr. Chavit Singson</strong>, who served as the governor of Ilocos Sur for several terms. Coincidentally, "Partas" sounds similar to the Ilocano word <em>"pardas"</em>, meaning "fast" or "speed."
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    This is why you'll spot the iconic <strong>Road Runner</strong> character from Looney Tunes on their buses — a playful nod to their commitment to swift, reliable service across Northern Luzon.
                  </p>
                  
                  <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-teal-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-teal-900 mb-1">24/7 Operations</p>
                        <p className="text-sm text-teal-700">
                          Partas operates round-the-clock cargo and passenger transport services, connecting Metro Manila to La Union, Vigan, Laoag, Tuguegarao, Abra, and even Occidental Mindoro.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Coverage Areas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['La Union', 'Ilocos Sur', 'Ilocos Norte', 'Abra', 'Cagayan Valley', 'Occidental Mindoro'].map((area) => (
                      <div key={area} className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-teal-500" />
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rating Card - 1 column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Customer Rating
                </h3>
                
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-1">4.4</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-5 h-5 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Based on 359 reviews</p>
                  <p className="text-xs text-teal-600 font-medium mt-1">94.4% travelers satisfied</p>
                </div>
                
                <div className="space-y-2">
                  {[
                    { stars: 5, percent: 48 },
                    { stars: 4, percent: 28 },
                    { stars: 3, percent: 17 },
                    { stars: 2, percent: 7 },
                    { stars: 1, percent: 0 }
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-8">{row.stars}★</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-amber-400 h-2 rounded-full transition-all"
                          style={{ width: `${row.percent}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-10 text-right">{row.percent}%</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 italic">
                    "Very accommodating and service oriented!" — Marlon A.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bus Fleet Cards */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Bus Fleet & Classes
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {busClasses.map((bus) => (
              <div key={bus.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${bus.color} px-4 py-3 text-white`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{bus.name}</h3>
                    {bus.icon}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium text-gray-500 uppercase">Layout</div>
                      <div className="font-semibold text-gray-900">{bus.layout}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{bus.capacity}</span>
                    </div>
                  </div>
                  
                  {/* Seat Layout Visual */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex justify-center gap-4">
                      {bus.layout === '2×1' ? (
                        <>
                          <div className="flex gap-1">
                            <div className="w-4 h-5 bg-gray-300 rounded-sm" />
                            <div className="w-4 h-5 bg-gray-300 rounded-sm" />
                          </div>
                          <div className="w-3" />
                          <div className="w-4 h-5 bg-teal-400 rounded-sm" />
                        </>
                      ) : (
                        <>
                          <div className="flex gap-1">
                            <div className="w-4 h-5 bg-gray-300 rounded-sm" />
                            <div className="w-4 h-5 bg-gray-300 rounded-sm" />
                          </div>
                          <div className="w-2" />
                          <div className="flex gap-1">
                            <div className="w-4 h-5 bg-gray-300 rounded-sm" />
                            <div className="w-4 h-5 bg-teal-400 rounded-sm" />
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-2">Seat Configuration</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {bus.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {amenity.includes('TV') && <Tv className="w-3 h-3" />}
                        {amenity.includes('Charging') && <BatteryCharging className="w-3 h-3" />}
                        {amenity.includes('CR') && <Toilet className="w-3 h-3" />}
                        {amenity.includes('Air') && <ThermometerSnowflake className="w-3 h-3" />}
                        {amenity.includes('WiFi') && <Wifi className="w-3 h-3" />}
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="font-bold text-teal-600">{bus.priceRange}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-gray-900">{bus.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fare Table */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Partas Bus Fares & Schedule 2025
          </h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Route</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Bus Class</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Duration</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Departures</th>
                    <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">Fare</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fareTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        {row.routeSlug ? (
                          <Link href={`/route/${row.routeSlug}`} className="font-medium text-teal-600 hover:text-teal-700 hover:underline">
                            {row.route}
                          </Link>
                        ) : (
                          <span className="font-medium text-gray-900">{row.route}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          row.busClass === 'Luxury' ? 'bg-amber-100 text-amber-700' :
                          row.busClass.includes('Super') ? 'bg-teal-100 text-teal-700' :
                          row.busClass === 'Deluxe' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {row.busClass}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {row.duration}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{row.departure}</td>
                      <td className="px-4 py-3 text-right font-bold text-gray-900">{row.price}</td>
                      <td className="px-4 py-3">
                        <Link 
                          href={row.routeSlug ? `/route/${row.routeSlug}` : '/search'}
                          className="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Book
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-amber-50 border-t border-amber-100 px-4 py-3">
              <p className="text-sm text-amber-800 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Fares may vary. Pasay departures may be ₱40-72 higher than Cubao. Book early for best rates.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Popular Partas Bus Routes
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map((route, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                      <span>{route.from}</span>
                      <ChevronRight className="w-4 h-4 text-teal-500" />
                      <span>{route.to}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {route.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bus className="w-4 h-4" />
                    {route.trips} trips/day
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-xl font-bold text-teal-600">{route.price}</p>
                  </div>
                  <Link 
                    href={route.slug ? `/route/${route.slug}` : '/search'}
                    className="inline-flex items-center gap-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Book Now
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Terminals */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Partas Bus Terminals
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-4">
            {terminals.map((terminal, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{terminal.name}</h3>
                      {terminal.isMain && (
                        <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-medium">
                          Main Terminal
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {terminal.address}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-teal-500" />
                    {terminal.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Bus className="w-4 h-4 text-teal-500" />
                    {terminal.dailyTrips} trips/day
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {terminal.slug && (
                    <Link 
                      href={`/terminal/${terminal.slug}`}
                      className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium"
                    >
                      Terminal Guide
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${terminal.coordinates}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    View on Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Partas Bus: Pros & Cons
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-green-700 mb-4 flex items-center gap-2">
                <Check className="w-5 h-5" />
                What Passengers Love
              </h3>
              <ul className="space-y-3">
                {[
                  'Drivers and conductors are attentive and respectful',
                  'Luxury buses have La-Z-Boy style comfortable seats',
                  'USB charging ports available on premium buses',
                  '24/7 operations with frequent departures',
                  'Clean and well-maintained buses',
                  'Easy online booking process',
                  'Competitive pricing vs other Ilocos operators',
                  'GPS monitored for safety'
                ].map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Cons */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                <X className="w-5 h-5" />
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {[
                  'Many stops to pick up passengers can cause 2-3 hour delays',
                  'Some buses require printed vouchers (no digital acceptance)',
                  'Older units may have non-reclining seats',
                  'Onboard restroom cleanliness varies',
                  'Charging ports sometimes don\'t work',
                  'Some "Luxury" buses allow standing passengers in aisle',
                  'Online fare may be higher than walk-in terminal price'
                ].map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-teal-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-teal-600" />
              Tips for Riding Partas Bus
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { tip: 'Book Luxury or Super Deluxe for overnight trips — the 2×1 configuration and onboard CR make long journeys more comfortable.' },
                { tip: 'Avoid seats near the bathroom — passengers report smell issues and no footrest in those areas.' },
                { tip: 'Print your voucher — some Partas terminals don\'t accept digital/phone confirmations.' },
                { tip: 'Expect delays — buses pick up additional passengers en route, so budget 1-2 extra hours beyond scheduled arrival.' },
                { tip: 'Choose Pasay Terminal for more departure options — 27 daily trips vs 15 from Cubao.' },
                { tip: 'For Vigan/Laoag, take the 9-10PM departures to arrive early morning and maximize your day.' },
                { tip: 'Bring a light jacket — air conditioning on premium buses can be very cold.' },
                { tip: 'Arrive 30 minutes early — popular routes like Manila-La Union fill up quickly on weekends.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Operators */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            Compare with Other Operators
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedOperators.map((op, idx) => (
              <Link 
                key={idx}
                href={`/operator/${op.slug}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md hover:border-teal-200 transition-all group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-teal-50 transition-colors">
                  <Bus className="w-6 h-6 text-gray-400 group-hover:text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{op.name}</h3>
                <p className="text-sm text-gray-500">{op.routes}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Book Your Partas Bus Trip?
            </h2>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Search schedules, compare fares, and book your tickets to La Union, Vigan, Laoag, and other Northern Luzon destinations.
            </p>
            <Link 
              href="/search"
              className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors"
            >
              Search Bus Schedules
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>

      <StickyBookCTA 
        fromSlug="manila" 
        toSlug="la-union" 
        fromName="Manila" 
        toName="La Union" 
      />
      
      <Footer />
    </>
  )
}