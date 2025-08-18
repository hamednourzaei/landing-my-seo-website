"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-4 text-center">
      <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100">
        404
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        صفحه‌ای که دنبالش بودید پیدا نشد.
      </p>
      <Link href="/" className="mt-6">
        <Button>بازگشت به خانه</Button>
      </Link>
    </main>
  );
}
