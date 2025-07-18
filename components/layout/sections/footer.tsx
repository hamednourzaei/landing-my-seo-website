import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon, Twitter, Instagram, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container font-kalameh font-semibold py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-card rounded-lg sm:rounded-xl border border-orange-800 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
          <div className="col-span-full lg:col-span-2 ">
            <Link href="#" className="flex items-center">
              <ChevronsDownIcon className="w-6 sm:w-7 md:w-8 lg:w-9 h-6 sm:h-7 md:h-8 lg:h-9 mr-1 sm:mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-md sm:rounded-lg border" />
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium">TsarSEO</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="text-sm mb-2 sm:text-base md:text-lg lg:text-xl font-normal">Contact</h3>
            <div>
              <Link
                target="_blank"
                href="https://t.me/tsarpremiumstream"
                className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
              >
                <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                Telegram
              </Link>
            </div>
            <div>
              <Link
                target="_blank"
                href="https://wa.me/1234567890"
                className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
              >
                <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5" />
                WhatsApp
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-normal">Help</h3>
            <div>
              <Link href="#contact" className="opacity-60 hover:opacity-100 text-xs sm:text-sm md:text-base lg:text-lg">
                Contact Us
              </Link>
            </div>
            <div>
              <Link href="#faq" className="opacity-60 hover:opacity-100 text-xs sm:text-sm md:text-base lg:text-lg">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-1 sm:gap-2">
            <h3 className="text-sm mb-2 sm:text-base md:text-lg lg:text-xl font-normal">Socials</h3>
            <div className="">
              <Link
                target="_blank"
                href="https://x.com/tsarseo_org?s=21"
                className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
              >
                <Twitter className="w-4 sm:w-5 h-4 sm:h-5" />
                X (Twitter)
              </Link>
            </div>
            <div className="">
              <Link
                target="_blank"
                href="https://www.instagram.com/tsarpremiumstream"
                className="opacity-60 hover:opacity-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base lg:text-lg"
              >
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
                Instagram
              </Link>
            </div>
          </div>

          <Separator className="my-4 sm:my-5 md:my-6 lg:my-8 col-span-full" />
          <section className="col-span-full text-center">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg">
              © 2025 Designed and developed and copyright by*
              <Link
                target="_blank"
                href="https://github.com/hamednourzaei"
                className="text-primary transition-all border-b border-primary hover:border-b-2 ml-1"
              >
                hamednourzaei
              </Link>
            </h3>
          </section>
        </div>
      </div>
    </footer>
  );
};
