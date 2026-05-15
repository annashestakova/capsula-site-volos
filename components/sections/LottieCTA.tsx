"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieCTA() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/lottie/travel.json").then(r => r.json()).then(setData).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <div className="w-[200px] h-[200px] mx-auto opacity-80">
      <Lottie animationData={data} loop autoplay style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
