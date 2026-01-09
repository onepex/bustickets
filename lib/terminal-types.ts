export interface TerminalMinimal {
  slug: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  place_id?: string;
  operators?: string[];
  photo_skip?: number;
}

export interface TerminalData {
  slug: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  place_id?: string;
  operators?: string[];
  // Google Places data (cached)
  rating?: number;
  userRatingCount?: number;
  formattedAddress?: string;
  phone?: string;
  website?: string;
  openingHours?: string[];
  photos?: string[];
  reviews?: TerminalReview[];
  googleMapsUri?: string;
  wheelchairAccessible?: boolean;
}

export interface TerminalReview {
  rating: number;
  text?: string;
  authorName?: string;
  authorPhoto?: string;
  relativeTime?: string;
  publishTime?: string;
}

export interface PlaceData {
  id?: string;
  displayName?: { text: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  regularOpeningHours?: {
    openNow?: boolean;
    weekdayDescriptions?: string[];
  };
  accessibilityOptions?: {
    wheelchairAccessibleEntrance?: boolean;
    wheelchairAccessibleParking?: boolean;
    wheelchairAccessibleRestroom?: boolean;
    wheelchairAccessibleSeating?: boolean;
  };
  photos?: Array<{
    name: string;
    authorAttributions?: Array<{ displayName: string; uri: string }>;
  }>;
  reviews?: Array<{
    name?: string;
    rating?: number;
    text?: { text: string };
    authorAttribution?: { displayName: string; uri: string; photoUri: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
  }>;
}
