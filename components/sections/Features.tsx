"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/data";
import { fadeIn } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/**
 * The bento plan — one entry per feature, in data order.
 *
 * `lg` spans a six-column bed and every row adds up to six, so the dashed
 * rules stay continuous across the whole block: 4+2 / 2+2+2 / 3+3 / 2+2+2 /
 * 2+2+2. `sm` is the two-column bed underneath it. Anything three wide or more
 * is treated as a feature tile and sets its title a size up.
 */
const PLAN: { sm: 1 | 2; lg: 2 | 3 | 4 }[] = [
  { sm: 2, lg: 4 }, // Smart Table Ordering
  { sm: 1, lg: 2 }, // AI Waiter
  { sm: 1, lg: 2 }, // Multiple Kitchen Displays
  { sm: 1, lg: 2 }, // Real-Time Order Tracking
  { sm: 1, lg: 2 }, // Intelligent Notifications
  { sm: 1, lg: 3 }, // Table & Floor Management
  { sm: 2, lg: 3 }, // Loyalty & Customer Intelligence
  { sm: 1, lg: 2 }, // Card / Tap / Cash Payments
  { sm: 1, lg: 2 }, // Tips & Tronc
  { sm: 1, lg: 2 }, // Tax & Billing
  { sm: 1, lg: 2 }, // Outlet KPIs
  { sm: 1, lg: 2 }, // Multi-Outlet Analytics
  { sm: 2, lg: 2 }, // Sales Intelligence
];

const SM_SPAN = { 1: "sm:col-span-1", 2: "sm:col-span-2" } as const;
const LG_SPAN = { 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4" } as const;

/**
 * A solid tick on the corner of a cell, sitting exactly over the dashed rule.
 * Crosshairs made every seam busy; an L-bracket reads as the drawing closing
 * itself, and it is the same corner language the rest of the site hovers in.
 */
function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        // the tick thickens as well as warms on hover — at 1.25px a colour
        // change alone barely registers at the corner of a large cell
        "pointer-events-none absolute z-[2] h-[13px] w-[13px] border-edge-2",
        "transition-[border-color,border-width] duration-300 group-hover:border-brand-deep",
        className,
      )}
    />
  );
}

export function Features() {
  return (
    <section id="features" className="sec relative scroll-mt-24 border-y border-edge bg-surface">
      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,60px)] max-w-[780px]">
          <Reveal>
            <Eyebrow>08 — The complete kit</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h1 mt-[1.1rem]">
              Everything your restaurant needs.{" "}
              <span className="text-brand-deep">Nothing you don&apos;t.</span>
            </h2>
          </Reveal>
        </div>

        {/* ---- the plan ----
             No cards: each cell draws its own long-dash outline and its own
             four crosshairs, and the gap between two cells is what makes the
             rules read as a pair rather than a single shared line. */}
        <RevealGroup
          stagger={0.045}
          className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-6"
        >
          {FEATURES.map((f, i) => {
            const span = PLAN[i] ?? { sm: 1, lg: 2 };
            const wide = span.lg >= 3;

            return (
              <motion.article
                key={f.title}
                variants={fadeIn}
                className={cn(
                  // no overflow-hidden: the corner crosshairs sit half outside
                  "dash-cell spot group relative flex flex-col hover:bg-canvas",
                  "p-[clamp(1.5rem,2.3vw,2.1rem)] min-h-[188px] lg:min-h-[232px]",
                  SM_SPAN[span.sm],
                  LG_SPAN[span.lg],
                )}
              >
                <Tick className="left-0 top-0 border-l-[1.25px] border-t-[1.25px] group-hover:border-l-[2.5px] group-hover:border-t-[2.5px]" />
                <Tick className="right-0 top-0 border-r-[1.25px] border-t-[1.25px] group-hover:border-r-[2.5px] group-hover:border-t-[2.5px]" />
                <Tick className="bottom-0 left-0 border-b-[1.25px] border-l-[1.25px] group-hover:border-b-[2.5px] group-hover:border-l-[2.5px]" />
                <Tick className="bottom-0 right-0 border-b-[1.25px] border-r-[1.25px] group-hover:border-b-[2.5px] group-hover:border-r-[2.5px]" />

                <span className="grid h-[46px] w-[46px] flex-none place-items-center rounded-ico border border-edge bg-surface text-brand-deep shadow-xs transition-all duration-300 ease-smooth group-hover:-rotate-6 group-hover:scale-105 group-hover:border-brand-deep group-hover:bg-brand group-hover:text-white">
                  <Icon name={f.icon} size={21} strokeWidth={1.9} />
                </span>

                <b
                  className={cn(
                    "mt-[1.05rem] font-bold leading-[1.2] tracking-[-0.03em]",
                    wide ? "text-[clamp(1.08rem,1.55vw,1.35rem)]" : "text-[1rem]",
                  )}
                >
                  {f.title}
                </b>
                {/* a brand rule draws itself under the title you're on */}
                <span
                  aria-hidden
                  className="mt-[0.7rem] block h-[2px] w-9 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-smooth group-hover:scale-x-100"
                />
                <p
                  className={cn(
                    "mt-auto pt-[0.8rem] leading-[1.55] text-body",
                    wide ? "max-w-[52ch] text-[0.88rem]" : "text-[0.82rem]",
                  )}
                >
                  {f.copy}
                </p>
              </motion.article>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.06}>
          <div className="mt-[clamp(28px,4vw,48px)] flex flex-wrap items-center justify-between gap-5 rounded-none border border-dashed border-edge-2 bg-canvas p-[1.5rem_1.4rem] sm:p-[1.5rem_1.8rem]">
            <b className="text-[1.35rem] font-extrabold tracking-[-0.035em]">All features.</b>
            <span className="max-w-[52ch] text-[0.95rem] text-body">
              Every one of them is in the plan. There is no tier that unlocks the useful half.
            </span>
            <Button href="#pricing" variant="dark" size="sm">
              See Pricing
              <Icon
                name="arrowRight"
                size={15}
                strokeWidth={2.4}
                className="transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
              />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Features;
