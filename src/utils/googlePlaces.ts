// Google Places API utility functions
// Note: This requires a Google Places API key for production use

export interface GooglePlaceReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  time: string;
  profile_photo_url?: string;
  relative_time_description?: string;
}

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  formatted_phone_number?: string;
  international_phone_number?: string;
  website?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GooglePlaceReview[];
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

// SEDEF AKVARYUM HEDİYE EVİ - Eskişehir
export const SEDEF_AKVARYUM_PLACE_ID = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
export const SEDEF_AKVARYUM_COORDINATES = {
  lat: 39.7742531,
  lng: 30.5125451
};

export const SEDEF_AKVARYUM_GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Sedef+Akvaryum+Hediye+Evi/@39.7742531,30.5125451,17z/data=!3m1!4b1!4m6!3m5!1s0x14cc1733fb62c9ab:0x30acbbcc17f8420d!8m2!3d39.774249!4d30.51512!16s%2Fg%2F11vj_xj8ss?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D';

/**
 * Fetch place details from Google Places API
 * @param placeId - Google Place ID
 * @param apiKey - Google Places API key
 * @returns Promise with place details
 */
export const fetchPlaceDetails = async (
  placeId: string = SEDEF_AKVARYUM_PLACE_ID,
  apiKey?: string
): Promise<GooglePlaceDetails | null> => {
  if (!apiKey) {
    console.warn('Google Places API key is required for real data');
    return null;
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,reviews,opening_hours,geometry&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.result;
    } else {
      throw new Error(`Google Places API error: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
};

/**
 * Fetch place reviews from Google Places API
 * @param placeId - Google Place ID
 * @param maxReviews - Maximum number of reviews to fetch
 * @param apiKey - Google Places API key
 * @returns Promise with reviews array
 */
export const fetchPlaceReviews = async (
  placeId: string = SEDEF_AKVARYUM_PLACE_ID,
  maxReviews: number = 6,
  apiKey?: string
): Promise<GooglePlaceReview[]> => {
  if (!apiKey) {
    console.warn('Google Places API key is required for real data');
    return [];
  }

  try {
    const placeDetails = await fetchPlaceDetails(placeId, apiKey);
    
    if (placeDetails?.reviews) {
      return placeDetails.reviews
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
        .slice(0, maxReviews);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching place reviews:', error);
    return [];
  }
};

/**
 * Get average rating from reviews
 * @param reviews - Array of reviews
 * @returns Average rating
 */
export const getAverageRating = (reviews: GooglePlaceReview[]): number => {
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

/**
 * Format review date
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 gün önce';
  if (diffDays < 7) return `${diffDays} gün önce`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ay önce`;
  return `${Math.floor(diffDays / 365)} yıl önce`;
};

/**
 * Generate Google Maps URL for a place
 * @param placeId - Google Place ID
 * @returns Google Maps URL
 */
export const getGoogleMapsUrl = (placeId: string = SEDEF_AKVARYUM_PLACE_ID): string => {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
};

/**
 * Generate directions URL to the place
 * @param placeId - Google Place ID
 * @returns Directions URL
 */
export const getDirectionsUrl = (placeId: string = SEDEF_AKVARYUM_PLACE_ID): string => {
  return `https://www.google.com/maps/dir/?api=1&destination=place_id:${placeId}`;
};
