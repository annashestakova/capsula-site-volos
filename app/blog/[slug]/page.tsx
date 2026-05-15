import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export const BLOG_POSTS = [
  { slug: "kapsulyarnoe-narashchivanie-chto-eto", title: "Капсульное наращивание волос: что это, как держится и сколько стоит", description: "Разбираю самый популярный метод: горячий кератин, сколько капсул нужно, как долго держится.", date: "2025-04-10", tag: "Капсульное", readTime: "5 мин", popular: true },
  { slug: "bioproteinovye-volosy-novoe-pokolenie", title: "Биопротеиновые волосы нового поколения: без ламинирования и кератина", description: "Почему биопротеин — лучший выбор для пористых волос. Не требует кератинового ламинирования.", date: "2025-04-18", tag: "Биопротеин", readTime: "4 мин", popular: true },
  { slug: "skolko-kapsul-nuzhno", title: "Сколько капсул нужно для наращивания: полный расчёт по типу волос", description: "50 или 300 капсул? Объясняю как рассчитать количество для загущения, удлинения и коррекции.", date: "2025-05-01", tag: "Калькулятор", readTime: "6 мин", popular: true },
  { slug: "korrektsiya-narashchennykh-volos", title: "Коррекция нарощенных волос: когда делать и сколько стоит", description: "Коррекция раз в 2–2,5 месяца — не расход, а забота о волосах. От 160 BYN.", date: "2025-05-05", tag: "Уход", readTime: "4 мин", popular: false },
  { slug: "zagushchenie-bez-udlineniya", title: "Загущение без удлинения: как получить объём и не переплачивать", description: "Загущение биопротеиновыми волосами даёт потрясающий эффект за меньшие деньги.", date: "2025-05-10", tag: "Загущение", readTime: "3 мин", popular: false },
  { slug: "uhod-za-narashhennymi-volosami", title: "Уход за нарощенными волосами: гайд чтобы носить 4–5 месяцев", description: "Какие шампуни нельзя, как расчёсывать, спать, мыть голову — всё для максимального срока.", date: "2025-05-12", tag: "Уход", readTime: "7 мин", popular: true },
  { slug: "slavyanskie-volosy-vs-kitajskie", title: "Натуральный славянский волос: в чём разница и почему это важно", description: "Почему я работаю только с натуральным волосом — про текстуру, блеск и срок службы.", date: "2025-05-14", tag: "О волосах", readTime: "5 мин", popular: false },
  { slug: "mozhno-li-narashchivat-tonkie-volosy", title: "Можно ли наращивать тонкие и ломкие волосы", description: "Разбираю какой метод подходит для тонких волос и почему биопротеин здесь в плюсе.", date: "2025-05-15", tag: "Капсульное", readTime: "4 мин", popular: false },
];

const BLOG_CONTENT: Record<string, string> = {
  "kapsulyarnoe-narashchivanie-chto-eto": `Капсульное наращивание — метод, при котором каждая прядь натурального волоса крепится к вашему волосу с помощью кератиновой капсулы.\n\n## Как долго держится\n\nПри правильном уходе — 4–5 месяцев. Капсулы не чувствуются и не видны у корней.\n\n## Сколько капсул нужно\n\n- Загущение височных зон — 50–100 капсул\n- Полное загущение — 130–170 капсул\n- Удлинение тонких волос — 150–250 капсул\n- Удлинение средних волос — 250–300 капсул\n- Удлинение густых волос — 300–380 капсул\n\n## Стоимость\n\nРабота: 1,6 BYN/капсула. Коррекция от 160 BYN.`,
  "bioproteinovye-volosy-novoe-pokolenie": `Биопротеиновые волосы — материал нового поколения, максимально приближенный к натуральным волосам человека.\n\n## Главное отличие\n\nНе нужно кератиновое ламинирование или филлировка. Волос уже имеет правильную текстуру — сразу ведёт себя как родной.\n\n## Для кого особенно хорош\n\n- Пористые волосы — биопротеин имеет аналогичную пористость\n- Чувствительная кожа головы — гипоаллергенный состав\n- Первое наращивание — более мягкое привыкание\n\n## Нет бюджета на полное наращивание?\n\nЗагущение биопротеиновыми волосами — отличный старт. 50–100 капсул дают заметный объём за меньшие деньги.`,
  "uhod-za-narashhennymi-volosami": `## Чего нельзя\n\n- Сульфатные шампуни — разрушают кератин в капсулах\n- Маски и бальзамы на корни — только на длину\n- Спать с мокрыми волосами\n- Расчёсывать снизу вверх у корней\n\n## Что делать обязательно\n\n- Расчёсывать каждое утро мягкой щёткой\n- Перед сном заплетать в косу\n- Мыть голову 2–3 раза в неделю\n- Коррекция каждые 2–2,5 месяца\n\n## Результат\n\nПри соблюдении гайда — 4–5 месяцев без потерь.`,
};

function getContent(slug: string, post: typeof BLOG_POSTS[0]): string {
  return BLOG_CONTENT[slug] ?? `${post.description}\n\nЗадайте вопрос в Telegram-боте — ИИ-консультант ответит по вашим фото.`;
}

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
    if (block.startsWith("## ")) {
      return <h2 key={i} className="font-[Cormorant_Garamond] text-2xl md:text-3xl text-[#3D2B1F] dark:text-[#FAF7F2] mt-10 mb-4">{block.replace("## ", "")}</h2>;
    }
    if (block.includes("\n- ")) {
      return (
        <ul key={i} className="space-y-2 my-4">
          {block.split("\n").filter(l => l.startsWith("- ")).map((line, j) => (
            <li key={j} className="flex gap-2 font-[Jost] text-[#3D2B1F]/80 dark:text-[#FAF7F2]/80">
              <span className="text-[#C9897A]">•</span><span>{line.replace("- ", "")}</span>
            </li>
          ))}
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
          <span className="truncate max-w-[200px]">{post!.tag}</span>
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
            <a href="https://t.me/haircapsula_bot" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/20 text-white font-[Jost] text-sm hover:border-[#C9897A] transition-colors">Telegram-бот →</a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link href="/blog" className="font-[Jost] text-sm text-[#3D2B1F]/50 hover:text-[#C9897A] transition-colors">← Все статьи</Link>
        </div>
      </article>
    </main>
  );
}
