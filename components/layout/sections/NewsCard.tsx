"use client";
import React from "react";

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  published: string;
  source: string;
  summary: string;
  languages: string;
}

interface NewsItemCardProps {
  news: NewsItem;
}

const NewsItemCard: React.FC<NewsItemCardProps> = ({ news }) => {
  return (
    <div
      className="bg-card font-kalameh p-6 rounded-xl shadow-md w-full max-w-sm hover:shadow-xl transition-shadow duration-300"
      role="article"
    >
      <h3 className="lg:text-base text-gray-300 sm:text-xl font-bold mb-3">
        {news.title}
      </h3>
      <p className="lg:text-xs font-semibold sm:text-sm text-gray-600 mb-3">
        {news.published} | {news.source}
      </p>
      <div
        className="text-gray-300 mb-6 sm:text-base lg:text-sm break-words line-clamp-6"
        dangerouslySetInnerHTML={{ __html: news.summary }}
      />
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary font-semibold hover:underline text-xs sm:text-base"
        aria-label={`ادامه مطلب برای ${news.title}`}
      >
        ادامه مطلب
      </a>
    </div>
  );
};

export default NewsItemCard;
