# BusTickets.ph Progress Notes

> Last deploy test: Jan 9, 2026 - New Git setup working ✓

## Completed (Jan 8, 2026)

### Google Places API Integration (WORKING)
- Cron job at `/api/cron/refresh-terminals` - runs weekly
- Fetches from Google Places API (New):
  - Rating + review count
  - Formatted address
  - Phone number
  - Opening hours (weekday descriptions)
  - Google Maps URI (direct link)
  - Accessibility options (wheelchair)
  - Up to 5 reviews with author info
  - Up to 6 photos per terminal

### Photo System (WORKING)
- Photos downloaded from Google Places API during cron
- Stored in Vercel Blob (`photos/terminals/{slug}/0.jpg`, etc.)
- 1200x800 resolution
- Batched with 500ms delay to avoid rate limits
- `photo_skip` field supported to skip bad photos
- **60 photos successfully cached** across 10 terminals

### Data Storage (WORKING)
- Vercel KV: `terminal:{slug}` - terminal data JSON
- Vercel KV: `terminal-photos:{slug}` - array of Blob URLs
- 7-day TTL on cached data
- API endpoint: `/api/terminals/[slug]` - returns cached data

### TerminalCard Component (COMPLETE - Jan 9, 2026)
- **Square photo thumbnail** (144px) with Next.js Image optimization
- **Name + rating** with star icon
- **Address** - clickable, opens Google Maps
- **Operators** - colored tags
- **Schedule info** (departures, first/last bus) OR opening hours
- **Phone** - clickable to dial
- **Wheelchair accessible** badge
- **"Share" button** - native share on mobile, copies to clipboard on desktop
  - Shares: "Meet me at [Terminal Name]" + address + maps link
- **"Directions" button** - blue, prominent, opens Google Maps
- Responsive, clean design focused on essential pickup info

### Route Pages
- Manila-to-Vigan page uses TerminalCard with live KV data
- Shows Partas Cubao (departure) and Vigan Bus Terminal (arrival)

---

## TODO

### 1. Terminal Detail Page (`/terminal/[slug]`)
- Full detail page with:
  - Photo carousel (all 6 photos)
  - Large Google Maps embed
  - All reviews displayed
  - Full opening hours
  - Routes served from this terminal

### 2. More Route Pages
- Add terminal cards to other route pages (manila-to-baguio, etc.)
- Reuse TerminalCard component with route-specific schedule data

### 3. Git/Vercel Setup (COMPLETE - Jan 9, 2026)
- Moved to `/Users/onepex/Documents/projects/bustickets`
- Own Git repo: https://github.com/onepex/bustickets
- Vercel deploys working via CLI
- Local workspace at `/Users/onepex/Documents/workspace` (not tracked)

---

## Files Reference
- `app/api/cron/refresh-terminals/route.ts` - cron job
- `app/api/terminals/[slug]/route.ts` - API endpoint
- `components/TerminalCard.tsx` - card component
- `data/terminals.json` - terminal list with coords
- `lib/terminal-types.ts` - TypeScript interfaces

## Environment Variables
- `GOOGLE_PLACES_API_KEY` - for cron
- `CRON_SECRET` - deu1NJK9xrd.ekg_egm
- `KV_REST_API_URL` + `KV_REST_API_TOKEN`
- `BLOB_READ_WRITE_TOKEN`
