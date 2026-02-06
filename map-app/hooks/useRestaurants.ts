'use client';

import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '@/types';

const DATA_URL = '/data/restaurants_latest.jsonl';

async function fetchRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  
  const text = await response.text();
  const lines = text.trim().split('\n');
  
  return lines.map((line) => {
    const data = JSON.parse(line);
    return {
      id: data.id,
      name: data.name,
      chef: data.chef,
      street: data.street,
      zip: data.zip,
      city: data.city,
      metroStation: data.metro_station,
      metroLine: data.metro_line,
      latitude: data.latitude,
      longitude: data.longitude,
      type: data.type,
      cuisine: data.cuisine,
      budget: data.budget,
      website: data.website,
      descriptionShort: data.description_short,
      descriptionLong: data.description_long,
      imageUrl: data.image_url,
      extractedAt: data.extracted_at,
    };
  });
}

export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
