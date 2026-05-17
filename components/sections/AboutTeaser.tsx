"use client";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { useRef, MouseEvent, useEffect, useState } from "react";

// ── Floating particles ────────────────────────────────────────────
const dots = [
  { top: "12%", left: "6%",  size: 5, delay: 0,   dur: 6   },
  { top: "78%", left: "4%",  size: 4, delay: 1.5, dur: 7.5 },
  { top: "35%", left: "92%", size: 6, delay: 0.8, dur: 5.5 },
  { top: "65%", left: "90%", size: 3, delay: 2.2, dur: 8   },
  { top: "88%", left: "50%", size: 5, delay: 1,   dur: 6.5 },
  { top: "8%",  left: "70%", size: 4, delay: 0.4, dur: 7   },
];

// ── Animated counter ──────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const start = performance.now();
    const dur = 1400;
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, to]);

  return <div ref={ref} className="font-display text-3xl text-cream">{val}{suffix}</div>;
}

// ── Tilt review card ──────────────────────────────────────────────
function ReviewCard({ r, i }: { r: typeof reviews[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 700 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full group cursor-default"
      >
        {/* Depth glow under card */}
        <div className="absolute inset-0 rounded-4xl bg-rose/20 blur-2xl scale-[0.9] translate-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div
          className="relative h-full rounded-4xl p-7 border border-sand/50
            bg-white/60 backdrop-blur-sm
            shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.1)]
            group-hover:bg-white/80
            group-hover:border-pink-200/60
            transition-all duration-400 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Inner shine on hover */}
          <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div style={{ transform: "translateZ(16px)" }}>
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            >
              <Quote size={20} className="text-rose/40 mb-4" />
            </motion.div>
            <p className="font-body text-sm text-mink leading-relaxed mb-6 italic">"{r.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-body text-sm font-semibold text-espresso">{r.name}</div>
                <div className="font-body text-xs text-mink/60">{r.city}</div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="text-gold text-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + j * 0.06, duration: 0.3, type: "spring" }}
                  >★</motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── AboutTeaser ───────────────────────────────────────────────────
