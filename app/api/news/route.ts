// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  try {
    const response = await fetch(
      `https://hamednourzaei.github.io/api_google_news/news_2025-08-18.json`,
      { cache: "force-cache" }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch news from external API: ${response.status}`
      );
    }

    const data = await response.json();
    const items = Array.isArray(data.items) ? data.items : [];

    // صفحه‌بندی دستی روی JSON
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return NextResponse.json({
      items: items.slice(start, end),
      total: items.length,
    });
  } catch (error: unknown) {
    console.error("Error fetching news:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch news", message: errorMessage },
      { status: 500 }
    );
  }
}
