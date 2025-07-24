import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicPrivacyPolicy = dynamic(
  () => import("@/components/layout/sections/policy-privacy"),
  {
    loading: () => (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>لطفاً صبر کنید...</p>
        <div className="spinner" />
      </div>
    ),
    ssr: true, // غیرفعال کردن SSR برای کامپوننت کلاینت
  }
);

export default function PrivacyPolicyPage() {
  return (
    <>
      <DynamicPrivacyPolicy />
      <Link href="/about" prefetch>
        درباره ما
      </Link>
    </>
  );
}