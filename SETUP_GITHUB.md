# Налаштування GitHub репозиторію

## Крок 1: Створіть репозиторій на GitHub

1. Перейдіть на https://github.com/new
2. Назва репозиторію: `candy-match` (або інша назва)
3. **НЕ** додавайте README, .gitignore або license (вони вже є)
4. Натисніть "Create repository"

## Крок 2: Додайте remote та зробіть push

```bash
# Додайте remote (замініть YOUR_USERNAME та YOUR_REPO на ваші)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Переконайтеся що ви на гілці main
git branch -M main

# Зробіть push
git push -u origin main
```

## Якщо репозиторій вже існує з іншим контентом

```bash
# Видаліть старий remote
git remote remove origin

# Додайте новий
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Force push (обережно! це перезапише існуючий контент)
git push -u origin main --force
```

## Якщо виникла помилка "Repository not found"

1. Перевірте правильність URL репозиторію
2. Переконайтеся що репозиторій існує на GitHub
3. Перевірте права доступу (репозиторій має бути публічним або ви маєте доступ)
4. Спробуйте використати SSH замість HTTPS:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
   ```

## Після успішного push

1. Перейдіть на https://vercel.com
2. Натисніть "Add New Project"
3. Підключіть GitHub
4. Виберіть ваш репозиторій
5. Натисніть "Deploy"
