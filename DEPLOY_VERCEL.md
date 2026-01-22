# Швидкий деплой на Vercel

## Варіант 1: Через GitHub (Рекомендовано)

1. **Створіть репозиторій на GitHub:**
   ```bash
   # Додайте remote (замініть YOUR_USERNAME та YOUR_REPO)
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Імпортуйте проект в Vercel:**
   - Перейдіть на https://vercel.com
   - Натисніть "Add New Project"
   - Підключіть GitHub акаунт
   - Виберіть ваш репозиторій
   - Vercel автоматично визначить Next.js
   - Натисніть "Deploy"

3. **Налаштуйте Environment Variables (після першого деплою):**
   - Перейдіть в Settings → Environment Variables
   - Додайте:
     - `NEXT_PUBLIC_APP_URL` = `https://your-project.vercel.app`
     - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` = (отримайте на https://cloud.walletconnect.com)
     - `NEXT_PUBLIC_BASE_CHAIN_ID` = `8453`
   - Передеплойте проект

## Варіант 2: Через Vercel CLI

```bash
# 1. Авторизуйтесь (відкриє браузер)
vercel login

# 2. Деплой
vercel

# 3. Для production деплою
vercel --prod
```

## Після деплою

1. Оновіть `public/.well-known/farcaster.json` з вашим доменом
2. Згенеруйте account association на https://farcaster.xyz/~/developers/mini-apps/manifest
3. Додайте `base:app_id` в `app/layout.tsx` після реєстрації на Base.dev

Детальні інструкції в `DEPLOYMENT.md`
