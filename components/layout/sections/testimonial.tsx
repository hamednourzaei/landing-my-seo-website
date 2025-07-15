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
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center text-primary mb-3 tracking-wide">
        TsarSEO
          نظرات موفقیت آمیز مشتریان 
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
