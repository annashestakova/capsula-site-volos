"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

const HAIR_PRICES: Record<number, number> = {
  45: 754, 50: 785, 55: 815, 60: 878,
  65: 940, 70: 986, 75: 1079, 80: 1141,
};

type ProcType = {
  id: string;
  label: string;
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

export default function CalculatorTeaser() {
  const [step, setStep] = useState<"type" | "length" | "result">("type");
  const [procType, setProcType] = useState<ProcType | null>(null);
  const [length, setLength] = useState<number | null>(null);

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
    <section className="section-padding bg-milk">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose/10 rounded-full mb-6">
              <Calculator size={14} className="text-rose" />
              <span className="font-body text-sm text-rose font-medium">Онлайн-калькулятор</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-espresso leading-tight mb-6">
              Узнайте цену
              <br />
              <em className="italic text-rose">прямо сейчас</em>
            </h2>
            <p className="font-body text-mink leading-relaxed mb-8">
              Выберите тип процедуры и желаемую длину — получите точный расчёт стоимости работы и волос отдельно.
            </p>
            <div className="space-y-3">
              {["Работа: 1.6 BYN/капсулу", "Волос от 754 BYN за 100г", "Расчёт за 30 секунд"].map((t) => (
                <div key={t} className="flex items-center gap-3 font-body text-sm text-mink">
                  <span className="w-5 h-5 rounded-full bg-sage/40 flex items-center justify-center text-xs">✓</span>
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white/70 backdrop-blur-sm border border-sand/50 rounded-5xl p-8 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {step === "type" && (
                <motion.div key="type" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="font-body text-sm text-mink font-medium mb-5 uppercase tracking-widest">1 / 2 · Тип процедуры</p>
                  <div className="space-y-2">
                    {PROC_TYPES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setProcType(p); setStep("length"); }}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl border border-sand hover:border-rose hover:bg-blush/10 transition-all text-left group"
                      >
                        <span className="text-xl">{p.icon}</span>
                        <div className="flex-1">
                          <div className="font-body text-sm font-medium text-espresso">{p.label}</div>
                          <div className="font-body text-xs text-mink">{p.capMin}–{p.capMax} капсул</div>
                        </div>
                        <ArrowRight size={14} className="text-mink/40 group-hover:text-rose transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "length" && procType && (
                <motion.div key="length" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button onClick={() => setStep("type")} className="font-body text-sm text-mink hover:text-rose mb-4 flex items-center gap-1">
                    ← Назад
                  </button>
                  <p className="font-body text-sm text-mink font-medium mb-2 uppercase tracking-widest">2 / 2 · Длина волос</p>
                  <p className="font-body text-xs text-mink/60 mb-5">Желаемая длина после наращивания</p>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.keys(HAIR_PRICES).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLength(Number(l)); setStep("result"); }}
                        className="p-3 rounded-2xl border border-sand hover:border-rose hover:bg-blush/10 transition-all font-body text-sm font-medium text-espresso"
                      >
                        {l} см
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "result" && result && procType && length && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-body text-sm text-rose font-medium uppercase tracking-widest">Расчёт</p>
                    <button onClick={reset} className="font-body text-xs text-mink hover:text-rose">↺ Пересчитать</button>
                  </div>

                  <div className="bg-cream rounded-3xl p-5 mb-5 space-y-3">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-mink">{procType.label}</span>
                      <span className="font-medium text-espresso">{length} см</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-mink">Капсул (~{result.capAvg} шт)</span>
                      <span className="font-medium text-espresso">{result.work} BYN</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-mink">Волосы (~{result.gAvg}г)</span>
                      <span className="font-medium text-espresso">{result.hairCost} BYN</span>
                    </div>
                    <div className="border-t border-sand pt-3 flex justify-between">
                      <span className="font-body font-semibold text-espresso">Итого</span>
                      <span className="font-display text-2xl font-semibold text-rose">
                        {result.totalMin}–{result.totalMax} BYN
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-xs text-mink/60 mb-5">
                    ⚠️ Точный расчёт — после осмотра. Если у вас ровный срез, добавьте +10–15г волос.
                  </p>

                  <Link
                    href="/booking"
                    className="btn-primary w-full justify-center"
                  >
                    Выбрать время
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
