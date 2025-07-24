
import { NextResponse } from "next/server";

export const runtime = "edge";

const getLocale = (request: Request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/fa")) return "fa-IR";
  if (pathname.startsWith("/en")) return "en-US";

  const acceptLanguage = request.headers.get("accept-language");
  return acceptLanguage?.includes("fa") ? "fa-IR" : "en-US";
};

export async function GET(request: Request) {
  const locale = getLocale(request);
  const isFa = locale === "fa-IR";

  const manifest = {
    id: "tsarseo-pwa",
    name: isFa
      ? "TsarSEO | ابزار هوشمند سئو برای رتبه بهتر در گوگل"
      : "TsarSEO | Smart SEO Tool for Better Google Rankings",
    short_name: "TsarSEO",
    description: isFa
      ? "با TsarSEO سئوی سایت خود را به‌راحتی بهبود دهید، ترافیک ارگانیک را افزایش دهید و رتبه بهتری در گوگل کسب کنید. بدون نیاز به دانش تخصصی."
      : "With TsarSEO, easily improve your site's SEO, boost organic traffic, and achieve better Google rankings without needing expertise.",
    start_url: "/?utm_source=pwa&utm_medium=app",
    display: "standalone",
    background_color: "#252B39",
    theme_color: "#2b2b2b",
    lang: locale,
    dir: isFa ? "rtl" : "ltr",
    orientation: "any",
    scope: "/",
    categories: [
      "productivity",
      "business",
      "seo",
      "marketing",
      "web development",
      "analytics",
    ],
    icons: [
      { src: "/icons/Logo.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/Logo.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/logo-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: isFa ? "تحلیل سئو" : "SEO Analysis",
        short_name: isFa ? "تحلیل" : "Analyze",
        description: isFa
          ? "آنالیز سریع و دقیق سئوی سایت شما"
          : "Quick and accurate SEO analysis for your site",
        url: "/analyze?utm_source=pwa&utm_medium=shortcut",
        icons: [
          {
            src: "/icons/Logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: isFa ? "تماس با ما" : "Contact Us",
        short_name: isFa ? "تماس" : "Contact",
        description: isFa
          ? "ارتباط با تیم TsarSEO برای مشاوره سئو"
          : "Connect with the TsarSEO team for SEO consultation",
        url: "/contact?utm_source=pwa&utm_medium=shortcut",
        icons: [
          {
            src: "/icons/Logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
    share_target: {
      action: "/share",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },
    display_override: ["window-controls-overlay", "standalone"],
    related_applications: [
      { platform: "webapp", url: "https://tsarseo.com" },
    ],
    prefer_related_applications: false,
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
