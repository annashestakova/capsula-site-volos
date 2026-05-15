import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import "../styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Volos Capsula – Наращивание волос в Бресте и Минске",
    template: "%s | Volos Capsula",
  },
  description:
    "Профессиональное капсульное наращивание волос в Бресте и Минске. Мастер Анна — 5 лет опыта, натуральный славянский волос, ИИ-консультация, расчёт стоимости онлайн.",
  keywords: [
    "наращивание волос Брест",
    "наращивание волос Минск",
    "капсульное наращивание",
    "биопротеин волосы",
    "мастер наращивание Брест",
    "volos capsula",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Volos Capsula",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`}>
      <body className="grain-overlay">
        {children}
      </body>
    </html>
  );
}
