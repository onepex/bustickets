#!/usr/bin/env npx ts-node

/**
 * Schedule Sync Script
 * 
 * Fetches timetable data from 12go.asia WordPress plugin endpoint and caches locally.
 * Uses: https://12go.asia/en/timetable/{country}/{from}/{to}?embedded&currency=PHP
 * 
 * Usage:
 *   npx ts-node scripts/sync-schedules.ts
 *   npx ts-node scripts/sync-schedules.ts --route manila-to-baguio
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SCHEDULES_DIR = path.join(__dirname, '../lib/schedules')
const WHITELABEL_DOMAIN = 'book.bustickets.ph'
const AGENT_CODE = '64932'

interface RouteConfig {
  slug: string
  from: string
  to: string
  country: string
}

const ROUTES: RouteConfig[] = [
  { slug: 'manila-to-baguio', from: 'Manila', to: 'Baguio', country: 'PH' },
  { slug: 'manila-to-banaue', from: 'Manila', to: 'Banaue', country: 'PH' },
  { slug: 'cebu-to-bohol', from: 'Cebu', to: 'Bohol', country: 'PH' },
  { slug: 'el-nido-to-coron', from: 'El-Nido', to: 'Coron', country: 'PH' },
  { slug: 'batangas-to-calapan', from: 'Batangas', to: 'Calapan', country: 'PH' },
  { slug: 'manila-to-legazpi', from: 'Manila', to: 'Legazpi', country: 'PH' },
  { slug: 'iloilo-to-bacolod', from: 'Iloilo', to: 'Bacolod', country: 'PH' },
  { slug: 'cebu-to-ormoc', from: 'Cebu', to: 'Ormoc', country: 'PH' },
]

interface ParsedRoute {
  subRoute: string
  fromCity: string
  toCity: string
  transportType: string
  bookingUrl: string
  priceMin: number
  priceMax: number
  duration: string
  classes: {
    name: string
    departures: string[]
  }[]
}

interface Schedule {
  id: string
  operator: {
    id: string
    name: string
    slug: string
  }
  transportType: string
  busClass?: string
  departure: {
    time: string
    terminal: {
      id: string
      name: string
      city: string
    }
  }
  arrival: {
    time: string
    terminal: {
      id: string
      name: string
      city: string
    }
  }
  duration: number
  price: {
    amount: number
    currency: string
  }
  frequency: string
  bookingUrl: string
}

interface RouteSchedule {
  from: string
  to: string
  slug: string
  subRoutes: ParsedRoute[]
  schedules: Schedule[]
  lastUpdated: string
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function parseDuration(durationStr: string): number {
  const match = durationStr.match(/(\d+)h(?:\s*(\d+)m)?/)
  if (!match) return 0
  const hours = parseInt(match[1]) || 0
  const mins = parseInt(match[2]) || 0
  return hours * 60 + mins
}

function parsePrice(priceStr: string): { min: number; max: number } {
  const cleaned = priceStr.replace(/[₱,\s]/g, '').replace(/&ndash;/g, '-')
  const parts = cleaned.split('-').map(p => parseInt(p.replace(/[^0-9]/g, '')))
  if (parts.length === 2) {
    return { min: parts[0], max: parts[1] }
  }
  return { min: parts[0] || 0, max: parts[0] || 0 }
}

function mapBusClass(className: string): string {
  const lower = className.toLowerCase()
  if (lower.includes('first')) return 'first-class'
  if (lower.includes('royal')) return 'royal-class'
  if (lower.includes('executive') || lower.includes('premier')) return 'executive'
  if (lower.includes('deluxe')) return 'deluxe'
  if (lower.includes('sleeper')) return 'sleeper'
  return 'regular'
}

async function fetchTimetable(route: RouteConfig): Promise<string> {
  const url = `https://12go.asia/en/timetable/${route.country}/${route.from}/${route.to}?embedded&css=yes&z=${AGENT_CODE}&currency=PHP`
  console.log(`  Fetching: ${url}`)
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
    }
  })
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  
  return response.text()
}

function parseHtmlTimetable(html: string, route: RouteConfig): ParsedRoute[] {
  const routes: ParsedRoute[] = []
  
  // Match each route container
  const routeContainerRegex = /<div class="one2go-route-container">([\s\S]*?)<\/table><\/div>/g
  let containerMatch
  
  while ((containerMatch = routeContainerRegex.exec(html)) !== null) {
    const containerHtml = containerMatch[1]
    
    // Get route header link
    const headerMatch = containerHtml.match(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/)
    if (!headerMatch) continue
    
    const headerUrl = headerMatch[1]
    const headerText = headerMatch[2].trim()
    const [fromCity, toCity] = headerText.split(' - ').map(s => s.trim())
    
    // Match transport rows (Bus, Ferry, Taxi)
    const transportRegex = /<td class="one2go-route-name"[^>]*>([\s\S]*?)<\/td>[\s\S]*?<td class="one2go-trips"[^>]*>([\s\S]*?)<\/td>/g
    let transportMatch
    
    while ((transportMatch = transportRegex.exec(containerHtml)) !== null) {
      const routeNameHtml = transportMatch[1]
      const tripsHtml = transportMatch[2]
      
      // Extract booking URL and transport type
      const linkMatch = routeNameHtml.match(/<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/)
      if (!linkMatch) continue
      
      const bookingUrl = linkMatch[1].replace('12go.asia', WHITELABEL_DOMAIN)
      const transportText = linkMatch[2].trim()
      const transportType = transportText.toLowerCase().includes('ferry') ? 'ferry' 
        : transportText.toLowerCase().includes('taxi') ? 'taxi'
        : transportText.toLowerCase().includes('van') ? 'van'
        : 'bus'
      
      // Extract price
      const priceMatch = routeNameHtml.match(/<span class="one2go-route-price">([^<]+)<\/span>/)
      const priceStr = priceMatch ? priceMatch[1].trim() : '0'
      const price = parsePrice(priceStr)
      
      // Extract duration
      const durationMatch = routeNameHtml.match(/<span class="one2go-route-duration">([^<]+)<\/span>/)
      const durationStr = durationMatch ? durationMatch[1].trim() : '0h'
      
      // Extract classes and departures
      const classes: { name: string; departures: string[] }[] = []
      const classRegex = /<span class="one2go-class">([^<]+)<\/span>(?:[\s\S]*?<span class="one2go-departures">([^<]+)<\/span>)?/g
      let classMatch
      
      while ((classMatch = classRegex.exec(tripsHtml)) !== null) {
        const className = classMatch[1].trim()
        const departuresStr = classMatch[2] ? classMatch[2].trim() : ''
        const departures = departuresStr.split(',').map(d => d.trim()).filter(Boolean)
        classes.push({ name: className, departures })
      }
      
      routes.push({
        subRoute: `${fromCity} - ${toCity}`,
        fromCity,
        toCity,
        transportType,
        bookingUrl,
        priceMin: price.min,
        priceMax: price.max,
        duration: durationStr,
        classes,
      })
    }
  }
  
  return routes
}

function generateSchedules(parsedRoutes: ParsedRoute[], route: RouteConfig): Schedule[] {
  const schedules: Schedule[] = []
  let idCounter = 0
  
  for (const pr of parsedRoutes) {
    for (const cls of pr.classes) {
      if (cls.departures.length === 0) {
        // No specific times, create one entry
        schedules.push({
          id: `${route.slug}-${idCounter++}`,
          operator: {
            id: slugify(pr.fromCity),
            name: `${pr.fromCity} Terminal`,
            slug: slugify(pr.fromCity),
          },
          transportType: pr.transportType,
          busClass: mapBusClass(cls.name),
          departure: {
            time: 'Various',
            terminal: {
              id: slugify(pr.fromCity),
              name: `${pr.fromCity} Terminal`,
              city: pr.fromCity,
            }
          },
          arrival: {
            time: 'Various',
            terminal: {
              id: slugify(pr.toCity),
              name: `${pr.toCity} Terminal`,
              city: pr.toCity,
            }
          },
          duration: parseDuration(pr.duration),
          price: { amount: pr.priceMin, currency: 'PHP' },
          frequency: 'daily',
          bookingUrl: pr.bookingUrl,
        })
      } else {
        // Create entry for each departure time
        for (const depTime of cls.departures) {
          const durationMins = parseDuration(pr.duration)
          const [depH, depM] = depTime.split(':').map(Number)
          const arrH = Math.floor((depH * 60 + (depM || 0) + durationMins) / 60) % 24
          const arrM = ((depH * 60 + (depM || 0) + durationMins) % 60)
          const arrTime = `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`
          
          schedules.push({
            id: `${route.slug}-${idCounter++}`,
            operator: {
              id: slugify(pr.fromCity),
              name: `${pr.fromCity} Terminal`,
              slug: slugify(pr.fromCity),
            },
            transportType: pr.transportType,
            busClass: mapBusClass(cls.name),
            departure: {
              time: depTime,
              terminal: {
                id: slugify(pr.fromCity),
                name: `${pr.fromCity} Terminal`,
                city: pr.fromCity,
              }
            },
            arrival: {
              time: arrTime,
              terminal: {
                id: slugify(pr.toCity),
                name: `${pr.toCity} Terminal`,
                city: pr.toCity,
              }
            },
            duration: durationMins,
            price: { amount: pr.priceMin, currency: 'PHP' },
            frequency: 'daily',
            bookingUrl: pr.bookingUrl,
          })
        }
      }
    }
  }
  
  // Sort by departure time
  schedules.sort((a, b) => {
    if (a.departure.time === 'Various') return 1
    if (b.departure.time === 'Various') return -1
    return a.departure.time.localeCompare(b.departure.time)
  })
  
  return schedules
}

async function syncRoute(route: RouteConfig): Promise<void> {
  console.log(`\nSyncing: ${route.from} → ${route.to}`)
  
  try {
    const html = await fetchTimetable(route)
    const parsedRoutes = parseHtmlTimetable(html, route)
    
    if (parsedRoutes.length === 0) {
      console.log(`  No routes found, keeping existing data`)
      return
    }
    
    console.log(`  Found ${parsedRoutes.length} sub-routes`)
    
    const schedules = generateSchedules(parsedRoutes, route)
    
    const routeSchedule: RouteSchedule = {
      from: route.from,
      to: route.to,
      slug: route.slug,
      subRoutes: parsedRoutes,
      schedules,
      lastUpdated: new Date().toISOString(),
    }
    
    // Ensure directory exists
    if (!fs.existsSync(SCHEDULES_DIR)) {
      fs.mkdirSync(SCHEDULES_DIR, { recursive: true })
    }
    
    // Write to file
    const filePath = path.join(SCHEDULES_DIR, `${route.slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(routeSchedule, null, 2))
    
    console.log(`  ✓ Saved ${schedules.length} schedules to ${route.slug}.json`)
  } catch (error) {
    console.error(`  Error syncing ${route.slug}:`, error)
  }
}

async function main() {
  console.log('='.repeat(50))
  console.log('Schedule Sync - 12go.asia → Local Cache')
  console.log('='.repeat(50))
  console.log(`Time: ${new Date().toISOString()}`)
  
  // Check for specific route argument
  const args = process.argv.slice(2)
  const routeArg = args.find(a => a.startsWith('--route='))?.split('=')[1]
  
  const routesToSync = routeArg 
    ? ROUTES.filter(r => r.slug === routeArg)
    : ROUTES
  
  if (routesToSync.length === 0) {
    console.error(`Route not found: ${routeArg}`)
    console.log('Available routes:', ROUTES.map(r => r.slug).join(', '))
    process.exit(1)
  }
  
  console.log(`Routes to sync: ${routesToSync.length}`)
  
  for (const route of routesToSync) {
    await syncRoute(route)
    // Small delay between requests to be nice
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('Sync complete!')
  console.log('='.repeat(50))
}

main().catch(console.error)
