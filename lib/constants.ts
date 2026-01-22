export const GAME_CONSTANTS = {
  BOARD_ROWS: 9,
  BOARD_COLS: 9,
  MIN_MATCH: 3,
  
  CANDY_TYPES: ['red', 'blue', 'green', 'purple', 'orange', 'yellow'] as const,
  
  SCORE_BASE: 60,
  SCORE_MULTIPLIER: 10,
  COMBO_MULTIPLIER: 1.5,
  
  LEVEL_CONFIG: {
    1: { targetScore: 1000, moves: 30 },
    2: { targetScore: 1500, moves: 25 },
    3: { targetScore: 2000, moves: 25 },
    4: { targetScore: 2500, moves: 20 },
    5: { targetScore: 3000, moves: 20 },
  },
  
  MAX_LEVEL: 100,
  TOUCH_TARGET_SIZE: 44,
  
  ANIMATION_DURATION: 300,
  SWAP_ANIMATION_DURATION: 500, // Більше часу для swap анімації
  FALL_DURATION: 400,
} as const

export const CANDY_COLORS: Record<string, string> = {
  red: '#FF4444',
  blue: '#4444FF',
  green: '#44FF44',
  purple: '#AA44FF',
  orange: '#FF8844',
  yellow: '#FFFF44',
}

export const SPECIAL_CANDY_SCORES = {
  'striped-h': 200,
  'striped-v': 200,
  'wrapped': 300,
  'color-bomb': 500,
} as const
