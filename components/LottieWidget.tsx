"use client";

import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";

type LottieSize =
  | "xs"   // 80px  — иконки, мини-акценты
  | "sm"   // 160px — рядом с текстом
  | "md"   // 280px — карточки, секции
  | "lg"   // 400px — hero-декор справа от заголовка
  | "xl"   // 100%  — полноэкранный фон (с opacity)
  | "full"; // задний фон страницы

interface LottieWidgetProps {
  /** путь к json в /public/lottie/ */
  src: object;
  size?: LottieSize;
  /** замедление/ускорение анимации, default 1 */
  speed?: number;
  /** класс для позиционирования снаружи */
  className?: string;
  /** прозрачность (0-1), актуально для фонов */
  opacity?: number;
  /** зациклить? default true */
  loop?: boolean;
  /** aria-label для доступности */
  label?: string;
  /** Framer Motion появление при скролле */
  scrollReveal?: boolean;
}

const SIZES: Record<LottieSize, string> = {
  xs: "w-20 h-20",
  sm: "w-40 h-40",
  md: "w-[280px] h-[280px]",
  lg: "w-[400px] h-[400px]",
  xl: "w-full max-w-2xl",
  full: "absolute inset-0 w-full h-full",
};

export default function LottieWidget({
  src,
  size = "md",
  speed = 1,
  className = "",
  opacity = 1,
  loop = true,
  label = "анимация",
  scrollReveal = true,
}: LottieWidgetProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const wrapper = (
    <div
      className={`${SIZES[size]} ${className} pointer-events-none select-none`}
      style={{ opacity }}
      aria-label={label}
      role="img"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={src}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
        // @ts-ignore — speed prop через ref
        onDOMLoaded={() => {
          if (lottieRef.current) {
            lottieRef.current.setSpeed(speed);
          }
        }}
      />
    </div>
  );

  if (!scrollReveal) return wrapper;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {wrapper}
    </motion.div>
  );
}

// ─── Примеры использования ────────────────────────────────────────────────
//
// import pinkCatData from "@/public/lottie/pink-cat.json";
// import lakeData from "@/public/lottie/lake.json";
//
// // 1. Страница 404 — кот по центру
// <LottieWidget src={pinkCatData} size="lg" label="кот на 404 странице" />
//
// // 2. Hero — декор справа от заголовка (десктоп)
// <LottieWidget src={summerData} size="lg" opacity={0.7} className="hidden md:block" />
//
// // 3. Полноэкранный фон секции (тонкий, почти прозрачный)
// <div className="relative overflow-hidden">
//   <LottieWidget src={lakeData} size="full" opacity={0.08} scrollReveal={false} />
//   <div className="relative z-10">/* контент */</div>
// </div>
//
// // 4. Маленький акцент рядом с заголовком
// <div className="flex items-center gap-4">
//   <h2>Мои работы</h2>
//   <LottieWidget src={breezeData} size="xs" />
// </div>
//
// // 5. Карточка услуги
// <LottieWidget src={travelData} size="sm" speed={0.7} className="mx-auto mb-4" />
