
"use client";
// components/layout/sections/News.tsx
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItemCard from "./NewsItemCard";

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  published: string;
  source: string;
  summary: string;
  languages: string;
}

interface NewsCardProps {
  initialNews: NewsItem[];
  total: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ initialNews, total }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreNews = async () => {
    const nextPage = page + 1;
    try {
      const response = await fetch(`/api/news?page=${nextPage}&pageSize=10`, {
        cache: "force-cache",
      });
      if (!response.ok) throw new Error("Failed to fetch more news");
      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        setHasMore(false);
        return;
      }
      setNewsItems((prev) => [...prev, ...data.items]);
      setPage(nextPage);
    } catch (error) {
      console.error("Fetch more news failed:", error);
      setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={newsItems.length}
      next={fetchMoreNews}
      hasMore={hasMore}
      loader={<h4 className="text-center">در حال بارگذاری...</h4>}
      endMessage={<p className="text-center">تمام اخبار بارگذاری شد.</p>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-24 w-[90%] mx-auto justify-items-center">
        {newsItems.map((news) => (
          <NewsItemCard key={news.id} news={news} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default NewsCard;
