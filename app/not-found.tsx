"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import LottieWidget from "@/components/LottieWidget";
import pinkCatData from "@/public/lottie/pink-cat.json";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] dark:bg-[#1a1210] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-[Cormorant_Garamond] text-[120px] md:text-[180px] leading-none text-[#C9897A] font-bold"
      >
        404
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="-mt-8 relative z-10"
      >
        <LottieWidget src={pinkCatData} size="lg" label="розовый кот" scrollReveal={false} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 -mt-4"
      >
        <h1 className="font-[Cormorant_Garamond] text-3xl md:text-4xl text-[#3D2B1F] dark:text-[#FAF7F2] mb-3">
          Страница улетела на метле
        </h1>
        <p className="font-[Jost] text-[#3D2B1F]/60 dark:text-[#FAF7F2]/60 mb-8 max-w-sm mx-auto">
          Этот кот знает, где она — но не скажет.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-3 rounded-full bg-[#C9897A] text-white font-[Jost] text-sm hover:bg-[#b87a6c] transition-colors">
            На главную
          </Link>
          <Link href="/services" className="px-6 py-3 rounded-full border border-[#3D2B1F]/20 text-[#3D2B1F] dark:text-[#FAF7F2] font-[Jost] text-sm hover:border-[#C9897A] hover:text-[#C9897A] transition-colors">
            Услуги и цены
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
