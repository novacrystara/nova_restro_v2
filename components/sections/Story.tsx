"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { STORY_STEPS, type StoryStep } from "@/lib/data";
import { EASE } from "@/lib/motion";
import useViewportWidth from "@/lib/useViewportWidth";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Corners from "@/components/ui/Corners";
import Icon from "@/components/ui/Icon";

/** The photograph plus its caption — the stage on desktop, inline on a phone. */
function Frame({ step, className }: { step: StoryStep; className?: string }) {
  return (
    <figure className={cn("relative overflow-hidden border border-edge bg-canvas-2", className)}>
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={step.photo}
          alt={step.alt}
          fill
          sizes="(min-width: 1024px) 46vw, 92vw"
          placeholder="blur"
          blurDataURL={step.blur}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-[0.9rem] sm:p-[1.1rem]">
          <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-ico-sm bg-white/[0.16] text-white backdrop-blur-[6px]">
            <Icon name={step.icon} size={15} strokeWidth={2.2} />
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/80 sm:text-[0.66rem]">
            {step.n} — {step.tag}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * The escalation rule, as an alarm chip. Amber is the site's "a person is
 * waiting" colour, and it is the only thing on this section that blinks — so
 * it reads as the system raising its hand, not as decoration.
 */
function AlarmChip({ text }: { text: string }) {
  return (
    <span className="ml-auto inline-flex flex-none items-center gap-[0.5rem] whitespace-nowrap border border-gold/45 bg-gold-wash px-[0.55rem] py-[0.3rem] shadow-xs">
      <span className="relative grid h-[15px] w-[15px] flex-none place-items-center text-gold-deep">
        <Icon name="bell" size={13} strokeWidth={2.4} className="animate-beep" />
        <span
          aria-hidden
          className="absolute -right-[2px] -top-[2px] h-[5px] w-[5px] rounded-full bg-destructive"
        >
          <span className="absolute inset-0 animate-ping2 rounded-full bg-destructive/70" />
        </span>
      </span>
      <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.08em] text-gold-deep sm:text-[0.6rem] sm:tracking-[0.1em]">
        {text}
      </span>
    </span>
  );
}

function Step({
  step,
  index,
  active,
  desktop,
  onEnter,
}: {
  step: StoryStep;
  index: number;
  active: boolean;
  desktop: boolean;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // a narrow band across the middle of the window decides which step is "on"
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const dimmed = desktop && !active;

  return (
    <motion.div
      ref={ref}
      initial={false}
      // depth of field: whatever you are not reading falls out of focus
      animate={{
        opacity: dimmed ? 0.5 : 1,
        filter: dimmed ? "blur(3.5px)" : "blur(0px)",
        scale: dimmed ? 0.985 : 1,
      }}
      transition={{ duration: 0.55, ease: EASE }}
      className={cn(
        "group relative origin-left transition-colors duration-500",
        // the frosted card only exists where the scroll-focus does
        desktop &&
          "rounded-none border p-[1.6rem_1.8rem] backdrop-blur-xl lg:p-[1.8rem_2rem]",
        desktop && active
          ? "border-white/70 bg-surface/70 shadow-[0_24px_60px_-32px_rgba(11,20,32,.28)]"
          : desktop
            ? "border-transparent bg-transparent"
            : "",
      )}
    >
      {/* the brand marks the step you are on — the same corner brackets the
          outlet tiles draw on hover, held open for the step you're reading */}
      {desktop && <Corners active={active} className="hidden lg:block" />}

      {/* below lg every step carries its own photograph — no sticky stage, no
          guessing which frame belongs to which line of copy. Stacked on a
          phone, beside the copy on a tablet, gone at lg where the stage takes
          over. */}
      <div className="sm:grid sm:grid-cols-2 sm:items-center sm:gap-[clamp(20px,3vw,32px)] lg:block">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-[0.72rem] font-bold tracking-[0.12em] text-brand-deep">
              {step.n}
            </span>
            <span aria-hidden className="h-px flex-1 bg-edge lg:hidden" />
            {step.alert && <AlarmChip text={step.alert} />}
          </div>

          <h3 className="mt-[0.7rem] text-[clamp(1.35rem,3.1vw,2.35rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">
            {step.title}
          </h3>
          <p className="mt-[0.7rem] max-w-[42ch] text-[0.92rem] leading-[1.6] text-body">
            {step.copy}
          </p>
        </div>

        <Frame step={step} className="mt-[1.4rem] shadow-sm sm:mt-0 lg:hidden" />
      </div>
    </motion.div>
  );
}

export function Story() {
  const [active, setActive] = useState(0);
  const vw = useViewportWidth();
  const reduced = useReducedMotion();
  const desktop = vw >= 1024 && !reduced;

  const onEnter = useCallback((i: number) => setActive(i), []);

  return (
    <section id="story" className="sec relative bg-canvas-2">
      {/* the glow clips itself: overflow-hidden on the section would make it the
          scrollport for the sticky stage below and stop it pinning */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow glow-brand absolute -right-32 top-[12%] h-[420px] w-[520px] opacity-[0.22]" />
      </div>

      <div className="wrap relative">
        <div className="mb-[clamp(36px,5vw,64px)] max-w-[720px]">
          <Reveal>
            <Eyebrow>The whole thing, in five moves</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h2 mt-[1.1rem]">Big statement. Beautiful UI. Nothing else in the way.</h2>
          </Reveal>
        </div>

        <div className="grid items-start gap-[clamp(28px,4vw,72px)] lg:grid-cols-[1fr_1.02fr]">
          {/* the stage — desktop only, pinned beside the copy */}
          <div className="sticky top-24 order-2 hidden lg:block">
            <div className="relative overflow-hidden rounded-none border border-edge bg-surface/80 p-4 shadow-lg backdrop-blur-xl">
              {/* all five frames are mounted and cross-faded: they load together
                  as the section arrives, so stepping through never waits */}
              <div className="relative">
                {STORY_STEPS.map((s, i) => (
                  <motion.div
                    key={s.n}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={cn(i === active ? "relative" : "pointer-events-none absolute inset-0")}
                  >
                    <Frame step={s} />
                  </motion.div>
                ))}
              </div>

              {/* progress rail */}
              <div className="mt-4 flex gap-1.5">
                {STORY_STEPS.map((s, i) => (
                  <button
                    key={s.n}
                    type="button"
                    aria-label={`Step ${s.n} — ${s.tag}`}
                    onClick={() => setActive(i)}
                    className="h-[3px] flex-1 rounded-none bg-edge-2"
                  >
                    <motion.span
                      className="block h-full bg-brand"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      style={{ transformOrigin: "left" }}
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* the five moves */}
          <div className="order-1 grid gap-[clamp(40px,6vw,72px)] lg:gap-[clamp(56px,8vw,104px)] lg:py-[8vh]">
            {STORY_STEPS.map((s, i) => (
              <Step
                key={s.n}
                step={s}
                index={i}
                active={active === i}
                desktop={desktop}
                onEnter={onEnter}
              />
            ))}
          </div>
        </div>

        <Reveal>
          <div className="relative mt-[clamp(48px,7vw,90px)] overflow-hidden rounded-none bg-ink px-6 py-[clamp(36px,5vw,64px)] text-center">
            <div className="bg-dots bg-dots-brand absolute inset-0 opacity-30" />
            <h3 className="t-h1 relative text-white">
              One restaurant.
              <br />
              <span className="text-brand-light">One connected system.</span>
            </h3>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Story;
