'use client'

import { Search, SlidersHorizontal } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onFilterClick: () => void
  resultCount: number
}

export function SearchBar({ value, onChange, onFilterClick, resultCount }: SearchBarProps) {
  return (
    <div className="bg-white rounded-full shadow-lg flex items-center gap-2 p-2">
      <div className="flex items-center gap-2 flex-1 px-3">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 outline-none text-gray-900 placeholder-gray-400 bg-transparent"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="text-sm font-medium">Filters</span>
        <span className="text-xs bg-primary text-white px-1.5 py-0.5 rounded-full">
          {resultCount}
        </span>
      </button>
    </div>
  )
}
