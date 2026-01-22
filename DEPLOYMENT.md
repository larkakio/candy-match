# Deployment Guide for Slice & Shine

## Prerequisites

1. Vercel account
2. Base.app account
3. Farcaster account
4. Domain (optional, Vercel provides free subdomain)

## Step 1: Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - From WalletConnect Cloud
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - From Coinbase (optional)
   - `NEXT_PUBLIC_BASE_CHAIN_ID=8453`

4. Deploy

## Step 2: Update Farcaster Manifest

1. After deployment, update `public/.well-known/farcaster.json`:
   - Replace all `YOUR_DOMAIN` with your actual domain
   - Replace all `https://YOUR_DOMAIN` with your full URL
   - Ensure `canonicalDomain` has NO `https://` prefix

2. Commit and push changes

## Step 3: Generate Account Association

1. Go to: https://farcaster.xyz/~/developers/mini-apps/manifest?domain=YOUR_DOMAIN
2. Click "Generate account association"
3. Sign with your Farcaster account
4. Copy the `accountAssociation` object
5. Add it to `public/.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  ...
}
```

6. Commit and redeploy

## Step 4: Base.app Registration

1. Go to: https://base.dev
2. Create a new mini app
3. Add your app URL
4. Get your `base:app_id`
5. Update `app/layout.tsx`:

```typescript
other: {
  'base:app_id': 'YOUR_APP_ID',
  ...
}
```

6. Commit and redeploy

## Step 5: Validation

### Base.app Validation
1. Go to: https://base.dev/preview?url=YOUR_URL
2. Check all tabs:
   - **Metadata**: Verify all fields are correct
   - **Account association**: Verify credentials
   - **Preview**: Test the app launch

### Farcaster Validation
1. Go to: https://farcaster.xyz/~/developers/mini-apps/manifest?domain=YOUR_DOMAIN
2. Verify manifest is valid
3. Test in Warpcast app

## Step 6: Publish

1. Post your app URL in Base.app or Farcaster
2. Wait for indexing (can take a few hours)
3. Your app should appear in search results

## Checklist

- [ ] App loads in < 3 seconds
- [ ] All images are optimized (< 500KB each)
- [ ] Icon is 1024x1024 PNG (no transparency)
- [ ] Hero image is 1200x630
- [ ] Touch targets are ≥ 44px
- [ ] App works without Web3 (guest mode)
- [ ] Share button uses SDK (not window.open)
- [ ] `requiredChains` is `["eip155:8453"]` (string, not number)
- [ ] All URLs in farcaster.json are absolute
- [ ] Account association is added
- [ ] Base app_id is added to layout.tsx

## Troubleshooting

### Manifest not found
- Ensure `.well-known/farcaster.json` is in `public/.well-known/`
- Check Vercel rewrites if needed

### Account association fails
- Ensure domain matches exactly
- Check signature is valid
- Try regenerating

### App not appearing in search
- Wait 24-48 hours for indexing
- Post the app URL publicly
- Check manifest validation

## Resources

- [Base Mini Apps Docs](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Farcaster Frame v2 Spec](https://docs.farcaster.xyz/developers/frames/v2/spec)
- [Base Preview Tool](https://base.dev/preview)
- [Farcaster Manifest Validator](https://farcaster.xyz/~/developers/mini-apps)
