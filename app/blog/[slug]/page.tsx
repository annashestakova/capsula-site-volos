import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "../page";

const BLOG_CONTENT: Record<string, string> = {
  "kapsulyarnoe-narashchivanie-chto-eto": `
Капсульное наращивание — это метод, при котором каждая прядь натурального волоса крепится к вашему волосу с помощью кератиновой капсулы.

## Как долго держится

При правильном уходе — 4–5 месяцев. Капсулы не чувствуются и не видны у корней.

Каждые 2–2,5 месяца делается коррекция: капсулы поднимаются ближе к корням по мере отрастания.

## Сколько капсул нужно

- Загущение височных зон — 50–100 капсул
- Полное загущение — 130–170 капсул
- Удлинение для тонких волос — 150–250 капсул
- Удлинение для средних волос — 250–300 капсул
- Удлинение для густых волос — 300–380 капсул

## Сколько стоит

Работа рассчитывается по числу капсул: 1,6 BYN/капсула. Коррекция от 160 BYN.
  `,
  "bioproteinovye-volosy-novoe-pokolenie": `
Биопротеиновые волосы — материал нового поколения, максимально приближенный к натуральным волосам человека.

## Главное отличие

С биопротеиновыми волосами нового поколения не нужно кератиновое ламинирование или филлировка. Волос уже имеет правильную текстуру — сразу ведёт себя как родной.

## Для кого биопротеин особенно хорош

- Пористые волосы — биопротеин имеет аналогичную пористость
- Чувствительная кожа головы — гипоаллергенный состав
- Первое наращивание — более мягкое привыкание

## Если нет бюджета на полное наращивание

Загущение биопротеиновыми волосами — отличный старт. 50–100 капсул дают заметный объём за меньшие деньги.
  `,
  "uhod-za-narashhennymi-volosami": `
## Чего нельзя делать

- Сульфатные шампуни — разрушают кератин в капсулах
- Маски и бальзамы на корни — только на длину
- Спать с мокрыми волосами
- Расчёсывать у корней снизу вверх

## Что делать обязательно

- Расчёсывать каждое утро мягкой щёткой
- Перед сном заплетать в мягкую косу
- Мыть голову 2–3 раза в неделю
- Делать коррекцию каждые 2–2,5 месяца

## Сколько реально носят мои клиентки

При соблюдении гайда — 4–5 месяцев без потерь.
  `,
};

function getContent(slug: string, post: (typeof BLOG_POSTS)[0]): string {
  return BLOG_CONTENT[slug] ?? `
${post.description}

Задайте вопрос в Telegram-боте [@haircapsula_bot](https://t.me/haircapsula_bot) — ИИ-консультант ответит по вашим фото.
  `;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Статья не найдена" };
  return {
    title: `${post.title} | Volos Capsula`,
    description: post.description,
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

function renderContent(text: string) {
  return text.trim().split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i} className="font-[Cormorant_Garamond] text-2xl md:text-3xl text-[#3D2B1F] dark:text-[#FAF7F2] mt-10 mb-4">{block.replace("## ", "")}</h2>;
    }
    if (block.includes("\n- ")) {
      const lines = block.split("\n").filter(Boolean);
      return (
        <ul key={i} className="space-y-2 my-4">
          {lines.map((line, j) => line.startsWith("- ") ? (
            <li key={j} className="flex gap-2 font-[Jost] text-[#3D2B1F]/80 dark:text-[#FAF7F2]/80">
              <span className="text-[#C9897A] mt-0.5">•</span>
              <span>{line.replace("- ", "")}</span>
            </li>
          ) : null)}
        </ul>
      );
    }
    return <p key={i} className="font-[Jost] text-[#3D2B1F]/80 dark:text-[#FAF7F2]/80 leading-relaxed mb-4">{block}</p>;
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#FAF7F2] dark:bg-[#1a1210] pt-24 md:pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <nav className="flex items-center gap-2 text-sm font-[Jost] text-[#3D2B1F]/40 mb-8">
          <Link href="/" className="hover:text-[#C9897A] transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#C9897A] transition-colors">Блог</Link>
          <span>/</span>
          <span className="text-[#3D2B1F]/70 truncate max-w-[200px]">{post!.title}</span>
        </nav>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-[Jost] px-3 py-1 rounded-full bg-[#E8C4B8] text-[#3D2B1F]">{post!.tag}</span>
            <span className="text-xs text-[#3D2B1F]/40 font-[Jost]">{post!.readTime} чтения</span>
          </div>
          <h1 className="font-[Cormorant_Garamond] text-3xl md:text-5xl text-[#3D2B1F] dark:text-[#FAF7F2] leading-tight mb-4">{post!.title}</h1>
          <p className="font-[Jost] text-[#3D2B1F]/60 text-lg leading-relaxed">{post!.description}</p>
        </div>

        <div className="h-px bg-gradient-to-r from-[#E8C4B8] via-[#C9897A]/30 to-transparent mb-10" />

        <div>{renderContent(getContent(params.slug, post!))}</div>

        <div className="mt-14 p-6 rounded-3xl bg-[#3D2B1F] text-white text-center">
          <p className="font-[Cormorant_Garamond] text-2xl mb-2">Хотите рассчитать стоимость?</p>
          <p className="font-[Jost] text-white/70 text-sm mb-5">Калькулятор покажет точную цену за 30 секунд</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/calculator" className="px-6 py-3 rounded-full bg-[#C9897A] text-white font-[Jost] text-sm hover:bg-[#b87a6c] transition-colors">Калькулятор</Link>
            <a href="https://t.me/haircapsula_bot" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/20 text-white font-[Jost] text-sm hover:border-[#C9897A] transition-colors">
              Telegram-бот →
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="font-[Jost] text-sm text-[#3D2B1F]/50 hover:text-[#C9897A] transition-colors">← Все статьи</Link>
        </div>
      </article>
    </main>
  );
}
