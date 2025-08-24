import { Star } from "lucide-react";
import Image from "next/image";

// تعریف اینترفیس
interface SuccessStoryProps {
  id: string;
  image: {
    src: string;
    alt: string;
  };
  name: string;
  role: string;
  comment: string;
  rating: number;
  url?: string;
}

export default function TestimonialCarousel({
  stories,
}: {
  stories: SuccessStoryProps[];
}) {
  return (
    <div className="relative w-[85%] sm:w-[90%] md:w-[90%] lg:max-w-screen-xl mx-auto">
      <h2 className="text-center text-xl font-semibold mb-4">
        نظرات موفقیت‌آمیز مشتریان
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <article
            key={story.id}
            className="h-full rounded-md sm:rounded-lg overflow-hidden border border-orange-800 shadow-md bg-muted/50"
            itemScope
            itemType="https://schema.org/Review"
          >
            <div className="p-2 sm:p-3 md:p-4 lg:p-5">
              <div className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 pb-2 sm:pb-3 md:pb-4 lg:pb-5">
                {[...Array(Math.min(Math.floor(story.rating || 0), 5))].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="size-3 sm:size-4 md:size-5 lg:size-6 fill-primary text-primary"
                      aria-hidden="true"
                    />
                  )
                )}
              </div>
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-light hover:underline text-xs sm:text-sm md:text-base lg:text-lg"
                  itemProp="url"
                >
                  <p itemProp="reviewBody">{story.comment}</p>
                </a>
              ) : (
                <p
                  className="font-light text-xs sm:text-sm md:text-base lg:text-lg"
                  itemProp="reviewBody"
                >
                  {story.comment}
                </p>
              )}
              <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 mt-2 sm:mt-3 md:mt-4 lg:mt-5">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  width={40}
                  height={40}
                  className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 rounded-full"
                  priority={false}
                  sizes="(max-width: 768px) 40px, 40px"
                />
                <div className="flex flex-col">
                  <h3
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-light"
                    itemProp="author"
                  >
                    {story.name}
                  </h3>
                  <span
                    className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-muted-foreground"
                    itemProp="description"
                  >
                    {story.role}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
