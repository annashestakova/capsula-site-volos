import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const BASE_URL = "https://capsula-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Volos Capsula — Наращивание волос в Бресте и Минске",
    template: "%s | Volos Capsula",
  },
  description: "Профессиональное капсульное и биопротеиновое наращивание волос. Мастер Анна — 5 лет опыта. Натуральный славянский волос. Брест и Минск. 4–5 месяцев носки.",
  keywords: ["наращивание волос Брест", "наращивание волос Минск", "капсульное наращивание", "биопротеиновые волосы", "загущение волос", "мастер наращивание Брест", "volos capsula"],
  authors: [{ name: "Анна", url: BASE_URL }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: BASE_URL,
    siteName: "Volos Capsula",
    title: "Volos Capsula — Наращивание волос в Бресте и Минске",
    description: "Капсульное и биопротеиновое наращивание. Натуральный волос. 4–5 месяцев носки.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volos Capsula — Наращивание волос",
    description: "Капсульное и биопротеиновое наращивание. Брест · Минск.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1210" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="bg-[#FAF7F2] dark:bg-[#1a1210] text-[#3D2B1F] dark:text-[#FAF7F2] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Volos Capsula",
              description: "Профессиональное капсульное и биопротеиновое наращивание волос.",
              url: BASE_URL,
              address: { "@type": "PostalAddress", addressLocality: "Брест", addressCountry: "BY" },
              areaServed: ["Брест", "Минск"],
              priceRange: "от 160 BYN",
              sameAs: ["https://www.instagram.com/volos_capsula/", "https://t.me/haircapsula_bot"],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
