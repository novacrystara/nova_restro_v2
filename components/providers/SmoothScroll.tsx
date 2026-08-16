"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Apple-style inertial scrolling. Lenis drives the scroll position on rAF,
 * which also gives Framer Motion's `useScroll` a perfectly smooth input —
 * so parallax and scroll-linked motion never judder.
 *
 * Disabled automatically for users who ask for reduced motion, and on
 * touch devices (native momentum there is already excellent).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      // ease-out-expo — matches the site's motion curve
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // in-page anchors go through Lenis so the easing is identical
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88, duration: 1.35 });
    };
    document.addEventListener("click", onClick);

    // let the modal freeze the page behind it
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("nova:lock-scroll", stop);
    window.addEventListener("nova:unlock-scroll", start);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("nova:lock-scroll", stop);
      window.removeEventListener("nova:unlock-scroll", start);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
