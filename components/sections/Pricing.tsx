"use client";

import { motion } from "framer-motion";
import { PLAN_EXTRAS, PLAN_INCLUDES, PLAN_PRICE } from "@/lib/data";
import { riseIn, viewportOnce } from "@/lib/motion";
import Reveal, { rise } from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import DemoButton from "@/components/demo/DemoButton";
import Icon from "@/components/ui/Icon";
import RoiCalculator from "@/components/sections/RoiCalculator";

export function Pricing() {
  return (
    <section id="pricing" className="sec relative overflow-hidden scroll-mt-24 bg-canvas">
      <div className="glow glow-brand absolute -right-40 -top-48 h-[520px] w-[640px] opacity-40" />

      <div className="wrap relative">
        <div className="mb-[clamp(36px,5vw,60px)] max-w-[820px]">
          <Reveal>
            <Eyebrow>11 — Pricing</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h1 mt-[1.1rem]">
              Your restaurant is already complicated enough.{" "}
              <span className="text-brand-deep">Your software shouldn&apos;t be.</span>
            </h2>
          </Reveal>
        </div>

        {/* ---- what it costs, then what it gives back ----
             Stacked rather than side by side: two dense panels competing for
             the same eye-line meant neither got read. */}
        <div className="grid gap-3 sm:gap-3.5">
          {/* ---------- the plan ---------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={riseIn}
            className="plan-border relative flex min-w-0 flex-col overflow-hidden rounded-none border border-edge bg-surface shadow-md"
          >
            <div className="grid gap-[clamp(24px,3vw,40px)] p-[clamp(18px,3.2vw,40px)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-0">
              {/* the price */}
              <div className="lg:pr-[clamp(28px,3.4vw,52px)]">
                <span className="inline-flex items-center gap-[0.45rem] rounded-none bg-brand px-[0.9rem] py-[0.4rem] text-[0.72rem] font-extrabold uppercase tracking-[0.04em] text-white">
                  <Icon name="check" size={13} strokeWidth={2.6} />
                  One Simple Plan
                </span>

                {/* The old number stays on the line, struck through, because
                    the whole point is what it used to be. */}
                <div className="mt-[1.6rem] flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="relative font-black leading-[0.9] tracking-[-0.05em] text-muted/70">
                    <span className="text-[clamp(1.8rem,3.6vw,2.6rem)]">{PLAN_PRICE.was}</span>
                    <span
                      aria-hidden
                      className="absolute inset-x-[-3px] top-1/2 h-[3px] -translate-y-1/2 -rotate-[8deg] bg-destructive"
                    />
                    <span className="sr-only"> was the old price, now </span>
                  </span>

                  <span className="flex items-end gap-2">
                    <span className="text-[clamp(3.4rem,7.5vw,5.2rem)] font-black leading-[0.82] tracking-[-0.055em] text-ink">
                      {PLAN_PRICE.now}
                    </span>
                    <span className="mb-[0.35rem] text-[0.86rem] font-bold leading-[1.25] tracking-[-0.01em] text-body">
                      {PLAN_PRICE.unit.split(", ").map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                  </span>
                </div>

                <div className="mt-[1rem] flex max-w-full flex-wrap items-center gap-2 border border-edge bg-canvas px-[0.8rem] py-[0.45rem] text-[0.72rem] font-semibold text-ink-3 sm:inline-flex sm:text-[0.75rem]">
                  <Icon
                    name="calendar"
                    size={13}
                    strokeWidth={2.2}
                    className="flex-none text-brand-deep"
                  />
                  {PLAN_PRICE.billing}
                </div>

                <h3 className="t-h3 mt-[1.6rem] max-w-[20ch]">
                  One simple plan, with every software feature included.
                </h3>

                {/* ---- the one thing that is not in the price ---- */}
                <div className="mt-[1.5rem] border border-dashed border-edge-2 bg-surface-2 p-[0.9rem_0.95rem] sm:p-[1rem_1.1rem]">
                  <h4 className="text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                    You only pay extra, if you want:
                  </h4>
                  {PLAN_EXTRAS.map((e) => (
                    <div key={e.title} className="mt-[0.85rem] flex items-start gap-[0.85rem]">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-ico border border-brand-deep/30 bg-brand-wash text-brand-deep">
                        <Icon name={e.icon} size={18} strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0">
                        <b className="block text-[1rem] font-extrabold tracking-[-0.03em]">
                          {e.title}
                        </b>
                        <span className="mt-[0.15rem] block text-[0.8rem] leading-[1.5] text-body">
                          {e.copy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* what is in it — the full width lets this run two-up beside
                  the price instead of underneath it */}
              <div className="border-t border-edge pt-[clamp(22px,2.6vw,32px)] lg:border-l lg:border-t-0 lg:pl-[clamp(30px,3.6vw,56px)] lg:pt-0">
                <h4 className="text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                  Everything that is already in the price
                </h4>
                <div className="mt-[0.8rem] grid gap-x-6 gap-y-[0.15rem] sm:grid-cols-2">
                  {PLAN_INCLUDES.map((p) => (
                    <span
                      key={p}
                      className="flex items-center gap-[0.7rem] border-b border-dashed border-edge py-[0.7rem] text-[0.95rem] font-bold tracking-[-0.025em] text-ink"
                    >
                      <span className="grid h-[22px] w-[22px] flex-none place-items-center rounded-full border border-brand-deep/40 bg-brand-wash">
                        <Icon
                          name="check"
                          size={11}
                          strokeWidth={3.6}
                          className="text-brand-deep"
                        />
                      </span>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-ink p-[1.1rem_clamp(18px,3.2vw,40px)] text-white">
              <b className="text-[1.25rem] font-black tracking-[-0.04em] sm:text-[1.4rem]">
                All included.
              </b>
              <span className="max-w-[42ch] text-[0.78rem] leading-[1.5] text-white/55 sm:text-[0.82rem]">
                No feature tiers. No unlock fees. No &ldquo;contact sales to see the good part.&rdquo;
              </span>
            </div>
          </motion.div>

          {/* ---------- what it gives back ---------- */}
          <motion.div
            id="roi"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={rise(0.1)}
            className="min-w-0 scroll-mt-24"
          >
            <RoiCalculator />
          </motion.div>
        </div>

        <Reveal>
          <div className="relative mt-[clamp(36px,5vw,60px)] overflow-hidden rounded-none border border-edge bg-surface px-6 py-[clamp(32px,5vw,64px)] text-center">
            <div className="glow glow-brand absolute left-1/2 top-[-120px] h-[300px] w-[380px] -translate-x-1/2 opacity-50" />
            <div className="relative">
              <h2 className="t-h1">
                One plan. <span className="hl">Everything you need.</span>
              </h2>
              <p className="lead mx-auto mt-[1.4rem] max-w-[48ch]">
                Every software feature, every outlet, every user — for £2 a day. You only add the AI
                Waiter if you want it.
              </p>
              <div className="mt-[2.2rem] flex flex-wrap justify-center gap-[0.85rem]">
                <Button href="#action" variant="primary" size="lg">
                  See Nova-Restro in Action
                  <Icon
                    name="arrowRight"
                    size={17}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
                  />
                </Button>
                <DemoButton variant="outline" size="lg">
                  Book a Demo
                </DemoButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Pricing;
