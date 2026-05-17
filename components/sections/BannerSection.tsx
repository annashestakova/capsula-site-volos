"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Instagram, Send } from "lucide-react";

const floats = [
  { top: "8%",  left: "4%",  size: 18, delay: 0,   dur: 5.5 },
  { top: "75%", left: "6%",  size: 14, delay: 1.2, dur: 7   },
  { top: "12%", right: "3%", size: 16, delay: 0.6, dur: 6   },
  { top: "70%", right: "5%", size: 12, delay: 2,   dur: 8   },
  { top: "42%", left: "2%",  size: 10, delay: 1.8, dur: 6.5 },
];

function Heart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function BannerSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: баннер движется медленнее страницы — эффект глубины
  const y       = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale   = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.93, 1, 1, 0.96]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, -4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5EEF5 50%, #FAF7F2 100%)" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vw] rounded-full bg-pink-200/30 blur-[80px]" />
        <div className="absolute top-1/4 right-0 w-[30vw] h-[30vw] rounded-full bg-purple-200/20 blur-[60px]" />
        <div className="absolute bottom-1/4 left-0 w-[25vw] h-[25vw] rounded-full bg-pink-300/20 blur-[50px]" />
      </div>

      {/* Floating hearts */}
      {floats.map((f, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-pink-300/50"
          style={{ top: f.top, left: (f as any).left, right: (f as any).right }}
          animate={{ y: [0, -f.size * 0.8, 0], rotate: [0, i % 2 === 0 ? 8 : -6, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        >
          <Heart size={f.size} />
        </motion.div>
      ))}

      <div className="container-site relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-pink-400 mb-3">
            Volos Capsula
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-espresso leading-tight">
            Присоединяйся
            <br />
            <em className="italic text-rose">к нам</em>
          </h2>
        </motion.div>

        {/* 3D banner card */}
        <motion.div
          style={{ y, scale, rotateX, transformPerspective: 1200 }}
          initial={{ opacity: 0, y: 60, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Depth shadow layers — создают эффект углубления */}
          <div className="absolute inset-0 translate-y-4 scale-[0.97] rounded-[2rem] bg-pink-300/25 blur-2xl" />
          <div className="absolute inset-0 translate-y-2 scale-[0.98] rounded-[2rem] bg-pink-200/20 blur-xl" />

          {/* Pink glowing border */}
          <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br from-pink-300/60 via-purple-200/40 to-pink-200/60 blur-[3px]" />

          {/* Banner image */}
          <div className="relative rounded-[1.85rem] overflow-hidden shadow-[0_30px_80px_rgba(236,72,153,0.18),0_8px_32px_rgba(168,85,247,0.12)]">
            <Image
              src="/hero-banner.png"
              alt="Volos Capsula — наращивание волос"
              width={1672}
              height={941}
              quality={92}
              priority={false}
              className="w-full h-auto block"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
            />

            {/* Subtle inner overlay for depth */}
            <div className="absolute inset-0 rounded-[1.85rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

            {/* Animated sparkle overlay dots */}
            {[
              { top: "10%", left: "8%",  delay: 0   },
              { top: "85%", left: "12%", delay: 1.4 },
              { top: "20%", right: "8%", delay: 0.7 },
              { top: "80%", right: "14%",delay: 2.1 },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: p.top, left: (p as any).left, right: (p as any).right }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, delay: p.delay }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity={0.7}>
                  <path d="M12 2l2.4 7.4L22 12l-7.6 2.6L12 22l-2.4-7.4L2 12l7.6-2.6z" />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA row below banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rose hover:bg-pink-500 text-white font-body font-medium text-sm tracking-wide transition-colors duration-200"
          >
            Записаться
            <ArrowRight size={15} />
          </Link>
          <a
            href="https://instagram.com/volos_capsula"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-rose/40 hover:border-rose text-rose font-body text-sm font-medium transition-colors duration-200"
          >
            <Instagram size={15} />
            @volos_capsula
          </a>
          <a
            href="https://t.me/haircapsula_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-sky-400/40 hover:border-sky-400 text-sky-500 font-body text-sm font-medium transition-colors duration-200"
          >
            <Send size={14} />
            @haircapsula_bot
          </a>
        </motion.div>
      </div>
    </section>
  );
}
