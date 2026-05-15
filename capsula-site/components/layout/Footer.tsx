import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/70">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <span className="text-cream font-display text-lg">V</span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-cream">Volos</span>
                <span className="font-display text-xl font-light text-rose italic ml-1">Capsula</span>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed text-cream/60 max-w-xs">
              Профессиональное наращивание волос в Бресте и Минске. Мастер Анна — 5 лет опыта, натуральный славянский волос.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="https://www.instagram.com/volos_capsula/" target="_blank"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-rose transition-colors">
                <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="https://t.me/volos_capsula" target="_blank"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-rose transition-colors">
                <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 14.6l-2.95-.924c-.642-.204-.657-.642.136-.953l11.57-4.461c.537-.194 1.006.131.858.959z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-body font-semibold text-cream mb-5 text-sm tracking-widest uppercase">Разделы</h4>
            <ul className="space-y-3">
              {[
                { href: "/services",   label: "Услуги и цены" },
                { href: "/calculator", label: "Калькулятор" },
                { href: "/portfolio",  label: "Портфолио" },
                { href: "/about",      label: "О мастере" },
                { href: "/contacts",   label: "Контакты" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-sm text-cream/60 hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-body font-semibold text-cream mb-5 text-sm tracking-widest uppercase">Контакты</h4>
            <ul className="space-y-3 text-sm text-cream/60 font-body">
              <li>📍 Брест, Беларусь</li>
              <li>📍 Минск (по записи)</li>
              <li>🌐 Онлайн-консультации</li>
              <li className="pt-2">
                <Link href="https://t.me/volos_capsula" target="_blank"
                  className="text-rose hover:text-blush transition-colors">
                  @volos_capsula
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-cream/10">
              <p className="text-xs text-cream/40 font-body">
                Запись через Telegram-бот<br />
                <Link href="https://t.me/volos_capsula" className="text-rose/70">@volos_capsula</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30 font-body">© 2025 Volos Capsula. Все права защищены.</p>
          <p className="text-xs text-cream/30 font-body italic font-display">
            Натуральный волос · Капсульное наращивание · 5 лет опыта
          </p>
        </div>
      </div>
    </footer>
  );
}
