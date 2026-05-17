import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookingCTA } from "@/components/sections/AboutTeaser";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Работы мастера по наращиванию волос Анны. Капсульное, биопротеин, загущение.",
};

const offsets = [
  "", "md:mt-12", "md:mt-4", "md:mt-20", "md:-mt-4", "md:mt-10",
  "md:mt-2", "md:mt-16", "", "md:mt-8",
];

const portfolioItems = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1).padStart(2, "0"),
  src: `/portfolio/portfolio-${i + 1}.jpg`,
  offset: offsets[i],
}));

const hearts = [
  { shape: "♥", className: "portfolio-heart--glow", top: "10%", left: "7%", size: "26px", delay: "0s" },
  { shape: "♡", className: "portfolio-heart--blink", top: "18%", left: "22%", size: "18px", delay: ".8s" },
  { shape: "♥", className: "portfolio-heart--soft", top: "9%", left: "43%", size: "15px", delay: "1.5s" },
  { shape: "♡", className: "portfolio-heart--outline", top: "22%", left: "62%", size: "24px", delay: ".2s" },
  { shape: "♥", className: "portfolio-heart--glow", top: "13%", left: "83%", size: "20px", delay: "1s" },
  { shape: "♡", className: "portfolio-heart--blink", top: "35%", left: "76%", size: "14px", delay: "2s" },
  { shape: "♥", className: "portfolio-heart--soft", top: "38%", left: "13%", size: "17px", delay: ".4s" },
  { shape: "♡", className: "portfolio-heart--outline", top: "49%", left: "91%", size: "22px", delay: "1.8s" },
  { shape: "♥", className: "portfolio-heart--glow", top: "57%", left: "31%", size: "13px", delay: "2.4s" },
];

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-28">
        <section className="relative overflow-hidden bg-cream">
          <div className="portfolio-hearts" aria-hidden="true">
            {hearts.map((heart, index) => (
              <span
                key={`${heart.shape}-${index}`}
                className={`portfolio-heart ${heart.className}`}
                style={{
                  top: heart.top,
                  left: heart.left,
                  fontSize: heart.size,
                  animationDelay: heart.delay,
                }}
              >
                {heart.shape}
              </span>
            ))}
          </div>

          <div className="container-site relative z-10 pb-20 pt-16 md:pb-28 md:pt-24">
            <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
              <p className="mb-4 font-body text-sm font-medium uppercase tracking-widest text-rose">Портфолио</p>
              <h1 className="font-display text-5xl font-light leading-tight text-espresso md:text-7xl">
                Мои
                <br />
                <em className="italic text-rose">работы</em>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-8 text-mink md:text-lg">
                Живые оттенки, мягкие переходы и аккуратная плотность. Здесь будут собраны реальные результаты в формате вертикальной галереи.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="https://www.instagram.com/volos_capsula/"
                  target="_blank"
                  className="btn-outline"
                >
                  Instagram
                </Link>
                <Link href="/booking" className="btn-primary">
                  Записаться
                </Link>
              </div>
            </div>

            <div className="portfolio-grid grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className={`portfolio-work-card group relative aspect-[9/16] overflow-hidden rounded-[1.35rem] border border-white/70 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl ${item.offset}`}
                >
                  <Image
                    src={item.src}
                    alt={`Работа ${item.id}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center md:mt-20">
              <p className="mx-auto mb-6 max-w-2xl font-body text-mink">
                Больше свежих работ и видео процесса — в Instagram.
              </p>
              <Link
                href="https://www.instagram.com/volos_capsula/"
                target="_blank"
                className="btn-primary"
              >
                Открыть Instagram
              </Link>
            </div>
          </div>
        </section>
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
