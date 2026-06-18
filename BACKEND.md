# Kerege.ON — роли и бэкенд

## Режимы работы

Платформа работает в двух режимах автоматически:

| | Demo-режим | Продакшн (Supabase) |
|---|---|---|
| Когда | нет env-переменных | заданы `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY` |
| Данные | localStorage браузера | таблица `workspaces` в Postgres |
| Авторизация | по списку demo-аккаунтов | реальный Supabase Auth |

## Роли

- **Клиент** (`client`) — видит весь workspace **только для просмотра** (Dashboard, IP Реестр, Data & AI, Astana Hub, Договоры, Investor Room, Client Journey) + проходит Legal Scan.
- **Сотрудник** (`admin`) — редактирует на всех этих страницах: риск-скоры (ползунки), статусы документов/договоров/IP-активов (клик по бейджу — циклически меняет статус), чек-листы (клик по пункту — done/not done), этапы Client Journey (клик по кругу-индикатору), и сохраняет изменения кнопкой «Сохранить» (`SaveBar`).

Все данные живут в одном объекте `WorkspaceData` (см. `src/lib/types.ts`) и грузятся/сохраняются через `useWorkspace()` (`src/lib/useWorkspace.ts`).

## Demo-вход

- Сотрудник: `admin@kerege.kz` (любой пароль)
- Клиент: `client@kerege.kz` (любой пароль)

## Подключение Supabase

1. Создайте проект на [supabase.com](https://supabase.com).
2. SQL Editor → выполните `supabase/schema.sql` (таблицы, триггеры, RLS).
3. Скопируйте `.env.example` → `.env.local`, заполните URL и anon key.
4. Зарегистрируйте пользователей (Auth → Users). Чтобы сделать сотрудника:
   ```sql
   update public.profiles set role = 'admin' where email = 'lawyer@kerege.kz';
   ```
5. `npm run build` — переменные `VITE_*` попадут в сборку.

## Безопасность

- RLS: клиент физически не может прочитать чужой workspace или изменить статусы — это проверяется на стороне БД, а не только в UI.
- Редактирование (`update`) разрешено политикой только сотрудникам (`is_admin()`).
- Anon key безопасно публиковать — доступ ограничен политиками RLS.
