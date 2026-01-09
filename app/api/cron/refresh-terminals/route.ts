import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';
import terminals from '@/data/terminals.json';
import { TerminalMinimal, PlaceData, TerminalData } from '@/lib/terminal-types';

const TERMINAL_CACHE_TTL = 604800; // 7 days
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function processBatch<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
  delayBetweenBatches: number = 0
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
    // Add delay between batches to avoid rate limiting
    if (delayBetweenBatches > 0 && i + concurrency < items.length) {
      await delay(delayBetweenBatches);
    }
  }
  return results;
}

async function fetchPlaceById(placeId: string): Promise<PlaceData | null> {
  try {
    const resp = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': GOOGLE_API_KEY!,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,nationalPhoneNumber,internationalPhoneNumber,websiteUri,regularOpeningHours,photos,reviews,googleMapsUri,accessibilityOptions',
      },
      cache: 'no-store',
    });

    if (!resp.ok) {
      console.error(`Place Details API error for ${placeId}:`, resp.status);
      return null;
    }

    return await resp.json();
  } catch (err) {
    console.error(`Place Details fetch error for ${placeId}:`, err);
    return null;
  }
}

async function fetchPlaceBySearch(terminal: TerminalMinimal): Promise<PlaceData | null> {
  if (terminal.place_id) {
    return fetchPlaceById(terminal.place_id);
  }

  try {
    const query = `${terminal.name} Bus Terminal Philippines`;
    const resp = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY!,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.regularOpeningHours,places.photos,places.reviews,places.googleMapsUri,places.accessibilityOptions',
      },
      body: JSON.stringify({
        textQuery: query,
        locationBias: {
          circle: {
            center: { latitude: terminal.lat, longitude: terminal.lon },
            radius: 5000,
          },
        },
        languageCode: 'en',
        maxResultCount: 1,
      }),
      cache: 'no-store',
    });

    if (!resp.ok) {
      console.error(`Places API error for ${terminal.name}:`, resp.status);
      return null;
    }

    const data = await resp.json();
    return data.places?.[0] || null;
  } catch (err) {
    console.error(`Places fetch error for ${terminal.name}:`, err);
    return null;
  }
}

