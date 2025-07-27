import React from "react";
import IncomeSimulatorModal from "@/components/layout/sections/IncomeSimulatorModal";
import type { Metadata } from "next";

// Metadata for different languages
const metadataDictionary = {
  fa: {
    title: "محاسبه سود - شبیه‌ساز درآمد",
    description:
      "با استفاده از شبیه‌ساز درآمد، سود احتمالی خود را محاسبه کنید.",
  },
  en: {
    title: "Profit Calculator - Income Simulator",
    description:
      "Calculate your potential earnings using our income simulator.",
  },
};

export async function generateMetadata(): Promise<Metadata> {

  const lang = "fa";

  return {
    title: metadataDictionary[lang].title,
    description: metadataDictionary[lang].description,
    alternates: {
      languages: {
        fa: "/fa",
        en: "/en",
      },
    },
  };
}

const CalculateProfitsPage: React.FC = () => {
  return (
    <div className="min-h-screen  py-8">
      <IncomeSimulatorModal />
    </div>
  );
};

export default CalculateProfitsPage;
