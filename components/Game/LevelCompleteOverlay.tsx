'use client'

import { useGame } from '@/context/GameContext'
import { motion } from 'framer-motion'

export function LevelCompleteOverlay() {
  const { gameState, nextLevel, exitToMenu } = useGame()

  if (!gameState.showLevelComplete) return null

  const getLevelName = (level: number): string => {
    const levelNames: Record<number, string> = {
      1: 'first',
      2: 'second',
      3: 'third',
      4: 'fourth',
      5: 'fifth',
    }
    return levelNames[level] || `${level}th`
  }

  const levelName = getLevelName(gameState.level)

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex items-center justify-center pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 rounded-2xl p-8 text-center max-w-md mx-4 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          {levelName.charAt(0).toUpperCase() + levelName.slice(1)} Level Completed Successfully!
        </h2>
        
        <div className="text-white/90 mb-6 mt-4">
          <p className="text-xl mb-2">Final Score: <span className="font-bold text-yellow-300">{gameState.score.toLocaleString()}</span></p>
          <p className="text-sm text-gray-300">Moves left: {gameState.moves}</p>
        </div>

        <div className="text-white/80 mb-6">
          <p className="text-lg">Do you want to continue to the next level?</p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={nextLevel}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Continue
          </button>
          <button
            onClick={exitToMenu}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Exit
          </button>
        </div>
      </motion.div>
    </div>
  )
}
