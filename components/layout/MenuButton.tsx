import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import React from "react";

interface MenuButtonProps {
  isOpen: boolean;
}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ isOpen }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      className="p-0"
      aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
      onClick={() => console.log("MenuButton clicked")} // لاگ برای دیباگ
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isOpen ? "close" : "open"}
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
);
MenuButton.displayName = "MenuButton";