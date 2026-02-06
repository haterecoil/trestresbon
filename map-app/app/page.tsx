'use client'

import { useState, useMemo, useEffect } from 'react'
import { MapComponent } from '@/components/Map'
import { BottomSheet } from '@/components/BottomSheet'
import { SearchBar } from '@/components/SearchBar'
import { FilterModal } from '@/components/FilterModal'
import { RestaurantCard } from '@/components/RestaurantCard'
import { Restaurant } from '@/types'
import { filterRestaurants } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const DATA_URL = './data/restaurants_latest.jsonl';

async function fetchRestaurants(): Promise<Restaurant[]> {
  console.log('Fetching from:', DATA_URL);
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
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

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    types: [] as string[],
    cuisines: [] as string[],
    budgets: [] as string[],
    searchQuery: '',
  })

  useEffect(() => {
    console.log('Loading restaurants...');
    fetchRestaurants()
      .then(data => {
        console.log('Loaded', data.length, 'restaurants');
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load:', err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return []
    return filterRestaurants(restaurants, filters)
  }, [restaurants, filters])

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center p-4 text-center">
        <div>
          <h2 className="text-xl font-bold mb-2">Error loading restaurants</h2>
          <p className="text-gray-600">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No restaurants found</p>
      </div>
    )
  }

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Map Layer */}
      <MapComponent
        restaurants={restaurants}
        filters={filters}
        selectedRestaurant={selectedRestaurant}
        onSelectRestaurant={setSelectedRestaurant}
      />

      {/* Search Bar - Fixed Top */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <SearchBar
          value={filters.searchQuery}
          onChange={(value) => setFilters((prev) => ({ ...prev, searchQuery: value }))}
          onFilterClick={() => setIsFilterOpen(true)}
          resultCount={filteredRestaurants.length}
        />
      </div>

      {/* Bottom Sheet with Restaurant List */}
      <BottomSheet
        selectedRestaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      >
        {selectedRestaurant ? (
          <RestaurantCard
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        ) : (
          <div className="space-y-3 p-4">
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No restaurants match your filters</p>
                <button
                  onClick={() => setFilters({ types: [], cuisines: [], budgets: [], searchQuery: '' })}
                  className="mt-2 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="cursor-pointer"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
                    <div className="flex gap-3">
                      {restaurant.imageUrl && (
                        <img
                          src={restaurant.imageUrl}
                          alt={restaurant.name}
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                          loading="lazy"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {restaurant.type} • {restaurant.cuisine}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {restaurant.metroStation}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-primary">
                            {'€'.repeat(parseInt(restaurant.budget) || 1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </BottomSheet>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        restaurants={restaurants}
      />
    </main>
  )
}
