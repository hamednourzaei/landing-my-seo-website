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
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  url?: string;
}

// کامپوننت کارت (بدون تغییر)
const TestimonialCard = memo(({ story }: { story: SuccessStoryProps }) => {
  const animation = useMemo(
    () => ({
      background: [
        "linear-gradient(45deg, rgba(255, 108, 0, 0.2), rgba(255, 108, 0, 0.1))",
        "linear-gradient(135deg, rgba(255, 108, 0, 0.3), rgba(255, 108, 0, 0.15))",
        "linear-gradient(225deg, rgba(255, 108, 0, 0.2), rgba(255, 108, 0, 0.05))",
      ],
      transition: {
        background: { duration: 1, repeat: 0, ease: "linear" },
      },
    }),
    []
  );

  const stars = useMemo(() => {
    const fullStars = Math.floor(story.rating);
    const hasHalfStar = story.rating % 1 !== 0;
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} className="size-4 fill-primary text-primary" />
        ))}
        {hasHalfStar && <Star className="size-4 text-primary" />}
      </>
    );
  }, [story.rating]);

  return (
    <motion.div
      className="h-full rounded-lg overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, ...animation }}
      style={{ willChange: "opacity, background" }}
    >
      <Card className="h-full bg-muted/50  dark:bg-card overflow-hidden border-[1px] border-orange-800 shadow-xl shadow-orange-400/30">
        <CardContent className="pt-6 pb-0">
          <div className="flex gap-1 pb-6">{stars}</div>
          {story.url ? (
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium hover:underline"
            >
              {story.comment}
            </a>
          ) : (
            <p className="font-light">{story.comment}</p>
          )}
        </CardContent>
        <CardHeader>
          <div className="flex flex-row items-center my-5 gap-4">
            <Avatar>
              <AvatarImage src={story.image} alt={story.name} loading="lazy" />
              <AvatarFallback>
                {story.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-lg font-light">{story.name}</CardTitle>
              <CardDescription className="font-light">{story.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
});
TestimonialCard.displayName = "TestimonialCard";

// Client Component برای Carousel
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
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: "start" }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {stories.map((story, index) => (
            <CarouselItem
              key={story.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <TestimonialCard story={story} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-center mt-4 font-light text-muted-foreground">
        {current} / {total}
      </div>
    </div>
  );
}