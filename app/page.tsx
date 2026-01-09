import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SearchWidgetV3 } from '@/components/search'
import Link from 'next/link'
import { Bus, Ship, MapPin, Clock, Shield, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with Search Widget */}
        <section className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#046cbb] via-[#0580d4] to-[#0891b2]" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#046cbb]/30 rounded-full blur-3xl" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 pb-32">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                Travel the Philippines
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Book bus and ferry tickets to 70+ destinations. Fast, secure, and hassle-free.
              </p>
            </div>
            
            <SearchWidgetV3 />
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Trusted by 100K+ Travelers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Bus className="w-6 h-6 text-[#046cbb]" />
              <h2 className="text-2xl font-bold text-gray-900">Popular Routes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { from: 'Manila', to: 'Baguio', slug: 'manila-to-baguio', price: '₱450-900', duration: '5-6 hrs' },
                { from: 'Cebu', to: 'Bohol', slug: 'cebu-to-bohol', price: '₱500-800', duration: '2 hrs' },
                { from: 'Manila', to: 'Legazpi', slug: 'manila-to-legazpi', price: '₱700-1200', duration: '10-12 hrs' },
                { from: 'El Nido', to: 'Coron', slug: 'el-nido-to-coron', price: '₱1600-2000', duration: '3-4 hrs' },
                { from: 'Manila', to: 'Banaue', slug: 'manila-to-banaue', price: '₱600-900', duration: '9-10 hrs' },
                { from: 'Batangas', to: 'Calapan', slug: 'batangas-to-calapan', price: '₱250-400', duration: '1.5 hrs' },
                { from: 'Cebu', to: 'Ormoc', slug: 'cebu-to-ormoc', price: '₱600-900', duration: '4-5 hrs' },
                { from: 'Iloilo', to: 'Bacolod', slug: 'iloilo-to-bacolod', price: '₱200-350', duration: '1 hr' },
              ].map((route) => (
                <Link
                  key={route.slug}
                  href={`/route/${route.slug}`}
                  className="group p-5 bg-gray-50 border border-gray-100 rounded-xl hover:border-[#046cbb]/40 hover:shadow-lg hover:shadow-[#046cbb]/10 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#046cbb]" />
                    <p className="font-semibold text-gray-900 group-hover:text-[#046cbb] transition-colors">
                      {route.from} → {route.to}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{route.duration}</span>
                    <span className="font-medium text-[#046cbb]">{route.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-[#046cbb]" />
              <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Siargao', slug: 'siargao', desc: 'Surfing Paradise' },
                { name: 'Sagada', slug: 'sagada', desc: 'Mountain Retreat' },
                { name: 'Siquijor', slug: 'siquijor', desc: 'Mystical Island' },
                { name: 'Boracay', slug: 'boracay', desc: 'Beach Paradise' },
                { name: 'Palawan', slug: 'palawan', desc: 'Island Hopping' },
                { name: 'Baguio', slug: 'baguio', desc: 'Summer Capital' },
                { name: 'Banaue', slug: 'banaue', desc: 'Rice Terraces' },
                { name: 'Coron', slug: 'coron', desc: 'Diving Haven' },
              ].map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destination/${dest.slug}`}
                  className="group relative p-6 bg-white border border-gray-100 rounded-xl hover:border-[#046cbb]/40 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="font-semibold text-gray-900 group-hover:text-[#046cbb] transition-colors relative z-10">
                    {dest.name}
                  </p>
                  <p className="text-sm text-gray-500 relative z-10">{dest.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Operators */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Ship className="w-6 h-6 text-[#046cbb]" />
              <h2 className="text-2xl font-bold text-gray-900">Bus & Ferry Operators</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { name: 'Victory Liner', slug: 'victory-liner' },
                { name: '2Go Travel', slug: '2go-travel' },
                { name: 'OceanJet', slug: 'oceanjet' },
                { name: 'DLTB', slug: 'dltb' },
                { name: 'Partas', slug: 'partas' },
                { name: 'Genesis', slug: 'genesis' },
                { name: 'Ceres', slug: 'ceres' },
                { name: 'Weesam', slug: 'weesam-express' },
                { name: 'FastCat', slug: 'fastcat' },
                { name: 'SuperCat', slug: 'supercat' },
                { name: 'Lite Shipping', slug: 'lite-shipping' },
                { name: 'Montenegro', slug: 'montenegro-lines' },
              ].map((op) => (
                <Link
                  key={op.slug}
                  href={`/operator/${op.slug}`}
                  className="group p-4 text-center bg-gray-50 border border-gray-100 rounded-xl hover:border-[#046cbb]/40 hover:bg-blue-50 transition-all"
                >
                  <p className="text-sm font-medium text-gray-700 group-hover:text-[#046cbb] transition-colors">
                    {op.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
              Why Book with BusTickets.ph?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-[#046cbb]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Booking</h3>
                <p className="text-sm text-gray-600">
                  Your payment is protected with industry-standard encryption
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-[#046cbb]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
                <p className="text-sm text-gray-600">
                  Get your e-ticket immediately after booking
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-7 h-7 text-[#046cbb]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
                <p className="text-sm text-gray-600">
                  Compare prices across multiple operators
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
