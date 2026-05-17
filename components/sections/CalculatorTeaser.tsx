"use client";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { useRef, MouseEvent } from "react";

const HAIR_PRICES: Record<number, number> = {
  45: 754, 50: 785, 55: 815, 60: 878,
  65: 940, 70: 986, 75: 1079, 80: 1141,
};

type ProcType = {
  id: string; label: string;
  capMin: number; capMax: number;
  gMin: number; gMax: number;
  icon: string;
};

const PROC_TYPES: ProcType[] = [
  { id: "zag_vis",   label: "Загущение височных зон",    capMin: 50,  capMax: 100, gMin: 30,  gMax: 50,  icon: "✨" },
  { id: "zag_full",  label: "Полное загущение",          capMin: 130, capMax: 170, gMin: 50,  gMax: 70,  icon: "💫" },
  { id: "len_thin",  label: "Удлинение · тонкие",        capMin: 150, capMax: 250, gMin: 80,  gMax: 120, icon: "🌿" },
  { id: "len_mid",   label: "Удлинение · средние",       capMin: 250, capMax: 300, gMin: 120, gMax: 150, icon: "🌸" },
  { id: "len_thick", label: "Удлинение · густые",        capMin: 300, capMax: 380, gMin: 150, gMax: 200, icon: "🌺" },
];

// Floating sparkles around the calculator card
const sparks = [
  { top: "-8%",  left: "10%",  size: 10, delay: 0,   dur: 5   },
  { top: "108%", left: "20%",  size: 8,  delay: 1.2, dur: 6.5 },
  { top: "30%",  left: "-6%",  size: 7,  delay: 0.6, dur: 7   },
  { top: "70%",  left: "102%", size: 9,  delay: 2,   dur: 5.5 },
  { top: "-5%",  left: "80%",  size: 6,  delay: 1.5, dur: 8   },
  { top: "95%",  left: "75%",  size: 8,  delay: 0.3, dur: 6   },
];

