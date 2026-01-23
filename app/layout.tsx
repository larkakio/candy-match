import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

const FC_EMBED = {
  version: '1',
  imageUrl: 'https://candy-match-alpha.vercel.app/hero-image.png',
  button: {
    title: 'Play Now',
    action: {
      type: 'launch_frame' as const,
      name: 'Candy Match',
      url: 'https://candy-match-alpha.vercel.app/',
      splashImageUrl: 'https://candy-match-alpha.vercel.app/hero-image.png',
      splashBackgroundColor: '#1a1a1a',
    },
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://candy-match-alpha.vercel.app'),
  title: 'Candy Match - Match-3 Puzzle Game',
  description: 'Addictive match-3 puzzle game on Base. Match colorful candies, create combos, and earn NFT rewards!',
  keywords: ['soap cutting', 'ASMR', 'game', 'Base', 'Web3', 'NFT'],
  
  // Farcaster Mini App Embed: fc:miniapp + fc:frame (same JSON per spec)
  // Spec: version "1", action.type "launch_frame" — https://miniapps.farcaster.xyz/docs/specification
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#FF69B4',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
    'base:app_id': '697261b988e3bac59cf3d3c2',
  },
  
  // Open Graph
  openGraph: {
    title: 'Candy Match - Match-3 Puzzle',
    description: 'Addictive match-3 puzzle game. Match candies and win!',
    images: ['/hero-image.png'],
    type: 'website',
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Candy Match',
    description: 'Match-3 puzzle game on Base',
    images: ['/hero-image.png'],
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '1024x1024' },
    ],
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
