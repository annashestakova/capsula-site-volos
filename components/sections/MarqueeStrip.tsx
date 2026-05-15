"use client";

const items = [
  "Капсульное наращивание",
  "Натуральный волос",
  "Биопротеин",
  "Брест · Минск",
  "4+ месяца носки",
  "ИИ-консультация",
  "Загущение",
  "Удлинение",
  "Коррекция",
];

export default function MarqueeStrip() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-espresso py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="font-body text-sm text-cream/80 font-medium mx-8 flex items-center gap-3">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-rose/60 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
