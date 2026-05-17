"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarCheck, MessageCircle, Scissors } from "lucide-react";
import LottiePlayer from "@/components/LottiePlayer";

const slides = [
  {
    title: "Выберите услугу",
    text: "Капсульное, биопротеин, загущение или коррекция — выберите то, что вам нужно.",
    icon: Scissors,
    lottieSrc: "/lottie/orange-cat-peeping.json",
    lottieLabel: "кот выглядывает",
    lottieClass: "h-[300px] max-w-[250px] lg:h-[360px] lg:max-w-[300px]",
    speed: 0.9,
  },
  {
    title: "Выберите время",
    text: "Откройте календарь — свободные слоты видно сразу. Нажмите на удобный день и час.",
    icon: CalendarCheck,
    lottieSrc: "/lottie/location-search.json",
    lottieLabel: "поиск локации",
    lottieClass: "h-[280px] max-w-[360px] lg:h-[340px] lg:max-w-[420px]",
    speed: 0.85,
  },
  {
    title: "Анна на связи",
    text: "Заявка уходит к мастеру. Анна проверит и лично подтвердит запись — обычно в тот же день.",
    icon: MessageCircle,
    lottieSrc: "/lottie/travel.json",
    lottieLabel: "машинка едет",
    lottieClass: "h-[270px] max-w-[380px] lg:h-[330px] lg:max-w-[450px]",
    speed: 0.78,
  },
];

export default function BookingShowcase() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const Icon = slide.icon;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-5xl bg-espresso text-cream"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose/20 via-transparent to-lavender/20 pointer-events-none" />
          <div className="relative z-10 grid min-h-[520px] grid-cols-1 items-center gap-10 p-8 text-center md:p-12 lg:grid-cols-[1fr_0.82fr] lg:text-left">
            <div className="mx-auto max-w-3xl lg:mx-0">
              <p className="font-body text-sm font-medium uppercase tracking-widest text-blush">
                Онлайн-запись
              </p>
              <h2 className="mt-4 font-display text-5xl font-light leading-tight md:text-7xl">
                Записаться
                <br />
                <em className="italic text-blush">просто и быстро</em>
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-body leading-relaxed text-cream/65 lg:mx-0">
                Открываете слоты, выбираете удобное время — и всё. Анна получит
                заявку и лично подтвердит запись. Никаких звонков, никакого ожидания.
              </p>

              <div className="mx-auto mt-10 max-w-xl rounded-4xl border border-cream/10 bg-cream/[0.08] p-6 text-left lg:mx-0">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-espresso">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-cream">
                      {slide.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-cream/60">
                      {slide.text}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  {slides.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Показать слайд ${index + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        index === active ? "w-10 bg-blush" : "w-2 bg-cream/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/booking" className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 font-body font-medium text-espresso transition-all hover:bg-blush">
                  Выбрать время
                  <ArrowRight size={16} />
                </Link>
                <Link href="/calculator" className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-8 py-4 font-body font-medium text-cream transition-all hover:bg-cream/10">
                  Рассчитать стоимость
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-[380px]" aria-hidden="true">
              <div className="absolute inset-6 rounded-full bg-blush/10 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.lottieSrc}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10 flex min-h-[300px] items-center justify-center lg:min-h-[380px]"
                >
                  <LottiePlayer
                    src={slide.lottieSrc}
                    className={`pointer-events-none mx-auto w-full ${slide.lottieClass}`}
                    ariaLabel={slide.lottieLabel}
                    speed={slide.speed}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
