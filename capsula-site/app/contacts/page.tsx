import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Записаться на наращивание волос в Бресте и Минске. Telegram, Instagram.",
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="section-padding bg-cream">
          <div className="container-site">
            <div className="max-w-xl mb-16">
              <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">Контакты</p>
              <h1 className="font-display text-6xl font-light text-espresso leading-tight">
                Давайте
                <br />
                <em className="italic text-rose">познакомимся</em>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: "✈️",
                  title: "Telegram",
                  desc: "Самый быстрый способ записаться. Бот работает 24/7.",
                  link: "https://t.me/volos_capsula",
                  label: "@volos_capsula",
                  accent: "bg-blush/20",
                },
                {
                  icon: "📸",
                  title: "Instagram",
                  desc: "Портфолио работ, актуальные цены, истории клиенток.",
                  link: "https://www.instagram.com/volos_capsula/",
                  label: "@volos_capsula",
                  accent: "bg-lavender/20",
                },
                {
                  icon: "📍",
                  title: "Города",
                  desc: "Принимаю в Бресте. Выезд в Минск по договорённости.",
                  link: null,
                  label: "Брест · Минск · Онлайн",
                  accent: "bg-sage/20",
                },
              ].map((c) => (
                <div key={c.title} className={`${c.accent} border border-sand/40 rounded-4xl p-8`}>
                  <div className="text-3xl mb-5">{c.icon}</div>
                  <h2 className="font-display text-2xl font-semibold text-espresso mb-3">{c.title}</h2>
                  <p className="font-body text-sm text-mink mb-6 leading-relaxed">{c.desc}</p>
                  {c.link ? (
                    <Link href={c.link} target="_blank" className="font-body text-sm font-medium text-rose hover:text-espresso transition-colors">
                      {c.label} →
                    </Link>
                  ) : (
                    <span className="font-body text-sm font-medium text-espresso">{c.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Big CTA */}
            <div className="bg-espresso rounded-5xl p-12 text-center text-cream">
              <h2 className="font-display text-4xl font-light mb-4">
                Готова к <em className="italic text-blush">записи?</em>
              </h2>
              <p className="font-body text-cream/60 mb-8 max-w-md mx-auto">
                Напишите в Telegram-бот — там можно сразу рассчитать стоимость, задать вопросы ИИ и выбрать время.
              </p>
              <Link
                href="https://t.me/volos_capsula"
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-espresso font-body font-medium rounded-full hover:bg-blush transition-all hover:scale-105"
              >
                Написать в Telegram →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
