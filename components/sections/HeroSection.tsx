"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -12, -5, 0],
    rotate: [0, 2, -1, 0],
    transition: {
      duration: 5 + i,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.7,
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream pt-24">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-blush/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-lavender/15 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sand/30 rounded-full blur-[60px]" />
      </div>

      {/* Floating doodle elements */}
      <motion.div
        className="absolute top-32 right-[12%] text-rose/30 select-none pointer-events-none hidden lg:block"
        custom={0}
        variants={floatVariants}
        animate="animate"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M20,40 Q30,20 40,30 Q50,40 60,25 Q70,10 75,35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="20" cy="40" r="3" fill="currentColor" opacity="0.5"/>
          <circle cx="75" cy="35" r="3" fill="currentColor" opacity="0.5"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[8%] text-lavender/40 select-none pointer-events-none hidden lg:block"
        custom={1}
        variants={floatVariants}
        animate="animate"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M10,50 Q20,10 30,30 Q40,50 50,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="4 2"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-[6%] text-gold/30 select-none pointer-events-none hidden xl:block"
        custom={2}
        variants={floatVariants}
        animate="animate"
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <path d="M25,5 L27,20 L42,22 L30,32 L34,48 L25,38 L16,48 L20,32 L8,22 L23,20 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <div className="container-site relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-sand/60 rounded-full mb-8"
          >
            <Sparkles size={14} className="text-gold" />
            <span className="font-body text-sm text-mink font-medium">
              5 лет · Брест · Минск · Онлайн
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-light text-espresso leading-[1.0] tracking-tight mb-6"
          >
            Наращивание
            <br />
            <span className="italic text-rose">волос</span>{" "}
            <span className="relative inline-block">
              которое
              <svg
                className="absolute -bottom-2 left-0 right-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2,8 Q50,2 100,8 Q150,14 200,8 Q250,2 298,8"
                  stroke="#C9897A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            <br />
            держится
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-body text-lg text-mink max-w-lg leading-relaxed mb-10"
          >
            Капсульное и биопротеиновое наращивание на натуральном
            славянском волосе. ИИ рассчитает стоимость по вашим фото.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="https://t.me/volos_capsula"
              target="_blank"
              className="btn-primary group"
            >
              Записаться на консультацию
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/calculator" className="btn-outline">
              Рассчитать стоимость
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-16 pt-10 border-t border-sand/60"
          >
            {[
              { num: "5+",   label: "лет опыта" },
              { num: "300+", label: "клиенток" },
              { num: "4.5",  label: "мес носки" },
              { num: "100%", label: "натуральный волос" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold text-espresso">{s.num}</div>
                <div className="font-body text-sm text-mink mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mink/50"
      >
        <span className="font-body text-xs tracking-widest uppercase">Листайте</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-mink/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
