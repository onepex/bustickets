import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingWidget from '@/components/BookingWidget'
import Link from 'next/link'

interface TerminalPageProps {
  params: Promise<{ slug: string }>
}

function formatName(slug: string) {
  if (slug === 'pitx') return 'PITX (Parañaque Integrated Terminal Exchange)'
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function getShortName(slug: string) {
  if (slug === 'pitx') return 'PITX'
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export async function generateMetadata({ params }: TerminalPageProps): Promise<Metadata> {
  const { slug } = await params
  const name = formatName(slug)
  
  return {
    title: `${name} - Location, Routes & Schedule`,
    description: `${name} terminal guide. Find location, directions, bus routes, schedules, and facilities. Book tickets departing from ${getShortName(slug)}.`,
    openGraph: {
      title: `${name} | BusTickets.ph`,
      description: `Complete guide to ${name}. Location, routes, and booking.`,
    },
  }
}

export default async function TerminalPage({ params }: TerminalPageProps) {
  const { slug } = await params
  const name = formatName(slug)
  const shortName = getShortName(slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-sky-400 to-green-400 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="text-sm text-gray-700 mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <span>Terminals</span>
              <span className="mx-2">›</span>
              <span>{shortName}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {name}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Terminal guide with location, routes, and schedules.
            </p>
            <BookingWidget defaultFrom={shortName} />
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About {name}
                </h2>
                <p className="text-gray-600 mb-6">
                  {name} is a major bus terminal serving routes across the Philippines. It connects travelers to various destinations in Luzon and beyond.
                </p>

                {/* Routes from Terminal */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Routes from {shortName}</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    'Baguio',
                    'Legazpi',
                    'Naga',
                    'La Union',
                  ].map((dest) => (
                    <Link
                      key={dest}
                      href={`/route/manila-to-${dest.toLowerCase().replace(/\s+/g, '-')}`}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <p className="font-medium text-gray-900">{shortName} → {dest}</p>
                    </Link>
                  ))}
                </div>

                {/* Operators */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bus Operators</h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Victory Liner', 'Genesis', 'Partas', 'DLTB'].map((op) => (
                    <Link
                      key={op}
                      href={`/operator/${op.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {op}
                    </Link>
                  ))}
                </div>

                {/* How to Get There */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Get to {shortName}</h3>
                <div className="space-y-3 mb-8">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">By MRT/LRT</h4>
                    <p className="text-sm text-gray-600">
                      Take the MRT and transfer to a jeepney or bus heading to the terminal.
                    </p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">By Grab/Taxi</h4>
                    <p className="text-sm text-gray-600">
                      Book a ride directly to {shortName}. Show the terminal name to your driver.
                    </p>
                  </div>
                </div>

                {/* FAQ */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      Where is {shortName} located?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      {name} is located in Metro Manila. Check the map for exact directions.
                    </p>
                  </details>
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      What facilities are available at {shortName}?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      The terminal has waiting areas, restrooms, food stalls, and ticketing counters.
                    </p>
                  </details>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Terminal Info</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Location:</dt>
                      <dd className="font-medium">Metro Manila</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type:</dt>
                      <dd className="font-medium">Bus Terminal</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Operating Hours:</dt>
                      <dd className="font-medium">24 hours</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Book from {shortName}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Find buses departing from this terminal.
                  </p>
                  <a
                    href={`https://12go.asia/en/travel/${slug}?z=64932`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Search Departures
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusStation",
            "name": name,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Metro Manila",
              "addressCountry": "PH"
            }
          })
        }}
      />
    </div>
  )
}
