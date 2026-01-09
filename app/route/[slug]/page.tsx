import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingWidget from '@/components/BookingWidget'
import Link from 'next/link'

interface RoutePageProps {
  params: Promise<{ slug: string }>
}

function parseSlug(slug: string) {
  const parts = slug.split('-to-')
  if (parts.length === 2) {
    return {
      from: parts[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      to: parts[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    }
  }
  return { from: 'Manila', to: 'Baguio' }
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params
  const { from, to } = parseSlug(slug)
  
  return {
    title: `${from} to ${to} Bus & Ferry Schedule`,
    description: `Book ${from} to ${to} tickets online. Compare bus and ferry schedules, prices, and operators. Book with Victory Liner, 2Go, OceanJet and more.`,
    openGraph: {
      title: `${from} to ${to} - Bus & Ferry Tickets`,
      description: `Find the best way to travel from ${from} to ${to}. Compare schedules and book online.`,
    },
  }
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params
  const { from, to } = parseSlug(slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero with Booking Widget */}
        <section className="bg-gradient-to-b from-sky-400 to-green-400 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="text-sm text-gray-700 mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2">›</span>
              <span>Routes</span>
              <span className="mx-2">›</span>
              <span>{from} to {to}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {from} to {to} Bus & Ferry
            </h1>
            <BookingWidget defaultFrom={from} defaultTo={to} />
          </div>
        </section>

        {/* Route Info */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  How to Get from {from} to {to}
                </h2>
                <p className="text-gray-600 mb-6">
                  Travel from {from} to {to} by bus or ferry. Compare schedules, prices, and operators to find the best option for your trip.
                </p>

                {/* Schedule Table Placeholder */}
                <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Operator</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Departure</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Victory Liner</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Multiple daily</td>
                        <td className="px-4 py-3 text-sm text-gray-600">5-6 hours</td>
                        <td className="px-4 py-3 text-sm text-gray-900">₱700+</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">Genesis</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Multiple daily</td>
                        <td className="px-4 py-3 text-sm text-gray-600">5-6 hours</td>
                        <td className="px-4 py-3 text-sm text-gray-900">₱650+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* FAQ Section */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      How long is the trip from {from} to {to}?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      The journey from {from} to {to} typically takes 5-6 hours by bus, depending on traffic conditions.
                    </p>
                  </details>
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      How much is the bus fare from {from} to {to}?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      Bus fares from {from} to {to} range from ₱600 to ₱900 depending on the operator and bus class.
                    </p>
                  </details>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Route Summary</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">From:</dt>
                      <dd className="font-medium">{from}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">To:</dt>
                      <dd className="font-medium">{to}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Duration:</dt>
                      <dd className="font-medium">5-6 hours</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Price from:</dt>
                      <dd className="font-medium text-green-600">₱600</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Book Now</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Compare prices and book your tickets online.
                  </p>
                  <a
                    href={`https://12go.asia/en/travel/${from.toLowerCase()}/${to.toLowerCase()}?z=64932`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Check Availability
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
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `How long is the trip from ${from} to ${to}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The journey from ${from} to ${to} typically takes 5-6 hours by bus.`
                }
              },
              {
                "@type": "Question", 
                "name": `How much is the bus fare from ${from} to ${to}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Bus fares from ${from} to ${to} range from ₱600 to ₱900.`
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}
