'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, getUniqueValues } from '@/lib/utils'
import { Restaurant } from '@/types'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    types: string[]
    cuisines: string[]
    budgets: string[]
    searchQuery: string
  }
  onFiltersChange: (filters: any) => void
  restaurants: Restaurant[]
}

export function FilterModal({ isOpen, onClose, filters, onFiltersChange, restaurants }: FilterModalProps) {
  const types = getUniqueValues(restaurants, 'type')
  const cuisines = getUniqueValues(restaurants, 'cuisine')
  const budgets = ['1', '2', '3', '4']

  const toggleFilter = (category: 'types' | 'cuisines' | 'budgets', value: string) => {
    onFiltersChange((prev: any) => {
      const current = prev[category]
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value]
      return { ...prev, [category]: updated }
    })
  }

  const clearAll = () => {
    onFiltersChange({ types: [], cuisines: [], budgets: [], searchQuery: '' })
  }

  const hasActiveFilters = filters.types.length > 0 || filters.cuisines.length > 0 || filters.budgets.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Sections */}
            <div className="overflow-y-auto p-4 space-y-6" style={{ maxHeight: 'calc(90vh - 140px)' }}>
              {/* Budget Filter */}
              <div>
                <h3 className="font-medium mb-3">Budget</h3>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => toggleFilter('budgets', budget)}
                      className={cn(
                        'px-4 py-2 rounded-full border transition-colors',
                        filters.budgets.includes(budget)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      )}
                    >
                      {'€'.repeat(parseInt(budget))}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="font-medium mb-3">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleFilter('types', type)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm border transition-colors',
                        filters.types.includes(type)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cuisine Filter */}
              <div>
                <h3 className="font-medium mb-3">Cuisine</h3>
                <div className="flex flex-wrap gap-2">
                  {cuisines.slice(0, 15).map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => toggleFilter('cuisines', cuisine)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm border transition-colors',
                        filters.cuisines.includes(cuisine)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      )}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-white">
              <button
                onClick={onClose}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
              >
                Show {restaurants.filter(r => {
                  if (filters.types.length && !filters.types.includes(r.type)) return false
                  if (filters.cuisines.length && !filters.cuisines.includes(r.cuisine)) return false
                  if (filters.budgets.length && !filters.budgets.includes(r.budget)) return false
                  return true
                }).length} restaurants
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
