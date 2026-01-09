import Link from 'next/link'
import { Bus, MapPin, Ship, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#046cbb] rounded-lg flex items-center justify-center">
                <Bus className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">BusTickets.ph</span>
            </div>
            <p className="text-sm text-gray-500">
              Book bus and ferry tickets across the Philippines with ease.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Routes</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/route/manila-to-baguio" className="hover:text-[#5a9fd4] transition-colors">Manila to Baguio</Link></li>
              <li><Link href="/route/cebu-to-bohol" className="hover:text-[#5a9fd4] transition-colors">Cebu to Bohol</Link></li>
              <li><Link href="/route/manila-to-legazpi" className="hover:text-[#5a9fd4] transition-colors">Manila to Legazpi</Link></li>
              <li><Link href="/route/el-nido-to-coron" className="hover:text-[#5a9fd4] transition-colors">El Nido to Coron</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destination/boracay" className="hover:text-[#5a9fd4] transition-colors">Boracay</Link></li>
              <li><Link href="/destination/palawan" className="hover:text-[#5a9fd4] transition-colors">Palawan</Link></li>
              <li><Link href="/destination/siargao" className="hover:text-[#5a9fd4] transition-colors">Siargao</Link></li>
              <li><Link href="/destination/baguio" className="hover:text-[#5a9fd4] transition-colors">Baguio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Operators</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/operator/victory-liner" className="hover:text-[#5a9fd4] transition-colors">Victory Liner</Link></li>
              <li><Link href="/operator/2go-travel" className="hover:text-[#5a9fd4] transition-colors">2Go Travel</Link></li>
              <li><Link href="/operator/oceanjet" className="hover:text-[#5a9fd4] transition-colors">OceanJet</Link></li>
              <li><Link href="/operator/genesis" className="hover:text-[#5a9fd4] transition-colors">Genesis</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            2026 BusTickets.ph. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Powered by <Link href="https://12go.asia?z=64932" target="_blank" className="text-[#046cbb] hover:text-[#5a9fd4] transition-colors">12Go Asia</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
