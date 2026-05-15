"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ANIMATIONS = [
  { file: "/lottie/summer-breeze.json", label: "Лёгкий бриз" },
  { file: "/lottie/lake.json", label: "Летнее озеро" },
  { file: "/lottie/travel.json", label: "Вдохновение" },
];

export default function LottieBanner() {
  const [current, setCurrent] = useState(0);
  const [datas, setDatas] = useState<(any)[]>([null, null, null]);

  useEffect(() => {
    ANIMATIONS.forEach((a, i) => {
      fetch(a.file).then(r => r.json()).then(d => {
        setDatas(prev => { const next = [...prev]; next[i] = d; return next; });
      }).catch(() => {});
    });
    const timer = setInterval(() => setCurrent(c => (c + 1) % ANIMATIONS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-espresso/5 rounded-3xl overflow-hidden my-12">
      <div className="flex flex-col md:flex-row items-center gap-6 p-8">
        <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative">
          {datas[current] && (
            <Lottie animationData={datas[current]} loop autoplay style={{ width: "100%", height: "100%" }} />
          )}
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="font-body text-xs uppercase tracking-widest text-rose mb-3">Вдохновение</p>
          <h2 className="font-display text-3xl md:text-4xl text-espresso mb-4">
            Красота — это <em className="not-italic text-rose">состояние</em>
          </h2>
          <p className="font-body text-mink mb-6 leading-relaxed">
            Натуральные волосы, которые выглядят как ваши собственные. Мягко, естественно, надолго.
          </p>
          <div className="flex gap-2 justify-center md:justify-start">
            {ANIMATIONS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-rose w-6" : "bg-mink/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
