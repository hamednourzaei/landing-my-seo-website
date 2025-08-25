import { Separator } from "@/components/ui/separator";
import {
  ChevronsDownIcon,
  Twitter,
  Instagram,
  MessageSquare,
  Send,
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export const FooterSection = () => {
  return (
    <>
      <Head>
        <title>TsarSEO - Contact and Support</title>
        <meta
          name="description"
          content="Contact TsarSEO for professional SEO analysis, real traffic services, and dedicated support."
        />
        <meta
          name="keywords"
          content="TsarSEO, SEO analysis, real traffic, contact, support, Telegram, WhatsApp, FAQ, social media"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TsarSEO - Contact and Support" />
        <meta
          property="og:description"
          content="Contact TsarSEO for professional SEO analysis, real traffic services, and dedicated support."
        />
        <meta property="og:url" content="https://tsarseo.online" />
        <meta
          property="og:image"
          content="https://tsarseo.online/footer-image.webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TsarSEO",
                description:
                  "TsarSEO provides professional SEO analysis and real traffic services.",
                url: "https://tsarseo.online",
                logo: "https://tsarseo.online/icons/logo.png",
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    url: "https://t.me/tsarpremiumstream",
                    contactType: "customer service",
                  },
                  {
                    "@type": "ContactPoint",
                    url: "https://wa.me/1234567890",
                    contactType: "customer service",
                  },
                ],
                sameAs: [
                  "https://x.com/tsarseo_org?s=21",
                  "https://www.instagram.com/tsarpremiumstream",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                url: "https://tsarseo.online",
                name: "TsarSEO",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://tsarseo.online/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
      </Head>

      <footer
        id="footer"
        className="container font-kalameh font-semibold py-10 sm:py-12 md:py-16 lg:py-20"
        aria-labelledby="footer-heading"
      >
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-card rounded-lg sm:rounded-xl border border-orange-800 shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            <div className="col-span-full lg:col-span-2">
              <Link
                href="/"
                className="flex items-center"
                aria-label="TsarSEO Homepage"
              >
                <ChevronsDownIcon
                  className="w-6 sm:w-7 md:w-8 lg:w-9 h-6 sm:h-7 md:h-8 lg:h-9 mr-1 sm:mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-md sm:rounded-lg border"
                  aria-hidden="true"
                />
                <h3
                  id="footer-heading"
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-medium"
                >
                  TsarSEO
                </h3>
              </Link>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-sm mb-2 sm:text-base md:text-lg lg:text-xl font-normal">
                Contact
              </h3>
              <div>
                <Link
                  target="_blank"
                  href="https://t.me/hard_days_champion"
                  className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="Contact TsarSEO via Telegram"
                >
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" aria-hidden="true" />
                  Telegram
                </Link>
              </div>
              <div>
                <Link
                  target="_blank"
                  href="https://wa.me/9962260723"
                  className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="Contact TsarSEO via WhatsApp"
                >
                  <MessageSquare
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    aria-hidden="true"
                  />
                  WhatsApp
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-sm mb-2 sm:text-base md:text-lg lg:text-xl font-normal">
                Support
              </h3>
              <div>
                <Link
                  href="/#contact"
                  className="opacity-60 hover:opacity-100 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="Contact TsarSEO Support Team"
                >
                  Contact Us
                </Link>
              </div>
              <div>
                <Link
                  href="/#features"
                  className="opacity-60 hover:opacity-100 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="View TsarSEO FAQs"
                >
                  FAQ
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-sm mb-2 sm:text-base md:text-lg lg:text-xl font-normal">
                Socials
              </h3>
              <div>
                <Link
                  target="_blank"
                  href="https://x.com/tsarseo_org?s=21"
                  className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="Follow TsarSEO on X (Twitter)"
                >
                  <Twitter
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    aria-hidden="true"
                  />
                  X (Twitter)
                </Link>
              </div>
              <div>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/tsar_seo_original"
                  className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="Follow TsarSEO on Instagram"
                >
                  <Instagram
                    className="w-4 sm:w-5 h-4 sm:h-5"
                    aria-hidden="true"
                  />
                  Instagram
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="text-sm mb-2 sm:text-base md:text-lg lg:text-xl font-normal">
                Company
              </h3>
              <div>
                <Link
                  href="/about"
                  className="opacity-60 hover:opacity-100 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="Learn More About TsarSEO"
                >
                  About Us
                </Link>
              </div>

              <div>
                <Link
                  href="/privacy-policy"
                  className="opacity-60 hover:opacity-100 text-xs sm:text-sm md:text-base lg:text-lg"
                  aria-label="View TsarSEO Privacy Policy"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            <Separator
              className="my-4 sm:my-5 md:my-6 lg:my-8 col-span-full"
              aria-hidden="true"
            />
            <div className="col-span-full text-center">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                © 2025 Designed and developed by
                <Link
                  target="_blank"
                  href="https://github.com/hamednourzaei"
                  className="text-primary transition-all border-b border-primary hover:border-b-2 ml-1"
                  aria-label="View hamednourzaei's GitHub profile"
                >
                  hamednourzaei
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
