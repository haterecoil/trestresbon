'use client'

import { ExternalLink, MapPin, Phone, Clock, Euro } from 'lucide-react'
import { Restaurant } from '@/types'
import { formatBudget, getMetroColor } from '@/lib/utils'

interface RestaurantCardProps {
  restaurant: Restaurant
  onClose: () => void
}

export function RestaurantCard({ restaurant, onClose }: RestaurantCardProps) {
  return (
    <div className="p-4 space-y-4">
      {/* Hero Image */}
      {restaurant.imageUrl && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-bold text-white">{restaurant.name}</h2>
            {restaurant.chef && (
              <p className="text-white/90">by {restaurant.chef}</p>
            )}
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
          {restaurant.type}
        </span>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
          {restaurant.cuisine}
        </span>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          {formatBudget(restaurant.budget)}
        </span>
      </div>

      {/* Metro Info */}
      {restaurant.metroStation && (
        <div className="flex items-center gap-2 text-gray-700">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: getMetroColor(restaurant.metroLine) }}
          >
            M
          </span>
          <span>{restaurant.metroStation}</span>
          <span className="text-gray-500">(Line {restaurant.metroLine})</span>
        </div>
      )}

      {/* Address */}
      <div className="flex items-start gap-2 text-gray-700">
        <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p>{restaurant.street}</p>
          <p>{restaurant.zip} {restaurant.city}</p>
        </div>
      </div>

      {/* Description */}
      {restaurant.descriptionShort && (
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-800 font-medium mb-2">{restaurant.descriptionShort}</p>
          {restaurant.descriptionLong && (
            <p className="text-gray-600 text-sm">{restaurant.descriptionLong}</p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            Website
          </a>
        )}
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${restaurant.street}, ${restaurant.zip} ${restaurant.city}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <MapPin className="h-5 w-5" />
          Directions
        </a>
      </div>
    </div>
  )
}
