'use client'

import { Candy } from '@/types/game'
import { CANDY_COLORS } from '@/lib/constants'
import { motion } from 'framer-motion'

interface CandyTileProps {
  candy: Candy
  isSelected: boolean
  onClick: () => void
}

export function CandyTile({ candy, isSelected, onClick }: CandyTileProps) {
  const color = CANDY_COLORS[candy.type] || '#FFFFFF'
  
  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full h-full rounded-md sm:rounded-lg border-2 transition-all touch-manipulation ${
        isSelected 
          ? 'border-yellow-400 scale-105 sm:scale-110 shadow-lg z-10 ring-2 ring-yellow-300' 
          : 'border-transparent active:border-white/50'
      } ${candy.isMatched ? 'opacity-50' : ''}`}
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: candy.isFalling ? [0, 50, 0] : 0,
        scale: candy.isSwapping ? [1, 1.1, 1] : isSelected ? 1.05 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Спеціальні цукерки */}
      {candy.special === 'striped-h' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-white/80 rounded"></div>
        </div>
      )}
      {candy.special === 'striped-v' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-full bg-white/80 rounded"></div>
        </div>
      )}
      {candy.special === 'wrapped' && (
        <div className="absolute inset-1 border-2 border-white/60 rounded"></div>
      )}
      {candy.special === 'color-bomb' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-3/4 rounded-full bg-white/40"></div>
        </div>
      )}
      
      {/* Емодзі для різних типів */}
      <div className="absolute inset-0 flex items-center justify-center text-2xl">
        {candy.type === 'red' && '🍒'}
        {candy.type === 'blue' && '🍬'}
        {candy.type === 'green' && '🍏'}
        {candy.type === 'purple' && '🍇'}
        {candy.type === 'orange' && '🍊'}
        {candy.type === 'yellow' && '⭐'}
      </div>
    </motion.button>
  )
}
