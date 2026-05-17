import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "../data";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Статья не найдена" };
  return { title: `${post.title} | Volos Capsula`, description: post.description };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

function renderContent(text: string) {
  return text.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) return <h2 key={i} className="font-display text-2xl md:text-3xl text-espresso mt-10 mb-4">{block.replace("## ", "")}</h2>;
    if (block.includes("\n- ")) return (
      <ul key={i} className="space-y-2 my-4">
        {block.split("\n").filter(l => l.startsWith("- ")).map((line, j) => (
          <li key={j} className="flex gap-2 font-body text-mink"><span className="text-rose">•</span><span>{line.replace("- ", "")}</span></li>
        ))}
      </ul>
    );
    return <p key={i} className="font-body text-mink leading-relaxed mb-4">{block}</p>;
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <nav className="flex items-center gap-2 text-sm font-body text-mink mb-8">
          <Link href="/" className="hover:text-rose transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-rose transition-colors">Блог</Link>
        </nav>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-body px-3 py-1 rounded-full bg-blush text-espresso">{post!.tag}</span>
            <span className="text-xs text-mink font-body">{post!.readTime} чтения</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-espresso leading-tight mb-4">{post!.title}</h1>
          <p className="font-body text-mink text-lg leading-relaxed">{post!.description}</p>
        </div>
        <div className="h-px bg-gradient-to-r from-blush via-rose/30 to-transparent mb-10" />
        <div>{renderContent(post!.content || post!.description)}</div>
        <div className="mt-14 p-6 rounded-3xl bg-espresso text-cream text-center">
          <p className="font-display text-2xl mb-2">Хотите рассчитать стоимость?</p>
          <p className="font-body text-cream/70 text-sm mb-5">Калькулятор покажет точную цену за 30 секунд</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/calculator" className="btn-primary">Калькулятор</Link>
            <a href="https://t.me/haircapsula_bot" target="_blank" rel="noopener noreferrer" className="btn-secondary">Telegram-бот →</a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="font-body text-sm text-mink hover:text-rose transition-colors">← Все статьи</Link>
        </div>
      </article>
    </main>
  );
}
