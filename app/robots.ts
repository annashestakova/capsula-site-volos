// app/robots.ts
import { MetadataRoute } from "next";

const BASE_URL = "https://volos-capsula.by"; // ← замени на свой домен

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
