import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon, Twitter, Instagram, MessageSquare, Send } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container font-kalameh font-semibold py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="#" className="flex font-sans font-bold items-center">
              <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
              <h3 className="text-2xl font-normal">TsarSEO</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2 font-light">
            <h3 className=" font-normal text-lg">Contact</h3>

            <div>
              <Link
                target="_blank"
                href="https://t.me/tsarpremiumstream"
                className="opacity-60 hover:opacity-100 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Telegram
              </Link>
            </div>
            <div>
              <Link
                target="_blank"
                href="https://wa.me/1234567890"
                className="opacity-60 hover:opacity-100 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-light">
            <h3 className="font-sans font-normal text-lg">Help</h3>
            <div>
              <Link href="#contact" className="opacity-60 hover:opacity-100">
                Contact Us
              </Link>
            </div>

            <div>
              <Link href="#faq" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <h3 className="font-sans font-normal text-lg">Socials</h3>
            <div className="font-light">
              <Link
                target="_blank"
                href="https://x.com/tsarseo_org?s=21"
                className="opacity-60 hover:opacity-100 flex items-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                X (Twitter)
              </Link>
            </div>

            <div className="font-light">
              <Link
                target="_blank"
                href="https://www.instagram.com/tsarpremiumstream"
                className="opacity-60 hover:opacity-100 flex items-center gap-2"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section>
          <h3>
            &copy; 2025 Designed and developed and copyright by*
            <Link
              target="_blank"
              href="https://github.com/hamednourzaei"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              hamednourzaei{" "}
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
