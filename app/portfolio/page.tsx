import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookingCTA } from "@/components/sections/AboutTeaser";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Работы мастера по наращиванию волос Анны. Капсульное, биопротеин, загущение.",
};

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="section-padding bg-cream">
          <div className="container-site">
            <div className="max-w-xl mb-16">
              <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">Портфолио</p>
              <h1 className="font-display text-6xl font-light text-espresso leading-tight">
                Мои
                <br />
                <em className="italic text-rose">работы</em>
              </h1>
              <p className="font-body text-mink mt-6">
                Актуальное портфолио — в Instagram{" "}
                <Link
                  href="https://www.instagram.com/volos_capsula/"
                  target="_blank"
                  className="text-rose hover:text-espresso transition-colors"
                >
                  @volos_capsula
                </Link>
              </p>
            </div>

            {/* Placeholder grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-[3/4] rounded-3xl flex items-center justify-center ${
                    [
                      "bg-blush/30", "bg-lavender/20", "bg-sage/20",
                      "bg-sand", "bg-blush/20", "bg-gold/15",
                      "bg-lavender/30", "bg-sage/30", "bg-blush/15",
                    ][i]
                  }`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">💇‍♀️</div>
                    <p className="font-body text-xs text-mink">Фото #{i + 1}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="font-body text-mink mb-6">
                Смотрите все работы в Instagram — там новые посты каждую неделю
              </p>
              <Link
                href="https://www.instagram.com/volos_capsula/"
                target="_blank"
                className="btn-primary"
              >
                Instagram @volos_capsula →
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
