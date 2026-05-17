"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "./data";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TAG_COLORS: Record<string, string> = {
  "Капсульное": "bg-blush text-espresso",
  "Биопротеин": "bg-lavender/40 text-espresso",
  "Уход": "bg-sage/40 text-espresso",
  "Загущение": "bg-gold/30 text-espresso",
  "Калькулятор": "bg-rose/20 text-espresso",
  "О волосах": "bg-cream border border-blush text-espresso",
};

export default function BlogPage() {
  const featured = BLOG_POSTS.filter((p) => p.popular);
  const rest = BLOG_POSTS.filter((p) => !p.popular);
  return (
    <>
    <Header />
    <main className="min-h-screen bg-cream pt-24 md:pt-28 pb-20 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto text-center mb-14">
        <p className="text-sm uppercase tracking-widest text-rose mb-3 font-body">Блог</p>
        <h1 className="font-display text-4xl md:text-6xl text-espresso">
          Всё о наращивании <em className="not-italic text-rose">волос</em>
        </h1>
        <p className="mt-4 font-body text-mink max-w-md mx-auto">Отвечаю на самые частые вопросы — честно, без воды</p>
      </motion.div>
      <div className="max-w-5xl mx-auto mb-10">
        <p className="font-body text-xs uppercase tracking-widest text-mink mb-6">Популярные</p>
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/blog/${post.slug}`} className="group block h-full p-6 rounded-3xl bg-white border border-blush/60 hover:border-rose hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-xs font-body px-3 py-1 rounded-full ${TAG_COLORS[post.tag] ?? "bg-blush text-espresso"}`}>{post.tag}</span>
                  <span className="text-xs text-mink font-body shrink-0">{post.readTime}</span>
                </div>
                <h2 className="font-display text-xl md:text-2xl text-espresso mb-3 group-hover:text-rose transition-colors leading-snug">{post.title}</h2>
                <p className="font-body text-sm text-mink leading-relaxed">{post.description}</p>
                <p className="mt-4 font-body text-xs text-rose group-hover:underline">Читать →</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-xs uppercase tracking-widest text-mink mb-6">Ещё статьи</p>
        <div className="flex flex-col gap-4">
          {rest.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-blush/60 hover:border-rose hover:shadow-md transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-body px-2.5 py-0.5 rounded-full ${TAG_COLORS[post.tag] ?? "bg-blush text-espresso"}`}>{post.tag}</span>
                    <span className="text-xs text-mink font-body">{post.readTime}</span>
                  </div>
                  <h2 className="font-display text-lg text-espresso group-hover:text-rose transition-colors">{post.title}</h2>
                </div>
                <span className="text-rose text-sm font-body shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto mt-16 text-center p-8 rounded-3xl bg-espresso text-cream">
        <p className="font-display text-2xl md:text-3xl mb-3">Остались вопросы?</p>
        <p className="font-body text-cream/70 text-sm mb-6">Спросите ИИ-консультанта в Telegram</p>
        <a href="https://t.me/haircapsula_bot" target="_blank" rel="noopener noreferrer" className="btn-primary">Открыть Telegram-бот →</a>
      </motion.div>
    </main>
    <Footer />
    </>
  );
}
