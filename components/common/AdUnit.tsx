// components/common/AdUnit.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// تعریف نوع برای adsbygoogle
interface AdsByGoogle {
  push: (config?: {
    params?: { [key: string]: any };
    onAdLoaded?: (element: HTMLElement) => void;
    onAdFailed?: (element: HTMLElement) => void;
  }) => void;
}

declare global {
  interface Window {
    adsbygoogle: AdsByGoogle | any[];
  }
}

export const AdUnit = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // لود اسکریپت AdSense فقط اگر هنوز لود نشده باشد
    let script: HTMLScriptElement | null = null;
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1011150553663427";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // استفاده از IntersectionObserver برای لود تبلیغ
    if (adRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            try {
              (window.adsbygoogle = window.adsbygoogle || []).push({
                params: {
                  google_ad_client: "ca-pub-1011150553663427",
                },
                onAdLoaded: (element: HTMLElement) => {
                  if (adRef.current) {
                    setIsAdLoaded(true); // نمایش کانتینر
                    adRef.current.setAttribute("data-ad-status", "filled");
                  }
                },
                onAdFailed: (element: HTMLElement) => {
                  if (adRef.current) {
                    setIsAdLoaded(false); // مخفی کردن کانتینر
                    adRef.current.setAttribute("data-ad-status", "failed");
                  }
                },
              });
            } catch (err) {
              console.error("AdSense Error:", err);
              if (adRef.current) {
                setIsAdLoaded(false);
                adRef.current.setAttribute("data-ad-status", "failed");
              }
            }
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(adRef.current);

      return () => {
        observer.disconnect();
        if (script && document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  // فقط در صورت لود موفق تبلیغ، کانتینر رندر می‌شود
  if (!isAdLoaded) {
    return (
      <div
        ref={adRef}
        className="ad-container my-4"
        style={{ display: "none" }}
        data-ad-status="unfilled"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1011150553663427"
          data-ad-slot="3155183279"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }

  return (
    <div
      ref={adRef}
      className="ad-container my-4"
      style={{ minWidth: "300px", minHeight: "250px" }}
      data-ad-status="filled"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1011150553663427"
        data-ad-slot="3155183279"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};
