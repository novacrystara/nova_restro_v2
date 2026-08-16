"use client";

import { motion } from "framer-motion";
import { TALK_QUESTIONS } from "@/lib/data";
import { riseIn, viewportOnce } from "@/lib/motion";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";

/** Full class strings per tone — Tailwind needs them literal. */
/* Phones have no hover, so the answer panel ships already filled with navy —
   the light-panel/fill-on-hover treatment starts at sm. */
const TONE: Record<string, { tile: string; dot: string; value: string }> = {
  brand: {
    tile: "bg-brand-wash text-brand-deep",
    dot: "bg-brand-light sm:bg-brand sm:group-hover:bg-brand-light",
    value: "text-brand-light sm:text-brand-deep sm:group-hover:text-brand-light",
  },
  success: {
    tile: "bg-success-wash text-success-deep",
    dot: "bg-success-light sm:bg-success sm:group-hover:bg-success-light",
    value: "text-success-light sm:text-success-deep sm:group-hover:text-success-light",
  },
  gold: {
    tile: "bg-gold-wash text-gold-deep",
    dot: "bg-gold-light sm:bg-gold sm:group-hover:bg-gold-light",
    value: "text-gold-light sm:text-gold-deep sm:group-hover:text-gold-light",
  },
  danger: {
    tile: "bg-destructive-wash text-destructive",
    dot: "bg-destructive-light sm:bg-destructive sm:group-hover:bg-destructive-light",
    value: "text-destructive-light sm:text-destructive sm:group-hover:text-destructive-light",
  },
};

export function Talk() {
  return (
    <section id="talk" className="sec relative overflow-hidden border-y border-edge bg-surface">
      <div className="wrap">
        <div className="max-w-[820px]">
          <Reveal>
            <Eyebrow>02 — It answers back</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h1 mt-[1.1rem]">Your Restaurant can too&nbsp;talk</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-[1.4rem] max-w-[640px]">
              No need to make phone calls, or wait for your manager&apos;s response, or the end of the
              day reports.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-5">
          {TALK_QUESTIONS.map((q) => {
            const tone = TONE[q.tone];
            return (
              <SpotlightCard key={q.n} lift={false} className="flex flex-col sm:min-h-[240px]">
                <div className="relative flex flex-1 flex-col p-[1.15rem_1.2rem_1.05rem] sm:p-[1.45rem_1.35rem_1.25rem]">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-[36px] w-[36px] flex-none place-items-center rounded-ico-sm ${tone.tile}`}
                    >
                      <Icon name={q.icon} size={17} strokeWidth={2.2} />
                    </span>
                    <span className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] text-muted">
                      {q.n}
                    </span>
                    <span className="ml-auto h-px flex-1 bg-edge sm:hidden" />
                  </div>

                  <p className="mt-[0.95rem] text-[1.02rem] font-semibold leading-[1.34] tracking-[-0.018em] text-ink sm:mt-[1.15rem] sm:text-[1.05rem]">
                    {q.q}
                  </p>

                  {/* "…thinking" — fills the wait between question and answer */}
                  <span className="mt-auto hidden items-center gap-[5px] pt-[1.2rem] sm:flex">
                    {[0, 1, 2].map((d) => (
                      <i
                        key={d}
                        style={{ animationDelay: `${d * 0.18}s` }}
                        className="block h-[4px] w-[4px] rounded-full bg-edge-2 transition-colors duration-300 group-hover:animate-pulse group-hover:bg-brand/60"
                      />
                    ))}
                  </span>
                </div>

                {/* the system answering — a light panel that fills with deep navy
                    sliding up from its own bottom edge on hover */}
                <div className="relative mt-auto overflow-hidden border-t border-edge bg-ink px-[1.25rem] py-[0.9rem] sm:bg-canvas-2/70 sm:px-[1.35rem] sm:py-[1rem]">
                  <span className="absolute inset-0 origin-bottom bg-ink transition-transform duration-[550ms] ease-smooth sm:scale-y-0 sm:group-hover:scale-y-100" />

                  <span className="relative mb-[0.35rem] flex items-center gap-[0.4rem] text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 sm:text-muted sm:group-hover:text-white/45">
                    <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${tone.dot}`} />
                    Answer
                  </span>
                  <span className="relative flex flex-wrap items-baseline gap-x-[0.5rem] gap-y-1">
                    <b className="text-[0.95rem] font-bold tracking-[-0.015em] text-white transition-colors duration-300 sm:text-ink sm:group-hover:text-white">
                      {q.answerBold}
                    </b>
                    <span className={`text-[0.8rem] font-semibold transition-colors duration-300 ${tone.value}`}>
                      {q.answer}
                    </span>
                  </span>
                </div>
              </SpotlightCard>
            );
          })}
        </RevealGroup>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={riseIn}
          className="relative mt-12 flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-none bg-ink p-6 text-white sm:p-[2.4rem_2.6rem]"
        >
          <div className="bg-dots bg-dots-brand absolute inset-0 opacity-[0.12]" />
          <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

          {/* radar: the system sweeping the estate, centred on the 24×7 block */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-160px] top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 lg:block xl:right-[-90px]"
          >
            <div className="glow glow-brand absolute inset-[18%] opacity-[0.28]" />
            {[1, 0.76, 0.54, 0.34].map((s) => (
              <span
                key={s}
                style={{ transform: `scale(${s})` }}
                className="absolute inset-0 rounded-full border border-brand-light/[0.13]"
              />
            ))}
            <span className="absolute inset-0 animate-radar rounded-full border border-brand-light/[0.22]" />
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-light/[0.14] to-transparent" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-light/[0.14] to-transparent" />
          </div>

          <div className="relative max-w-[46ch]">
            <span className="mb-[1.1rem] inline-flex items-center gap-[0.5rem] border border-white/10 bg-white/[0.04] px-[0.7rem] py-[0.3rem] text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/55">
              <span className="relative h-1.5 w-1.5 rounded-full bg-brand-light">
                <span className="absolute -inset-1 animate-ping2 rounded-full border border-brand-light/60" />
              </span>
              Always on
            </span>
            <h3 className="t-h3 text-white">
              That&apos;s Nova-Restro. Your restaurant operating system which works 24×7 on your behalf.
            </h3>
            <p className="mt-[0.7rem] max-w-[44ch] text-[0.95rem] text-white/60">
              It watches every outlet, every table, every order and every customer — so you never have
              to ask again.
            </p>
          </div>

          <div className="plan-border relative w-full flex-none bg-white/[0.035] px-[2rem] py-[1.5rem] text-center sm:w-auto">
            <b className="block text-[clamp(2.4rem,4vw,3rem)] font-black leading-none tracking-[-0.04em] text-brand-light">
              24×7
            </b>
            <span className="mt-[0.55rem] block text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/55">
              Always watching
            </span>
            <span className="mx-auto mt-[0.9rem] block h-px w-10 bg-white/15" />
            <span className="mt-[0.7rem] block font-mono text-[0.6rem] tracking-[0.1em] text-white/35">
              5 outlets · 0 blind spots
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Talk;
