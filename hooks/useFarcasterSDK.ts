'use client'

import { useEffect, useState } from 'react'

// Сумісно з UserContext з @farcaster/miniapp-core (username, displayName, pfpUrl — optional)
type User = { fid: number; username?: string; displayName?: string; pfpUrl?: string }
type SDKActions = { actions: { openUrl: (u: string) => void; close: () => void } }

export function useFarcasterSDK() {
  const [sdk, setSdk] = useState<SDKActions | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    import('@farcaster/miniapp-sdk').then((m) => {
      setSdk({ actions: m.sdk.actions })
      m.sdk.context.then((ctx) => setUser(ctx.user)).catch(() => {})
    }).catch(() => {})
  }, [])

  return {
    sdk,
    isReady: true,
    user,
    openUrl: (url: string) => {
      try {
        if (sdk?.actions?.openUrl) sdk.actions.openUrl(url)
        else window.open(url, '_blank')
      } catch {
        window.open(url, '_blank')
      }
    },
    close: () => {
      try {
        sdk?.actions?.close?.() ?? window.close()
      } catch {
        window.close()
      }
    },
  }
}
