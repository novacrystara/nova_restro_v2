"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { CHAIN_NODES } from "@/lib/data";
import { EASE, riseIn, viewportOnce } from "@/lib/motion";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Placeholder from "@/components/ui/Placeholder";
import Icon from "@/components/ui/Icon";

const KNOWS = ["The kitchen knows.", "The waiter knows.", "The manager knows."];

export function System() {
  return (
    <section id="system" className="sec relative overflow-hidden scroll-mt-24 border-y border-edge bg-surface">
      <div className="glow glow-brand absolute left-1/2 top-[-220px] h-[520px] w-[700px] -translate-x-1/2 opacity-40" />

      <div className="wrap relative">
        <div className="mx-auto mb-[clamp(36px,5vw,64px)] max-w-[780px] text-center">
          <Reveal>
            <Eyebrow>06 — One connected system</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h1 mt-[1.1rem]">
              Nova-Restro is Your <span className="hl">Restaurant Operating System</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="t-h3 mt-[1.6rem] font-semibold text-body">One order. Zero chasing.</h3>
          </Reveal>
        </div>

        {/*
          The connected-system chain — the one place on the page that stays
          fully rounded: circular nodes, a hairline rail, a brand pulse running
          the length of it. One order, moving through six hands.
        */}
        <Reveal>
          <div className="relative mt-[clamp(36px,5vw,60px)] overflow-hidden border border-edge bg-canvas p-[clamp(20px,3vw,40px)] shadow-sm">
            <div className="glow glow-brand absolute -top-40 left-1/2 h-[300px] w-[520px] -translate-x-1/2 opacity-[0.16]" />

            <div className="relative mb-[clamp(20px,2.6vw,32px)] flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-3 sm:text-[0.66rem]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping2 rounded-full bg-brand" />
                  <span className="relative h-2 w-2 rounded-full bg-brand" />
                </span>
                One order · live path
              </span>
              <span className="hidden font-mono text-[0.66rem] text-muted sm:block">
                6 handoffs · 0 phone calls
              </span>
            </div>

            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
              className="relative flex flex-col items-stretch sm:flex-row sm:items-start sm:justify-between"
            >
              {CHAIN_NODES.map((n, i) => (
                <Fragment key={n.label}>
                  <motion.li
                    variants={riseIn}
                    className="group relative flex flex-none items-center gap-4 sm:flex-col sm:gap-[0.65rem] sm:px-1"
                  >
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="grid h-[54px] w-[54px] flex-none place-items-center rounded-full border-[1.5px] border-brand-deep/25 bg-brand-wash text-brand-deep shadow-[0_10px_24px_-14px_rgba(234,88,12,.7)] transition-colors duration-300 group-hover:border-brand-deep group-hover:bg-brand group-hover:text-white sm:h-[66px] sm:w-[66px]"
                    >
                      <Icon name={n.icon} size={22} strokeWidth={1.9} className="sm:hidden" />
                      <Icon name={n.icon} size={25} strokeWidth={1.9} className="hidden sm:block" />
                    </motion.span>

                    <span className="min-w-0 sm:text-center">
                      <b className="block whitespace-nowrap text-[0.9rem] font-bold tracking-[-0.02em] sm:text-[0.82rem]">
                        {n.label}
                      </b>
                      <span className="block whitespace-nowrap text-[0.75rem] text-muted sm:text-[0.7rem]">
                        {n.note}
                      </span>
                    </span>
                  </motion.li>

                  {i < CHAIN_NODES.length - 1 && (
                    <span
                      aria-hidden
                      // flex-1 from sm up: the chain spans the panel instead of
                      // huddling in the middle of it
                      className="relative my-1 ml-[26px] h-[22px] w-[2px] flex-none overflow-hidden rounded-full bg-edge-2 sm:my-0 sm:ml-0 sm:mt-[32px] sm:h-[2px] sm:w-auto sm:min-w-[14px] sm:flex-1"
                    >
                      <span className="absolute inset-0 h-[40%] w-full animate-flowY rounded-full bg-[linear-gradient(180deg,transparent,var(--brand),transparent)] sm:h-full sm:w-[40%] sm:animate-flow sm:bg-[linear-gradient(90deg,transparent,var(--brand),transparent)]" />
                    </span>
                  )}
                </Fragment>
              ))}
            </motion.ol>
          </div>
        </Reveal>

        <RevealGroup className="mt-[clamp(40px,6vw,72px)] grid gap-3.5 md:grid-cols-3">
          {KNOWS.map((k) => (
            <motion.div
              key={k}
              variants={riseIn}
              className="flex items-center gap-[0.9rem] rounded-none border border-edge bg-canvas p-[1.6rem]"
            >
              <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-full bg-brand">
                <Icon name="check" size={15} strokeWidth={3.2} className="text-white" />
              </span>
              <b className="text-[1.05rem] font-bold tracking-[-0.025em]">{k}</b>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-4 rounded-none bg-ink p-[1.8rem] text-center text-[clamp(1.05rem,2vw,1.6rem)] font-extrabold tracking-[-0.03em] text-white">
            Everyone knows what needs to happen next.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default System;