export default function CalculatorTeaser() {
  const [step, setStep] = useState<"type" | "length" | "result">("type");
  const [procType, setProcType] = useState<ProcType | null>(null);
  const [length, setLength] = useState<number | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

  function onCardMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    mx.set((e.clientX - left) / width - 0.5);
    my.set((e.clientY - top) / height - 0.5);
  }
  function onCardLeave() { mx.set(0); my.set(0); }

  const calcResult = () => {
    if (!procType || !length) return null;
    const capAvg = Math.round((procType.capMin + procType.capMax) / 2);
    const gAvg = Math.round((procType.gMin + procType.gMax) / 2);
    const work = +(capAvg * 1.6).toFixed(0);
    const price100g = HAIR_PRICES[length];
    const pricePerG = price100g / 100;
    let hairCost = Math.round(pricePerG * gAvg);
    if (gAvg > 100) hairCost += Math.floor((gAvg - 100) / 100) * 30;
    const totalMin = Math.round((procType.capMin * 1.6) + (pricePerG * procType.gMin));
    const totalMax = Math.round((procType.capMax * 1.6) + (pricePerG * procType.gMax));
    return { capAvg, gAvg, work, hairCost, totalMin, totalMax };
  };

  const result = calcResult();
  const reset = () => { setStep("type"); setProcType(null); setLength(null); };

  return (
    <section className="section-padding bg-milk relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-rose/10 blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[35vw] h-[35vw] rounded-full bg-lavender/15 blur-[70px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose/10 rounded-full mb-6">
              <Calculator size={14} className="text-rose" />
              <span className="font-body text-sm text-rose font-medium">Онлайн-калькулятор</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-espresso leading-tight mb-6">
              Узнайте цену<br />
              <em className="italic text-rose">прямо сейчас</em>
            </h2>
            <p className="font-body text-mink leading-relaxed mb-8">
              Выберите тип процедуры и желаемую длину — получите точный расчёт стоимости работы и волос отдельно.
            </p>
            <div className="space-y-3">
              {["Работа: 1.6 BYN/капсулу", "Волос от 754 BYN за 100г", "Расчёт за 30 секунд"].map((t, i) => (
                <motion.div
                  key={t}
                  className="flex items-center gap-3 font-body text-sm text-mink"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <motion.span
                    className="w-5 h-5 rounded-full bg-sage/40 flex items-center justify-center text-xs"
                    whileHover={{ scale: 1.3, backgroundColor: "rgba(134,187,130,0.7)" }}
                  >✓</motion.span>
                  {t}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — 3D tilt calculator card */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 900 }}
            className="relative"
          >
            {/* Floating sparkles around card */}
            {sparks.map((sp, i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute"
                style={{ top: sp.top, left: sp.left }}
                animate={{ y: [0, -sp.size * 1.5, 0], opacity: [0.2, 0.7, 0.2], rotate: [0, 180, 360] }}
                transition={{ duration: sp.dur, repeat: Infinity, ease: "easeInOut", delay: sp.delay }}
              >
                <svg width={sp.size} height={sp.size} viewBox="0 0 24 24" fill="#f9a8d4">
                  <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
                </svg>
              </motion.div>
            ))}

            <motion.div
              ref={cardRef}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative group"
            >
              {/* Depth shadow layers */}
              <div className="absolute inset-0 rounded-5xl bg-rose/20 blur-3xl scale-[0.9] translate-y-8 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 rounded-5xl bg-lavender/15 blur-2xl scale-[0.95] translate-y-4 opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

              <div
                className="relative bg-white/70 backdrop-blur-sm border border-sand/50 rounded-5xl p-8
                  shadow-[0_8px_40px_rgba(0,0,0,0.06)]
                  group-hover:shadow-[0_32px_80px_rgba(0,0,0,0.12)]
                  group-hover:border-pink-200/60
                  transition-all duration-400 overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Inner glass shine */}
                <div className="absolute inset-0 rounded-5xl bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div style={{ transform: "translateZ(20px)" }}>
                  <AnimatePresence mode="wait">
                    {step === "type" && (
                      <motion.div
                        key="type"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-body text-sm text-mink font-medium mb-5 uppercase tracking-widest">1 / 2 · Тип процедуры</p>
                        <div className="space-y-2">
                          {PROC_TYPES.map((p, i) => (
                            <motion.button
                              key={p.id}
                              onClick={() => { setProcType(p); setStep("length"); }}
                              className="w-full flex items-center gap-3 p-4 rounded-2xl border border-sand hover:border-rose hover:bg-blush/10 transition-all text-left group/btn"
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06, duration: 0.4 }}
                              whileHover={{ x: 4 }}
                            >
                              <span className="text-xl">{p.icon}</span>
                              <div className="flex-1">
                                <div className="font-body text-sm font-medium text-espresso">{p.label}</div>
                                <div className="font-body text-xs text-mink">{p.capMin}–{p.capMax} капсул</div>
                              </div>
                              <ArrowRight size={14} className="text-mink/40 group-hover/btn:text-rose transition-colors" />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === "length" && procType && (
                      <motion.div
                        key="length"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button onClick={() => setStep("type")} className="font-body text-sm text-mink hover:text-rose mb-4 flex items-center gap-1 transition-colors">
                          ← Назад
                        </button>
                        <p className="font-body text-sm text-mink font-medium mb-2 uppercase tracking-widest">2 / 2 · Длина волос</p>
                        <p className="font-body text-xs text-mink/60 mb-5">Желаемая длина после наращивания</p>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.keys(HAIR_PRICES).map((l, i) => (
                            <motion.button
                              key={l}
                              onClick={() => { setLength(Number(l)); setStep("result"); }}
                              className="p-3 rounded-2xl border border-sand hover:border-rose hover:bg-blush/10 transition-all font-body text-sm font-medium text-espresso"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.04, duration: 0.3, type: "spring" }}
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {l} см
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === "result" && result && procType && length && (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <p className="font-body text-sm text-rose font-medium uppercase tracking-widest">Расчёт</p>
                          <button onClick={reset} className="font-body text-xs text-mink hover:text-rose transition-colors">↺ Пересчитать</button>
                        </div>
                        <div className="bg-cream rounded-3xl p-5 mb-5 space-y-3">
                          {[
                            { label: procType.label,           val: `${length} см` },
                            { label: `Капсул (~${result.capAvg} шт)`, val: `${result.work} BYN` },
                            { label: `Волосы (~${result.gAvg}г)`,     val: `${result.hairCost} BYN` },
                          ].map((row, i) => (
                            <motion.div
                              key={row.label}
                              className="flex justify-between font-body text-sm"
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                            >
                              <span className="text-mink">{row.label}</span>
                              <span className="font-medium text-espresso">{row.val}</span>
                            </motion.div>
                          ))}
                          <motion.div
                            className="border-t border-sand pt-3 flex justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <span className="font-body font-semibold text-espresso">Итого</span>
                            <motion.span
                              className="font-display text-2xl font-semibold text-rose"
                              initial={{ scale: 0.7 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
                            >
                              {result.totalMin}–{result.totalMax} BYN
                            </motion.span>
                          </motion.div>
                        </div>
                        <p className="font-body text-xs text-mink/60 mb-5">
                          ⚠️ Точный расчёт — после осмотра. Если у вас ровный срез, добавьте +10–15г волос.
                        </p>
                        <Link href="/booking" className="btn-primary w-full justify-center">
                          Выбрать время
                          <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
