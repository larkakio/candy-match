import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://candy-match-alpha.vercel.app'),
  title: 'Candy Match - Match-3 Puzzle Game',
  description: 'Addictive match-3 puzzle game on Base. Match colorful candies, create combos, and earn NFT rewards!',
  keywords: ['soap cutting', 'ASMR', 'game', 'Base', 'Web3', 'NFT'],
  
  // Base App ОБОВ'ЯЗКОВІ meta tags
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#FF69B4',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'fc:frame': 'vNext',
    'fc:frame:image': process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/icon.png` : '/icon.png',
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/hero-image.png` : '/hero-image.png',
      button: {
        title: 'Play Now',
        action: {
          type: 'launch_miniapp',
          name: 'Candy Match',
          url: process.env.NEXT_PUBLIC_APP_URL || 'https://candy-match-alpha.vercel.app'
        }
      }
    }),
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
