import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingWidget from '@/components/BookingWidget'
import Link from 'next/link'

interface OperatorPageProps {
  params: Promise<{ slug: string }>
}

function formatName(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export async function generateMetadata({ params }: OperatorPageProps): Promise<Metadata> {
  const { slug } = await params
  const name = formatName(slug)
  
  return {
    title: `${name} - Schedules, Routes & Online Booking`,
    description: `${name} bus and ferry schedules, routes, terminals, and online booking. Book ${name} tickets and compare prices.`,
    openGraph: {
      title: `${name} | BusTickets.ph`,
      description: `Book ${name} tickets online. View schedules, routes, and prices.`,
    },
  }
}

export default async function OperatorPage({ params }: OperatorPageProps) {
  const { slug } = await params
  const name = formatName(slug)

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
              <span>Operators</span>
              <span className="mx-2">›</span>
              <span>{name}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {name}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Book {name} tickets online. View schedules, routes, and compare prices.
            </p>
            <BookingWidget />
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
                  {name} is one of the leading transport operators in the Philippines, serving major routes across Luzon, Visayas, and Mindanao.
                </p>

                {/* Popular Routes */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Routes</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { from: 'Manila', to: 'Baguio' },
                    { from: 'Manila', to: 'La Union' },
                    { from: 'Manila', to: 'Vigan' },
                    { from: 'Manila', to: 'Laoag' },
                  ].map((route) => (
                    <Link
                      key={`${route.from}-${route.to}`}
                      href={`/route/${route.from.toLowerCase()}-to-${route.to.toLowerCase().replace(/\s+/g, '-')}`}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                    >
                      <p className="font-medium text-gray-900">{route.from} → {route.to}</p>
                    </Link>
                  ))}
                </div>

                {/* Terminals */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Terminals</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">Pasay Terminal</span>
                    <Link href="/terminal/pasay" className="text-sm text-blue-600 hover:underline">
                      View details →
                    </Link>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-gray-900">Cubao Terminal</span>
                    <Link href="/terminal/cubao" className="text-sm text-blue-600 hover:underline">
                      View details →
                    </Link>
                  </div>
                </div>

                {/* FAQ */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      How do I book {name} tickets online?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      You can book {name} tickets through our website. Select your route, choose your date, and complete the booking online.
                    </p>
                  </details>
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      What are {name}'s bus types?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      {name} offers various bus classes including Regular, Deluxe, and Premium options with different amenities.
                    </p>
                  </details>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">{name} Info</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type:</dt>
                      <dd className="font-medium">Bus Operator</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Coverage:</dt>
                      <dd className="font-medium">Luzon</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Online Booking:</dt>
                      <dd className="font-medium text-green-600">Available</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Book {name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Compare schedules and book tickets online.
                  </p>
                  <a
                    href={`https://12go.asia/en/operator/${slug}?z=64932`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Schedules
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
