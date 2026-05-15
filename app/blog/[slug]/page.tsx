"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Статьи по топ поисковым запросам по теме наращивания волос
export const BLOG_POSTS = [
  {
    slug: "kapsulyarnoe-narashchivanie-chto-eto",
    title: "Капсульное наращивание волос: что это, как держится и сколько стоит",
    description:
      "Разбираю самый популярный метод: горячий кератин, сколько капсул нужно, как долго держится и почему капсулы не видны у корней.",
    date: "2025-04-10",
    tag: "Капсульное",
    readTime: "5 мин",
    popular: true,
  },
  {
    slug: "bioproteinovye-volosy-novoe-pokolenie",
    title: "Биопротеиновые волосы нового поколения: без ламинирования и кератина",
    description:
      "Почему биопротеин — лучший выбор для пористых волос. Не требует кератинового ламинирования и филлировки. Подходит даже при чувствительной коже головы.",
    date: "2025-04-18",
    tag: "Биопротеин",
    readTime: "4 мин",
    popular: true,
  },
  {
    slug: "skolko-kapsul-nuzhno",
    title: "Сколько капсул нужно для наращивания: полный расчёт по типу волос",
    description:
      "50 или 300 капсул? Объясняю как рассчитать количество для загущения, удлинения и коррекции — с примерами и калькулятором.",
    date: "2025-05-01",
    tag: "Калькулятор",
    readTime: "6 мин",
    popular: true,
  },
  {
    slug: "korrektsiya-narashchennykh-volos",
    title: "Коррекция нарощенных волос: когда делать и сколько стоит",
    description:
      "Коррекция раз в 2–2,5 месяца — не расход, а забота о волосах. Объясняю что происходит с капсулами и почему это важно.",
    date: "2025-05-05",
    tag: "Уход",
    readTime: "4 мин",
    popular: false,
  },
  {
    slug: "zagushchenie-bez-udlineniya",
    title: "Загущение без удлинения: как получить объём и не переплачивать",
    description:
      "Если бюджет ограничен или волосы уже хорошей длины — загущение биопротеиновыми волосами даёт потрясающий эффект за меньшие деньги.",
    date: "2025-05-10",
    tag: "Загущение",
    readTime: "3 мин",
    popular: false,
  },
  {
    slug: "uhod-za-narashhennymi-volosami",
    title: "Уход за нарощенными волосами: полный гайд чтобы носить 4–5 месяцев",
    description:
      "Какие шампуни нельзя, как расчёсывать, спать, мыть голову — всё что нужно знать чтобы капсулы держались максимально долго.",
    date: "2025-05-12",
    tag: "Уход",
    readTime: "7 мин",
    popular: true,
  },
  {
    slug: "slavyanskie-volosy-vs-kitajskie",
    title: "Натуральный славянский волос vs синтетика: в чём разница",
    description:
      "Почему я работаю только с натуральным волосом — про текстуру, блеск, срок службы и то, что не видно на фото в Instagram.",
    date: "2025-05-14",
    tag: "О волосах",
    readTime: "5 мин",
    popular: false,
  },
  {
    slug: "mozhno-li-narashchivat-tonkie-volosy",
    title: "Можно ли наращивать тонкие и ломкие волосы",
    description:
      "Частый вопрос — разбираю какой метод подходит для тонких волос, как минимизировать нагрузку и почему биопротеин здесь в плюсе.",
    date: "2025-05-15",
    tag: "Капсульное",
    readTime: "4 мин",
    popular: false,
  },
];

