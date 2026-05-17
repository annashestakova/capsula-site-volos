import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
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
  metadataBase: new URL("https://capssula.by"),
  title: {
    default: "Volos Capsula — Наращивание волос в Бресте и Минске",
    template: "%s | Volos Capsula",
  },
  description: "Профессиональное капсульное наращивание волос в Бресте и Минске. Мастер Анна — 5 лет опыта, натуральный славянский волос, ИИ-консультация, расчёт стоимости онлайн.",
  keywords: ["наращивание волос Брест", "наращивание волос Минск", "капсульное наращивание", "биопротеин волосы", "мастер наращивание Брест", "volos capsula"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Volos Capsula",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`}>
      {/* Google Ads — заменить AW-XXXXXXXXX на ваш ID из аккаунта Google Ads */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX" /> */}
      {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','AW-XXXXXXXXX');` }} /> */}
      <body className="grain-overlay">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://capssula.by",
              name: "Volos Capsula",
              description: "Профессиональное капсульное и биопротеиновое наращивание волос в Бресте и Минске. Мастер Анна — 5 лет опыта, натуральный славянский волос.",
              url: "https://capssula.by",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Брест",
                addressRegion: "Брестская область",
                addressCountry: "BY",
              },
              geo: { "@type": "GeoCoordinates", latitude: "52.0975", longitude: "23.6877" },
              areaServed: ["Брест", "Минск"],
              priceRange: "от 350 BYN",
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "20:00" }
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Услуги наращивания волос",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Капсульное наращивание волос", description: "Горячий метод на натуральном славянском волосе" }, price: "350", priceCurrency: "BYN" },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Биопротеиновое наращивание" }, price: "350", priceCurrency: "BYN" },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Коррекция нарощенных волос" }, price: "350", priceCurrency: "BYN" },
                ],
              },
              sameAs: ["https://www.instagram.com/volos_capsula/", "https://t.me/volos_capsula"],
            }),
          }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
