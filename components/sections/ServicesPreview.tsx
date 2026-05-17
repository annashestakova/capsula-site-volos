"use client";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, MouseEvent } from "react";

const services = [
  {
    id: "capsule",
    title: "Капсульное наращивание",
    desc: "Горячий метод на натуральном славянском волосе. Держится 3–4 месяца. Незаметные капсулы у корней.",
    price: "от 350 BYN",
    accent: "bg-blush/30",
    glow: "rgba(244,163,172,0.35)",
    shadow: "rgba(236,72,153,0.15)",
    tag: "Популярное",
    emoji: "✨",
  },
  {
    id: "bioprotein",
    title: "Биопротеиновое",
    desc: "Гипоаллергенный состав, волосы включены. Подходит для чувствительной кожи головы.",
    price: "350–400 BYN",
    accent: "bg-lavender/20",
    glow: "rgba(196,180,232,0.35)",
    shadow: "rgba(168,85,247,0.15)",
    tag: "Эксклюзив",
    emoji: "💜",
  },
  {
    id: "thickening",
    title: "Загущение",
    desc: "Для объёма и густоты без удлинения. 50–170 капсул в зависимости от нужного результата.",
    price: "от 160 BYN",
    accent: "bg-sage/20",
    glow: "rgba(134,187,130,0.3)",
    shadow: "rgba(100,160,100,0.15)",
    tag: "Быстро",
    emoji: "🌿",
  },
  {
    id: "correction",
    title: "Коррекция",
    desc: "Поддержание нарощенных волос каждые 2–2,5 месяца. Капсулы поднимаются ближе к корням.",
    price: "от 160 BYN",
    accent: "bg-gold/15",
    glow: "rgba(234,179,8,0.25)",
    shadow: "rgba(202,138,4,0.15)",
    tag: "Уход",
    emoji: "🌸",
  },
];

// Floating sparkle dots for the section background
const sparks = [
  { top: "8%",  left: "3%",  size: 6,  delay: 0,   dur: 5 },
  { top: "18%", left: "92%", size: 5,  delay: 1.2, dur: 6 },
  { top: "72%", left: "5%",  size: 4,  delay: 0.8, dur: 7 },
  { top: "85%", left: "88%", size: 7,  delay: 2,   dur: 5.5 },
  { top: "45%", left: "96%", size: 4,  delay: 1.5, dur: 6.5 },
  { top: "60%", left: "1%",  size: 5,  delay: 0.4, dur: 8 },
];

function TiltCard({ s, i }: { s: typeof services[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX   = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 200, damping: 30 });
  const glowY   = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), { stiffness: 200, damping: 30 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top)  / height - 0.5);
  }
  function onLeave() { x.set(0); y.set(0); }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      variants={item}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ z: 16 }}
        className="relative h-full cursor-pointer group"
      >
        {/* Depth shadow layers */}
        <div
          className="absolute inset-0 rounded-4xl blur-2xl scale-[0.92] translate-y-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: s.glow }}
        />
        <div
          className="absolute inset-0 rounded-4xl blur-xl scale-[0.96] translate-y-3 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{ background: s.shadow }}
        />

        {/* Glow highlight that follows cursor */}
        <motion.div
          className="absolute inset-0 rounded-4xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, ${s.glow} 0%, transparent 65%)`,
          }}
        />

        <Link href="/services" className="block h-full">
          <div
            className={`relative h-full rounded-4xl p-7 ${s.accent} border border-sand/40
              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
              group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]
              group-hover:border-white/70
              transition-all duration-300 overflow-hidden`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Inner depth shine */}
            <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div style={{ transform: "translateZ(20px)" }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="inline-flex px-3 py-1 bg-white/60 rounded-full text-xs font-body font-medium text-mink">
                  {s.tag}
                </div>
                <span className="text-lg">{s.emoji}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-espresso mb-3 leading-tight">
                {s.title}
              </h3>
              <p className="font-body text-sm text-mink leading-relaxed mb-6">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-semibold text-espresso">{s.price}</span>
                <span className="w-8 h-8 rounded-full bg-espresso/10 flex items-center justify-center transition-all group-hover:bg-espresso group-hover:text-cream">
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

const containerAnim = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[50vw] h-[40vw] rounded-full bg-pink-100/40 blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-purple-100/30 blur-[60px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating sparkles */}
      {sparks.map((sp, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ top: sp.top, left: sp.left }}
          animate={{ y: [0, -sp.size * 1.5, 0], opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: sp.dur, repeat: Infinity, ease: "easeInOut", delay: sp.delay }}
        >
          <svg width={sp.size} height={sp.size} viewBox="0 0 24 24" fill="#f9a8d4">
            <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
          </svg>
        </motion.div>
      ))}

      <div className="container-site relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-3">Услуги</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-espresso leading-tight">
              Что я делаю
              <br />
              <em className="italic">лучше всего</em>
            </h2>
          </div>
          <Link href="/services" className="btn-ghost group self-start md:self-auto">
            Все услуги и цены
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((s, i) => (
            <TiltCard key={s.id} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