const TAG_COLORS: Record<string, string> = {
  Капсульное: "bg-[#E8C4B8] text-[#3D2B1F]",
  Биопротеин: "bg-[#B8AECF]/40 text-[#3D2B1F]",
  Уход: "bg-[#A8B5A0]/40 text-[#3D2B1F]",
  Загущение: "bg-[#C9A96E]/30 text-[#3D2B1F]",
  Калькулятор: "bg-[#C9897A]/20 text-[#3D2B1F]",
  "О волосах": "bg-[#FAF7F2] border border-[#E8C4B8] text-[#3D2B1F]",
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function BlogPage() {
  const featured = BLOG_POSTS.filter((p) => p.popular);
  const rest = BLOG_POSTS.filter((p) => !p.popular);

  return (
    <main className="min-h-screen bg-[#FAF7F2] dark:bg-[#1a1210] pt-24 md:pt-28 pb-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-14"
      >
        <p className="text-sm uppercase tracking-widest text-[#C9897A] mb-3 font-[Jost]">
          Блог
        </p>
        <h1 className="font-[Cormorant_Garamond] text-4xl md:text-6xl text-[#3D2B1F] dark:text-[#FAF7F2]">
          Всё о наращивании{" "}
          <em className="not-italic text-[#C9897A]">волос</em>
        </h1>
        <p className="mt-4 font-[Jost] text-[#3D2B1F]/60 dark:text-[#FAF7F2]/60 max-w-md mx-auto">
          Отвечаю на самые частые вопросы — честно, без воды, с примерами из практики
        </p>
      </motion.div>

      {/* Популярные статьи */}
      <div className="max-w-5xl mx-auto mb-10">
        <p className="font-[Jost] text-xs uppercase tracking-widest text-[#3D2B1F]/40 dark:text-[#FAF7F2]/40 mb-6">
          Популярные
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-5"
        >
          {featured.map((post) => (
            <motion.article key={post.slug} variants={cardVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full p-6 rounded-3xl bg-white dark:bg-[#2a1f1a] border border-[#E8C4B8]/60 hover:border-[#C9897A] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`text-xs font-[Jost] px-3 py-1 rounded-full ${TAG_COLORS[post.tag] ?? "bg-[#E8C4B8] text-[#3D2B1F]"}`}
                  >
                    {post.tag}
                  </span>
                  <span className="text-xs text-[#3D2B1F]/40 dark:text-[#FAF7F2]/40 font-[Jost] shrink-0">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-[Cormorant_Garamond] text-xl md:text-2xl text-[#3D2B1F] dark:text-[#FAF7F2] mb-3 group-hover:text-[#C9897A] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="font-[Jost] text-sm text-[#3D2B1F]/60 dark:text-[#FAF7F2]/60 leading-relaxed">
                  {post.description}
                </p>
                <p className="mt-4 font-[Jost] text-xs text-[#C9897A] group-hover:underline">
                  Читать →
                </p>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Остальные */}
      <div className="max-w-5xl mx-auto">
        <p className="font-[Jost] text-xs uppercase tracking-widest text-[#3D2B1F]/40 dark:text-[#FAF7F2]/40 mb-6">
          Ещё статьи
        </p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {rest.map((post) => (
            <motion.article key={post.slug} variants={cardVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white dark:bg-[#2a1f1a] border border-[#E8C4B8]/60 hover:border-[#C9897A] hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-[Jost] px-2.5 py-0.5 rounded-full ${TAG_COLORS[post.tag] ?? "bg-[#E8C4B8] text-[#3D2B1F]"}`}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-[#3D2B1F]/40 font-[Jost]">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-[Cormorant_Garamond] text-lg text-[#3D2B1F] dark:text-[#FAF7F2] group-hover:text-[#C9897A] transition-colors">
                    {post.title}
                  </h2>
                </div>
                <span className="text-[#C9897A] text-sm font-[Jost] shrink-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mt-16 text-center p-8 rounded-3xl bg-[#3D2B1F] text-white"
      >
        <p className="font-[Cormorant_Garamond] text-2xl md:text-3xl mb-3">
          Остались вопросы?
        </p>
        <p className="font-[Jost] text-white/70 text-sm mb-6">
          Спросите ИИ-консультанта в Telegram — отвечает по вашим фото
        </p>
        <a
          href="https://t.me/haircapsula_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9897A] text-white font-[Jost] text-sm hover:bg-[#b87a6c] transition-colors"
        >
          Открыть Telegram-бот →
        </a>
      </motion.div>
    </main>
  );
}
