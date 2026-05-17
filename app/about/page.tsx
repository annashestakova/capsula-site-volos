import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookingCTA } from "@/components/sections/AboutTeaser";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О мастере — Анна, наращивание волос в Бресте",
  description: "Анна — мастер капсульного наращивания волос в Бресте. 5 лет опыта, 300+ клиенток, только натуральный славянский волос. Выезд в Минск.",
  keywords: ["мастер наращивание волос Брест", "наращивание волос Анна Брест", "капсульное наращивание мастер Брест"],
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="section-padding bg-cream">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">О мастере</p>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-espresso leading-tight mb-8">
                  Анна,
                  <br />
                  <em className="italic text-rose">мастер</em>
                  <br />
                  наращивания
                </h1>
                <div className="space-y-5 font-body text-mink leading-relaxed">
                  <p>
                    5 лет я занимаюсь капсульным наращиванием в Бресте и регулярно выезжаю в Минск. За это время сделала сотни процедур и узнала всё о том, что влияет на результат.
                  </p>
                  <p>
                    Я работаю только с натуральным славянским волосом — он мягкий, долговечный и выглядит как свой. Никакого синтетического материала.
                  </p>
                  <p>
                    Каждой клиентке я даю подробный инструктаж по уходу — поэтому у моих клиенток волосы держатся 4–4,5 месяца, а не стандартные 2–3.
                  </p>
                  <p>
                    Чтобы вы могли подготовиться заранее — создала Telegram-бот с ИИ-консультантом, гайд по уходу и этот сайт.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-sand">
                  {[
                    { n: "5+", l: "лет опыта" },
                    { n: "300+", l: "клиенток" },
                    { n: "4.5", l: "мес носки" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-4xl font-semibold text-espresso">{s.n}</div>
                      <div className="font-body text-sm text-mink mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-5">
                {[
                  { icon: "✦", title: "Натуральный волос", desc: "Только настоящий славянский волос — мягкий, без запаха и химии" },
                  { icon: "✦", title: "Капсульный метод", desc: "Горячая техника — самая прочная, капсулы незаметны даже вблизи" },
                  { icon: "✦", title: "Честная цена", desc: "Работа и волосы считаются отдельно — вы платите только за то, что нужно" },
                  { icon: "✦", title: "ИИ-консультация", desc: "Умный бот рассчитает стоимость по вашим фото и ответит на вопросы" },
                  { icon: "✦", title: "Гайд по уходу", desc: "10 страниц практики — мои клиентки носят 4+ месяца" },
                ].map((c) => (
                  <div key={c.title} className="flex gap-5 p-6 bg-milk border border-sand/50 rounded-3xl">
                    <span className="text-rose text-xl mt-0.5 shrink-0">{c.icon}</span>
                    <div>
                      <h3 className="font-body font-semibold text-espresso mb-1">{c.title}</h3>
                      <p className="font-body text-sm text-mink">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
