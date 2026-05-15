"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFound() {
  const [animData, setAnimData] = useState(null);

  useEffect(() => {
    fetch("/lottie/pink-cat.json")
      .then((r) => r.json())
      .then(setAnimData)
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-[120px] md:text-[180px] leading-none text-rose font-bold"
      >
        404
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="-mt-8 w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
      >
        {animData && <Lottie animationData={animData} loop autoplay style={{ width: "100%", height: "100%" }} />}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="-mt-4"
      >
        <h1 className="font-display text-3xl md:text-4xl text-espresso mb-3">
          Страница улетела на метле
        </h1>
        <p className="font-body text-mink mb-8 max-w-sm mx-auto">
          Этот кот знает, где она — но не скажет.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">На главную</Link>
          <Link href="/services" className="btn-secondary">Услуги и цены</Link>
        </div>
      </motion.div>
    </main>
  );
}
