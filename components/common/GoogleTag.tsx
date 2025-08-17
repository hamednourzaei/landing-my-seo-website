// components/common/GoogleTagManager.tsx
"use client";

import Script from "next/script";

const GTM_ID = "GTM-56W36JFM";

export const GoogleTag = () => (
  <>
    {/* GTM Script */}
    <Script id="gtm-head" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){
          w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
    </Script>

    {/* NoScript برای کاربرانی که JS غیرفعال است */}
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  </>
);
export const GoogleTagManagerNoScript = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-56W36JFM"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    }}
  />
);
