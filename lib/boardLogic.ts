import { Candy, CandyType } from '@/types/game'
import { GAME_CONSTANTS } from './constants'
import { findMatches } from './boardGenerator'

export function swapCandies(
  board: Candy[][],
  row1: number,
  col1: number,
  row2: number,
  col2: number
): Candy[][] {
  const newBoard = board.map(row => row.map(candy => ({ ...candy })))
  
  // Зберігаємо оригінальні цукерки
  const candy1 = { ...newBoard[row1][col1] }
  const candy2 = { ...newBoard[row2][col2] }
  
  // Оновлюємо позиції
  candy1.row = row2
  candy1.col = col2
  candy2.row = row1
  candy2.col = col1
  
  // Міняємо місцями
  newBoard[row1][col1] = candy2
  newBoard[row2][col2] = candy1
  
  return newBoard
}

export function removeMatches(board: Candy[][]): Candy[][] {
  const matches = findMatches(board)
  const newBoard = board.map(row => row.map(candy => ({ ...candy })))
  
  matches.forEach(match => {
    const candy = newBoard[match.row][match.col]
    if (candy) {
      candy.isMatched = true
    }
  })
  
  return newBoard
}

export function applyGravity(board: Candy[][]): Candy[][] {
  const rows = board.length
  const cols = board[0]?.length || 0
  const newBoard: Candy[][] = []
  
  // Створюємо нову дошку
  for (let row = 0; row < rows; row++) {
    newBoard[row] = []
    for (let col = 0; col < cols; col++) {
      newBoard[row][col] = {
        id: `${row}-${col}`,
        type: 'red' as CandyType,
        special: null,
        row,
        col,
        isMatched: false,
        isFalling: false,
        isSwapping: false,
      }
    }
  }
  
  for (let col = 0; col < cols; col++) {
    let writeIndex = rows - 1
    
    // Переміщуємо всі не-матчені цукерки вниз
    for (let row = rows - 1; row >= 0; row--) {
      const candy = board[row][col]
      if (candy && !candy.isMatched) {
        const shouldFall = writeIndex !== row
        newBoard[writeIndex][col] = {
          ...candy,
          row: writeIndex,
          col,
          isFalling: shouldFall,
          isMatched: false,
        }
        writeIndex--
      }
    }
    
    // Заповнюємо порожні місця новими цукерками
    for (let row = writeIndex; row >= 0; row--) {
      const type = GAME_CONSTANTS.CANDY_TYPES[
        Math.floor(Math.random() * GAME_CONSTANTS.CANDY_TYPES.length)
      ] as CandyType
      
      newBoard[row][col] = {
        id: `${row}-${col}-${Date.now()}-${Math.random()}`,
        type,
        special: null,
        row,
        col,
        isMatched: false,
        isFalling: true,
        isSwapping: false,
      }
    }
  }
  
  return newBoard
}

export function isValidSwap(
  board: Candy[][],
  row1: number,
  col1: number,
  row2: number,
  col2: number
): boolean {
  // Перевіряємо, що цукерки сусідні
  const rowDiff = Math.abs(row1 - row2)
  const colDiff = Math.abs(col1 - col2)
  
  if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
    // Пробуємо swap і перевіряємо чи є матч
    const testBoard = swapCandies(board, row1, col1, row2, col2)
    const matches = findMatches(testBoard)
    return matches.length > 0
  }
  
  return false
}
