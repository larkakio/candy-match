import { Candy, CandyType, SpecialCandy } from '@/types/game'
import { GAME_CONSTANTS } from './constants'

export function generateBoard(rows: number = GAME_CONSTANTS.BOARD_ROWS, cols: number = GAME_CONSTANTS.BOARD_COLS): Candy[][] {
  const board: Candy[][] = []
  
  for (let row = 0; row < rows; row++) {
    board[row] = []
    for (let col = 0; col < cols; col++) {
      let type: CandyType
      let special: SpecialCandy = null
      
      // Генеруємо тип, уникаючи початкових матчів
      do {
        type = GAME_CONSTANTS.CANDY_TYPES[
          Math.floor(Math.random() * GAME_CONSTANTS.CANDY_TYPES.length)
        ] as CandyType
      } while (wouldCreateMatch(board, row, col, type))
      
      board[row][col] = {
        id: `${row}-${col}`,
        type,
        special,
        row,
        col,
        isMatched: false,
        isFalling: false,
        isSwapping: false,
      }
    }
  }
  
  return board
}

function wouldCreateMatch(
  board: Candy[][],
  row: number,
  col: number,
  type: CandyType
): boolean {
  // Перевіряємо горизонтальний матч
  let horizontalCount = 1
  if (col >= 2 && board[row][col - 1]?.type === type && board[row][col - 2]?.type === type) {
    horizontalCount = 3
  }
  
  // Перевіряємо вертикальний матч
  let verticalCount = 1
  if (row >= 2 && board[row - 1][col]?.type === type && board[row - 2][col]?.type === type) {
    verticalCount = 3
  }
  
  return horizontalCount >= 3 || verticalCount >= 3
}

export function findMatches(board: Candy[][]): Candy[] {
  const matched: Set<string> = new Set()
  const rows = board.length
  const cols = board[0]?.length || 0
  
  if (rows === 0 || cols === 0) return []
  
  // Горизонтальні матчі
  for (let row = 0; row < rows; row++) {
    let count = 1
    let currentType = board[row]?.[0]?.type
    
    if (!currentType) continue
    
    for (let col = 1; col < cols; col++) {
      const candy = board[row]?.[col]
      if (!candy) continue
      
      if (candy.type === currentType) {
        count++
      } else {
        // Якщо знайшли матч з 3+ цукерками
        if (count >= GAME_CONSTANTS.MIN_MATCH) {
          for (let i = col - count; i < col; i++) {
            const matchCandy = board[row]?.[i]
            if (matchCandy) {
              matched.add(`${matchCandy.row}-${matchCandy.col}`)
            }
          }
        }
        count = 1
        currentType = candy.type
      }
    }
    
    // Перевіряємо матч в кінці рядка
    if (count >= GAME_CONSTANTS.MIN_MATCH) {
      for (let i = cols - count; i < cols; i++) {
        const matchCandy = board[row]?.[i]
        if (matchCandy) {
          matched.add(`${matchCandy.row}-${matchCandy.col}`)
        }
      }
    }
  }
  
  // Вертикальні матчі
  for (let col = 0; col < cols; col++) {
    let count = 1
    let currentType = board[0]?.[col]?.type
    
    if (!currentType) continue
    
    for (let row = 1; row < rows; row++) {
      const candy = board[row]?.[col]
      if (!candy) continue
      
      if (candy.type === currentType) {
        count++
      } else {
        // Якщо знайшли матч з 3+ цукерками
        if (count >= GAME_CONSTANTS.MIN_MATCH) {
          for (let i = row - count; i < row; i++) {
            const matchCandy = board[i]?.[col]
            if (matchCandy) {
              matched.add(`${matchCandy.row}-${matchCandy.col}`)
            }
          }
        }
        count = 1
        currentType = candy.type
      }
    }
    
    // Перевіряємо матч в кінці стовпця
    if (count >= GAME_CONSTANTS.MIN_MATCH) {
      for (let i = rows - count; i < rows; i++) {
        const matchCandy = board[i]?.[col]
        if (matchCandy) {
          matched.add(`${matchCandy.row}-${matchCandy.col}`)
        }
      }
    }
  }
  
  // Фільтруємо цукерки за координатами
  const matchedCandies: Candy[] = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const candy = board[row]?.[col]
      if (candy && matched.has(`${candy.row}-${candy.col}`)) {
        matchedCandies.push(candy)
      }
    }
  }
  
  return matchedCandies
}

export function calculateScore(matches: Candy[], combo: number = 1): number {
  const baseScore = matches.length * GAME_CONSTANTS.SCORE_BASE
  const comboMultiplier = 1 + (combo - 1) * 0.5
  return Math.floor(baseScore * comboMultiplier)
}
