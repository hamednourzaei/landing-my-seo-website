// components/common/GoogleTagManager.tsx
"use client";

import Script from "next/script";

const GA_TRACKING_ID = "G-3W5MQTV8E9";

export const GoogleTagManager = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <Script id="gtag-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `}
    </Script>
  </>
);
