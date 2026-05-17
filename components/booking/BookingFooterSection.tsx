"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Send } from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";

export default function BookingFooterSection() {
  return (
    <section className="relative overflow-hidden bg-espresso py-20 px-6">
      {/* SVG wave top */}
      <div className="absolute inset-x-0 top-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,0 L0,0 Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>

      {/* SVG wave bottom */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,20 C240,-10 480,50 720,20 C960,-10 1200,50 1440,20 L1440,60 L0,60 Z"
            fill="#FAF7F2"
          />
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full bg-rose/10 blur-[80px] pointer-events-none" />

      {/* Girl walking lottie — left */}
      <div className="absolute left-0 bottom-0 pointer-events-none">
        <LottiePlayer
          src="/lottie/Travel is fun.json"
          className="h-64 w-64 opacity-20 sm:h-80 sm:w-80 sm:opacity-30"
          ariaLabel="путешествие"
          speed={0.75}
        />
      </div>

      {/* Location lottie — right */}
      <div className="absolute right-0 bottom-0 pointer-events-none">
        <LottiePlayer
          src="/lottie/location-search.json"
          className="h-56 w-56 opacity-15 sm:h-72 sm:w-72 sm:opacity-25"
          ariaLabel="поиск локации"
          speed={0.85}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* SVG heart decoration */}
          <svg
            className="mx-auto mb-6 text-blush/60"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>

          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-rose mb-4">
            Volos Capsula
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-tight mb-6">
            Остались вопросы?
            <br />
            <em className="italic text-blush">Напишите Анне</em>
          </h2>
          <p className="font-body text-cream/60 leading-relaxed mb-10 max-w-md mx-auto">
            Напишите в Instagram или Telegram — Анна ответит и поможет выбрать услугу,
            рассчитать стоимость или подобрать удобное время.
          </p>

          {/* SVG divider */}
          <div className="flex items-center gap-4 justify-center mb-10">
            <svg viewBox="0 0 80 2" className="w-16 h-px">
              <line x1="0" y1="1" x2="80" y2="1" stroke="#d4a0b0" strokeWidth="1" strokeDasharray="4 3" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#d4a0b0" className="opacity-60">
              <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
            </svg>
            <svg viewBox="0 0 80 2" className="w-16 h-px">
              <line x1="0" y1="1" x2="80" y2="1" stroke="#d4a0b0" strokeWidth="1" strokeDasharray="4 3" />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://instagram.com/volos_capsula"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/20 hover:border-cream/40 text-cream font-body text-sm font-medium transition-all duration-200"
            >
              <Instagram size={15} className="text-blush" />
              @volos_capsula
            </a>
            <a
              href="https://t.me/haircapsula_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cream/10 hover:bg-cream/20 border border-cream/20 hover:border-cream/40 text-cream font-body text-sm font-medium transition-all duration-200"
            >
              <Send size={14} className="text-sky-300" />
              @haircapsula_bot
            </a>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-rose hover:bg-pink-500 text-white font-body text-sm font-medium transition-colors duration-200"
            >
              Рассчитать стоимость
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Bottom SVG sparkles row */}
          <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
            {[12, 8, 14, 8, 12].map((size, i) => (
              <motion.svg
                key={i}
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="#f9a8d4"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
              >
                <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
              </motion.svg>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
