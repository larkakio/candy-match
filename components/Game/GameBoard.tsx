'use client'

import { useGame } from '@/context/GameContext'
import { CandyTile } from './CandyTile'
import { useEffect } from 'react'
import { findMatches } from '@/lib/boardGenerator'
import { swapCandies as swapFn } from '@/lib/boardLogic'
import { GAME_CONSTANTS } from '@/lib/constants'

export function GameBoard() {
  const { gameState, selectCandy, swapCandies, processMatches, setGameState } = useGame()

  useEffect(() => {
    if (gameState.isAnimating && gameState.board.length > 0 && !gameState.showLevelComplete) {
      // Чекаємо завершення анімації swap перед обробкою матчів
      const timer = setTimeout(() => {
        try {
          // Скидаємо прапорці swapping
          setGameState((prev) => ({
            ...prev,
            board: prev.board.map((row) => row.map((candy) => ({ ...candy, isSwapping: false }))),
          }))
          
          // Обробляємо матчі якщо вони є
          processMatches()
        } catch (error) {
          console.error('Error in swap animation handler:', error)
          // Відновлюємо стан при помилці
          setGameState((prev) => ({
            ...prev,
            isAnimating: false,
            pendingSwap: null,
          }))
        }
      }, GAME_CONSTANTS.ANIMATION_DURATION)
      
      return () => clearTimeout(timer)
    } else if (!gameState.isAnimating && gameState.board.length > 0 && !gameState.showLevelComplete) {
      // Якщо анімація завершена, скидаємо прапорці swapping
      const hasSwapping = gameState.board.some(row => row.some(candy => candy.isSwapping))
      if (hasSwapping) {
        setGameState((prev) => ({
          ...prev,
          board: prev.board.map((row) => row.map((candy) => ({ ...candy, isSwapping: false }))),
        }))
      }
      
      // Перевіряємо чи є матчі після завершення анімації
      const matches = findMatches(gameState.board)
      if (matches.length > 0) {
        processMatches()
      }
    }
  }, [gameState.isAnimating, gameState.board, gameState.showLevelComplete, processMatches, setGameState])

  useEffect(() => {
    // Після обробки матчів, якщо є падіння, чекаємо і перевіряємо знову
    if (gameState.board.length > 0 && !gameState.isAnimating && !gameState.showLevelComplete) {
      const hasFalling = gameState.board.some(row => row.some(candy => candy.isFalling))
      
      if (hasFalling) {
        // Чекаємо завершення анімації падіння
        const timer = setTimeout(() => {
          const matches = findMatches(gameState.board)
          if (matches.length > 0) {
            processMatches()
          }
        }, GAME_CONSTANTS.FALL_DURATION)
        
        return () => clearTimeout(timer)
      } else {
        // Якщо немає падіння, перевіряємо чи є матчі (для автоматичних матчів після падіння)
        const matches = findMatches(gameState.board)
        if (matches.length > 0 && !gameState.isAnimating) {
          processMatches()
        }
      }
    }
  }, [gameState.board, gameState.isAnimating, gameState.showLevelComplete, processMatches])

  if (!gameState.isPlaying || gameState.board.length === 0) {
    return null
  }

  const handleCandyClick = (row: number, col: number) => {
    if (gameState.isAnimating || gameState.isPaused) return

    if (gameState.selectedCandy) {
      const { row: prevRow, col: prevCol } = gameState.selectedCandy
      
      if (prevRow === row && prevCol === col) {
        // Зняти вибір
        selectCandy(row, col)
      } else {
        // Перевіряємо чи сусідні
        const rowDiff = Math.abs(prevRow - row)
        const colDiff = Math.abs(prevCol - col)
        
        // Якщо сусідні - пробуємо swap
        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
          swapCandies(prevRow, prevCol, row, col)
        } else {
          // Якщо не сусідні - просто вибираємо нову
          selectCandy(row, col)
        }
      }
    } else {
      selectCandy(row, col)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto p-2 sm:p-4">
      <div 
        className="grid gap-0.5 sm:gap-1 bg-gray-800/30 p-1 sm:p-2 rounded-xl"
        style={{
          gridTemplateColumns: `repeat(${GAME_CONSTANTS.BOARD_COLS}, minmax(0, 1fr))`,
          aspectRatio: '1/1',
          maxWidth: '100%',
        }}
      >
        {gameState.board.map((row, rowIndex) =>
          row.map((candy) => (
            <CandyTile
              key={candy.id}
              candy={candy}
              isSelected={
                gameState.selectedCandy?.row === candy.row &&
                gameState.selectedCandy?.col === candy.col
              }
              onClick={() => handleCandyClick(candy.row, candy.col)}
            />
          ))
        )}
      </div>
    </div>
  )
}
