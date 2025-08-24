"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

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

const TestimonialCard = memo(({ story }: { story: SuccessStoryProps }) => {
  const animation = useMemo(
    () => ({
      background: [
        "linear-gradient(45deg, rgba(255, 108, 0, 0.1), rgba(255, 108, 0, 0.05))",
        "linear-gradient(135deg, rgba(255, 108, 0, 0.15), rgba(255, 108, 0, 0.05))",
        "linear-gradient(225deg, rgba(255, 108, 0, 0.1), transparent)",
      ],
      transition: {
        background: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      },
    }),
    []
  );

  const stars = useMemo(() => {
    const fullStars = Math.floor(story.rating || 0);
    const hasHalfStar = (story.rating || 0) % 1 !== 0;
    return (
      <>
        {Array.from({ length: Math.min(fullStars, 5) }).map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className="size-3 sm:size-4 md:size-5 lg:size-6 fill-primary text-primary"
          />
        ))}
        {hasHalfStar && (
          <Star
            aria-hidden="true"
            className="size-3 sm:size-4 md:size-5 lg:size-6 text-primary"
          />
        )}
      </>
    );
  }, [story.rating]);

  return (
    <motion.div
      className="h-full rounded-md sm:rounded-lg overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, ...animation }}
      style={{ willChange: "opacity, background" }}
      itemScope
      itemType="https://schema.org/Review"
    >
      <Card className="h-full bg-muted/50 dark:bg-card overflow-hidden border border-orange-800 shadow-md">
        <CardContent className="pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-0">
          <div
            className="flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 pb-2 sm:pb-3 md:pb-4 lg:pb-5"
            itemProp="reviewRating"
            itemScope
            itemType="https://schema.org/Rating"
          >
            {stars}
            <meta itemProp="ratingValue" content={String(story.rating || 0)} />
            <meta itemProp="bestRating" content="5" />
          </div>
          {story.url ? (
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`نظری از ${story.name}`}
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
        </CardContent>
        <CardHeader className="p-2 sm:p-3 md:p-4 lg:p-5">
          <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <Avatar className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14">
              <AvatarImage
                src={story.image.src}
                alt={story.image.alt}
                loading="lazy"
              />
              <AvatarFallback className="text-xs sm:text-sm md:text-base lg:text-lg">
                {story.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle
                className="text-sm sm:text-base md:text-lg lg:text-xl font-light"
                itemProp="author"
              >
                {story.name}
              </CardTitle>
              <CardDescription
                className="text-xs sm:text-sm md:text-base lg:text-lg font-light"
                itemProp="description"
              >
                {story.role}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
});
TestimonialCard.displayName = "TestimonialCard";

export default function TestimonialCarousel({
  stories,
}: {
  stories: SuccessStoryProps[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(1);
  const total = stories.length;

  const handleResize = useCallback(() => {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 800);
      }, 100);
    };
  }, []);

  useEffect(() => {
    const resizeHandler = handleResize();
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [handleResize]);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <div className="relative w-[85%] sm:w-[90%] md:w-[90%] lg:max-w-screen-xl mx-auto">
      <h2 className="text-center text-xl font-semibold mb-4">
        نظرات موفقیت‌آمیز مشتریان
      </h2>
      <Carousel setApi={setApi} opts={{ align: "start" }} className="relative">
        <CarouselContent>
          {stories.map((story) => (
            <CarouselItem key={story.id} className="md:basis-1/2 lg:basis-1/3">
              <TestimonialCard story={story} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-center mt-2 sm:mt-3 md:mt-4 lg:mt-5 font-light text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground">
        {current} / {total}
      </div>
    </div>
  );
}
