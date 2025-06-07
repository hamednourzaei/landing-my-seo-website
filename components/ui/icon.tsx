import * as React from "react";
import {
  BarChart2,
  Users,
  Zap,
  Trophy,
  Server,
  Globe,
  CircleDot,
  Gauge,
  ShieldCheck,
  Search, // اضافه شده
  LineChart, // اضافه شده
  Lock, // اضافه شده
} from "lucide-react";
import { LucideProps } from "lucide-react";

const iconMap = {
  BarChart2,
  Users,
  Zap,
  Trophy,
  Server,
  Globe,
  CircleDot,
  Gauge,
  ShieldCheck,
  Search, // اضافه شده
  LineChart, // اضافه شده
  Lock, // اضافه شده
};

export type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({ name, color, size, className }) => {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in iconMap.`);
    return <span aria-hidden="true">⚠️</span>;
  }

  return <LucideIcon color={color} size={size} className={className} />;
};

export default Icon;