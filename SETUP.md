# Quick Setup Guide

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
npm start
```

## Before Deployment

### 1. Convert SVG to PNG Images

The project includes SVG placeholders. Before deployment, convert them to PNG:

**Icon (1024x1024):**
- Use ImageMagick: `convert -background white -size 1024x1024 public/icon.svg public/icon.png`
- Or use online tools like CloudConvert
- **Important**: Base.app requires PNG with NO transparency

**Hero Image (1200x630):**
- `convert -background white -size 1200x630 public/hero-image.svg public/hero-image.png`

### 2. Add Audio Files (Optional)

Place audio files in `public/sounds/`:
- `slice.mp3` - ASMR cutting sound
- `complete.mp3` - Level completion sound
- `bg-music.mp3` - Background music (optional)

If files are missing, the app will work but without sound effects.

### 3. Update Farcaster Manifest

Before first deployment:
1. Deploy to get your domain
2. Update `public/.well-known/farcaster.json`:
   - Replace `YOUR_DOMAIN` with your actual domain
   - Replace `https://YOUR_DOMAIN` with your full URL
3. Generate account association (see DEPLOYMENT.md)

### 4. Get Base App ID

1. Register your app at https://base.dev
2. Get your `base:app_id`
3. Update `app/layout.tsx`:
```typescript
other: {
  'base:app_id': 'YOUR_APP_ID',
  ...
}
```

## Project Structure

```
Slice & Shine/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with Base meta tags
│   ├── page.tsx            # Main game page
│   ├── providers.tsx       # Web3 providers
│   └── api/                # API routes
├── components/
│   ├── Game/               # Game components
│   ├── Menu/                # Menu components
│   └── Web3/                # Web3 components
├── context/                # React contexts
├── hooks/                   # Custom hooks
├── lib/                     # Utilities
├── public/                  # Static assets
│   ├── .well-known/        # Farcaster manifest
│   └── sounds/             # Audio files
└── types/                   # TypeScript types
```

## Features Implemented

✅ Next.js 15 with App Router
✅ TypeScript strict mode
✅ Base.app integration
✅ Farcaster SDK integration
✅ Web3 with Wagmi + OnchainKit
✅ 3D graphics with React Three Fiber
✅ Game logic and state management
✅ Audio system with Howler.js
✅ Responsive design with Tailwind
✅ Touch controls for mobile
✅ Share functionality
✅ Settings and level selection

## Next Steps

1. Install dependencies: `npm install`
2. Convert SVG images to PNG
3. Add audio files (optional)
4. Test locally: `npm run dev`
5. Deploy to Vercel
6. Follow DEPLOYMENT.md for Base.app and Farcaster setup

## Support

- Base Docs: https://docs.base.org/mini-apps
- Farcaster Docs: https://docs.farcaster.xyz
- OnchainKit: https://onchainkit.xyz
