"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { NAV_LINKS } from "@/lib/data";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import DemoButton from "@/components/demo/DemoButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] py-[14px]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        <div className="wrap wrap-wide">
          <div
            className={cn(
              "flex items-center gap-4 border px-4 py-[10px] sm:pl-5 sm:pr-3",
              "transition-[background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-500 ease-smooth",
              scrolled
                ? // detached: the glass pane — heavy blur, saturation lift, a bright
                  // top rim and a wide soft shadow, so it floats over anything
                  cn(
                    "rounded-ico-sm border-white/60 bg-white/65",
                    "shadow-[0_10px_36px_-16px_rgba(11,20,32,.34),inset_0_1px_0_rgba(255,255,255,.65)]",
                    "backdrop-blur-[26px] backdrop-saturate-[1.9]",
                  )
                : // at rest: nothing at all — the page reads as one surface
                  "rounded-none border-transparent bg-transparent shadow-none",
            )}
          >
            <a
              href="#top"
              className="flex flex-none items-center gap-[0.65rem] text-[1.02rem] font-extrabold tracking-[-0.03em] sm:text-[1.08rem]"
            >
              <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-ico bg-brand shadow-[0_6px_16px_-6px_rgba(234,88,12,.85)]">
                <Icon name="logo" size={18} strokeWidth={2.4} className="text-white" />
              </span>
              Nova-Restro
            </a>

            {/* the pill follows the pointer between items rather than each item
                lighting its own background — one object moving, not six */}
            <nav
              className="ml-auto hidden items-center lg:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {NAV_LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => setHovered(i)}
                  className="relative rounded-none px-[0.95rem] py-[0.55rem] text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-3 transition-colors duration-200 hover:text-ink"
                >
                  {hovered === i && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.7 }}
                      className="absolute inset-0 -z-[1] rounded-ico-sm bg-ink/[0.055]"
                    />
                  )}
                  <span className="relative">{l.label}</span>
                  {/* a brand hairline under the item you are on */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-[0.95rem] bottom-[0.3rem] h-[2px] origin-left bg-brand transition-transform duration-300 ease-smooth",
                      hovered === i ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              {/* below lg the hamburger carries these, so the bar never crowds */}
              <DemoButton variant="outline" size="sm" className="hidden lg:inline-flex">
                Book a Demo
              </DemoButton>
              <Button href="#action" variant="primary" size="sm" className="hidden sm:inline-flex">
                See Nova-Restro in Action
              </Button>

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-[42px] w-[42px] place-items-center rounded-none border border-edge bg-surface text-ink lg:hidden"
              >
                <Icon name={menuOpen ? "close" : "menu"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[98] bg-ink/30 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-[76px] z-[99] rounded-none border border-edge bg-surface p-3.5 shadow-lg lg:hidden"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: EASE, delay: 0.05 + i * 0.04 }}
                    className="group/nav flex items-center gap-3 rounded-none border-b border-dashed border-edge px-3 py-[0.85rem] text-[0.95rem] font-bold tracking-[-0.02em] transition-colors duration-200 last:border-b-0 hover:bg-canvas-2"
                  >
                    <span className="font-mono text-[0.62rem] font-bold text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                    <Icon
                      name="arrowRight"
                      size={15}
                      strokeWidth={2.4}
                      className="ml-auto text-muted transition-all duration-300 ease-smooth group-hover/nav:translate-x-1 group-hover/nav:text-brand-deep"
                    />
                  </motion.a>
                ))}
                <div className="mt-2 grid gap-2" onClick={() => setMenuOpen(false)}>
                  <DemoButton variant="primary" size="md" className="w-full">
                    Book a Demo
                  </DemoButton>
                  <Button
                    href="#action"
                    variant="outline"
                    size="md"
                    className="w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    See Nova-Restro in Action
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
