'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, PanInfo, useAnimation } from 'framer-motion'
import { ChevronUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Restaurant } from '@/types'

interface BottomSheetProps {
  children: React.ReactNode
  selectedRestaurant: Restaurant | null
  onClose: () => void
}

type SheetState = 'collapsed' | 'half' | 'full'

export function BottomSheet({ children, selectedRestaurant, onClose }: BottomSheetProps) {
  const [sheetState, setSheetState] = useState<SheetState>('collapsed')
  const controls = useAnimation()
  const constraintsRef = useRef(null)

  // Reset to half when restaurant is selected
  useEffect(() => {
    if (selectedRestaurant) {
      setSheetState('half')
    }
  }, [selectedRestaurant])

  const handleDrag = (event: any, info: PanInfo) => {
    const threshold = 50
    const velocity = info.velocity.y
    const offset = info.offset.y

    if (offset < -threshold || velocity < -500) {
      // Dragging up
      if (sheetState === 'collapsed') setSheetState('half')
      else if (sheetState === 'half') setSheetState('full')
    } else if (offset > threshold || velocity > 500) {
      // Dragging down
      if (sheetState === 'full') setSheetState('half')
      else if (sheetState === 'half') {
        if (selectedRestaurant) {
          onClose()
          setSheetState('collapsed')
        } else {
          setSheetState('collapsed')
        }
      }
    }
  }

  const getSheetHeight = () => {
    switch (sheetState) {
      case 'collapsed':
        return '80px'
      case 'half':
        return '50vh'
      case 'full':
        return '90vh'
    }
  }

  return (
    <motion.div
      ref={constraintsRef}
      initial={{ height: '80px' }}
      animate={{ height: getSheetHeight() }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className={cn(
        'absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20 overflow-hidden',
        sheetState === 'collapsed' && 'cursor-pointer'
      )}
      onClick={() => sheetState === 'collapsed' && setSheetState('half')}
    >
      {/* Drag Handle */}
      <div
        className="flex items-center justify-center py-3 cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDrag}
          className="w-12 h-1.5 bg-gray-300 rounded-full"
        />
      </div>

      {/* Close button when in detail view */}
      {selectedRestaurant && sheetState !== 'collapsed' && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
            setSheetState('half')
          }}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      {/* Content */}
      <div className="overflow-y-auto h-full pb-20" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
