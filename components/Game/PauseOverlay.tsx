'use client'

import { useGame } from '@/context/GameContext'

export function PauseOverlay() {
  const { resumeGame } = useGame()

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center pointer-events-auto">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">⏸️ Paused</h2>
        <p className="text-white/80 mb-6">Game is paused</p>
        <button
          onClick={resumeGame}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-all"
        >
          Resume
        </button>
      </div>
    </div>
  )
}
