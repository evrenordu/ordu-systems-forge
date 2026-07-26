import { useEffect, useState } from "react";

/** Thin fixed progress bar reflecting page scroll. */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (scrolled / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-electric via-electric-glow to-electric transition-[width] duration-150"
        style={{ width: `${p}%`, boxShadow: "0 0 12px var(--electric-glow)" }}
      />
    </div>
  );
}
