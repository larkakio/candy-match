export type CandyType = 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'yellow'

export type SpecialCandy = 'striped-h' | 'striped-v' | 'wrapped' | 'color-bomb' | null

export interface Candy {
  id: string
  type: CandyType
  special: SpecialCandy
  row: number
  col: number
  isMatched: boolean
  isFalling: boolean
  isSwapping: boolean
}

export interface GameState {
  level: number
  score: number
  moves: number
  targetScore: number
  board: Candy[][]
  selectedCandy: { row: number; col: number } | null
  isPlaying: boolean
  isPaused: boolean
  isComplete: boolean
  isAnimating: boolean
  combo: number
  pendingSwap: { row1: number; col1: number; row2: number; col2: number } | null
  showLevelComplete: boolean
}

export interface MatchResult {
  candies: Candy[]
  score: number
  specialCandies: Candy[]
}

export interface GameSettings {
  soundEnabled: boolean
  vibrationEnabled: boolean
  musicEnabled: boolean
}
