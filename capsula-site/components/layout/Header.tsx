"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/",           label: "Главная" },
  { href: "/services",   label: "Услуги и цены" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/portfolio",  label: "Портфолио" },
  { href: "/about",      label: "О мастере" },
  { href: "/contacts",   label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-sand/50 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-espresso flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <span className="text-cream font-display text-lg font-medium">V</span>
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-espresso tracking-wide">
                Volos
              </span>
              <span className="font-display text-xl font-light text-rose ml-1 italic">
                Capsula
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium tracking-wide transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-espresso text-cream"
                    : "text-mink hover:text-espresso hover:bg-sand/60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <Link
              href="https://t.me/volos_capsula"
              target="_blank"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-espresso text-cream text-sm font-body font-medium rounded-full hover:bg-rose transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 14.6l-2.95-.924c-.642-.204-.657-.642.136-.953l11.57-4.461c.537-.194 1.006.131.858.959z"/>
              </svg>
              Записаться
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-espresso hover:text-rose transition-colors"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-cream z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display text-xl font-semibold text-espresso">Меню</span>
                <button onClick={() => setOpen(false)} className="text-mink hover:text-rose">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-2 flex-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-5 py-3.5 rounded-2xl font-body font-medium text-base transition-all ${
                        pathname === item.href
                          ? "bg-espresso text-cream"
                          : "text-espresso hover:bg-sand"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="pt-8 border-t border-sand">
                <Link
                  href="https://t.me/volos_capsula"
                  target="_blank"
                  className="btn-primary w-full justify-center"
                >
                  Записаться в Telegram
                </Link>
                <p className="text-center text-sm text-mink mt-4">
                  📍 Брест · Минск · онлайн
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
