// app/(privacy)/privacy-policy/page.tsx
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicPrivacyPolicy = dynamic(
  () => import("@/components/layout/sections/policy-privacy"),
  {
    loading: () => (
      <div className="flex justify-center items-center py-12">
        <p className="text-lg text-gray-600">لطفاً صبر کنید...</p>
        <div className="animate-spin w-8 h-8 border-4 border-t-blue-600 rounded-full ml-4" />
      </div>
    ),
    ssr: true, // فعال بودن SSR برای کامپوننت
  }
);

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        prefetch
        className="inline-block mb-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
      >
Back to Home      </Link>
      <DynamicPrivacyPolicy />
      <div className="mt-6 flex justify-between">

        <Link
          href="/"
          prefetch
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
Back to Home        </Link>
      </div>
    </div>
  );
}