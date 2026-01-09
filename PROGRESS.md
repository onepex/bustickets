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

### TerminalCard Component
- Displays all cached data from KV
- Rating badge, address, operators, schedule info
- Phone, wheelchair accessibility icon
- Directions link (uses googleMapsUri)
- Currently text-only layout (removed embedded map due to API key issues)

### Route Pages
- Manila-to-Vigan page uses TerminalCard with live KV data
- Shows Partas Cubao (departure) and Vigan Bus Terminal (arrival)

---

## TODO (Pick up tomorrow)

### 1. Google Maps Embed in Cards
- Maps Embed API enabled but getting "not authorized" error
- API key has correct restrictions (None + 3 APIs)
- May need to wait for propagation or use different approach
- Alternative: Static Maps API or just link to Google Maps

### 2. Terminal Page (`/terminal/[slug]`)
- Full detail page with:
  - Photo carousel (all 6 photos)
  - Large Google Maps embed
  - All reviews displayed
  - Full opening hours
  - More terminal info

### 3. TerminalCard Image Display
- Had working thumbnail layout but removed due to map issues
- Consider: photo-only thumbnail without map embed
- Or: photo + "View on Map" link

### 4. More Route Pages
- Add terminal cards to manila-to-baguio, etc.

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
