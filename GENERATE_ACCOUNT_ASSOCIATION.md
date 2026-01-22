# Як згенерувати Account Association через Farcaster

## Проблема
Base Build не може знайти signer, тому що `accountAssociation` має бути згенеровано через Farcaster, а не через Base Build.

## Рішення

### Крок 1: Перейдіть на Farcaster Manifest Tool

Відкрийте в браузері:
```
https://farcaster.xyz/~/developers/mini-apps/manifest?domain=candy-match-alpha.vercel.app
```

### Крок 2: Згенеруйте Account Association

1. На сторінці Farcaster Manifest Tool ви побачите форму
2. Введіть ваш домен: `candy-match-alpha.vercel.app`
3. Натисніть кнопку **"Generate account association"** або **"Sign"**
4. Вас перенаправить на Farcaster для авторизації
5. Підпишіть повідомлення вашим Farcaster акаунтом

### Крок 3: Скопіюйте Account Association

Після підпису ви отримаєте JSON об'єкт з `accountAssociation`:
```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  }
}
```

### Крок 4: Додайте до farcaster.json

Додайте `accountAssociation` на початок вашого `public/.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "version": "1",
  "name": "Candy Match",
  ...
}
```

### Крок 5: Зробіть Commit та Push

```bash
git add public/.well-known/farcaster.json
git commit -m "Add accountAssociation from Farcaster"
git push origin main
```

### Крок 6: Перевірте в Base Build

Після деплою на Vercel:
1. Перейдіть на `https://base.dev/preview?url=https://candy-match-alpha.vercel.app&tab=account`
2. Перевірте, що всі чекбокси зелені:
   - ✅ Account associated
   - ✅ Domain matches
   - ✅ Signature Valid

## Якщо не перенаправляє

Якщо вас не перенаправляє на Farcaster:

1. **Перевірте, що `farcaster.json` доступний:**
   - Відкрийте: `https://candy-match-alpha.vercel.app/.well-known/farcaster.json`
   - Переконайтеся, що файл завантажується правильно

2. **Перевірте структуру `farcaster.json`:**
   - Має бути валідний JSON
   - Має містити всі обов'язкові поля
   - `canonicalDomain` має бути БЕЗ `https://`

3. **Спробуйте інший спосіб:**
   - Відкрийте: `https://farcaster.xyz/~/developers/mini-apps`
   - Введіть домен вручну
   - Натисніть "Generate"

4. **Очистіть кеш браузера** та спробуйте знову

## Альтернативний спосіб

Якщо Farcaster tool не працює, ви можете згенерувати `accountAssociation` вручну через Base Build:

1. В Base Build натисніть "Update account association"
2. Скопіюйте JSON з модального вікна
3. Додайте до `farcaster.json`
4. Зробіть commit та push

Але краще використовувати Farcaster tool для правильної верифікації.
