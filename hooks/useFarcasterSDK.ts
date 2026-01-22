import { useEffect, useState } from 'react'

interface FarcasterSDK {
  context: {
    user?: {
      fid: number
      username: string
      displayName: string
      pfpUrl: string
    }
  }
  actions: {
    ready: () => void
    openUrl: (url: string) => void
    close: () => void
  }
}

export function useFarcasterSDK() {
  const [sdk, setSDK] = useState<FarcasterSDK | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Farcaster SDK інжектиться автоматично клієнтами (Warpcast, тощо)
    const farcasterSDK = (window as any).farcaster as FarcasterSDK | undefined

    if (farcasterSDK) {
      setSDK(farcasterSDK)
      // Сигналізуємо що додаток готовий
      farcasterSDK.actions.ready()
      setIsReady(true)
    } else {
      // Fallback для звичайного браузера
      console.log('Running outside Farcaster context')
      setIsReady(true)
    }
  }, [])

  return {
    sdk,
    isReady,
    user: sdk?.context?.user,
    // Helper функції
    openUrl: (url: string) => {
      if (sdk) {
        // Використовуємо SDK для навігації всередині додатку
        sdk.actions.openUrl(url)
      } else {
        // Fallback для браузера
        window.open(url, '_blank')
      }
    },
    close: () => {
      if (sdk) {
        sdk.actions.close()
      }
    },
  }
}
