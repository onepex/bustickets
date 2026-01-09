'use client'

import dynamic from 'next/dynamic'

const RouteJourneyMap = dynamic(
  () => import('./RouteJourneyMap').then(mod => mod.RouteJourneyMap),
  { ssr: false }
)

const TerminalLocationMap = dynamic(
  () => import('./TerminalLocationMap').then(mod => mod.TerminalLocationMap),
  { ssr: false }
)

const JourneySection = dynamic(
  () => import('./JourneySection').then(mod => mod.JourneySection),
  { ssr: false }
)

export { RouteJourneyMap, TerminalLocationMap, JourneySection }
