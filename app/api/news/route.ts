
// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  try {
    const response = await fetch(
      `https://hamednourzaei.github.io/api_google_news/news_2025-08-18.json?page=${page}&pageSize=${pageSize}`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch news from external API: ${response.status}`
      );
    }
    const data = await response.json();
    return NextResponse.json({
      items: data.items || [],
      total: data.total || 0,
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