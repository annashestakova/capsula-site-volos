import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingCalendar from "@/components/booking/BookingCalendar";

export const metadata: Metadata = {
  title: "Запись онлайн",
  description: "Выберите услугу, дату и время для записи на наращивание волос в Бресте и Минске.",
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="pt-28">
        <section className="bg-cream px-6 pb-8 pt-20 md:px-10 md:pb-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-body text-sm font-medium uppercase tracking-widest text-rose">
              Онлайн-запись
            </p>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-light leading-tight text-espresso md:text-7xl lg:text-8xl">
              Календарь
              <br />
              <em className="italic text-rose">свободных слотов</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body leading-relaxed text-mink">
              Выберите услугу, дату и время. После отправки Анна получит заявку в Telegram
              и подтвердит запись вручную.
            </p>
          </div>
        </section>
        <BookingCalendar />
      </main>
      <Footer />
    </>
  );
}
