import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { faqList, FAQProps } from "../../layout/sections/data/privacy-policy";

// کامپوننت جدول به‌صورت دینامیک بارگذاری می‌شود
const DynamicTable = dynamic(() => import("./DynamicTable"), {
  loading: () => <p>در حال بارگذاری جدول...</p>,
});

// تابع رندر آیتم‌ها برای جلوگیری از تعریف توابع درون JSX
const renderItemContent = (item: FAQProps, index: number) => (
  <div key={index} className="mb-6">
    {item.h1 && (
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
        {item.h1}
      </h1>
    )}
    {item.h2 && (
      <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-4">
        {item.h2}
      </h2>
    )}
    {item.h3 && (
      <h3 className="text-xl sm:text-2xl font-medium mt-6 mb-3">{item.h3}</h3>
    )}
    {item.p && (
      <p
        className="text-sm sm:text-base mb-6 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: item.p }}
      />
    )}
    {item.ul && (
      <ul className="list-disc list-inside mb-6 text-sm sm:text-base">
        {item.ul.map((listItem, liIndex) => (
          <li key={liIndex} dangerouslySetInnerHTML={{ __html: listItem }} />
        ))}
      </ul>
    )}
    {item.table && <DynamicTable tableData={item.table} />}
  </div>
);

// تعریف کامپوننت با memo
const PrivacyPolicy: React.FC = memo(() => {
  const renderedItems = useMemo(() => {
    return faqList.map((item, index) => renderItemContent(item, index));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 bg-[#a4a1a1] text-gray-800">
      {renderedItems}
    </div>
  );
});

// افزودن displayName
PrivacyPolicy.displayName = "PrivacyPolicy";

// فعال کردن SSG با getStaticProps
export async function getStaticProps() {
  return {
    props: {},
  };
}

export default PrivacyPolicy;
