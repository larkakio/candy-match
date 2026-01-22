# Installation Instructions

## Dependency Conflict Fix

The project has been updated to use **React 18** instead of React 19 to be compatible with `@coinbase/onchainkit`.

## Installation Options

### Option 1: Standard Install (Recommended)
```bash
npm install
```

### Option 2: If you encounter permission issues
Try using a different Node version manager or fix npm permissions:
```bash
# Fix npm permissions (if needed)
sudo chown -R $(whoami) ~/.npm
```

### Option 3: Use legacy peer deps (if you want React 19)
If you prefer to keep React 19, you can install with:
```bash
npm install --legacy-peer-deps
```

However, this may cause compatibility issues with OnchainKit.

## After Installation

1. **Start development server:**
```bash
npm run dev
```

2. **Build for production:**
```bash
npm run build
```

## Current Versions

- Next.js: 15.0.0
- React: 18.3.1 (compatible with OnchainKit)
- OnchainKit: 0.5.0
- Wagmi: 2.12.0
- Viem: 2.21.0

## Troubleshooting

If you still encounter issues:

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check Node version:**
```bash
node --version
# Should be Node 18.x or 20.x
```
