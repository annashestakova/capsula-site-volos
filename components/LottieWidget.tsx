"use client";

import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";

type LottieSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

interface LottieWidgetProps {
  src: object;
  size?: LottieSize;
  speed?: number;
  className?: string;
  opacity?: number;
  loop?: boolean;
  label?: string;
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
  src, size = "md", speed = 1, className = "",
  opacity = 1, loop = true, label = "анимация", scrollReveal = true,
}: LottieWidgetProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const wrapper = (
    <div className={`${SIZES[size]} ${className} pointer-events-none select-none`}
      style={{ opacity }} aria-label={label} role="img">
      <Lottie lottieRef={lottieRef} animationData={src} loop={loop} autoplay
        style={{ width: "100%", height: "100%" }}
        onDOMLoaded={() => { lottieRef.current?.setSpeed(speed); }} />
    </div>
  );
  if (!scrollReveal) return wrapper;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      {wrapper}
    </motion.div>
  );
}
