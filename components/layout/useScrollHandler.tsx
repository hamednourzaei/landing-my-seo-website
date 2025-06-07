import { useState, useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";

export const useScrollHandler = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);

  const hideBorderRef = useRef<ReturnType<typeof debounce>>();
  const handleScrollRef = useRef<ReturnType<typeof throttle>>();

  useEffect(() => {
    hideBorderRef.current = debounce(() => {
      setIsScrolling(false);
    }, 2000);

    handleScrollRef.current = throttle(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsScrolling(true);
        hideBorderRef.current?.();
      }
      lastScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener("scroll", handleScrollRef.current, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollRef.current!);
      handleScrollRef.current?.cancel();
      hideBorderRef.current?.cancel();
    };
  }, []);

  return isScrolling;
};