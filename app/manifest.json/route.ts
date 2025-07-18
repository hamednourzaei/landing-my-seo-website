import { NextResponse } from "next/server";

export const runtime = "edge"; // اجرای Edge برای سرعت بهتر

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
      ? "TsarSEO | سئوی سریع و آسان برای رتبه بهتر در گوگل"
      : "TsarSEO | Fast & Easy SEO for Better Google Rankings",
    short_name: "TsarSEO",
    description: isFa
      ? "با TsarSEO بدون نیاز به تخصص، ترافیک سایتت رو زیاد کن، نرخ کلیک رو بالا ببر و رتبه گوگلت رو بهبود بده."
      : "With TsarSEO, boost your site's traffic, improve click-through rate, and get better Google rankings without expertise.",
    start_url: "/?utm_source=pwa&utm_medium=app",
    display: "standalone",
    background_color: "#252B39", // برگرفته از رنگ background تم تاریک (hsl(252 27% 9%))
    theme_color: "#F7A400", // رنگ نارنجی پریماری (hsl(24.6 95% 53.1%)) تبدیل شده به هگز (تقریبی)
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
    ],
    icons: [
      { src: "/icons/Logo.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/Logo.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/Logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: isFa ? "آنالیز سئو" : "SEO Analysis",
        short_name: isFa ? "تحلیل" : "Analyze",
        description: isFa ? "آنالیز سریع سئوی سایت" : "Quick SEO analysis",
        url: "/analyze?utm_source=pwa&utm_medium=shortcut",
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
    related_applications: [{ platform: "webapp", url: "https://www.tsarseo.com/" }],
    prefer_related_applications: false,
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
