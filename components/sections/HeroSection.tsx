"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Instagram, Send } from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";

const floats = [
  { top: "12%", left: "6%",  size: 18, delay: 0,   dur: 5.5 },
  { top: "72%", left: "8%",  size: 14, delay: 1.2, dur: 7   },
  { top: "18%", right: "4%", size: 16, delay: 0.6, dur: 6   },
  { top: "68%", right: "6%", size: 12, delay: 2,   dur: 8   },
  { top: "44%", left: "3%",  size: 10, delay: 1.8, dur: 6.5 },
];

function Heart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FDF8F4 0%, #F9EEF5 50%, #F4EEF9 100%)" }}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[40vw] rounded-full bg-pink-200/30 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-purple-200/20 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-rose-100/20 blur-[60px]" />
      </div>

      {/* Floating hearts */}
      {floats.map((f, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-pink-300/40"
          style={{ top: f.top, left: (f as any).left, right: (f as any).right }}
          animate={{ y: [0, -f.size * 0.9, 0], rotate: [0, i % 2 === 0 ? 8 : -6, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        >
          <Heart size={f.size} />
        </motion.div>
      ))}

      <div className="container-site relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-28 pb-16 px-6 sm:px-10">
        {/* ── Left: text ── */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-pink-200/60 rounded-full mb-8 shadow-sm"
          >
            <Sparkles size={13} className="text-pink-400" />
            <span className="font-body text-sm text-espresso/80 font-medium tracking-wide">
              Мастер Анна · Брест · Минск
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45 }}
            className="font-display font-light text-espresso leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
          >
            Наращивание
            <br />
            <em className="italic text-rose">волос,</em>
            <br />
            которое{" "}
            <span className="relative inline-block">
              держится
              <svg className="absolute -bottom-1 left-0 right-0 w-full" viewBox="0 0 260 10" fill="none">
                <motion.path
                  d="M2,7 Q50,2 100,7 Q150,12 200,7 Q230,3 258,7"
                  stroke="#f9a8d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-mink text-base sm:text-lg leading-relaxed mb-10 max-w-sm"
          >
            Капсульное, биопротеиновое и ленточное наращивание на натуральном
            славянском волосе. 5 лет опыта, от 350 рублей.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-rose hover:bg-pink-500 text-white font-body font-medium text-sm tracking-wide rounded-full transition-colors duration-200 shadow-[0_8px_24px_rgba(236,72,153,0.25)]"
            >
              Записаться
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/70 hover:bg-white border border-pink-200/60 text-espresso font-body font-medium text-sm tracking-wide rounded-full transition-colors duration-200"
            >
              Рассчитать стоимость
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="flex gap-8 pt-8 border-t border-pink-200/40"
          >
            {[
              { n: "5+",   l: "лет опыта" },
              { n: "300+", l: "клиенток" },
              { n: "4 мес", l: "носки" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-light text-rose leading-none">{s.n}</div>
                <div className="font-body text-xs text-mink/70 mt-1 tracking-widest uppercase">{s.l}</div>
              </div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex gap-3 mt-8"
          >
            <a
              href="https://instagram.com/volos_capsula"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white border border-pink-200/50 rounded-2xl transition-colors group"
            >
              <Instagram size={15} className="text-rose" />
              <span className="font-body text-xs text-espresso/80 font-medium">@volos_capsula</span>
            </a>
            <a
              href="https://t.me/haircapsula_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white border border-sky-200/50 rounded-2xl transition-colors"
            >
              <Send size={13} className="text-sky-400" />
              <span className="font-body text-xs text-espresso/80 font-medium">@haircapsula_bot</span>
            </a>
          </motion.div>
        </div>

        {/* ── Right: Lottie girl ── */}
        <motion.div
          className="order-1 lg:order-2 relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow behind lottie */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[70%] h-[70%] rounded-full bg-pink-200/40 blur-[60px]" />
          </div>
          <LottiePlayer
            src="/lottie/fashionable-girl-red-dress.json"
            className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px] mx-auto"
            ariaLabel="девушка с красивыми волосами"
            speed={0.8}
          />
          {/* Decorative sparkles around lottie */}
          {[
            { top: "10%", left: "8%",  s: 14, d: 0   },
            { top: "80%", left: "15%", s: 10, d: 1.5 },
            { top: "15%", right: "6%", s: 12, d: 0.8 },
            { top: "75%", right: "10%",s: 8,  d: 2.2 },
          ].map((p, i) => (
            <motion.svg
              key={i}
              width={p.s} height={p.s} viewBox="0 0 24 24" fill="#f9a8d4"
              className="absolute pointer-events-none"
              style={{ top: p.top, left: (p as any).left, right: (p as any).right }}
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: p.d }}
            >
              <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
            </motion.svg>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mink/40"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase">Листайте</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-pink-300/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
