import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookingCTA } from "@/components/sections/AboutTeaser";

export const metadata: Metadata = {
  title: "Услуги и цены",
  description: "Капсульное наращивание, биопротеин, загущение, коррекция. Цены в Бресте и Минске.",
};

const services = [
  {
    title: "Капсульное наращивание",
    desc: "Горячий метод на натуральном славянском волосе. Капсулы прикрепляются у корней и держатся 3–4 месяца.",
    items: ["Работа: 1.6 BYN/капсулу", "Волос отдельно (от 754 BYN/100г)", "Загущение: от 160 BYN", "Удлинение: от 400 BYN"],
    accent: "bg-blush/20",
  },
  {
    title: "Биопротеиновое",
    desc: "Гипоаллергенный натуральный состав. Волосы включены в стоимость. Подходит для чувствительной кожи.",
    items: ["350–400 BYN (волосы включены)", "Процедура 2–4 часа", "Держится 2–3 месяца"],
    accent: "bg-lavender/20",
  },
  {
    title: "Снятие",
    desc: "Профессиональное снятие без повреждения собственных волос.",
    items: ["Капсульное: 0.4 BYN/прядь", "Биопротеин: 50 BYN/100г"],
    accent: "bg-sage/20",
  },
  {
    title: "Коррекция",
    desc: "Поддержание нарощенных волос каждые 2–2,5 месяца. Капсулы поднимаются ближе к корням.",
    items: ["от 80 BYN", "Рекомендуется раз в 2–2,5 месяца"],
    accent: "bg-gold/15",
  },
  {
    title: "Распутывание колтунов",
    desc: "Аккуратное распутывание и уход за нарощенными волосами.",
    items: ["50 BYN/час"],
    accent: "bg-blush/10",
  },
];

const prices: Array<{len: number; price: number}> = [
  {len:45,price:754},{len:50,price:785},{len:55,price:815},{len:60,price:878},
  {len:65,price:940},{len:70,price:986},{len:75,price:1079},{len:80,price:1141},
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="section-padding bg-cream">
          <div className="container-site">
            <div className="max-w-2xl mb-20">
              <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">Услуги</p>
              <h1 className="font-display text-6xl md:text-7xl font-light text-espresso leading-tight">
                Услуги
                <br />
                <em className="italic text-rose">и цены</em>
              </h1>
              <p className="font-body text-mink mt-6 leading-relaxed">
                Стоимость работы и волос указана отдельно — так честнее. Вы платите ровно столько, сколько нужно именно вам.
              </p>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {services.map((s) => (
                <div key={s.title} className={`${s.accent} border border-sand/40 rounded-4xl p-8`}>
                  <h2 className="font-display text-2xl font-semibold text-espresso mb-3">{s.title}</h2>
                  <p className="font-body text-sm text-mink leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.items.map((i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-espresso">
                        <span className="text-rose mt-0.5">·</span>
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Hair prices table */}
            <div className="bg-espresso rounded-5xl p-10 text-cream">
              <h2 className="font-display text-3xl font-light mb-2">Стоимость волос</h2>
              <p className="font-body text-sm text-cream/60 mb-8">Натуральный славянский волос · цена за 100г · +30 BYN за каждые следующие 100г</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {prices.map((p) => (
                  <div key={p.len} className="bg-cream/10 rounded-2xl p-4 text-center">
                    <div className="font-display text-2xl font-semibold text-cream">{p.len} см</div>
                    <div className="font-body text-sm text-cream/70 mt-1">{p.price} BYN</div>
                    <div className="font-body text-xs text-cream/40 mt-1">{(p.price/100).toFixed(2)} BYN/г</div>
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
