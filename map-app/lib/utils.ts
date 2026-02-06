import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Restaurant } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBudget(budget: string): string {
  const level = parseInt(budget) || 1;
  return '€'.repeat(level);
}

export function getMetroColor(line: string): string {
  const colors: Record<string, string> = {
    '1': '#FFCE00',
    '2': '#0055C8',
    '3': '#6E6E00',
    '4': '#A0006E',
    '5': '#FF7E2E',
    '6': '#6EC4E8',
    '7': '#6ECA97',
    '8': '#6E491E',
    '9': '#6EC4E8',
    '10': '#C9910D',
    '11': '#6E491E',
    '12': '#003A6E',
    '13': '#6EC4E8',
    '14': '#6E0055',
    '31': '#6EC4E8', // Special line
  };
  return colors[line] || '#6B7280';
}

export function getArrondissement(zip: string): string {
  if (!zip || !zip.startsWith('75')) return 'Other';
  const arr = zip.slice(-2);
  if (arr === '00') return '1er';
  return `${parseInt(arr)}ème`;
}

export function filterRestaurants(
  restaurants: Restaurant[],
  filters: {
    types?: string[];
    cuisines?: string[];
    budgets?: string[];
    metroLines?: string[];
    arrondissements?: string[];
    searchQuery?: string;
  }
): Restaurant[] {
  return restaurants.filter((r) => {
    if (filters.types?.length && !filters.types.includes(r.type)) return false;
    if (filters.cuisines?.length && !filters.cuisines.includes(r.cuisine)) return false;
    if (filters.budgets?.length && !filters.budgets.includes(r.budget)) return false;
    if (filters.metroLines?.length && !filters.metroLines.includes(r.metroLine)) return false;
    if (filters.arrondissements?.length) {
      const arr = getArrondissement(r.zip);
      if (!filters.arrondissements.includes(arr)) return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const searchable = `${r.name} ${r.cuisine} ${r.type} ${r.street} ${r.metroStation}`.toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    return true;
  });
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function getUniqueValues(restaurants: Restaurant[], key: keyof Restaurant): string[] {
  const values = new Set(restaurants.map(r => r[key]).filter(Boolean));
  return Array.from(values).sort();
}
