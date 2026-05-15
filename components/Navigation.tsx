"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги и цены" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/about", label: "О мастере" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Закрывать меню при смене страницы
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Блокировать скролл body когда меню открыто
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF7F2]/95 dark:bg-[#1a1210]/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 md:h-18 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Volos Capsula — главная"
          >
            <div className="w-8 h-8 rounded-full bg-[#3D2B1F] flex items-center justify-center text-white font-[Cormorant_Garamond] text-sm font-bold shrink-0">
              V
            </div>
            <span className="font-[Cormorant_Garamond] text-lg text-[#3D2B1F] dark:text-[#FAF7F2]">
              Volos{" "}
              <em className="not-italic text-[#C9897A]">Capsula</em>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg font-[Jost] text-sm transition-colors ${
                  pathname === href
                    ? "text-[#C9897A] bg-[#C9897A]/10"
                    : "text-[#3D2B1F]/70 dark:text-[#FAF7F2]/70 hover:text-[#C9897A] hover:bg-[#C9897A]/5"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://t.me/haircapsula_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#3D2B1F] dark:bg-[#C9897A] text-white font-[Jost] text-sm hover:bg-[#C9897A] dark:hover:bg-[#b87a6c] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.018 9.51c-.149.668-.543.831-1.1.517l-3.053-2.248-1.47 1.415c-.163.163-.3.3-.614.3l.218-3.1 5.643-5.095c.245-.218-.054-.339-.381-.12L7.29 14.078l-2.983-.933c-.648-.203-.661-.648.136-.96l11.65-4.493c.54-.196 1.012.12.469 2.556z"/>
            </svg>
            Записаться
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 rounded-lg hover:bg-[#C9897A]/10 transition-colors"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              className="block w-5 h-0.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#FAF7F2] dark:bg-[#1a1210] pt-20 px-6 pb-8 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={href}
                    className={`block px-4 py-4 rounded-xl font-[Jost] text-lg transition-colors ${
                      pathname === href
                        ? "text-[#C9897A] bg-[#C9897A]/10"
                        : "text-[#3D2B1F] dark:text-[#FAF7F2] hover:text-[#C9897A] hover:bg-[#C9897A]/5"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="mt-8"
            >
              <a
                href="https://t.me/haircapsula_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#3D2B1F] text-white font-[Jost] text-base hover:bg-[#C9897A] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.018 9.51c-.149.668-.543.831-1.1.517l-3.053-2.248-1.47 1.415c-.163.163-.3.3-.614.3l.218-3.1 5.643-5.095c.245-.218-.054-.339-.381-.12L7.29 14.078l-2.983-.933c-.648-.203-.661-.648.136-.96l11.65-4.493c.54-.196 1.012.12.469 2.556z"/>
                </svg>
                Записаться через бот
              </a>
            </motion.div>

            {/* Соцсети */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-6 flex items-center gap-4"
            >
              <a
                href="https://www.instagram.com/volos_capsula/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[Jost] text-sm text-[#3D2B1F]/50 hover:text-[#C9897A] transition-colors"
              >
                Instagram
              </a>
              <span className="text-[#3D2B1F]/20">·</span>
              <a
                href="https://t.me/haircapsula_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="font-[Jost] text-sm text-[#3D2B1F]/50 hover:text-[#C9897A] transition-colors"
              >
                Telegram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
