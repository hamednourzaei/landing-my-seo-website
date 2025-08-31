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
      ? "با TsarSEO سئوی سایت خود را بهبود دهید، ترافیک ارگانیک را افزایش دهید و در گوگل رتبه بهتری کسب کنید."
      : "Improve your site's SEO, boost organic traffic, and rank higher on Google with TsarSEO.",
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
      { src: "/icons/logo.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/logo.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/logo.webp", sizes: "192x192", type: "image/webp" },
      { src: "/icons/logo.webp", sizes: "512x512", type: "image/webp" },
      {
        src: "/icons/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/logo.png",
        sizes: "192x192",
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
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: isFa ? "اخبار" : "News",
        short_name: isFa ? "اخبار" : "News",
        description: isFa
          ? "آخرین اخبار و به‌روزرسانی‌های سئو"
          : "Latest SEO news and updates",
        url: "/news?utm_source=pwa&utm_medium=shortcut",
        icons: [
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: isFa ? "محاسبه سود" : "Calculate Profits",
        short_name: isFa ? "سود" : "Profits",
        description: isFa
          ? "محاسبه سود و بازده سرمایه‌گذاری سئو"
          : "Calculate SEO investment returns and profits",
        url: "/calculate-profits?utm_source=pwa&utm_medium=shortcut",
        icons: [
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: isFa ? "درباره ما" : "About Us",
        short_name: isFa ? "درباره" : "About",
        description: isFa
          ? "با تیم TsarSEO و ماموریت ما آشنا شوید"
          : "Learn about the TsarSEO team and our mission",
        url: "/about?utm_source=pwa&utm_medium=shortcut",
        icons: [
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
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
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
        ],
      },
      {
        name: isFa ? "سیاست حفظ حریم خصوصی" : "Privacy Policy",
        short_name: isFa ? "حریم خصوصی" : "Privacy",
        description: isFa
          ? "سیاست‌های حفظ حریم خصوصی TsarSEO"
          : "TsarSEO's privacy policy",
        url: "/privacy-policy?utm_source=pwa&utm_medium=shortcut",
        icons: [
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
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
    screenshots: [
      {
        src: "/icons/metadata.png",
        sizes: "1280x720",
        type: "image/png",
        label: isFa ? "صفحه اصلی TsarSEO" : "TsarSEO Homepage",
      },
      {
        src: "/icons/metadata.png",
        sizes: "1280x720",
        type: "image/png",
        label: isFa ? "صفحه تحلیل سئو" : "SEO Analysis Page",
      },
      {
        src: "/icons/metadata.png",
        sizes: "1280x720",
        type: "image/png",
        label: isFa ? "صفحه اخبار" : "News Page",
      },
    ],
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    file_handlers: [
      {
        action: "/open-file",
        accept: {
          "text/html": [".html", ".htm"],
          "text/plain": [".txt"],
        },
        icons: [
          { src: "/icons/metadata.png", sizes: "192x192", type: "image/png" },
        ],
      },
    ],
    protocol_handlers: [
      {
        protocol: "web+tsarseo",
        url: "/open?url=%s",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: "https://tsarseo.online",
      },
      {
        platform: "play",
        id: "com.tsarseo.app",
        url: "https://play.google.com/store/apps/details?id=com.tsarseo.app",
      },
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
