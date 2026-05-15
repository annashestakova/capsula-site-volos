"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HeroLottie() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/lottie/summer-breeze.json")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[360px] h-[360px] opacity-70 pointer-events-none z-20">
      <Lottie animationData={data} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
