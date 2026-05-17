import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LottiePlayer from "@/components/LottiePlayer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-32">
        <section className="section-padding">
          <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-widest text-rose">
                404
              </p>
              <h1 className="mt-5 font-display text-6xl font-light leading-tight text-espresso md:text-8xl">
                Эта страница
                <br />
                <em className="italic text-rose">спряталась</em>
              </h1>
              <p className="mt-6 max-w-lg font-body leading-relaxed text-mink">
                Возможно, ссылка устарела. Вернитесь на главную или сразу выберите
                удобное время для записи.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/" className="btn-outline">
                  На главную
                </Link>
                <Link href="/booking" className="btn-primary">
                  Записаться
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-5xl bg-blush/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cream via-transparent to-lavender/20" />
              <LottiePlayer
                src="/lottie/cat-love.json"
                className="relative z-10 mx-auto h-[340px] w-full max-w-[420px] pointer-events-none"
                ariaLabel="кот с сердечками"
                speed={0.82}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
