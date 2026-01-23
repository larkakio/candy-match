'use client'

import { useEffect } from 'react'

/**
 * Calls sdk.actions.ready() when the app is mounted so Farcaster
 * hides the splash screen. Required for Mini Apps running inside Farcaster.
 * Uses dynamic import to avoid SSR issues.
 */
export function FarcasterReady() {
  useEffect(() => {
    import('@farcaster/miniapp-sdk').then(({ sdk }) => {
      sdk.actions.ready().catch(() => {})
    }).catch(() => {})
  }, [])
  return null
}
