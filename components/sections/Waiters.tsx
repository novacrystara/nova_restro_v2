"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FLOW_STEPS } from "@/lib/data";
import { riseIn, viewportOnce } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";

export function Waiters() {
  return (
    <section id="waiters" className="sec relative overflow-hidden bg-canvas">
      <div className="wrap relative">
        <Reveal>
          <Eyebrow>05 — Give the time back</Eyebrow>
        </Reveal>

        <div className="mt-[1.2rem] grid gap-[0.2rem]">
          <Reveal delay={0.08}>
            <h2 className="display">Your tables take the order.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 className="display text-brand-deep">Your waiters take care of the customer.</h2>
          </Reveal>
        </div>

        {/* ---- the journey, one frame per step ----
             The rail across the top carries the step numbers; each column drops
             from its number into the photograph of that exact moment. */}
        <div className="mt-[clamp(40px,5vw,68px)]">
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-[clamp(12px,1.4vw,22px)]"
          >
            {FLOW_STEPS.map((s, i) => (
              <motion.li key={s.label} variants={riseIn} className="group relative flex flex-col">
                {/* each step carries the rail as far as the next node, so the
                    five columns read as one continuous run */}
                {i < FLOW_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-[5px] hidden h-px w-[calc(100%+clamp(12px,1.4vw,22px))] bg-edge lg:block"
                  />
                )}
                <span
                  aria-hidden
                  className="relative hidden h-[11px] w-[11px] rounded-full border-2 border-brand bg-canvas transition-colors duration-300 group-hover:bg-brand lg:block"
                />

                <div className="flex items-center gap-4 lg:mt-[1.5rem] lg:block">
                  <span className="text-[clamp(1.7rem,2.3vw,2.15rem)] font-black leading-[0.85] tracking-[-0.055em] text-ink transition-colors duration-300 group-hover:text-brand-deep">
                    <span className="text-ink/20 transition-colors duration-300 group-hover:text-brand/35">
                      0
                    </span>
                    {i + 1}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-edge lg:hidden" />
                </div>

                <b className="mt-[0.75rem] block text-[1.05rem] font-bold tracking-[-0.03em] lg:mt-[0.9rem]">
                  {s.label}
                </b>
                <p className="mt-[0.4rem] text-[0.82rem] leading-[1.55] text-body">{s.note}</p>

                {/* the moment itself. mt-auto: the notes run to different
                    lengths, and the frames still have to line up across the strip */}
                <div className="mt-[1.2rem] lg:mt-auto lg:pt-[1.4rem]">
                  <figure className="relative overflow-hidden border border-edge bg-canvas-2 shadow-sm transition-shadow duration-500 group-hover:shadow-md">
                    <div className="relative aspect-[4/3] w-full sm:aspect-[16/11] lg:aspect-[9/14]">
                      <Image
                        src={s.photo}
                        alt={s.alt}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 46vw, 92vw"
                        placeholder="blur"
                        blurDataURL={s.blur}
                        // the wide phone/tablet crop keeps the subject of each
                        // frame in shot; the tall lg frame barely crops at all
                        style={{ "--crop": s.crop } as React.CSSProperties}
                        className="object-cover [object-position:var(--crop)] transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06] lg:[object-position:50%_50%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                      {/* the brand only lights up on the frame you're looking at */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-smooth group-hover:scale-x-100"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-[0.9rem]">
                        <span className="grid h-[28px] w-[28px] flex-none place-items-center rounded-ico-sm bg-white/[0.14] text-white backdrop-blur-[6px]">
                          <Icon name={s.icon} size={15} strokeWidth={2.2} />
                        </span>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/75">
                          Step {String(i + 1).padStart(2, "0")}
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {/* ---- what the old way actually costs ----
             A ledger, not a counter: the number is worth more when you can see
             the three lines it came from. */}
        <Reveal>
          <div className="relative mt-[clamp(40px,5vw,68px)] overflow-hidden border border-edge bg-surface shadow-sm">
            <div className="glow glow-brand absolute -left-28 -top-36 h-[340px] w-[340px] opacity-[0.28]" />

            <div className="relative grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              {/* the total */}
              <div className="flex flex-col justify-between gap-6 border-b border-edge p-[clamp(24px,3.4vw,44px)] lg:border-b-0 lg:border-r">
                <Eyebrow>The arithmetic</Eyebrow>
                <div>
                  <div className="flex items-baseline gap-[0.35rem]">
                    <span className="text-[clamp(3.6rem,8vw,6.4rem)] font-black leading-[0.82] tracking-[-0.06em] text-ink">
                      500
                    </span>
                    <span className="text-[clamp(1rem,1.6vw,1.3rem)] font-extrabold tracking-[-0.02em] text-brand-deep">
                      min
                    </span>
                  </div>
                  <p className="mt-[0.9rem] max-w-[26ch] text-[0.9rem] leading-[1.5] text-body">
                    of waiter time spent taking orders and chasing the kitchen — every single
                    service day.
                  </p>
                  <span className="mt-[1.1rem] inline-flex items-center gap-2 border border-edge bg-canvas px-[0.7rem] py-[0.4rem] font-mono text-[0.72rem] font-semibold text-ink-3">
                    <Icon name="clock" size={13} strokeWidth={2.2} className="text-brand-deep" />
                    8 h 20 m
                  </span>
                </div>
              </div>

              {/* the working */}
              <div className="p-[clamp(24px,3.4vw,44px)]">
                <p className="text-[clamp(1.02rem,1.7vw,1.35rem)] font-semibold leading-[1.5] tracking-[-0.02em] text-ink">
                  With just 50 orders a day, manual order-taking and chasing quietly eats a full
                  shift of your floor team&apos;s time.
                </p>

                <dl className="mt-[1.6rem] border-t border-edge">
                  {[
                    { k: "Orders taken by hand", v: "50", sub: "a day" },
                    { k: "Walked to the table & back", v: "6 min", sub: "each" },
                    { k: "Chasing the kitchen for updates", v: "4 min", sub: "each" },
                  ].map((r) => (
                    <div
                      key={r.k}
                      className="flex items-baseline justify-between gap-4 border-b border-edge py-[0.85rem]"
                    >
                      <dt className="text-[0.85rem] text-body">{r.k}</dt>
                      <dd className="flex flex-none items-baseline gap-[0.35rem]">
                        <span className="font-mono text-[0.95rem] font-bold text-ink">{r.v}</span>
                        <span className="text-[0.72rem] text-muted">{r.sub}</span>
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-4 bg-brand-mist px-[0.9rem] py-[0.95rem]">
                    <dt className="text-[0.85rem] font-bold text-ink">Lost, every day</dt>
                    <dd className="font-mono text-[1.05rem] font-extrabold tracking-[-0.02em] text-brand-deep">
                      500 min
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 rounded-none bg-ink p-[1.5rem_1.4rem] text-[clamp(1rem,1.6vw,1.28rem)] font-bold leading-[1.4] tracking-[-0.025em] text-white sm:p-[1.5rem_1.7rem]">
            Give that time back to your waiters and let them build relationships with your customers
            which in turn increases the <em className="not-italic text-brand-light">customer satisfaction score</em>{" "}
            and <em className="not-italic text-brand-light">revenue</em>.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Waiters;
