'use client'

import { useGame } from '@/context/GameContext'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { motion } from 'framer-motion'

interface MainMenuProps {
  onNavigate: (view: 'levelSelect' | 'settings') => void
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const { startGame } = useGame()
  const { user } = useFarcasterSDK()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🍬</h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Candy Match
          </h2>
          <p className="text-gray-300 text-sm">Match-3 Puzzle Game</p>
          {user && (
            <p className="text-gray-400 text-xs mt-2">Welcome, {user.displayName || user.username}!</p>
          )}
        </div>

        <div className="space-y-4">
          <button
            onClick={() => startGame(1)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg text-lg"
          >
            🎮 Start Game
          </button>
          
          <button
            onClick={() => onNavigate('levelSelect')}
            className="w-full bg-white/10 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            📊 Level Select
          </button>
          
          <button
            onClick={() => onNavigate('settings')}
            className="w-full bg-white/10 text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            ⚙️ Settings
          </button>
        </div>
      </motion.div>
    </div>
  )
}
