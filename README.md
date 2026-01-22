# Candy Match 🍬

Match-3 Puzzle Game for Base.app and Farcaster

## Features

- 🎮 Classic match-3 puzzle mechanics
- 🍬 6 different candy types with vibrant colors
- 🎯 Level-based progression with target scores
- 💫 Combo system for bonus points
- 🎁 NFT rewards (Level 10, 20, 30)
- 📱 Mobile-optimized touch controls
- 🔊 Sound effects and animations
- 🌐 Web3 integration with Base Network

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React Three Fiber (3D graphics)
- Wagmi + Viem (Web3)
- OnchainKit (Coinbase)
- Framer Motion (animations)
- Howler.js (audio)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
cp .env.local.example .env.local
```

3. Run development server:
```bash
npm run dev
```

## Deployment

1. Deploy to Vercel
2. Update `public/.well-known/farcaster.json` with your domain
3. Generate account association at https://farcaster.xyz/~/developers/mini-apps/manifest
4. Add accountAssociation to farcaster.json
5. Validate at https://base.dev/preview

## Base.app Requirements

- ✅ Load time < 3 seconds
- ✅ Touch targets ≥ 44px
- ✅ Light and dark mode support
- ✅ Client-agnostic (no hard-coded Farcaster links)
- ✅ Sponsored transactions
- ✅ Clear onboarding

## License

MIT