export function AboutTeaser() {
  return (
    <section className="section-padding bg-espresso text-cream overflow-hidden relative">
      {/* Floating dots */}
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-rose/30"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
          animate={{ y: [0, -d.size * 2, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.4, 1] }}
          transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
        />
      ))}

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-rose/8 blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[30vw] h-[30vw] rounded-full bg-lavender/10 blur-[60px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">О мастере</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
              Привет,<br />
              я <em className="italic text-blush">Анна</em>
            </h2>
            <div className="space-y-4 font-body text-cream/70 leading-relaxed">
              <p>
                5 лет я занимаюсь капсульным наращиванием в Бресте и выезжаю в Минск.
                За это время провела сотни процедур и поняла главное — результат зависит
                не только от техники, но и от правильного ухода.
              </p>
              <p>
                Поэтому я создала Telegram-бот с ИИ-консультантом, гайд по уходу и этот
                сайт — чтобы ты знала всё заранее.
              </p>
            </div>

            {/* Animated stats */}
            <div className="grid grid-cols-3 gap-6 my-10">
              {[
                { n: 5,   suffix: "+", l: "лет опыта"    },
                { n: 300, suffix: "+", l: "клиенток"     },
                { n: 100, suffix: "%", l: "натур. волос" },
              ].map((s) => (
                <motion.div
                  key={s.l}
                  className="border-l border-cream/20 pl-4"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Counter to={s.n} suffix={s.suffix} />
                  <div className="font-body text-xs text-cream/50 mt-1">{s.l}</div>
                </motion.div>
              ))}
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 font-body text-sm text-blush hover:text-cream transition-colors group">
              Подробнее обо мне
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Decorative box with animated border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            whileHover={{ y: -6 }}
          >
            {/* Animated glowing border */}
            <motion.div
              className="absolute -inset-[2px] rounded-5xl"
              style={{
                background: "linear-gradient(135deg, rgba(244,163,172,0.5), rgba(196,180,232,0.4), rgba(244,163,172,0.5))",
                backgroundSize: "200% 200%",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Depth shadows */}
            <div className="absolute inset-0 translate-y-6 scale-[0.95] rounded-5xl bg-rose/15 blur-3xl" />
            <div className="absolute inset-0 translate-y-3 scale-[0.97] rounded-5xl bg-lavender/10 blur-2xl" />

            <div className="relative bg-cream/5 border border-cream/10 rounded-5xl p-10 overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-lavender/10 rounded-full blur-3xl" />

              {/* Floating sparkles inside box */}
              {[
                { top: "10%", right: "10%", delay: 0   },
                { top: "80%", left: "8%",   delay: 1.2 },
                { top: "50%", right: "5%",  delay: 0.7 },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ top: p.top, left: (p as any).left, right: (p as any).right }}
                  animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.3, 0.8], rotate: [0, 180, 360] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: p.delay }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f9a8d4" opacity={0.6}>
                    <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
                  </svg>
                </motion.div>
              ))}

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 rounded-full">
                  <span className="font-body text-sm text-cream/70">🤖 ИИ-консультация</span>
                </div>
                <p className="font-display text-2xl font-light text-cream leading-relaxed italic">
                  "Пришли фото сзади и сбоку — ИИ рассчитает точную стоимость и задаст уточняющие вопросы"
                </p>
                <div className="pt-4 border-t border-cream/10">
                  <p className="font-body text-sm text-cream/50">Стоимость: 19 BYN</p>
                  <p className="font-body text-xs text-cream/30 mt-1">+ бонусом гайд по уходу</p>
                </div>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-cream text-sm font-body font-medium rounded-full hover:bg-blush hover:text-espresso transition-all hover:scale-105 hover:shadow-[0_8px_24px_rgba(236,72,153,0.3)]"
                >
                  Выбрать время
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Reviews ───────────────────────────────────────────────────────
const reviews = [
  {
    name: "Виктория",
    city: "Яндекс Карты",
    text: "Отмечает густоту, длину и форму после работы Анны. Пишет, что результат стал для неё настоящим преображением.",
    rating: 5,
  },
  {
    name: "Elena W.",
    city: "Яндекс Карты",
    text: "Довольна холодным наращиванием, аккуратной работой и комфортной студией. Отдельно отметила удобную парковку.",
    rating: 5,
  },
  {
    name: "Анна Ш.",
    city: "Яндекс Карты",
    text: "Сравнивает с другими мастерами и выделяет качество капсул: держатся ровно, не сползают и выглядят как родные.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] rounded-full bg-pink-100/50 blur-[80px]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-3">Отзывы</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-espresso">
            Что говорят<br /><em className="italic">клиентки</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="https://yandex.by/maps/org/u_anny/90436287873/reviews/?ll=23.678135%2C52.105687&z=16"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Все отзывы на Яндекс Картах
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── BookingCTA ────────────────────────────────────────────────────
export function BookingCTA() {
  return (
    <section className="section-padding bg-milk">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-5xl p-12 md:p-16 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3A2E28 0%, #2a2020 50%, #3A2E28 100%)" }}
          whileHover={{ scale: 1.005 }}
        >
          {/* Animated depth glow layers */}
          <motion.div
            className="absolute top-0 right-0 w-80 h-80 bg-rose/15 rounded-full blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-60 h-60 bg-lavender/15 rounded-full blur-3xl pointer-events-none"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[20vw] bg-rose/8 rounded-full blur-[60px] pointer-events-none"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating sparkles */}
          {[
            { top: "15%", left: "8%",  s: 10, d: 0   },
            { top: "75%", left: "12%", s: 8,  d: 1.5 },
            { top: "20%", right: "9%", s: 12, d: 0.8 },
            { top: "70%", right: "7%", s: 7,  d: 2.2 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ top: p.top, left: (p as any).left, right: (p as any).right }}
              animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: p.d }}
            >
              <svg width={p.s} height={p.s} viewBox="0 0 24 24" fill="#f9a8d4">
                <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
              </svg>
            </motion.div>
          ))}

          <div className="relative z-10">
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">Запись</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-cream leading-tight mb-6 text-center">
              Готова к{" "}
              <em className="italic text-blush">изменениям?</em>
            </h2>
            <p className="font-body text-cream/60 max-w-md mx-auto mb-10">
              Выберите услугу, дату и время в календаре. Заявка уйдёт Анне в Telegram.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-espresso font-body font-medium rounded-full hover:bg-blush transition-all hover:scale-105 hover:shadow-[0_12px_32px_rgba(244,163,172,0.4)]"
              >
                Открыть календарь
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream font-body font-medium rounded-full hover:bg-cream/10 transition-all hover:border-cream/60"
              >
                Рассчитать стоимость
              </Link>
            </div>
            <p className="font-body text-xs text-cream/30 mt-8">
              📍 Брест · Минск · Онлайн-консультации
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutTeaser;
