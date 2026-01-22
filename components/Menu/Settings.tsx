'use client'

import { useGame } from '@/context/GameContext'
import { motion } from 'framer-motion'

interface SettingsProps {
  onBack: () => void
}

export function Settings({ onBack }: SettingsProps) {
  const { settings, updateSettings, resetGame } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between text-white">
            <span>Sound Effects</span>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </label>
          
          <label className="flex items-center justify-between text-white">
            <span>Vibration</span>
            <input
              type="checkbox"
              checked={settings.vibrationEnabled}
              onChange={(e) => updateSettings({ vibrationEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </label>
          
          <label className="flex items-center justify-between text-white">
            <span>Background Music</span>
            <input
              type="checkbox"
              checked={settings.musicEnabled}
              onChange={(e) => updateSettings({ musicEnabled: e.target.checked })}
              className="w-5 h-5"
            />
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onBack}
            className="flex-1 bg-white/10 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            Back
          </button>
          <button
            onClick={resetGame}
            className="flex-1 bg-red-500/20 text-red-400 font-semibold py-3 px-6 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30"
          >
            Reset Progress
          </button>
        </div>
      </motion.div>
    </div>
  )
}
