'use client'

import { SampleSchedules } from '@/components/timetable'
import type { RouteSchedule } from '@/lib/schedule-types'

interface TimetableClientProps {
  routeSchedule: RouteSchedule
}

export default function TimetableClient({ routeSchedule }: TimetableClientProps) {
  return <SampleSchedules routeSchedule={routeSchedule} />
}
