# Kerege.ON

Юридическая ОС для AI/IT стартапов Казахстана: IP, данные, договоры, Astana Hub, инвестиционная готовность.

## Быстрый старт

```bash
npm install
npm run dev
```

Открывается на `http://localhost:5173`. Без настроенного Supabase сервис работает в demo-режиме (данные в localStorage).

## Сборка

```bash
npm run build
npm run preview
```

## Бэкенд, роли и подключение Supabase

См. [BACKEND.md](./BACKEND.md).

## Деплой

Пуш в ветку `claude/sleepy-meitner-6jjcvz` автоматически деплоит `dist/` на GitHub Pages (`.github/workflows/`).
