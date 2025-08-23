import type { NewsItem } from "@/types/news";

interface NewsItemCardProps {
  news: NewsItem;
}

const NewsItemCard: React.FC<NewsItemCardProps> = ({ news }) => {
  // کوتاه کردن عنوان اگر بیشتر از 35 کاراکتر باشد
  const truncatedTitle =
    news.title.length > 35 ? `${news.title.slice(0, 35)}...` : news.title;

  return (
    <div
      className="bg-card font-kalameh p-6 rounded-xl shadow-md w-full max-w-sm hover:shadow-xl transition-shadow duration-300"
      role="article"
    >
      <h3 className="lg:text-base text-gray-300 sm:text-xl font-bold mb-3 truncate">
        {truncatedTitle}
      </h3>
      <p className="lg:text-xs font-semibold sm:text-sm text-gray-600 mb-3">
        {new Date(news.published).toLocaleDateString("fa-IR")} | {news.source}
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
        aria-label={`ادامه مطلب برای ${news.link}`}
      >
        ادامه مطلب
      </a>
    </div>
  );
};

export default NewsItemCard;
