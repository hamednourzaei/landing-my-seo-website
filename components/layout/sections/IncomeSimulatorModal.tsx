"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { debounce } from "lodash";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

// CPC data by country (static)
const countryCPCs: Record<string, number> = {
  US: 0.7,
  IR: 0.1,
  IN: 0.05,
  DE: 0.4,
  UK: 0.6,
  CN: 0.08,
  JP: 0.3,
};

// Countries for user selection
const countries = [
  { code: "US", name: "ایالات متحده آمریکا", nameEn: "United States" },
  { code: "IR", name: "ایران", nameEn: "Iran" },
  { code: "IN", name: "هند", nameEn: "India" },
  { code: "DE", name: "آلمان", nameEn: "Germany" },
  { code: "UK", name: "انگلستان", nameEn: "United Kingdom" },
  { code: "CN", name: "چین", nameEn: "China" },
  { code: "JP", name: "ژاپن", nameEn: "Japan" },
];

// Traffic types with multipliers
const trafficTypes = [
  {
    label: "ارگانیک",
    labelEn: "Organic",
    ctrMultiplier: 1.2,
    cpcMultiplier: 1.1,
  },
  {
    label: "تبلیغاتی",
    labelEn: "Paid",
    ctrMultiplier: 0.8,
    cpcMultiplier: 1.3,
  },
  {
    label: "شبکه‌های اجتماعی",
    labelEn: "Social Media",
    ctrMultiplier: 1.0,
    cpcMultiplier: 0.9,
  },
];

// Ad types with multipliers
const adTypes = [
  { label: "بنری", labelEn: "Banner", cpcMultiplier: 0.8 },
  { label: "ویدیویی", labelEn: "Video", cpcMultiplier: 1.5 },
  { label: "نیتیو", labelEn: "Native", cpcMultiplier: 1.2 },
];

// Niches with CPC multipliers
const niches = [
  { label: "تکنولوژی", labelEn: "Technology", cpcMultiplier: 1.5 },
  { label: "مالی", labelEn: "Finance", cpcMultiplier: 2.0 },
  { label: "سلامتی", labelEn: "Health", cpcMultiplier: 1.3 },
  { label: "آموزش", labelEn: "Education", cpcMultiplier: 1.0 },
];

// Site formats with multipliers
const siteFormats = [
  { label: "وبلاگ", labelEn: "Blog", ctrMultiplier: 1.0, cpcMultiplier: 0.9 },
  { label: "خبری", labelEn: "News", ctrMultiplier: 0.8, cpcMultiplier: 1.1 },
  {
    label: "فروشگاه",
    labelEn: "E-commerce",
    ctrMultiplier: 1.2,
    cpcMultiplier: 1.3,
  },
];

// Mobile devices
const mobileDevices = [
  { label: "اندروید", labelEn: "Android", multiplier: 0.9 },
  { label: "iOS", labelEn: "iOS", multiplier: 1.1 },
  { label: "همه", labelEn: "All", multiplier: 1.0 },
];

// Ad positions
const adPositions = [
  { label: "بالای صفحه", labelEn: "Above Fold", multiplier: 1.2 },
  { label: "وسط محتوا", labelEn: "In-Content", multiplier: 1.0 },
  { label: "پایین صفحه", labelEn: "Below Fold", multiplier: 0.8 },
];

// Currency conversion rates
const currencyRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  IRR: 42000,
};

