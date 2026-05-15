# Volos Capsula — Сайт мастера наращивания волос

## Стек
- **Next.js 14** App Router
- **TypeScript**
- **Tailwind CSS** — кастомная палитра (cream/espresso/rose/lavender)
- **Framer Motion** — анимации секций
- **Google Fonts**: Cormorant Garamond + Jost + Playfair Display

## Страницы
- `/` — Главная (Hero + Services + Calculator + About + Reviews + CTA)
- `/services` — Услуги и прайс
- `/calculator` — Интерактивный калькулятор
- `/portfolio` — Портфолио работ
- `/about` — О мастере
- `/contacts` — Контакты

## Запуск локально

```bash
npm install
npm run dev
```

## Деплой на Vercel

1. Залить в GitHub репо
2. Подключить Vercel → Import project
3. Framework: Next.js (автоопределится)
4. Deploy ✅

Никаких env переменных не нужно — сайт статический.

## Кастомизация

### Цвета (tailwind.config.ts)
```ts
cream: "#FAF7F2"     // основной фон
espresso: "#3D2B1F"  // тёмный текст
rose: "#C9897A"      // акцент
blush: "#E8C4B8"     // нежный розовый
lavender: "#B8AECF"  // сиреневый
```

### Добавить реальные фото в портфолио
Заменить placeholder-блоки в `app/portfolio/page.tsx` на `<Image>` из `next/image`.

### Подключить форму записи
Добавить Server Action в `app/actions/booking.ts` с @upstash/ratelimit + Zod валидацией.
