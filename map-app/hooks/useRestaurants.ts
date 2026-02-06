'use client';

import { useQuery } from '@tanstack/react-query';
import { Restaurant } from '@/types';

const DATA_URL = './data/restaurants_latest.jsonl';

async function fetchRestaurants(): Promise<Restaurant[]> {
  console.log('Fetching from:', DATA_URL);
  try {
    const response = await fetch(DATA_URL);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('Data length:', text.length);
    const lines = text.trim().split('\n');
    console.log('Number of lines:', lines.length);
    
    const restaurants = lines.map((line, index) => {
      try {
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
      } catch (e) {
        console.error(`Error parsing line ${index}:`, line);
        throw e;
      }
    });
    
    console.log('Parsed restaurants:', restaurants.length);
    return restaurants;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
