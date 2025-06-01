// app/components/TestimonialSection.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import TestimonialCarousel from "./TestimonialCarousel";

// اینترفیس داده‌ها
interface SuccessStoryProps {
  id: string;
  image: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  url?: string;
}

// تابع کمکی برای دریافت داده‌ها
async function fetchStories(): Promise<SuccessStoryProps[]> {
  try {
    const response = await fetch(
      "https://hamednourzaei.github.io/apitools/db.json",
      {
        cache: "force-cache", // caching در سرور
      }
    );
    if (!response.ok) {
      throw new Error(`خطا در دریافت داده‌ها: ${response.status}`);
    }
    const data: SuccessStoryProps[] = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching stories:", err);
    return []; // در صورت خطا، آرایه خالی برگردان
  }
}

// Server Component
export default async function TestimonialSection() {
  const stories = await fetchStories();

  return (
    <section
      id="success-stories"
      className="container font-kalameh font-semibold py-24 sm:py-32"
    >
      <hr className="border-secondary mb-8" />
      <div className="text-center mb-8 py-24">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          نظرات موفقیت آمیز مشتریان
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          TsarSEO موفقیت مشتریان
        </h2>
      </div>

      {stories.length === 0 ? (
        <div className="text-center">هیچ نظری یافت نشد.</div>
      ) : (
        <TestimonialCarousel stories={stories.slice(0, 90)} />
      )}
    </section>
  );
}
