"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottiePlayerProps = {
  src: string;
  className?: string;
  ariaLabel?: string;
  loop?: boolean;
  speed?: number;
};

export default function LottiePlayer({
  src,
  className = "",
  ariaLabel = "анимация",
  loop = true,
  speed = 1,
}: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<unknown>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAnimationData(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!animationData) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay
        style={{ width: "100%", height: "100%" }}
        onDOMLoaded={() => lottieRef.current?.setSpeed(speed)}
      />
    </div>
  );
}
