import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CalculatorTeaser from "@/components/sections/CalculatorTeaser";

export const metadata: Metadata = {
  title: "Калькулятор стоимости",
  description: "Рассчитайте стоимость наращивания волос онлайн. Работа + волосы отдельно.",
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <div className="container-site pt-12 pb-4">
          <div className="max-w-xl">
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">Калькулятор</p>
            <h1 className="font-display text-6xl font-light text-espresso leading-tight">
              Рассчитайте
              <br />
              <em className="italic text-rose">стоимость</em>
            </h1>
          </div>
        </div>
        <CalculatorTeaser />
        <section className="section-padding bg-cream">
          <div className="container-site max-w-2xl">
            <h2 className="font-display text-3xl font-light text-espresso mb-8">Как считается?</h2>
            <div className="space-y-6 font-body text-mink leading-relaxed">
              <p><strong className="text-espresso">Работа</strong> — 1.6 BYN за каждую капсулу. Количество капсул зависит от густоты ваших волос и нужного результата.</p>
              <p><strong className="text-espresso">Волосы</strong> — оплачиваются отдельно по весу и длине. Цена за 100г: от 754 BYN (45 см) до 1141 BYN (80 см).</p>
              <p><strong className="text-espresso">Точный расчёт</strong> — делается на консультации или по фото через ИИ-бот. Калькулятор даёт ориентировочную сумму.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
