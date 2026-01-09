import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingWidget from '@/components/BookingWidget'
import Link from 'next/link'

interface DestinationPageProps {
  params: Promise<{ slug: string }>
}

function formatName(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params
  const name = formatName(slug)
  
  return {
    title: `How to Get to ${name} - Travel Guide`,
    description: `Complete guide on how to get to ${name}, Philippines. Find bus and ferry routes, schedules, prices, and book tickets online.`,
    openGraph: {
      title: `How to Get to ${name} | BusTickets.ph`,
      description: `Plan your trip to ${name}. Compare transport options and book tickets.`,
    },
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
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
              <span>Destinations</span>
              <span className="mx-2">›</span>
              <span>{name}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              How to Get to {name}
            </h1>
            <BookingWidget defaultTo={name} />
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Getting to {name}
                </h2>
                <p className="text-gray-600 mb-6">
                  {name} is one of the most popular destinations in the Philippines. Here's how to get there by bus, ferry, or a combination of transport options.
                </p>

                {/* Transport Options */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transport Options</h3>
                <div className="space-y-4 mb-8">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">From Manila</h4>
                    <p className="text-sm text-gray-600">
                      Multiple bus and ferry options available. Check schedules and book online.
                    </p>
                    <Link 
                      href={`/route/manila-to-${slug}`}
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Manila to {name} route →
                    </Link>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">From Cebu</h4>
                    <p className="text-sm text-gray-600">
                      Ferry and bus connections available from Cebu City.
                    </p>
                    <Link 
                      href={`/route/cebu-to-${slug}`}
                      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Cebu to {name} route →
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
                      What is the best way to get to {name}?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      The best way depends on your starting point. From Manila, you can take a bus or fly. From Cebu, ferry options are available.
                    </p>
                  </details>
                  <details className="border border-gray-200 rounded-lg">
                    <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900">
                      How much does it cost to travel to {name}?
                    </summary>
                    <p className="px-4 pb-4 text-gray-600">
                      Travel costs vary by transport type. Budget ₱500-2,000 for bus/ferry depending on distance and class.
                    </p>
                  </details>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">{name} Quick Facts</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Region:</dt>
                      <dd className="font-medium">Philippines</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Best for:</dt>
                      <dd className="font-medium">Tourism</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Book Your Trip</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Find the best transport options to {name}.
                  </p>
                  <a
                    href={`https://12go.asia/en/travel/manila/${slug}?z=64932`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Search Routes
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
