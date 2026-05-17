"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Instagram, Send } from "lucide-react";

const floatHeart = (i: number) => ({
  animate: {
    y: [0, -14 - i * 2, -6, 0],
    rotate: [0, 4 - i, -3 + i * 0.5, 0],
    opacity: [0.5, 0.85, 0.6, 0.5],
    transition: {
      duration: 5 + i * 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.9,
    },
  },
});

const particles = [
  { top: "14%", left: "42%", size: 22 },
  { top: "28%", left: "58%", size: 16 },
  { top: "62%", left: "35%", size: 18 },
  { top: "72%", left: "52%", size: 14 },
  { top: "18%", left: "70%", size: 20 },
  { top: "50%", left: "80%", size: 12 },
];

function HeartIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ── Banner image ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="/hero-banner.png"
          alt="Capssula — наращивание волос"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      {/* Left: for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
      {/* Bottom: soft fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* ── Floating decorative particles ── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-pink-300/50"
          style={{ top: p.top, left: p.left }}
          variants={floatHeart(i)}
          animate="animate"
        >
          {i % 2 === 0 ? <HeartIcon size={p.size} /> : <SparkleIcon size={p.size} />}
        </motion.div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-lg">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full mb-8"
          >
            <Sparkles size={13} className="text-pink-300" />
            <span className="font-body text-sm text-white/90 font-medium tracking-wide">
              Мастер Анна · Брест · Минск
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55 }}
            className="font-display font-light text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
          >
            Наращивание
            <br />
            <em className="italic text-pink-300">волос,</em>
            <br />
            которое{" "}
            <span className="relative inline-block">
              держится
              <svg
                className="absolute -bottom-1 left-0 right-0 w-full"
                viewBox="0 0 260 10"
                fill="none"
              >
                <motion.path
                  d="M2,7 Q50,2 100,7 Q150,12 200,7 Q230,3 258,7"
                  stroke="#f9a8d4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-body text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
          >
            Капсульное, биопротеиновое и ленточное наращивание на натуральном
            славянском волосе. 5 лет опыта, от 350 рублей.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pink-400 hover:bg-pink-300 text-white font-body font-medium text-sm tracking-wide rounded-full transition-colors duration-200"
            >
              Записаться
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-body font-medium text-sm tracking-wide rounded-full transition-colors duration-200"
            >
              Рассчитать стоимость
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { n: "5+", l: "лет опыта" },
              { n: "300+", l: "клиенток" },
              { n: "4 мес", l: "носки" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-light text-pink-200 leading-none">{s.n}</div>
                <div className="font-body text-xs text-white/60 mt-1 tracking-widest uppercase">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Social links (bottom-right, floating in) ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="absolute bottom-12 right-6 sm:right-10 lg:right-16 hidden sm:flex flex-col gap-3"
        >
          <a
            href="https://instagram.com/volos_capsula"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-2xl transition-colors duration-200 group"
          >
            <Instagram size={16} className="text-pink-300 group-hover:text-pink-200 transition-colors" />
            <span className="font-body text-xs text-white/90 font-medium">@volos_capsula</span>
          </a>
          <a
            href="https://t.me/haircapsula_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 rounded-2xl transition-colors duration-200 group"
          >
            <Send size={15} className="text-sky-300 group-hover:text-sky-200 transition-colors" />
            <span className="font-body text-xs text-white/90 font-medium">@haircapsula_bot</span>
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase">Листайте</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
