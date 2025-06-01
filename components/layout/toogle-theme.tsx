import { useTheme } from "next-themes";
import { Button } from "../ui/button"; // فرض می‌کنم Button از shadcn/ui یا مشابهه
import { Moon, Sun } from "lucide-react";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="flex items-center font-kalameh font-semibold  gap-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
    >
      <div className="flex items-center gap-2 dark:hidden">
        <Moon className="size-5 transition-transform duration-300 hover:rotate-90" />
        <span className="hidden md:block">تیره</span>
      </div>

      <div className="dark:flex items-center gap-2 hidden">
        <Sun className="size-5 transition-transform duration-300 hover:rotate-90" />
        <span className="hidden md:block">روشن</span>
      </div>

      <span className="sr-only">تغییر تم</span>
    </Button>
  );
};