'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { GameState, GameSettings, Candy } from '@/types/game'
import { generateBoard, findMatches, calculateScore } from '@/lib/boardGenerator'
import { swapCandies, removeMatches, applyGravity } from '@/lib/boardLogic'
import { GAME_CONSTANTS } from '@/lib/constants'

interface GameContextType {
  gameState: GameState
  settings: GameSettings
  startGame: (level: number) => void
  pauseGame: () => void
  resumeGame: () => void
  resetGame: () => void
  selectCandy: (row: number, col: number) => void
  swapCandies: (row1: number, col1: number, row2: number, col2: number) => void
  updateSettings: (settings: Partial<GameSettings>) => void
  processMatches: () => Promise<void>
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  nextLevel: () => void
  exitToMenu: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    moves: 0,
    targetScore: 1000,
    board: [],
    selectedCandy: null,
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    isAnimating: false,
    combo: 0,
    pendingSwap: null,
    showLevelComplete: false,
  })

  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    vibrationEnabled: true,
    musicEnabled: false,
  })

  const startGame = useCallback((level: number) => {
    const config = GAME_CONSTANTS.LEVEL_CONFIG[level as keyof typeof GAME_CONSTANTS.LEVEL_CONFIG] || 
                   GAME_CONSTANTS.LEVEL_CONFIG[1]
    const board = generateBoard()
    
    setGameState({
      level,
      score: 0,
      moves: config.moves,
      targetScore: config.targetScore,
      board,
      selectedCandy: null,
      isPlaying: true,
      isPaused: false,
      isComplete: false,
      isAnimating: false,
      combo: 0,
      pendingSwap: null,
      showLevelComplete: false,
    })
  }, [])

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: true }))
  }, [])

  const resumeGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: false }))
  }, [])

  const resetGame = useCallback(() => {
    setGameState({
      level: 1,
      score: 0,
      moves: 0,
      targetScore: 1000,
      board: [],
      selectedCandy: null,
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      isAnimating: false,
      combo: 0,
      pendingSwap: null,
      showLevelComplete: false,
    })
  }, [])

  const selectCandy = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.isAnimating || !prev.isPlaying || prev.isPaused) return prev
      
      if (prev.selectedCandy) {
        const { row: prevRow, col: prevCol } = prev.selectedCandy
        
        // Якщо клікнули на ту саму цукерку - знімаємо вибір
        if (prevRow === row && prevCol === col) {
          return { ...prev, selectedCandy: null }
        }
        
        // Якщо клікнули на іншу - просто вибираємо нову
        return { ...prev, selectedCandy: { row, col } }
      } else {
        return { ...prev, selectedCandy: { row, col } }
      }
    })
  }, [])

  const swapCandiesHandler = useCallback((row1: number, col1: number, row2: number, col2: number) => {
    try {
      setGameState(prev => {
        // Перевіряємо чи гра активна
        if (!prev.isPlaying || prev.isPaused) {
          return prev
        }
        
        // Перевіряємо чи є валідні координати
        if (!prev.board[row1]?.[col1] || !prev.board[row2]?.[col2]) {
          return prev
        }
        
        // Перевіряємо чи не йде анімація (крім якщо це не swap)
        if (prev.isAnimating && !prev.pendingSwap) {
          return prev
        }
        
        // Робимо swap - завжди залишаємо його, навіть якщо немає матчів
        const newBoard = swapCandies(prev.board, row1, col1, row2, col2)
        
        // Позначаємо цукерки як swapping для анімації
        newBoard[row1][col1].isSwapping = true
        newBoard[row2][col2].isSwapping = true
        
        // Перевіряємо чи є матч після swap
        const matches = findMatches(newBoard)
        
        // Якщо є матчі - обробляємо їх після анімації swap
        // Якщо немає матчів - просто залишаємо swap
        return {
          ...prev,
          board: newBoard,
          moves: prev.moves > 0 ? prev.moves - 1 : 0,
          selectedCandy: null,
          isAnimating: matches.length > 0, // Анімація тільки якщо є матчі для обробки
          pendingSwap: null, // Більше не потрібен, бо завжди залишаємо swap
        }
      })
    } catch (error) {
      console.error('Error in swapCandiesHandler:', error)
      // Відновлюємо стан при помилці
      setGameState(prev => ({
        ...prev,
        selectedCandy: null,
        isAnimating: false,
        pendingSwap: null,
      }))
    }
  }, [])

  const processMatches = useCallback(async () => {
    try {
      setGameState(prev => {
        // Перевіряємо чи гра все ще активна
        if (!prev.isPlaying || prev.board.length === 0) {
          return { ...prev, isAnimating: false, pendingSwap: null }
        }
        
        // Скидаємо прапорці swapping та falling
        let currentBoard = prev.board.map(row => 
          row.map(candy => ({ 
            ...candy, 
            isSwapping: false,
            isFalling: false,
            isMatched: false 
          }))
        )
        
        const matches = findMatches(currentBoard)
        
        if (matches.length === 0) {
          return { ...prev, isAnimating: false, combo: 0, pendingSwap: null }
        }
        
        // Додаємо очки
        const currentCombo = prev.combo + 1
        const matchScore = calculateScore(matches, currentCombo)
        const newScore = Math.max(0, prev.score + matchScore) // Запобігаємо від'ємним очкам
        
        // Позначаємо матчі для видалення
        matches.forEach(match => {
          if (currentBoard[match.row]?.[match.col]) {
            currentBoard[match.row][match.col].isMatched = true
          }
        })
        
        // Застосовуємо гравітацію (це також створить нові цукерки)
        try {
          currentBoard = applyGravity(currentBoard)
        } catch (gravityError) {
          console.error('Error applying gravity:', gravityError)
          return { ...prev, isAnimating: false, pendingSwap: null }
        }
        
        // Перевіряємо чи є ще матчі після падіння
        const newMatches = findMatches(currentBoard)
        const hasMoreMatches = newMatches.length > 0
        
        const isComplete = newScore >= prev.targetScore
        
        // Якщо рівень завершено - показуємо екран завершення, але не викидаємо з гри
        if (isComplete && !prev.showLevelComplete) {
          return {
            ...prev,
            board: currentBoard,
            score: newScore,
            combo: 0,
            isComplete: true,
            isPlaying: true, // Залишаємо грати, щоб показати екран завершення
            isAnimating: false,
            pendingSwap: null,
            showLevelComplete: true, // Показуємо екран завершення
          }
        }
        
        return {
          ...prev,
          board: currentBoard,
          score: newScore,
          combo: hasMoreMatches ? currentCombo : 0,
          isComplete,
          isPlaying: prev.isPlaying && prev.moves > 0, // Не викидаємо з гри
          isAnimating: hasMoreMatches,
          pendingSwap: null, // Очищаємо pending swap при обробці матчів
        }
      })
    } catch (error) {
      console.error('Error in processMatches:', error)
      // Відновлюємо стан при помилці
      setGameState(prev => ({
        ...prev,
        isAnimating: false,
        pendingSwap: null,
      }))
    }
  }, [])

  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const nextLevel = useCallback(() => {
    const nextLevelNum = gameState.level + 1
    const config = GAME_CONSTANTS.LEVEL_CONFIG[nextLevelNum as keyof typeof GAME_CONSTANTS.LEVEL_CONFIG] || 
                   GAME_CONSTANTS.LEVEL_CONFIG[1]
    const board = generateBoard()
    
    setGameState({
      level: nextLevelNum,
      score: 0,
      moves: config.moves,
      targetScore: config.targetScore,
      board,
      selectedCandy: null,
      isPlaying: true,
      isPaused: false,
      isComplete: false,
      isAnimating: false,
      combo: 0,
      pendingSwap: null,
      showLevelComplete: false,
    })
  }, [gameState.level])

  const exitToMenu = useCallback(() => {
    setGameState({
      level: 1,
      score: 0,
      moves: 0,
      targetScore: 1000,
      board: [],
      selectedCandy: null,
      isPlaying: false,
      isPaused: false,
      isComplete: false,
      isAnimating: false,
      combo: 0,
      pendingSwap: null,
      showLevelComplete: false,
    })
  }, [])

  return (
    <GameContext.Provider
      value={{
        gameState,
        settings,
        startGame,
        pauseGame,
        resumeGame,
        resetGame,
        selectCandy,
        swapCandies: swapCandiesHandler,
        updateSettings,
        processMatches,
        setGameState,
        nextLevel,
        exitToMenu,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}
