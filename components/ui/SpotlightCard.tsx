"use client";

import { motion, type Variants } from "framer-motion";
import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE, riseIn } from "@/lib/motion";

/**
 * Sharp-cornered surface with a brand spotlight that follows the cursor
 * and a small lift on hover. Used for every card grid on the page.
 */
export function SpotlightCard({
  children,
  className,
  variants = riseIn,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      variants={variants}
      whileHover={lift ? { y: -5 } : undefined}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn(
        "spot group relative overflow-hidden rounded-none border border-edge bg-surface shadow-sm",
        "transition-[box-shadow,border-color] duration-300 hover:border-edge-2 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export default SpotlightCard;
