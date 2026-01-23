'use client'

import { useState } from 'react'
import { GameProvider } from '@/context/GameContext'
import { FarcasterReady } from '@/components/FarcasterReady'
import { MainMenu } from '@/components/Menu/MainMenu'
import { LevelSelect } from '@/components/Menu/LevelSelect'
import { Settings } from '@/components/Menu/Settings'
import { GameUI } from '@/components/Game/GameUI'
import { GameBoard } from '@/components/Game/GameBoard'
import { PauseOverlay } from '@/components/Game/PauseOverlay'
import { LevelCompleteOverlay } from '@/components/Game/LevelCompleteOverlay'
import { useGame } from '@/context/GameContext'

type View = 'menu' | 'levelSelect' | 'settings' | 'game'

function GameContent() {
  const [view, setView] = useState<View>('menu')
  const { gameState } = useGame()

  if (gameState.isPlaying) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 overflow-auto">
        <GameUI />
        <div className="pt-20 pb-8 flex items-center justify-center min-h-screen">
          <GameBoard />
        </div>
        {gameState.isPaused && <PauseOverlay />}
        {gameState.showLevelComplete && <LevelCompleteOverlay />}
      </div>
    )
  }

  switch (view) {
    case 'levelSelect':
      return <LevelSelect onBack={() => setView('menu')} />
    case 'settings':
      return <Settings onBack={() => setView('menu')} />
    default:
      return <MainMenu onNavigate={setView} />
  }
}

export default function Home() {
  return (
    <GameProvider>
      <FarcasterReady />
      <GameContent />
    </GameProvider>
  )
}
