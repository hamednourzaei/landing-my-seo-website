// use-active-hash.ts
import { useState, useEffect } from "react";

export function useActiveHash(): string {
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      const hashes = Array.from(document.querySelectorAll("section[id]")).map(
        (section) => section.id
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentHash = "";
      for (const id of hashes) {
        const el = document.getElementById(id);
        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentHash = `#${id}`;
          }
        }
      }
      setActiveHash(currentHash);
    }

    window.addEventListener("scroll", onScroll);
    onScroll(); // اجرا به محض بارگذاری

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return activeHash;
}