const IncomeSimulatorModal: React.FC = () => {
  // State
  const [language, setLanguage] = useState<"fa" | "en">("fa");
  const [title, setTitle] = useState<string>("");
  const [visitors, setVisitors] = useState<number>(1000);
  const [ctr, setCtr] = useState<number>(1.5);
  const [bounceRate, setBounceRate] = useState<number>(40);
  const [sessionDuration, setSessionDuration] = useState<number>(120);
  const [countriesSelected, setCountriesSelected] = useState<
    { code: string; weight: number }[]
  >([{ code: "US", weight: 1 }]);
  const [trafficType, setTrafficType] = useState<string>(trafficTypes[0].label);
  const [adType, setAdType] = useState<string>(adTypes[0].label);
  const [mobilePercent, setMobilePercent] = useState<number>(50);
  const [currency, setCurrency] = useState<string>("USD");
  const [niche, setNiche] = useState<string>(niches[0].label);
  const [siteFormat, setSiteFormat] = useState<string>(siteFormats[0].label);
  const [mobileDevice, setMobileDevice] = useState<string>(
    mobileDevices[0].label
  );
  const [adsPerPage, setAdsPerPage] = useState<number>(1);
  const [returningVisitors, setReturningVisitors] = useState<number>(30);
  const [contentQuality, setContentQuality] = useState<number>(50);
  const [uxScore, setUxScore] = useState<number>(50);
  const [adPosition, setAdPosition] = useState<string>(adPositions[0].label);
  const [trafficGrowthRate, setTrafficGrowthRate] = useState<number>(0);
  const [operationalCosts, setOperationalCosts] = useState<number>(0);
  const [abTest, setAbTest] = useState<boolean>(false);
  const [abTestCtr, setAbTestCtr] = useState<number>(1.5);
  const [incomeMonth, setIncomeMonth] = useState<number | null>(null);
  const [incomeYear, setIncomeYear] = useState<number | null>(null);
  const [dailyIncome, setDailyIncome] = useState<number | null>(null);
  const [hourlyIncome, setHourlyIncome] = useState<number | null>(null);
  const [monthlyData, setMonthlyData] = useState<number[]>([]);
  const [dailyData, setDailyData] = useState<number[]>([]);
  const [hourlyData, setHourlyData] = useState<number[]>([]);
  const [rpm, setRpm] = useState<number>(0);
  const [ecpm, setEcpm] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [fullScreenChart, setFullScreenChart] = useState<boolean>(false);
  const [chartZoom, setChartZoom] = useState<boolean>(false);
  const [chartTheme, setChartTheme] = useState<"light" | "dark" | "system">(
    "system"
  );

  // Ad preview

  // Save and load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("incomeSimulatorSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setTitle(settings.title || "");
      setVisitors(settings.visitors || 1000);
      setCtr(settings.ctr || 1.5);
      setBounceRate(settings.bounceRate || 40);
      setSessionDuration(settings.sessionDuration || 120);
      setCountriesSelected(
        settings.countriesSelected || [{ code: "US", weight: 1 }]
      );
      setTrafficType(settings.trafficType || trafficTypes[0].label);
      setAdType(settings.adType || adTypes[0].label);
      setMobilePercent(settings.mobilePercent || 50);
      setCurrency(settings.currency || "USD");
      setNiche(settings.niche || niches[0].label);
      setSiteFormat(settings.siteFormat || siteFormats[0].label);
      setMobileDevice(settings.mobileDevice || mobileDevices[0].label);
      setAdsPerPage(settings.adsPerPage || 1);
      setReturningVisitors(settings.returningVisitors || 30);
      setContentQuality(settings.contentQuality || 50);
      setUxScore(settings.uxScore || 50);
      setAdPosition(settings.adPosition || adPositions[0].label);
      setTrafficGrowthRate(settings.trafficGrowthRate || 0);
      setOperationalCosts(settings.operationalCosts || 0);
      setAbTest(settings.abTest || false);
      setAbTestCtr(settings.abTestCtr || 1.5);
      setLanguage(settings.language || "fa");
      setChartTheme(settings.chartTheme || "system");
    }
  }, []);

  useEffect(() => {
    const settings = {
      title,
      visitors,
      ctr,
      bounceRate,
      sessionDuration,
      countriesSelected,
      trafficType,
      adType,
      mobilePercent,
      currency,
      niche,
      siteFormat,
      mobileDevice,
      adsPerPage,
      returningVisitors,
      contentQuality,
      uxScore,
      adPosition,
      trafficGrowthRate,
      operationalCosts,
      abTest,
      abTestCtr,
      language,
      chartTheme,
    };
    localStorage.setItem("incomeSimulatorSettings", JSON.stringify(settings));
  }, [
    title,
    visitors,
    ctr,
    bounceRate,
    sessionDuration,
    countriesSelected,
    trafficType,
    adType,
    mobilePercent,
    currency,
    niche,
    siteFormat,
    mobileDevice,
    adsPerPage,
    returningVisitors,
    contentQuality,
    uxScore,
    adPosition,
    trafficGrowthRate,
    operationalCosts,
    abTest,
    abTestCtr,
    language,
    chartTheme,
  ]);

  // Generate shareable URL

  // Calculate income
  const {
    income,
    newMonthlyData,
    newDailyData,
    newHourlyData,
    newRpm,
    newEcpm,
    newClicks,
    newPerformanceScore,
    abTestResult,
  } = useMemo(() => {
    // Input validation
    if (visitors < 100) {
      setError(
        language === "fa"
          ? "تعداد بازدید باید حداقل 100 باشد."
          : "Visitors must be at least 100."
      );
      return {
        income: null,
        newMonthlyData: [],
        newDailyData: [],
        newHourlyData: [],
        newRpm: 0,
        newEcpm: 0,
        newClicks: 0,
        newPerformanceScore: 0,
        abTestResult: null,
      };
    }
    if (ctr < 0.1 || ctr > 5) {
      setError(
        language === "fa"
          ? "نرخ کلیک (CTR) باید بین 0.1 و 5 درصد باشد."
          : "CTR must be between 0.1 and 5%."
      );
      return {
        income: null,
        newMonthlyData: [],
        newDailyData: [],
        newHourlyData: [],
        newRpm: 0,
        newEcpm: 0,
        newClicks: 0,
        newPerformanceScore: 0,
        abTestResult: null,
      };
    }
    if (mobilePercent < 0 || mobilePercent > 100) {
      setError(
        language === "fa"
          ? "درصد بازدید موبایل باید بین 0 و 100 باشد."
          : "Mobile percent must be between 0 and 100."
      );
      return {
        income: null,
        newMonthlyData: [],
        newDailyData: [],
        newHourlyData: [],
        newRpm: 0,
        newEcpm: 0,
        newClicks: 0,
        newPerformanceScore: 0,
        abTestResult: null,
      };
    }
    if (bounceRate < 0 || bounceRate > 100) {
      setError(
        language === "fa"
          ? "نرخ پرش باید بین 0 و 100 درصد باشد."
          : "Bounce rate must be between 0 and 100%."
      );
      return {
        income: null,
        newMonthlyData: [],
        newDailyData: [],
        newHourlyData: [],
        newRpm: 0,
        newEcpm: 0,
        newClicks: 0,
        newPerformanceScore: 0,
        abTestResult: null,
      };
    }
    if (sessionDuration < 0) {
      setError(
        language === "fa"
          ? "مدت زمان جلسه باید مثبت باشد."
          : "Session duration must be positive."
      );
      return {
        income: null,
        newMonthlyData: [],
        newDailyData: [],
        newHourlyData: [],
        newRpm: 0,
        newEcpm: 0,
        newClicks: 0,
        newPerformanceScore: 0,
        abTestResult: null,
      };
    }
    if (
      countriesSelected.length === 0 ||
      countriesSelected.reduce((sum, c) => sum + c.weight, 0) === 0
    ) {
      setError(
        language === "fa"
          ? "حداقل یک کشور با وزن مثبت انتخاب کنید."
          : "Select at least one country with positive weight."
      );
      return {
        income: null,
        newMonthlyData: [],
        newDailyData: [],
        newHourlyData: [],
        newRpm: 0,
        newEcpm: 0,
        newClicks: 0,
        newPerformanceScore: 0,
        abTestResult: null,
      };
    }
    setError(null);

    // Calculate weighted CPC from selected countries
    const totalWeight = countriesSelected.reduce((sum, c) => sum + c.weight, 0);
    const weightedCPC = countriesSelected.reduce(
      (sum, c) => sum + (countryCPCs[c.code] ?? 0.1) * (c.weight / totalWeight),
      0
    );

    // Traffic type multipliers
    const traffic = trafficTypes.find((t) => t.label === trafficType);
    const format = siteFormats.find((f) => f.label === siteFormat);
    const nicheObj = niches.find((n) => n.label === niche);
    const ad = adTypes.find((a) => a.label === adType);
    const device = mobileDevices.find((d) => d.label === mobileDevice);
    const position = adPositions.find((p) => p.label === adPosition);

    const ctrAdjusted =
      ctr * (traffic?.ctrMultiplier ?? 1) * (format?.ctrMultiplier ?? 1);
    const cpcAdjusted =
      weightedCPC *
      (traffic?.cpcMultiplier ?? 1) *
      (nicheObj?.cpcMultiplier ?? 1) *
      (format?.cpcMultiplier ?? 1) *
      (ad?.cpcMultiplier ?? 1) *
      (position?.multiplier ?? 1);

    // Device multiplier
    const mobileWeight = device?.multiplier ?? 1.0;
    const desktopWeight = 1.1;
    const deviceMultiplier =
      (mobilePercent / 100) * mobileWeight +
      ((100 - mobilePercent) / 100) * desktopWeight;

    // Bounce rate impact
    const bounceRateImpact = 1 - bounceRate / 100;

    // Session duration impact
    const sessionDurationImpact = Math.min(1 + sessionDuration / 600, 1.5);

    // Additional multipliers
    const adsPerPageImpact = Math.min(1 + adsPerPage * 0.2, 2.0);
    const returningVisitorsImpact = 1 + returningVisitors / 100;
    const contentQualityImpact = 1 + contentQuality / 100;
    const uxScoreImpact = 1 + uxScore / 100;
    const pagesPerSessionImpact = Math.min(1 + sessionDuration / 300, 2.0);
    const conversionRateImpact = 1.1;

    // Base CPM
    const baseCPM = weightedCPC * 10;

    // CPC and CPM income
    const cpcIncome =
      visitors *
      (ctrAdjusted / 100) *
      cpcAdjusted *
      deviceMultiplier *
      bounceRateImpact *
      sessionDurationImpact *
      pagesPerSessionImpact *
      conversionRateImpact *
      adsPerPageImpact *
      returningVisitorsImpact *
      contentQualityImpact *
      uxScoreImpact;

    const cpmIncome =
      (visitors / 1000) *
      baseCPM *
      adsPerPageImpact *
      contentQualityImpact *
      uxScoreImpact;

    // Total income
    let totalIncome = cpcIncome + cpmIncome - operationalCosts;

    // Apply traffic growth rate
    totalIncome *= 1 + trafficGrowthRate / 100;

    // Currency conversion
    const convertedIncome = totalIncome * (currencyRates[currency] ?? 1);

    // RPM and eCPM
    const newRpm = totalIncome / (visitors / 1000) || 0;
    const newEcpm = (cpcIncome + cpmIncome) / (visitors / 1000) || 0;

    // Clicks
    const newClicks =
      visitors * (ctrAdjusted / 100) * pagesPerSessionImpact * adsPerPageImpact;

    // Performance score
    const newPerformanceScore = Math.min(
      Math.round(
        (ctrAdjusted / 5) * 20 +
          ((100 - bounceRate) / 100) * 20 +
          (sessionDuration / 300) * 20 +
          (returningVisitors / 100) * 20 +
          (contentQuality / 100) * 10 +
          (uxScore / 100) * 10
      ),
      100
    );

    // Generate data with seasonal patterns
    const seasonalPatterns = countriesSelected.map((c) => ({
      code: c.code,
      weight: c.weight,
      pattern: Array.from(
        { length: 12 },
        (_, i) =>
          1 +
          Math.sin((i / 12) * 2 * Math.PI + (c.code.charCodeAt(0) % 12)) * 0.15
      ),
    }));

    const newMonthlyData = Array.from({ length: 12 }, (_, i) => {
      const weightedFluctuation = seasonalPatterns.reduce(
        (sum, sp) => sum + sp.pattern[i] * (sp.weight / totalWeight),
        0
      );
      return (
        convertedIncome *
        weightedFluctuation *
        (1 + (trafficGrowthRate / 100) * (i / 12))
      );
    });

    const newDailyData = Array.from({ length: 30 }, (_, i) => {
      const fluctuation = 1 + Math.sin((i / 30) * 2 * Math.PI) * 0.1;
      return (convertedIncome / 30) * fluctuation;
    });

    const newHourlyData = Array.from({ length: 24 }, (_, i) => {
      const fluctuation = 1 + Math.sin((i / 24) * 2 * Math.PI) * 0.2;
      return (convertedIncome / (30 * 24)) * fluctuation;
    });

    // A/B Test
    let abTestResult = null;
    if (abTest) {
      const abTestCtrAdjusted =
        abTestCtr *
        (traffic?.ctrMultiplier ?? 1) *
        (format?.ctrMultiplier ?? 1);
      const abTestCpcIncome =
        visitors *
        (abTestCtrAdjusted / 100) *
        cpcAdjusted *
        deviceMultiplier *
        bounceRateImpact *
        sessionDurationImpact *
        pagesPerSessionImpact *
        conversionRateImpact *
        adsPerPageImpact *
        returningVisitorsImpact *
        contentQualityImpact *
        uxScoreImpact;

      const abTestTotalIncome = abTestCpcIncome + cpmIncome - operationalCosts;
      const abTestConvertedIncome =
        abTestTotalIncome * (currencyRates[currency] ?? 1);
      const abTestMonthlyData = Array.from({ length: 12 }, (_, i) => {
        const weightedFluctuation = seasonalPatterns.reduce(
          (sum, sp) => sum + sp.pattern[i] * (sp.weight / totalWeight),
          0
        );
        return (
          abTestConvertedIncome *
          weightedFluctuation *
          (1 + (trafficGrowthRate / 100) * (i / 12))
        );
      });

      abTestResult = {
        income: abTestConvertedIncome,
        monthlyData: abTestMonthlyData,
        error:
          abTestCtr < 0.1 || abTestCtr > 5
            ? language === "fa"
              ? "نرخ کلیک تست A/B باید بین 0.1 و 5 درصد باشد."
              : "A/B Test CTR must be between 0.1 and 5%."
            : null,
      };
    }

    return {
      income: convertedIncome,
      newMonthlyData,
      newDailyData,
      newHourlyData,
      newRpm,
      newEcpm,
      newClicks,
      newPerformanceScore,
      abTestResult,
    };
  }, [
    visitors,
    ctr,
    bounceRate,
    sessionDuration,
    countriesSelected,
    trafficType,
    adType,
    mobilePercent,
    currency,
    niche,
    siteFormat,
    mobileDevice,
    adsPerPage,
    returningVisitors,
    contentQuality,
    uxScore,
    adPosition,
    trafficGrowthRate,
    operationalCosts,
    abTest,
    abTestCtr,
    language,
  ]);

  // Update state
  const calculateIncome = useCallback(() => {
    if (income !== null) {
      setIncomeMonth(income);
      setIncomeYear(income * 12);
      setDailyIncome(income / 30);
      setHourlyIncome(income / (30 * 24));
      setMonthlyData(newMonthlyData);
      setDailyData(newDailyData);
      setHourlyData(newHourlyData);
      setRpm(newRpm);
      setEcpm(newEcpm);
      setClicks(newClicks);
      setPerformanceScore(newPerformanceScore);
    }
  }, [
    income,
    newMonthlyData,
    newDailyData,
    newHourlyData,
    newRpm,
    newEcpm,
    newClicks,
    newPerformanceScore,
  ]);

  const debouncedCalculateIncome = useMemo(() => {
    return debounce(calculateIncome, 300);
  }, [calculateIncome]);
  useEffect(() => {
    debouncedCalculateIncome();
    return () => {
      debouncedCalculateIncome.cancel();
    };
  }, [debouncedCalculateIncome]);

  // Reset inputs
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetInputs = useCallback(() => {
    setTitle("");
    setVisitors(1000);
    setCtr(1.5);
    setBounceRate(40);
    setSessionDuration(120);
    setCountriesSelected([{ code: "US", weight: 1 }]);
    setTrafficType(trafficTypes[0].label);
    setAdType(adTypes[0].label);
    setMobilePercent(50);
    setCurrency("USD");
    setNiche(niches[0].label);
    setSiteFormat(siteFormats[0].label);
    setMobileDevice(mobileDevices[0].label);
    setAdsPerPage(1);
    setReturningVisitors(30);
    setContentQuality(50);
    setUxScore(50);
    setAdPosition(adPositions[0].label);
    setTrafficGrowthRate(0);
    setOperationalCosts(0);
    setAbTest(false);
    setAbTestCtr(1.5);
    setError(null);
    setIncomeMonth(null);
    setIncomeYear(null);
    setDailyIncome(null);
    setHourlyIncome(null);
    setMonthlyData([]);
    setDailyData([]);
    setHourlyData([]);
    setRpm(0);
    setEcpm(0);
    setClicks(0);
    setPerformanceScore(0);
  }, []);
  // Recommendations
  const recommendations = useMemo(() => {
    const recs = [];
    if (ctr < 2) {
      recs.push(
        language === "fa"
          ? `نرخ کلیک (CTR) شما (${ctr}%) پایین‌تر از میانگین صنعتی (حدود 2%) است. سعی کنید متن تبلیغات را جذاب‌تر کنید یا کلمات کلیدی مرتبط‌تری انتخاب کنید.`
          : `Your CTR (${ctr}%) is below the industry average (~2%). Try making ad copy more engaging or selecting more relevant keywords.`
      );
    }
    if (bounceRate > 50) {
      recs.push(
        language === "fa"
          ? `نرخ پرش شما (${bounceRate}%) بالاتر از میانگین صنعتی (50%) است. صفحه فرود خود را بررسی کنید تا مطمئن شوید با نیت جستجوی کاربر هم‌راستا است و تجربه کاربری بهتری ارائه می‌دهد.`
          : `Your bounce rate (${bounceRate}%) is above the industry average (50%). Review your landing page to ensure it aligns with user intent and provides a better UX.`
      );
    }
    if (sessionDuration < 180) {
      recs.push(
        language === "fa"
          ? `مدت زمان جلسه (${sessionDuration} ثانیه) کمتر از میانگین پیشنهادی (180 ثانیه) است. محتوای جذاب‌تر یا فراخوان‌های عمل (CTA) قوی‌تر اضافه کنید.`
          : `Session duration (${sessionDuration} seconds) is below the recommended average (180 seconds). Add more engaging content or stronger CTAs.`
      );
    }
    if (adType === "بنری") {
      recs.push(
        language === "fa"
          ? `تبلیغات بنری معمولاً نرخ پرش بالاتری دارند. آزمایش تبلیغات نیتیو یا ویدیویی می‌تواند تعامل کاربران را بهبود بخشد.`
          : `Banner ads often have higher bounce rates. Testing native or video ads could improve user engagement.`
      );
    }
    if (!countriesSelected.some((c) => ["US", "UK"].includes(c.code))) {
      recs.push(
        language === "fa"
          ? `کشورهای انتخاب‌شده CPC پایینی دارند. هدف‌گذاری کشورهای با CPC بالاتر (مانند ایالات متحده یا انگلستان) می‌تواند درآمد را افزایش دهد.`
          : `Selected countries have lower CPCs. Targeting higher-CPC countries (like the US or UK) could increase revenue.`
      );
    }
    if (contentQuality < 70) {
      recs.push(
        language === "fa"
          ? `کیفیت محتوا (${contentQuality}%) پایین‌تر از حد مطلوب است. محتوای باکیفیت‌تر می‌تواند نرخ کلیک و درآمد را افزایش دهد.`
          : `Content quality (${contentQuality}%) is below optimal. Higher-quality content could increase CTR and revenue.`
      );
    }
    if (uxScore < 70) {
      recs.push(
        language === "fa"
          ? `امتیاز تجربه کاربری (${uxScore}%) پایین است. بهبود طراحی سایت و سرعت بارگذاری می‌تواند تعامل کاربران را افزایش دهد.`
          : `UX score (${uxScore}%) is low. Improving site design and loading speed could boost user engagement.`
      );
    }
    if (adsPerPage > 3) {
      recs.push(
        language === "fa"
          ? `تعداد تبلیغات در صفحه (${adsPerPage}) زیاد است. کاهش تعداد تبلیغات می‌تواند تجربه کاربری را بهبود بخشد و نرخ پرش را کاهش دهد.`
          : `Number of ads per page (${adsPerPage}) is high. Reducing ad count could improve UX and lower bounce rate.`
      );
    }
    return recs;
  }, [
    ctr,
    bounceRate,
    sessionDuration,
    adType,
    countriesSelected,
    contentQuality,
    uxScore,
    adsPerPage,
    language,
  ]);

  // Optimal ad type and campaign timing
  const optimalAdType = useMemo(() => {
    const traffic = trafficTypes.find((t) => t.label === trafficType);
    if (traffic?.label === "شبکه‌های اجتماعی") return "ویدیویی";
    if (niche === "مالی") return "نیتیو";
    return "ویدیویی";
  }, [trafficType, niche]);

  const campaignTiming = useMemo(() => {
    const hasHighCpcCountry = countriesSelected.some((c) =>
      ["US", "UK", "DE"].includes(c.code)
    );
    return hasHighCpcCountry
      ? language === "fa"
        ? "سه‌ماهه آخر سال (اکتبر-دسامبر)"
        : "Q4 (October-December)"
      : language === "fa"
      ? "سه‌ماهه اول سال (ژانویه-مارس)"
      : "Q1 (January-March)";
  }, [countriesSelected, language]);

  // Chart data
  const monthlyChartData: ChartData<"line"> = {
    labels:
      language === "fa"
        ? [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
          ]
        : [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
          ],
    datasets: [
      {
        label:
          language === "fa"
            ? `درآمد ماهانه (${currency})`
            : `Monthly Income (${currency})`,
        data: monthlyData,
        borderColor: chartTheme === "dark" ? "#60A5FA" : "#2563EB",
        backgroundColor:
          chartTheme === "dark"
            ? "rgba(96, 165, 250, 0.2)"
            : "rgba(37, 99, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
      ...(abTest &&
      abTestResult &&
      abTestResult.income !== null &&
      !abTestResult.error
        ? [
            {
              label:
                language === "fa"
                  ? `درآمد ماهانه A/B تست (${currency})`
                  : `A/B Test Monthly Income (${currency})`,
              data: abTestResult.monthlyData,
              borderColor: chartTheme === "dark" ? "#FBBF24" : "#D97706",
              backgroundColor:
                chartTheme === "dark"
                  ? "rgba(251, 191, 36, 0.2)"
                  : "rgba(217, 119, 6, 0.2)",
              fill: true,
              tension: 0.3,
            },
          ]
        : []),
    ],
  };

  const dailyChartData: ChartData<"line"> = {
    labels: Array.from({ length: 30 }, (_, i) =>
      language === "fa" ? `روز ${i + 1}` : `Day ${i + 1}`
    ),
    datasets: [
      {
        label:
          language === "fa"
            ? `درآمد روزانه (${currency})`
            : `Daily Income (${currency})`,
        data: dailyData,
        borderColor: chartTheme === "dark" ? "#60A5FA" : "#2563EB",
        backgroundColor:
          chartTheme === "dark"
            ? "rgba(96, 165, 250, 0.2)"
            : "rgba(37, 99, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const hourlyChartData: ChartData<"line"> = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label:
          language === "fa"
            ? `درآمد ساعتی (${currency})`
            : `Hourly Income (${currency})`,
        data: hourlyData,
        borderColor: chartTheme === "dark" ? "#60A5FA" : "#2563EB",
        backgroundColor:
          chartTheme === "dark"
            ? "rgba(96, 165, 250, 0.2)"
            : "rgba(37, 99, 235, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const trafficTypeChartData: ChartData<"pie"> = {
    labels: trafficTypes.map((t) => (language === "fa" ? t.label : t.labelEn)),
    datasets: [
      {
        label:
          language === "fa"
            ? "توزیع درآمد بر اساس نوع ترافیک"
            : "Income Distribution by Traffic Type",
        data: trafficTypes.map((t) =>
          trafficType === t.label
            ? incomeMonth || 0
            : (incomeMonth || 0) / (trafficTypes.length - 1)
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  const countryChartData: ChartData<"pie"> = {
    labels: countriesSelected.map((c) =>
      language === "fa"
        ? countries.find((country) => country.code === c.code)?.name
        : countries.find((country) => country.code === c.code)?.nameEn
    ),
    datasets: [
      {
        label:
          language === "fa"
            ? "توزیع درآمد بر اساس کشور"
            : "Income Distribution by Country",
        data: countriesSelected.map((c) => c.weight),
        backgroundColor: countriesSelected.map(
          (_, i) => `hsl(${(i * 360) / countriesSelected.length}, 70%, 50%)`
        ),
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text:
          language === "fa" ? "تخمین درآمد ماهانه" : "Estimated Monthly Income",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(
              2
            )} ${currency}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text:
            language === "fa" ? `درآمد (${currency})` : `Income (${currency})`,
        },
      },
      x: {
        title: { display: true, text: language === "fa" ? "ماه" : "Month" },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    ...(chartZoom
      ? {
          zoom: {
            pan: { enabled: true, mode: "xy" },
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: "xy",
            },
          },
        }
      : {}),
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: language === "fa" ? "توزیع درآمد" : "Income Distribution",
      },
    },
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto mt-10 p-4"
      >
        <Card className=" dark:bg-gray-900 rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-4">
              {language === "fa"
                ? "Google AdSense  شبیه‌ساز پیشرفته درآمد         "
                : "Advanced Google AdSense Income Simulator"}
            </CardTitle>
            <div className="flex justify-end">
              <Select
                value={language}
                onValueChange={(value: "fa" | "en") => setLanguage(value)}
              >
                <SelectTrigger className="w-32 dark:bg-gray-800 dark:border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">فارسی</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Site Title */}
              <div>
                <Label htmlFor="title">
                  {language === "fa" ? "عنوان سایت" : "Site Title"}
                </Label>
                <Input
                  id="title"
                  placeholder={
                    language === "fa"
                      ? " مثلا: لندینگ پیج "
                      : "e.g., My Tech Site"
                  }
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Monthly Visitors */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="visitors">
                      {language === "fa"
                        ? "تعداد بازدید ماهانه"
                        : "Monthly Visitors"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "تعداد بازدیدکنندگان ماهانه سایت"
                      : "Number of monthly site visitors"}
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="visitors"
                  type="number"
                  min={100}
                  value={visitors}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setVisitors(parseInt(e.target.value) || 100)
                  }
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* CTR */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="ctr">
                      {language === "fa"
                        ? "نرخ کلیک (CTR) %"
                        : "Click-Through Rate (CTR) %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "درصد کاربرانی که روی تبلیغات کلیک می‌کنند"
                      : "Percentage of users clicking on ads"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="ctr"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[ctr]}
                  onValueChange={(value) => setCtr(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={ctr}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCtr(parseFloat(e.target.value) || 0.1)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Bounce Rate */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="bounceRate">
                      {language === "fa"
                        ? "نرخ پرش (Bounce Rate) %"
                        : "Bounce Rate %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "درصد کاربرانی که پس از بازدید یک صفحه خارج می‌شوند"
                      : "Percentage of users leaving after one page"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="bounceRate"
                  min={0}
                  max={100}
                  step={0.1}
                  value={[bounceRate]}
                  onValueChange={(value) => setBounceRate(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  value={bounceRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBounceRate(parseFloat(e.target.value) || 0)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Session Duration */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="sessionDuration">
                      {language === "fa"
                        ? "مدت زمان جلسه (ثانیه)"
                        : "Session Duration (seconds)"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "میانگین زمان صرف‌شده توسط کاربران در سایت"
                      : "Average time spent by users on the site"}
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="sessionDuration"
                  type="number"
                  min={0}
                  value={sessionDuration}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSessionDuration(parseInt(e.target.value) || 0)
                  }
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Countries */}
              <div>
                <Label htmlFor="countries">
                  {language === "fa" ? "کشورهای مخاطبان" : "Audience Countries"}
                </Label>
                {countriesSelected.map((c, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Select
                      value={c.code}
                      onValueChange={(value) => {
                        const newCountries = [...countriesSelected];
                        newCountries[index].code = value;
                        setCountriesSelected(newCountries);
                      }}
                    >
                      <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {language === "fa" ? "کشورها" : "Countries"}
                          </SelectLabel>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {language === "fa"
                                ? country.name
                                : country.nameEn}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min={0}
                      value={c.weight}
                      onChange={(e) => {
                        const newCountries = [...countriesSelected];
                        newCountries[index].weight =
                          parseFloat(e.target.value) || 0;
                        setCountriesSelected(newCountries);
                      }}
                      placeholder={language === "fa" ? "وزن" : "Weight"}
                      className="w-20 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setCountriesSelected(
                          countriesSelected.filter((_, i) => i !== index)
                        )
                      }
                    >
                      {language === "fa" ? "حذف" : "Remove"}
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setCountriesSelected([
                      ...countriesSelected,
                      { code: "US", weight: 1 },
                    ])
                  }
                  className="mt-2"
                >
                  {language === "fa" ? "افزودن کشور" : "Add Country"}
                </Button>
              </div>

              {/* Traffic Type */}
              <div>
                <Label htmlFor="trafficType">
                  {language === "fa" ? "نوع ترافیک" : "Traffic Type"}
                </Label>
                <Select
                  value={trafficType}
                  onValueChange={(value: string) => setTrafficType(value)}
                >
                  <SelectTrigger
                    id="trafficType"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "نوع ترافیک" : "Traffic Type"}
                      </SelectLabel>
                      {trafficTypes.map((t) => (
                        <SelectItem key={t.label} value={t.label}>
                          {language === "fa" ? t.label : t.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Ad Type */}
              <div>
                <Label htmlFor="adType">
                  {language === "fa" ? "نوع تبلیغ" : "Ad Type"}
                </Label>
                <Select
                  value={adType}
                  onValueChange={(value: string) => setAdType(value)}
                >
                  <SelectTrigger
                    id="adType"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "نوع تبلیغ" : "Ad Type"}
                      </SelectLabel>
                      {adTypes.map((a) => (
                        <SelectItem key={a.label} value={a.label}>
                          {language === "fa" ? a.label : a.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Percent */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="mobilePercent">
                      {language === "fa"
                        ? "درصد بازدید موبایل %"
                        : "Mobile Traffic %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "درصد بازدیدکنندگان از دستگاه‌های موبایل"
                      : "Percentage of visitors from mobile devices"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="mobilePercent"
                  min={0}
                  max={100}
                  step={1}
                  value={[mobilePercent]}
                  onValueChange={(value) => setMobilePercent(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={mobilePercent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMobilePercent(parseInt(e.target.value) || 0)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Currency */}
              <div>
                <Label htmlFor="currency">
                  {language === "fa" ? "واحد پول" : "Currency"}
                </Label>
                <Select
                  value={currency}
                  onValueChange={(value: string) => setCurrency(value)}
                >
                  <SelectTrigger
                    id="currency"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "واحد پول" : "Currency"}
                      </SelectLabel>
                      <SelectItem value="USD">
                        {language === "fa"
                          ? "دلار آمریکا (USD)"
                          : "US Dollar (USD)"}
                      </SelectItem>
                      <SelectItem value="EUR">
                        {language === "fa" ? "یورو (EUR)" : "Euro (EUR)"}
                      </SelectItem>
                      <SelectItem value="IRR">
                        {language === "fa"
                          ? "ریال ایران (IRR)"
                          : "Iranian Rial (IRR)"}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Niche */}
              <div>
                <Label htmlFor="niche">
                  {language === "fa" ? "موضوع سایت" : "Site Niche"}
                </Label>
                <Select
                  value={niche}
                  onValueChange={(value: string) => setNiche(value)}
                >
                  <SelectTrigger
                    id="niche"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "موضوع سایت" : "Site Niche"}
                      </SelectLabel>
                      {niches.map((n) => (
                        <SelectItem key={n.label} value={n.label}>
                          {language === "fa" ? n.label : n.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Site Format */}
              <div>
                <Label htmlFor="siteFormat">
                  {language === "fa" ? "قالب سایت" : "Site Format"}
                </Label>
                <Select
                  value={siteFormat}
                  onValueChange={(value: string) => setSiteFormat(value)}
                >
                  <SelectTrigger
                    id="siteFormat"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "قالب سایت" : "Site Format"}
                      </SelectLabel>
                      {siteFormats.map((f) => (
                        <SelectItem key={f.label} value={f.label}>
                          {language === "fa" ? f.label : f.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Device */}
              <div>
                <Label htmlFor="mobileDevice">
                  {language === "fa"
                    ? "نوع دستگاه موبایل"
                    : "Mobile Device Type"}
                </Label>
                <Select
                  value={mobileDevice}
                  onValueChange={(value: string) => setMobileDevice(value)}
                >
                  <SelectTrigger
                    id="mobileDevice"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "نوع دستگاه" : "Device Type"}
                      </SelectLabel>
                      {mobileDevices.map((d) => (
                        <SelectItem key={d.label} value={d.label}>
                          {language === "fa" ? d.label : d.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Ads Per Page */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="adsPerPage">
                      {language === "fa"
                        ? "تعداد تبلیغات در صفحه"
                        : "Ads Per Page"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "تعداد تبلیغات نمایش‌داده‌شده در هر صفحه"
                      : "Number of ads displayed per page"}
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="adsPerPage"
                  type="number"
                  min={1}
                  max={5}
                  value={adsPerPage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAdsPerPage(parseInt(e.target.value) || 1)
                  }
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Returning Visitors */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="returningVisitors">
                      {language === "fa"
                        ? "نرخ بازگشت کاربران %"
                        : "Returning Visitors %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "درصد کاربرانی که دوباره به سایت بازمی‌گردند"
                      : "Percentage of users returning to the site"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="returningVisitors"
                  min={0}
                  max={100}
                  step={1}
                  value={[returningVisitors]}
                  onValueChange={(value) => setReturningVisitors(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={returningVisitors}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setReturningVisitors(parseInt(e.target.value) || 0)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Content Quality */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="contentQuality">
                      {language === "fa"
                        ? "کیفیت محتوا %"
                        : "Content Quality %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "کیفیت محتوای سایت (0-100)"
                      : "Quality of site content (0-100)"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="contentQuality"
                  min={0}
                  max={100}
                  step={1}
                  value={[contentQuality]}
                  onValueChange={(value) => setContentQuality(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={contentQuality}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setContentQuality(parseInt(e.target.value) || 0)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* UX Score */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="uxScore">
                      {language === "fa"
                        ? "امتیاز تجربه کاربری %"
                        : "UX Score %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "امتیاز تجربه کاربری سایت (0-100)"
                      : "Site UX score (0-100)"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="uxScore"
                  min={0}
                  max={100}
                  step={1}
                  value={[uxScore]}
                  onValueChange={(value) => setUxScore(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={uxScore}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUxScore(parseInt(e.target.value) || 0)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Ad Position */}
              <div>
                <Label htmlFor="adPosition">
                  {language === "fa" ? "موقعیت تبلیغ" : "Ad Position"}
                </Label>
                <Select
                  value={adPosition}
                  onValueChange={(value: string) => setAdPosition(value)}
                >
                  <SelectTrigger
                    id="adPosition"
                    className="dark:bg-gray-800 dark:border-gray-700 w-full"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        {language === "fa" ? "موقعیت تبلیغ" : "Ad Position"}
                      </SelectLabel>
                      {adPositions.map((p) => (
                        <SelectItem key={p.label} value={p.label}>
                          {language === "fa" ? p.label : p.labelEn}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Traffic Growth Rate */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="trafficGrowthRate">
                      {language === "fa"
                        ? "نرخ رشد ترافیک %"
                        : "Traffic Growth Rate %"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "نرخ رشد سالانه ترافیک سایت"
                      : "Annual traffic growth rate"}
                  </TooltipContent>
                </Tooltip>
                <Slider
                  id="trafficGrowthRate"
                  min={0}
                  max={100}
                  step={1}
                  value={[trafficGrowthRate]}
                  onValueChange={(value) => setTrafficGrowthRate(value[0])}
                  className="mt-2"
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={trafficGrowthRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTrafficGrowthRate(parseFloat(e.target.value) || 0)
                  }
                  className="mt-2 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Operational Costs */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="operationalCosts">
                      {language === "fa"
                        ? "هزینه‌های عملیاتی"
                        : "Operational Costs"}
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    {language === "fa"
                      ? "هزینه‌های ماهانه سایت (به دلار)"
                      : "Monthly site operational costs (in USD)"}
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="operationalCosts"
                  type="number"
                  min={0}
                  value={operationalCosts}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOperationalCosts(parseInt(e.target.value) || 0)
                  }
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* A/B Test */}
              <div>
                <Label>{language === "fa" ? "تست A/B" : "A/B Test"}</Label>
                <Button
                  variant={abTest ? "default" : "outline"}
                  onClick={() => setAbTest(!abTest)}
                  className="mt-2 w-full"
                >
                  {abTest
                    ? language === "fa"
                      ? "غیرفعال کردن تست A/B"
                      : "Disable A/B Test"
                    : language === "fa"
                    ? "فعال کردن تست A/B"
                    : "Enable A/B Test"}
                </Button>
                {abTest && (
                  <div className="mt-2">
                    <Label htmlFor="abTestCtr">
                      {language === "fa"
                        ? "نرخ کلیک تست A/B %"
                        : "A/B Test CTR %"}
                    </Label>
                    <Input
                      id="abTestCtr"
                      type="number"
                      min={0.1}
                      max={5}
                      step={0.1}
                      value={abTestCtr}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAbTestCtr(parseFloat(e.target.value) || 0.1)
                      }
                      className="dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <Button onClick={resetInputs} variant="secondary">
                {language === "fa" ? "بازنشانی" : "Reset"}
              </Button>

              <Button onClick={() => setShowSummary(!showSummary)}>
                {showSummary
                  ? language === "fa"
                    ? "مخفی کردن خلاصه"
                    : "Hide Summary"
                  : language === "fa"
                  ? "نمایش خلاصه"
                  : "Show Summary"}
              </Button>
              <Button onClick={() => setShowTutorial(!showTutorial)}>
                {showTutorial
                  ? language === "fa"
                    ? "مخفی کردن راهنما"
                    : "Hide Tutorial"
                  : language === "fa"
                  ? "نمایش راهنما"
                  : "Show Tutorial"}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                {error}
              </div>
            )}

            {/* Income Summary */}
            <AnimatePresence>
              {showSummary && incomeMonth !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <h3 className="text-xl font-semibold">
                    {language === "fa" ? "خلاصه درآمد" : "Income Summary"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                    <div>
                      <strong>
                        {language === "fa" ? "درآمد ماهانه" : "Monthly Income"}:
                      </strong>{" "}
                      {incomeMonth?.toFixed(2)} {currency}
                    </div>
                    <div>
                      <strong>
                        {language === "fa" ? "درآمد سالانه" : "Yearly Income"}:
                      </strong>{" "}
                      {incomeYear?.toFixed(2)} {currency}
                    </div>
                    <div>
                      <strong>
                        {language === "fa" ? "درآمد روزانه" : "Daily Income"}:
                      </strong>{" "}
                      {dailyIncome?.toFixed(2)} {currency}
                    </div>
                    <div>
                      <strong>
                        {language === "fa" ? "درآمد ساعتی" : "Hourly Income"}:
                      </strong>{" "}
                      {hourlyIncome?.toFixed(2)} {currency}
                    </div>
                    <div>
                      <strong>{language === "fa" ? "RPM" : "RPM"}:</strong>{" "}
                      {rpm.toFixed(2)} {currency}
                    </div>
                    <div>
                      <strong>{language === "fa" ? "eCPM" : "eCPM"}:</strong>{" "}
                      {ecpm.toFixed(2)} {currency}
                    </div>
                    <div>
                      <strong>
                        {language === "fa" ? "تعداد کلیک‌ها" : "Clicks"}:
                      </strong>{" "}
                      {clicks.toFixed(0)}
                    </div>
                    <div>
                      <strong>
                        {language === "fa"
                          ? "امتیاز عملکرد"
                          : "Performance Score"}
                        :
                      </strong>{" "}
                      {performanceScore}/100
                    </div>
                  </div>
                  {abTest && abTestResult && abTestResult.income !== null && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold">
                        {language === "fa"
                          ? "نتایج تست A/B"
                          : "A/B Test Results"}
                      </h4>
                      <div>
                        <strong>
                          {language === "fa"
                            ? "درآمد ماهانه (تست)"
                            : "Monthly Income (Test)"}
                          :
                        </strong>{" "}
                        {abTestResult.income.toFixed(2)} {currency}
                      </div>
                      <div>
                        <strong>
                          {language === "fa"
                            ? "تفاوت درآمد"
                            : "Income Difference"}
                          :
                        </strong>{" "}
                        {(
                          ((abTestResult.income - (incomeMonth || 0)) /
                            (incomeMonth || 1)) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tutorial */}
            <AnimatePresence>
              {showTutorial && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg"
                >
                  <h3 className="text-xl font-semibold">
                    {language === "fa" ? "راهنمای استفاده" : "How to Use"}
                  </h3>
                  <p>
                    {language === "fa"
                      ? "این شبیه‌ساز به شما کمک می‌کند تا درآمد بالقوه از Google AdSense را بر اساس معیارهای مختلف تخمین بزنید. مقادیر ورودی را تنظیم کنید، مانند تعداد بازدیدکنندگان، نرخ کلیک، و نوع تبلیغ. از نمودارها برای تجزیه و تحلیل درآمد در طول زمان استفاده کنید و توصیه‌ها را برای بهینه‌سازی بررسی کنید."
                      : "This simulator helps you estimate potential Google AdSense revenue based on various metrics. Adjust input values like visitors, CTR, and ad type. Use the charts to analyze income over time and review recommendations for optimization."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recommendations */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">
                {language === "fa"
                  ? "توصیه‌های تحلیلی"
                  : "Analytical Recommendations"}
              </h3>
              <ul className="list-disc pl-5">
                {recommendations.map((rec, index) => (
                  <li key={index} className="mt-2">
                    {rec}
                  </li>
                ))}
                <li className="mt-2">
                  {language === "fa"
                    ? `نوع تبلیغ پیشنهادی: ${optimalAdType}`
                    : `Suggested Ad Type: ${optimalAdType}`}
                </li>
                <li className="mt-2">
                  {language === "fa"
                    ? `بهترین زمان برای کمپین: ${campaignTiming}`
                    : `Optimal Campaign Timing: ${campaignTiming}`}
                </li>
              </ul>
            </div>

            {/* Charts */}
            <div
              className={`mt-6 ${
                fullScreenChart
                  ? "fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4"
                  : ""
              }`}
            >
              <h3 className="text-xl font-semibold">
                {language === "fa" ? "تحلیل درآمد" : "Income Analysis"}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "fa" ? "درآمد ماهانه" : "Monthly Income"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Line data={monthlyChartData} options={chartOptions} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "fa" ? "درآمد روزانه" : "Daily Income"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Line
                      data={dailyChartData}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            display: true,
                            text:
                              language === "fa"
                                ? "تخمین درآمد روزانه"
                                : "Estimated Daily Income",
                          },
                        },
                        scales: {
                          ...chartOptions.scales,
                          x: {
                            title: {
                              display: true,
                              text: language === "fa" ? "روز" : "Day",
                            },
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "fa" ? "درآمد ساعتی" : "Hourly Income"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Line
                      data={hourlyChartData}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            display: true,
                            text:
                              language === "fa"
                                ? "تخمین درآمد ساعتی"
                                : "Estimated Hourly Income",
                          },
                        },
                        scales: {
                          ...chartOptions.scales,
                          x: {
                            title: {
                              display: true,
                              text: language === "fa" ? "ساعت" : "Hour",
                            },
                          },
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "fa"
                        ? "توزیع درآمد بر اساس نوع ترافیک"
                        : "Income Distribution by Traffic Type"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Pie
                      data={trafficTypeChartData}
                      options={pieChartOptions}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "fa"
                        ? "توزیع درآمد بر اساس کشور"
                        : "Income Distribution by Country"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Pie data={countryChartData} options={pieChartOptions} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

export default IncomeSimulatorModal;
