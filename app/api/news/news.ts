
// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = "1", pageSize = "10" } = req.query;

  try {
    const response = await fetch(
      `https://hamednourzaei.github.io/api_google_news/news_2025-08-18.json?page=${page}&pageSize=${pageSize}`,
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news from external API");
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
