'use client'

import { useGame } from '@/context/GameContext'
import { motion } from 'framer-motion'

interface LevelSelectProps {
  onBack: () => void
}

export function LevelSelect({ onBack }: LevelSelectProps) {
  const { startGame } = useGame()
  const levels = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Select Level</h2>
          <button
            onClick={onBack}
            className="bg-white/10 text-white font-semibold py-2 px-4 rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            Back
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {levels.map((level) => (
            <motion.button
              key={level}
              onClick={() => startGame(level)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white font-semibold hover:bg-white/20 transition-all border border-white/20 min-h-[60px]"
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
