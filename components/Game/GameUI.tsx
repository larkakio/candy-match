'use client'

import { useGame } from '@/context/GameContext'
import { ShareButton } from '../ShareButton'
import { motion } from 'framer-motion'

export function GameUI() {
  const { gameState, pauseGame, resumeGame } = useGame()

  if (!gameState.isPlaying) return null

  const progress = Math.min((gameState.score / gameState.targetScore) * 100, 100)

  return (
    <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
      {/* Компактна панель зверху */}
      <div className="flex justify-between items-center p-2 pointer-events-auto">
        <button
          onClick={() => gameState.isPaused ? resumeGame() : pauseGame()}
          className="bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-black/80 transition-all text-xl"
          aria-label={gameState.isPaused ? "Resume" : "Pause"}
        >
          {gameState.isPaused ? '▶️' : '⏸️'}
        </button>
        
        {/* Компактна інформація справа */}
        <div className="flex gap-3 items-center text-white text-sm">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-gray-400">Lv</span> {gameState.level}
          </div>
          {gameState.combo > 0 && (
            <div className="bg-yellow-500/80 backdrop-blur-sm rounded-lg px-2 py-1 text-yellow-100 font-bold">
              x{gameState.combo}
            </div>
          )}
        </div>
      </div>

      {/* Компактний прогрес-бар */}
      <div className="px-2 pointer-events-auto">
        <div className="w-full bg-gray-800/60 backdrop-blur-sm rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-white text-xs text-center mt-0.5 text-gray-300">
          {gameState.score.toLocaleString()} / {gameState.targetScore.toLocaleString()}
        </div>
      </div>

      {gameState.isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 bg-black/80 backdrop-blur-sm rounded-xl p-6 pointer-events-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            🎉 Level Complete!
          </h3>
          <div className="text-center text-white mb-4">
            <p className="text-lg">Final Score: {gameState.score.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Moves left: {gameState.moves}</p>
          </div>
          <ShareButton score={gameState.score} level={gameState.level} />
        </motion.div>
      )}

      {gameState.moves === 0 && !gameState.isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 bg-red-500/80 backdrop-blur-sm rounded-xl p-4 pointer-events-auto text-center"
        >
          <p className="text-white font-bold">No moves left! Game Over</p>
        </motion.div>
      )}
    </div>
  )
}