async function downloadAndStorePhoto(
  terminalSlug: string,
  photoIndex: number,
  photoName: string,
  width: number,
  height: number
): Promise<string | null> {
  try {
    const googleUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${width}&maxHeightPx=${height}&key=${GOOGLE_API_KEY}`;
    const resp = await fetch(googleUrl, { redirect: 'follow' });

    if (!resp.ok) {
      console.error(`Photo fetch failed: ${photoName}`, resp.status);
      return null;
    }

    const imageBuffer = await resp.arrayBuffer();
    const contentType = resp.headers.get('content-type') || 'image/jpeg';

    const blobPath = `photos/terminals/${terminalSlug}/${photoIndex}.jpg`;

    const blob = await put(blobPath, imageBuffer, {
      access: 'public',
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return blob.url;
  } catch (err) {
    console.error(`Photo download/upload error: ${terminalSlug}/${photoIndex}`, err);
    return null;
  }
}

function transformPlaceToTerminal(terminal: TerminalMinimal, place: PlaceData): TerminalData {
  const hasWheelchairAccess = place.accessibilityOptions?.wheelchairAccessibleEntrance || 
    place.accessibilityOptions?.wheelchairAccessibleSeating;
  
  return {
    slug: terminal.slug,
    name: terminal.name,
    city: terminal.city,
    lat: terminal.lat,
    lon: terminal.lon,
    place_id: place.id || terminal.place_id,
    operators: terminal.operators,
    rating: place.rating,
    userRatingCount: place.userRatingCount,
    formattedAddress: place.formattedAddress,
    phone: place.nationalPhoneNumber || place.internationalPhoneNumber,
    website: place.websiteUri,
    openingHours: place.regularOpeningHours?.weekdayDescriptions,
    googleMapsUri: place.googleMapsUri,
    wheelchairAccessible: hasWheelchairAccess,
    reviews: place.reviews?.slice(0, 5).map(r => ({
      rating: r.rating || 0,
      text: r.text?.text,
      authorName: r.authorAttribution?.displayName,
      authorPhoto: r.authorAttribution?.photoUri,
      relativeTime: r.relativePublishTimeDescription,
      publishTime: r.publishTime,
    })),
  };
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.KV_REST_API_URL || !GOOGLE_API_KEY) {
    return NextResponse.json({ error: 'Missing config (KV or Google API key)' }, { status: 500 });
  }

  const allTerminals = terminals as TerminalMinimal[];
  let placesUpdated = 0;
  let photosUploaded = 0;
  let errors = 0;

  console.log(`[Terminals Cron] Starting refresh for ${allTerminals.length} terminals`);

  // Google Places Photo API has stricter limits than documented
  // Being conservative to avoid 429/400 errors
  const PLACES_CONCURRENCY = 5;
  const PHOTO_CONCURRENCY = 3;

  const placesResults = await processBatch(allTerminals, PLACES_CONCURRENCY, async (terminal) => {
    try {
      const placeData = await fetchPlaceBySearch(terminal);
      if (placeData) {
        const terminalData = transformPlaceToTerminal(terminal, placeData);
        await kv.setex(`terminal:${terminal.slug}`, TERMINAL_CACHE_TTL, terminalData);
        return { slug: terminal.slug, placeData, terminalData, success: true };
      }
      return { slug: terminal.slug, placeData: null, terminalData: null, success: false };
    } catch (err) {
      console.error(`[Terminals] Error for ${terminal.slug}:`, err);
      return { slug: terminal.slug, placeData: null, terminalData: null, success: false };
    }
  });

  placesUpdated = placesResults.filter(r => r.success).length;
  errors = placesResults.filter(r => !r.success).length;
  console.log(`[Terminals] Fetched ${placesUpdated} places, ${errors} errors`);

  // Step 2: Collect all photos to download with index (respecting photo_skip)
  const photoTasks: Array<{ slug: string; photoIndex: number; photoName: string }> = [];
  const skipDebug: string[] = [];
  for (const result of placesResults) {
    if (result.placeData?.photos) {
      // Find terminal to check for photo_skip setting
      const terminal = allTerminals.find(t => t.slug === result.slug);
      const skipCount = terminal?.photo_skip || 0;
      if (skipCount > 0) {
        skipDebug.push(`${result.slug}: skip=${skipCount}, totalPhotos=${result.placeData.photos.length}`);
      }
      result.placeData.photos.slice(skipCount, skipCount + 6).forEach((photo, index) => {
        photoTasks.push({ slug: result.slug, photoIndex: index, photoName: photo.name });
      });
    }
  }
  console.log(`[Photos] Terminals with photo_skip: ${skipDebug.length}`);
  skipDebug.forEach(d => console.log(`  ${d}`));
  console.log(`[Photos] Downloading ${photoTasks.length} photos...`);

  // Process photos with delay between batches (500ms) to avoid 400 errors
  const photoResults = await processBatch(photoTasks, PHOTO_CONCURRENCY, async (task) => {
    const url = await downloadAndStorePhoto(task.slug, task.photoIndex, task.photoName, 1200, 800);
    return { slug: task.slug, photoIndex: task.photoIndex, url };
  }, 500);

  const photosByTerminal: Record<string, string[]> = {};
  const timestamp = Date.now();
  for (const result of photoResults) {
    if (result.url) {
      if (!photosByTerminal[result.slug]) {
        photosByTerminal[result.slug] = [];
      }
      photosByTerminal[result.slug][result.photoIndex] = `${result.url}?t=${timestamp}`;
      photosUploaded++;
    }
  }

  for (const [slug, urls] of Object.entries(photosByTerminal)) {
    await kv.setex(`terminal-photos:${slug}`, TERMINAL_CACHE_TTL, urls.filter(Boolean));
  }
  console.log(`[Photos] Uploaded ${photosUploaded} photos to Blob`);

  console.log(`[Terminals Cron] Complete: ${placesUpdated} terminals, ${photosUploaded} photos, ${errors} errors`);

  return NextResponse.json({
    success: true,
    terminalsUpdated: placesUpdated,
    photosUploaded,
    errors,
    total: allTerminals.length,
    timestamp: new Date().toISOString(),
  });
}
