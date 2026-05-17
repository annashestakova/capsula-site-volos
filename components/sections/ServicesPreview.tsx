"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "capsule",
    title: "Капсульное наращивание",
    desc: "Горячий метод на натуральном славянском волосе. Держится 3–4 месяца. Незаметные капсулы у корней.",
    price: "от 350 BYN",
    accent: "bg-blush/30",
    tag: "Популярное",
  },
  {
    id: "bioprotein",
    title: "Биопротеиновое",
    desc: "Гипоаллергенный состав, волосы включены. Подходит для чувствительной кожи головы.",
    price: "350–400 BYN",
    accent: "bg-lavender/20",
    tag: "Эксклюзив",
  },
  {
    id: "thickening",
    title: "Загущение",
    desc: "Для объёма и густоты без удлинения. 50–170 капсул в зависимости от нужного результата.",
    price: "от 160 BYN",
    accent: "bg-sage/20",
    tag: "Быстро",
  },
  {
    id: "correction",
    title: "Коррекция",
    desc: "Поддержание нарощенных волос каждые 2–2,5 месяца. Капсулы поднимаются ближе к корням.",
    price: "от 160 BYN",
    accent: "bg-gold/15",
    tag: "Уход",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-body text-sm text-rose font-medium tracking-widest uppercase mb-3">Услуги</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-espresso leading-tight">
              Что я делаю
              <br />
              <em className="italic">лучше всего</em>
            </h2>
          </div>
          <Link href="/services" className="btn-ghost group self-start md:self-auto">
            Все услуги и цены
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((s) => (
            <motion.div key={s.id} variants={item}>
              <Link href="/services" className="block h-full">
                <div className={`h-full rounded-4xl p-7 ${s.accent} border border-sand/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}>
                  <div className="inline-flex px-3 py-1 bg-white/60 rounded-full text-xs font-body font-medium text-mink mb-6">
                    {s.tag}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-espresso mb-3 leading-tight">
                    {s.title}
                  </h3>
                  <p className="font-body text-sm text-mink leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-semibold text-espresso">{s.price}</span>
                    <span className="w-8 h-8 rounded-full bg-espresso/10 flex items-center justify-center transition-all group-hover:bg-espresso group-hover:text-cream">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
