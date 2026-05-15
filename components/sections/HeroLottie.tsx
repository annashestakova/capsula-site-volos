"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function HeroLottie() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/lottie/summer-breeze.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-60 pointer-events-none">
      <Lottie animationData={data} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
