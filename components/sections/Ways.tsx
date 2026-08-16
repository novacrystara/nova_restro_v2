"use client";

import { motion } from "framer-motion";
import { NEW_WAY, OLD_WAY } from "@/lib/data";
import { EASE, riseIn, viewportOnce } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import ThreeMoves from "@/components/sections/ThreeMoves";
import Icon from "@/components/ui/Icon";

export function Ways() {
  return (
    <section id="ways" className="sec relative overflow-hidden bg-canvas">
      <div className="wrap relative">
        <div className="mx-auto mb-[clamp(36px,5vw,64px)] max-w-[640px] text-center">
          <Reveal>
            <Eyebrow>09 — Two ways to run a day</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h1 mt-[1.1rem]">Ten steps, or three.</h2>
          </Reveal>
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          {/* Old way */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="relative overflow-hidden rounded-none border border-edge bg-surface p-[clamp(24px,3.5vw,44px)]"
          >
            <motion.div variants={riseIn} className="mb-[1.8rem] flex items-center gap-[0.8rem]">
              <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-ico bg-destructive-wash text-destructive">
                <Icon name="clock" size={19} />
              </span>
              <h3 className="text-[clamp(1.3rem,2.4vw,2rem)] tracking-[-0.04em]">The Old Way</h3>
            </motion.div>

            <div className="grid gap-0.5">
              {OLD_WAY.map((w, i) => (
                <motion.div
                  key={w}
                  variants={riseIn}
                  whileHover={{ paddingLeft: "0.7rem" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-center gap-[0.9rem] border-b border-dashed border-edge px-[0.2rem] py-[0.78rem] last:border-b-0"
                >
                  <span className="w-[1.6rem] flex-none font-mono text-[0.66rem] font-bold text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(0.95rem,1.7vw,1.3rem)] font-bold tracking-[-0.03em] text-ink-3">
                    {w}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-[1.6rem] border-t border-edge pt-[1.2rem] text-[0.82rem] font-semibold text-muted">
              Ten steps to find out what already happened.
            </div>
          </motion.div>

          {/* Nova-Restro way */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            className="relative overflow-hidden rounded-none border border-ink bg-ink p-[clamp(24px,3.5vw,44px)] text-white"
          >
            <motion.div variants={riseIn} className="mb-[1.8rem] flex items-center gap-[0.8rem]">
              <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-ico bg-brand-light/[0.16] text-brand-light">
                <Icon name="zap" size={19} />
              </span>
              <h3 className="text-[clamp(1.3rem,2.4vw,2rem)] tracking-[-0.04em] text-white">
                The Nova-Restro Way
              </h3>
            </motion.div>

            <div className="grid gap-0.5">
              {NEW_WAY.map((w, i) => (
                <motion.div
                  key={w}
                  variants={riseIn}
                  whileHover={{ paddingLeft: "0.7rem" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-center gap-[0.9rem] border-b border-dashed border-white/10 px-[0.2rem] py-[0.78rem] last:border-b-0"
                >
                  <span className="w-[1.6rem] flex-none font-mono text-[0.66rem] font-bold text-white/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(0.95rem,1.7vw,1.3rem)] font-bold tracking-[-0.03em] text-white">
                    {w}
                  </span>
                  <span className="ml-auto opacity-50">
                    <Icon name="check" size={16} strokeWidth={2.6} className="text-brand-light" />
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Analyze, Act and Grow are three moments on one line, not three
                pictures — so the block draws the line. */}
            <motion.div variants={riseIn} className="mt-[1.6rem]">
              <ThreeMoves />
            </motion.div>

            <div className="mt-[1.6rem] border-t border-white/10 pt-[1.2rem] text-[0.82rem] font-semibold text-white/50">
              Three steps to decide what happens next.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Ways;
