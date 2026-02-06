'use client';

import { useState, useCallback, useMemo } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl, FullscreenControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Restaurant } from '@/types';
import { cn, filterRestaurants, getMetroColor } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface MapComponentProps {
  restaurants: Restaurant[];
  filters: {
    types: string[];
    cuisines: string[];
    budgets: string[];
    searchQuery: string;
  };
  selectedRestaurant: Restaurant | null;
  onSelectRestaurant: (restaurant: Restaurant | null) => void;
}

export function MapComponent({
  restaurants,
  filters,
  selectedRestaurant,
  onSelectRestaurant,
}: MapComponentProps) {
  const [viewport, setViewport] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  });

  const filteredRestaurants = useMemo(() => {
    return filterRestaurants(restaurants, filters);
  }, [restaurants, filters]);

  const handleMarkerClick = useCallback((restaurant: Restaurant) => {
    onSelectRestaurant(restaurant);
    setViewport((prev) => ({
      ...prev,
      latitude: parseFloat(restaurant.latitude),
      longitude: parseFloat(restaurant.longitude),
      zoom: 16,
    }));
  }, [onSelectRestaurant]);

  return (
    <div className="absolute inset-0">
      <Map
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />

        {filteredRestaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            latitude={parseFloat(restaurant.latitude)}
            longitude={parseFloat(restaurant.longitude)}
            anchor="bottom"
            onClick={() => handleMarkerClick(restaurant)}
          >
            <div
              className={cn(
                'cursor-pointer transition-all duration-200',
                selectedRestaurant?.id === restaurant.id
                  ? 'scale-125 z-50'
                  : 'hover:scale-110'
              )}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  filter: selectedRestaurant?.id === restaurant.id
                    ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              >
                <MapPin
                  size={selectedRestaurant?.id === restaurant.id ? 40 : 32}
                  fill={getMetroColor(restaurant.metroLine)}
                  stroke="white"
                  strokeWidth={2}
                />
                <span className="absolute text-white font-bold text-xs drop-shadow-md">
                  {restaurant.budget}
                </span>
              </div>
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
