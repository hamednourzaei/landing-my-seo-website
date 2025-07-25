// app/(privacy)/privacy-policy/layout.tsx
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/layout/sections/QueryProvider";
import "../../globals.css"; // Import global styles
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  title: "TsarSEO | Privacy Policy",
  description: "Information regarding TsarSEO's privacy policy",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background")}>
        <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
