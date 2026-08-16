"use client";

import { motion } from "framer-motion";
import { CUSTOMER_STATS } from "@/lib/data";
import { riseIn, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Corners from "@/components/ui/Corners";
import CustomerMock from "@/components/sections/CustomerMock";
import Icon from "@/components/ui/Icon";

export function Customers() {
  return (
    <section id="customers" className="sec relative overflow-hidden scroll-mt-24">
      <div className="bg-dots" />
      <div className="glow glow-brand absolute -bottom-40 -right-36 h-[420px] w-[520px] opacity-35" />

      <div className="wrap relative">
        {/* ---- the claim, and the reason it holds ----
             The headline runs long, so the supporting line sits beside it on
             desktop rather than under it — the eye gets one column, not one
             very tall block. */}
        <div className="grid items-end gap-[clamp(24px,3vw,56px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="max-w-[900px]">
            <Reveal>
              <Eyebrow>07 — Customer intelligence</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h1 mt-[1.1rem]">
                Your best customer isn&apos;t the one who spent the most today.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <h3 className="t-h2 mt-[0.8rem] text-brand-deep">
                It&apos;s the one who keeps coming back.
              </h3>
            </Reveal>
          </div>

          <Reveal delay={0.22}>
            <div className="relative border-t border-edge pt-[clamp(20px,2.4vw,30px)] lg:border-l lg:border-t-0 lg:pl-[clamp(24px,2.8vw,40px)] lg:pt-0">
              <span
                aria-hidden
                className="absolute left-0 top-0 hidden h-10 w-[2px] bg-brand lg:block"
              />
              <p className="max-w-[42ch] text-[clamp(0.95rem,1.25vw,1.08rem)] leading-[1.6] text-body">
                Nova-Restro keeps the record for you — who came back, what they ordered and what a
                guest is worth over a year, not over one bill.
              </p>
              <div className="mt-[1.1rem] flex items-center gap-3">
                <span aria-hidden className="h-px w-10 flex-none bg-edge-2" />
                <span className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-muted">
                  Live, across every outlet
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- the numbers, as one instrument panel ----
             Five loose cards read as five unrelated facts. One bordered panel
             with hairline separators reads as the product. */}
        <Reveal>
          <div className="relative mt-[clamp(36px,4.5vw,60px)] overflow-hidden border border-edge bg-surface shadow-md">
            <div className="flex flex-wrap items-center gap-4 border-b border-edge bg-surface-2 p-[1.3rem_1.25rem] sm:p-[1.4rem_1.8rem]">
              <div>
                <div className="text-[1.1rem] font-extrabold tracking-[-0.03em]">
                  Your guests, remembered
                </div>
                <div className="text-[0.8rem] text-muted">
                  Not a report you run — a record that keeps itself
                </div>
              </div>
              <span className="ml-auto inline-flex items-center gap-[0.45rem] border border-edge bg-surface px-[0.8rem] py-[0.4rem] text-[0.74rem] font-bold text-body">
                <i className="h-[7px] w-[7px] rounded-full bg-brand" />
                Last 30 days
              </span>
            </div>

            {/* gap-px over an edge-coloured bed: perfect 1px separators at
                every column count. The odd fifth tile widens at sm so the bed
                never shows through an empty slot. */}
            {/* two-up from the smallest width: five full-width cards made this
                section a scroll of its own on a phone */}
            <RevealGroup className="grid grid-cols-2 gap-px bg-edge xl:grid-cols-5" stagger={0.07}>
              {CUSTOMER_STATS.map((c, i) => (
                <div
                  key={c.k}
                  className={cn(
                    "group relative flex min-w-0 flex-col bg-surface p-[0.95rem_0.85rem] transition-colors duration-300 hover:bg-brand-mist sm:p-[1.5rem_1.4rem]",
                    i === CUSTOMER_STATS.length - 1 && "col-span-2 xl:col-span-1",
                  )}
                >
                  <Corners />

                  <motion.div variants={riseIn} className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-ico border border-brand-deep/25 bg-brand-wash text-brand-deep transition-colors duration-300 group-hover:border-brand-deep/50 sm:h-10 sm:w-10">
                        <Icon name={c.icon} size={19} className="h-4 w-4 sm:h-[19px] sm:w-[19px]" />
                      </span>
                      <span className="font-mono text-[0.58rem] font-bold tracking-[0.14em] text-muted/70 sm:text-[0.62rem]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-[0.8rem] text-[0.56rem] font-extrabold uppercase leading-[1.35] tracking-[0.1em] text-muted sm:mt-[1.15rem] sm:text-[0.62rem] sm:tracking-[0.12em]">
                      {c.k}
                    </div>
                    <div className="mt-auto pt-[0.45rem] text-[clamp(1.35rem,2.5vw,2.05rem)] font-black leading-[1] tracking-[-0.045em] text-ink sm:pt-[0.55rem]">
                      {c.v}
                    </div>
                    <div className="mt-[0.3rem] text-[0.66rem] font-medium leading-[1.4] text-muted sm:mt-[0.4rem] sm:text-[0.74rem]">
                      {c.s}
                    </div>
                  </motion.div>
                </div>
              ))}
            </RevealGroup>

            {/* the screen those five numbers come from */}
            <div className="min-w-0 border-t border-edge bg-surface-2 p-2 sm:p-4 md:p-[1.5rem]">
              <CustomerMock />
            </div>
          </div>
        </Reveal>

        {/* ---- the two moves that follow ---- */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="mt-[clamp(40px,5vw,68px)] grid gap-px border border-edge bg-edge shadow-sm md:grid-cols-2"
        >
          <motion.div
            variants={riseIn}
            className="group relative overflow-hidden rounded-none bg-surface p-[clamp(26px,4vw,46px)] transition-colors duration-300 hover:bg-brand-mist"
          >
            <Corners />
            <span className="mb-4 flex items-center gap-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-deep">
              Step one
              <span aria-hidden className="h-px w-8 bg-brand/45" />
            </span>
            <h3 className="text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.04em]">
              Turn visits into relationships.
            </h3>
          </motion.div>

          <motion.div
            variants={riseIn}
            className="group relative overflow-hidden rounded-none bg-ink p-[clamp(26px,4vw,46px)] text-white"
          >
            <div className="bg-dots bg-dots-brand absolute inset-0 opacity-[0.18]" />
            {/* the brackets step up to the light brand on navy */}
            <Corners className="[&_span]:border-brand-light" />
            <span className="relative mb-4 flex items-center gap-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand-light">
              Step two
              <span aria-hidden className="h-px w-8 bg-brand-light/45" />
            </span>
            <h3 className="relative text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.04em] text-white">
              Turn relationships into lifetime value.
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Customers;
