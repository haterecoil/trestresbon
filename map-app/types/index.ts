export interface Restaurant {
  id: string;
  name: string;
  chef: string;
  street: string;
  zip: string;
  city: string;
  metroStation: string;
  metroLine: string;
  latitude: string;
  longitude: string;
  type: string;
  cuisine: string;
  budget: string;
  website: string;
  descriptionShort: string;
  descriptionLong: string;
  imageUrl: string;
  extractedAt: string;
}

export interface FilterState {
  types: string[];
  cuisines: string[];
  budgets: string[];
  metroLines: string[];
  arrondissements: string[];
  searchQuery: string;
  sortBy: 'distance' | 'name' | 'budget' | 'rating';
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface BottomSheetState {
  position: 'collapsed' | 'half' | 'full';
  selectedRestaurant: Restaurant | null;
}

export type RestaurantType = 
  | 'La Table'
  | 'Street-food'
  | 'Bec sucré'
  | 'Boui-boui'
  | 'Le panier'
  | 'Cave';

export type BudgetLevel = '1' | '2' | '3' | '4';
