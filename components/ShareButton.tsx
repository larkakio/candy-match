'use client'

import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { useState } from 'react'

export function ShareButton({ score, level }: { score: number; level: number }) {
  const { openUrl } = useFarcasterSDK()
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=share`
    : ''

  const shareText = `🍬 I just scored ${score} points on Level ${level} in Candy Match! Can you beat my score? 🎮`

  const handleShare = async () => {
    const farcasterShareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(shareUrl)}`

    // Використовуємо SDK openUrl щоб залишитись в додатку
    openUrl(farcasterShareUrl)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={handleShare}
        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
      >
        Share on Farcaster
      </button>
      <button
        onClick={handleCopy}
        className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-600 transition-all min-w-[60px]"
      >
        {copied ? '✓ Copied!' : '📋'}
      </button>
    </div>
  )
}
