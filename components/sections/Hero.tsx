"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, riseIn, stagger } from "@/lib/motion";
import { HERO_META, TRUST_BADGES } from "@/lib/data";
import useViewportWidth from "@/lib/useViewportWidth";
import Button from "@/components/ui/Button";
import DemoButton from "@/components/demo/DemoButton";
import Icon from "@/components/ui/Icon";
import DashboardMock from "./DashboardMock";
import Marquee from "./Marquee";

/** true from the lg breakpoint up — the only place the fold is a two-column split. */
function useDesktop() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return desktop;
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useDesktop();
  const vw = useViewportWidth();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // soft-spring the scroll input so the parallax never snaps
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const copyY = useTransform(p, [0, 1], [0, reduced ? 0 : 84]);
  const copyOpacity = useTransform(p, [0, 0.72], [1, reduced ? 1 : 0]);
  const shotY = useTransform(p, [0, 1], [0, reduced ? 0 : -70]);
  const shotScale = useTransform(p, [0, 1], [1, reduced ? 1 : 1.07]);
  const glowY = useTransform(p, [0, 1], [0, reduced ? 0 : 140]);

  /* ---- the product frame arrives full-window and narrows as you scroll ----
     Progress runs while the frame's top travels from 88% to 18% of the viewport:
     it starts edge-to-edge and settles into the page grid on the way down —
     and opens back out on the way up. */
  const { scrollYProgress: frameProgress } = useScroll({
    target: frameRef,
    offset: ["start 0.88", "start 0.18"],
  });
  const fp = useSpring(frameProgress, { stiffness: 110, damping: 26, mass: 0.45 });

  const gutter = vw >= 640 ? 48 : 40;
  const inset = Math.max(0, vw - gutter);
  // it settles at 87% of the window — wide enough to stay the page's centrepiece
  const settled = vw >= 640 ? Math.min(inset, Math.round(vw * 0.87)) : inset;
  // phones and reduced-motion keep both ends identical: the frame is always
  // inset, but the style still applies, so no stale inline width can survive
  // a resize down from a desktop width
  const opened = vw >= 640 && !reduced ? vw : inset;

  const frameWidth = useTransform(fp, [0, 1], [opened, settled]);
  const framePad = useTransform(fp, [0, 1], [vw >= 640 ? 20 : 8, vw >= 640 ? 12 : 8]);
  const frameShadow = useTransform(
    fp,
    [0, 1],
    [
      "0 60px 120px -40px rgba(11,20,32,.42), 0 18px 44px -20px rgba(11,20,32,.20)",
      "0 30px 70px -24px rgba(11,20,32,.24), 0 8px 24px -12px rgba(11,20,32,.10)",
    ],
  );

  return (
    <section id="top" className="relative isolate overflow-hidden bg-canvas">
      {/* ---------- Fold: copy left, photograph bleeding off the right ---------- */}
      <div ref={ref} className="relative overflow-hidden">
        <motion.div
          style={{ y: glowY }}
          className="glow glow-brand absolute -left-[220px] top-[-200px] h-[560px] w-[620px] opacity-30"
        />

        {/* The photograph. Sits behind the copy and dissolves into the page on
            its left edge, so the headline reads over clean canvas while the
            tablet stays crisp and full-bleed to the right. */}
        <motion.div
          style={{ y: shotY, scale: shotScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] origin-right lg:block xl:w-[60%]"
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.35) 14%, rgba(0,0,0,.85) 30%, #000 44%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.35) 14%, rgba(0,0,0,.85) 30%, #000 44%)",
            }}
          >
            <Image
              src="/hero_sec_1.webp"
              alt="The Nova-Restro owner dashboard open on a tablet in a restaurant dining room"
              fill
              // eager, but no preload tag: phones never render this image
              loading="eager"
              fetchPriority="high"
              // already a tuned webp — re-encoding it per breakpoint only adds latency
              unoptimized
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAkAA4BaJQBOgB9vjgDoHYAA/vc5g9q+7IplP+2rCrm7t/jS1ce14FA83WZ3r52MLe1xNgf3gAAA"
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover object-right"
            />
            {/* blend the photo into the canvas at the very bottom of the fold */}
            <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-canvas to-transparent" />
            <div className="absolute inset-y-0 left-0 w-[34%] bg-gradient-to-r from-canvas via-canvas/45 to-transparent" />
            {/* and lighten the band the (transparent) navbar sits in */}
            <div className="absolute inset-x-0 top-0 h-[150px] bg-gradient-to-b from-canvas via-canvas/60 to-transparent" />
          </div>
        </motion.div>

        {/* Tablet: a brand-lit stage behind the product shot that sits in flow
            below the copy. No crop, no tilt — the whole dashboard, straight on. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[52%] overflow-hidden sm:block lg:hidden"
        >
          <div className="glow glow-brand absolute left-1/2 top-[18%] h-[380px] w-[86%] -translate-x-1/2 opacity-40" />
        </div>

        <div className="wrap wrap-wide relative">
          <div className="grid items-center gap-[clamp(32px,5vw,56px)] pb-[clamp(48px,6vw,72px)] pt-[clamp(108px,11vw,150px)] lg:min-h-[calc(100svh-72px)] lg:grid-cols-[minmax(0,47%)_minmax(0,53%)]">
            <motion.div
              // the scroll-linked drift only makes sense next to the photo
              style={desktop ? { y: copyY, opacity: copyOpacity } : undefined}
              variants={stagger(0.1, 0.05)}
              initial="hidden"
              animate="show"
              className="relative max-w-[660px]"
            >
              <motion.span
                variants={riseIn}
                className="inline-flex items-center gap-2 rounded-none border border-edge bg-surface px-[0.85rem] py-[0.4rem] text-[0.78rem] font-semibold text-ink-3 shadow-xs"
              >
                <span className="h-[7px] w-[7px] rounded-full bg-brand-deep shadow-[0_0_0_3px_var(--brand-wash)]" />
                The operating system for your restaurant
              </motion.span>

              <motion.h1
                variants={riseIn}
                className="mt-[1.4rem] text-[clamp(2.4rem,5.1vw,4.6rem)] font-black leading-[0.99] tracking-[-0.045em]"
              >
                Your restaurant
                <br />
                should be busy,
                <br />
                <span className="hl">not you.</span>
              </motion.h1>

              <motion.p
                variants={riseIn}
                className="lead mt-[1.7rem] max-w-[560px] text-ink-3"
              >
                Nova-Restro gives restaurant owners live visibility across every outlet — sales,
                tables, orders, customers, kitchen and performance — so you can stop chasing
                information and start growing the business.
              </motion.p>

              <motion.div
                variants={riseIn}
                className="mt-[2.3rem] flex flex-col items-stretch gap-[0.85rem] sm:flex-row sm:items-center"
              >
                <Button href="#action" variant="primary" size="lg" className="w-full sm:w-auto">
                  See Nova-Restro in Action
                  <Icon
                    name="arrowRight"
                    size={17}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
                  />
                </Button>
                <DemoButton variant="outline" size="lg" className="w-full sm:w-auto">
                  <Icon name="calendar" size={16} />
                  Book a Demo
                </DemoButton>
              </motion.div>

              <motion.div
                variants={riseIn}
                className="mt-[2.1rem] flex flex-wrap gap-x-[clamp(20px,2.6vw,38px)] gap-y-4"
              >
                {HERO_META.map((m) => (
                  <span key={m.title} className="inline-flex items-center gap-[0.65rem]">
                    <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-brand-wash text-brand-deep">
                      <Icon name={m.icon} size={16} strokeWidth={2.4} />
                    </span>
                    <span className="text-[0.84rem] leading-[1.3]">
                      <span className="block font-bold text-ink">{m.title}</span>
                      {m.sub && <span className="block text-muted">{m.sub}</span>}
                    </span>
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Tablet: the dashboard, whole and straight on — a product shot, not
                a crop. Bleeds the wrap gutters and lifts off the page. */}
            <motion.div
              initial={{ opacity: 0, y: 46 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, ease: EASE, delay: 0.4 }}
              className="relative hidden sm:block lg:hidden"
            >
              <div className="relative aspect-[1462/1093] w-full drop-shadow-[0_36px_70px_rgba(11,20,32,0.20)]">
                <Image
                  src="/tab_dashboard.webp"
                  alt="The Nova-Restro owner dashboard — sales, orders, customers and outlet performance on one screen"
                  fill
                  loading="eager"
                  fetchPriority="high"
                  unoptimized
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoQAAwAA4BaJaQAA3AA/vQ8QAA="
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- Credentials strip closing the fold ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        className="relative border-y border-edge bg-surface/80 backdrop-blur-[6px]"
      >
        <div className="wrap wrap-wide">
          <ul className="no-bar flex items-center justify-start overflow-x-auto py-[13px] [mask-image:linear-gradient(90deg,#000_90%,transparent)] sm:justify-center sm:[mask-image:none]">
            {TRUST_BADGES.map((b) => (
              <li
                key={b.label}
                className="group/badge flex flex-none items-center gap-[0.5rem] whitespace-nowrap px-[clamp(16px,2.6vw,40px)] [&+&]:border-l [&+&]:border-edge"
              >
                <Icon
                  name={b.icon}
                  size={15}
                  strokeWidth={1.9}
                  className="flex-none text-muted transition-colors duration-300 group-hover/badge:text-brand-deep"
                />
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-ink-3">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* ---------- The live product, below the fold ----------
           The frame starts inset like any other section and widens to the full
           window as it scrolls into view — and back again on the way up. */}
      <div ref={frameRef} id="action" className="relative w-full scroll-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={
            vw > 0
              ? {
                  width: frameWidth,
                  // the class caps at the wrap width — the motion value owns it now
                  maxWidth: "none",
                  paddingLeft: framePad,
                  paddingRight: framePad,
                  boxShadow: frameShadow,
                }
              : undefined
          }
          className="beam relative mx-auto mt-[clamp(56px,8vw,110px)] w-[calc(100%-40px)] max-w-wrap rounded-none border border-ink-2 bg-ink p-2 shadow-lg [will-change:width] sm:w-[calc(100%-48px)] sm:p-3"
        >
          <div className="flex items-center gap-1.5 px-2 pb-2.5 pt-1.5">
            <i className="block h-[9px] w-[9px] rounded-full bg-[#3B4A63]" />
            <i className="block h-[9px] w-[9px] rounded-full bg-[#2A3950]" />
            <i className="block h-[9px] w-[9px] rounded-full bg-[#2A3950]" />
            <span className="ml-2 rounded-none border border-[#1E2B3F] bg-[#111C2C] px-[0.7rem] py-[0.28rem] font-mono text-[0.62rem] text-[#6B7A93] sm:text-[0.7rem]">
              app.nova-restro.com/overview
            </span>
          </div>
          <div className="overflow-hidden rounded-none bg-night">
            <DashboardMock />
          </div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}

export default Hero;
