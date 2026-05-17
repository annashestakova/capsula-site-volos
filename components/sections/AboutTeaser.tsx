"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="section-padding bg-espresso text-cream overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">О мастере</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-8">
              Привет,
              <br />
              я <em className="italic text-blush">Анна</em>
            </h2>
            <div className="space-y-4 font-body text-cream/70 leading-relaxed">
              <p>
                5 лет я занимаюсь капсульным наращиванием в Бресте и выезжаю в Минск. За это время провела сотни процедур и поняла главное — результат зависит не только от техники, но и от правильного ухода.
              </p>
              <p>
                Поэтому я создала Telegram-бот с ИИ-консультантом, гайд по уходу и этот сайт — чтобы ты знала всё заранее.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 my-10">
              {[
                { n: "5+",   l: "лет опыта" },
                { n: "300+", l: "клиенток" },
                { n: "100%", l: "натур. волос" },
              ].map((s) => (
                <div key={s.l} className="border-l border-cream/20 pl-4">
                  <div className="font-display text-3xl text-cream">{s.n}</div>
                  <div className="font-body text-xs text-cream/50 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 font-body text-sm text-blush hover:text-cream transition-colors group">
              Подробнее обо мне
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Decorative box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="bg-cream/5 border border-cream/10 rounded-5xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-rose/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-lavender/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 rounded-full">
                  <span className="font-body text-sm text-cream/70">🤖 ИИ-консультация</span>
                </div>
                <p className="font-display text-2xl font-light text-cream leading-relaxed italic">
                  "Пришли фото сзади и сбоку — ИИ рассчитает точную стоимость и задаст уточняющие вопросы"
                </p>
                <div className="pt-4 border-t border-cream/10">
                  <p className="font-body text-sm text-cream/50">Стоимость: 19 BYN</p>
                  <p className="font-body text-xs text-cream/30 mt-1">+ бонусом гайд по уходу</p>
                </div>
                <Link
                  href="/booking"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-rose text-cream text-sm font-body font-medium rounded-full hover:bg-blush hover:text-espresso transition-all"
                >
                  Выбрать время
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    name: "Виктория",
    city: "Яндекс Карты",
    text: "Отмечает густоту, длину и форму после работы Анны. Пишет, что результат стал для неё настоящим преображением.",
    rating: 5,
  },
  {
    name: "Elena W.",
    city: "Яндекс Карты",
    text: "Довольна холодным наращиванием, аккуратной работой и комфортной студией. Отдельно отметила удобную парковку.",
    rating: 5,
  },
  {
    name: "Анна Ш.",
    city: "Яндекс Карты",
    text: "Сравнивает с другими мастерами и выделяет качество капсул: держатся ровно, не сползают и выглядят как родные.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-3">Отзывы</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-espresso">
            Что говорят
            <br />
            <em className="italic">клиентки</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white/60 border border-sand/50 rounded-4xl p-7"
            >
              <Quote size={20} className="text-rose/40 mb-4" />
              <p className="font-body text-sm text-mink leading-relaxed mb-6 italic">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-body text-sm font-semibold text-espresso">{r.name}</div>
                  <div className="font-body text-xs text-mink/60">{r.city}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="https://yandex.by/maps/org/u_anny/90436287873/reviews/?ll=23.678135%2C52.105687&z=16"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Все отзывы на Яндекс Картах
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BookingCTA() {
  return (
    <section className="section-padding bg-milk">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-espresso rounded-5xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-lavender/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-4">Запись</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-cream leading-tight mb-6 text-center">
              Готова к{" "}
              <em className="italic text-blush">изменениям?</em>
            </h2>
            <p className="font-body text-cream/60 max-w-md mx-auto mb-10">
              Выберите услугу, дату и время в календаре. Заявка уйдёт Анне в Telegram, а подтверждённые слоты исчезнут из расписания.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-espresso font-body font-medium rounded-full hover:bg-blush transition-all hover:scale-105"
              >
                Открыть календарь
                <ArrowRight size={16} />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream font-body font-medium rounded-full hover:bg-cream/10 transition-all">
                Рассчитать стоимость
              </Link>
            </div>
            <p className="font-body text-xs text-cream/30 mt-8">
              📍 Брест · Минск · Онлайн-консультации
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutTeaser;
