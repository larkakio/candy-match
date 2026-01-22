'use client'

import { useAccount } from 'wagmi'
import { useGame } from '@/context/GameContext'

export function RewardClaim() {
  const { address } = useAccount()
  const { gameState } = useGame()

  // Check if user is eligible for NFT rewards
  const eligibleLevels = [10, 20, 30]
  const isEligible = eligibleLevels.includes(gameState.level) && gameState.isComplete

  if (!address || !isEligible) return null

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-2">🎁 Claim NFT Reward!</h3>
      <p className="mb-4">You've completed Level {gameState.level}!</p>
      <button className="bg-white text-purple-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all">
        Claim NFT
      </button>
    </div>
  )
}
