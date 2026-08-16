"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MANIFESTO_LINES } from "@/lib/data";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

/**
 * One manifesto line. Deliberately static — no scroll-linked fading — so the
 * whole list reads as one solid block. The closing line carries the brand
 * colour, tying it to the promise directly underneath.
 */
function Line({ text, last }: { text: string; last?: boolean }) {
  return (
    <p
      className={cn(
        "text-[clamp(1.3rem,3vw,2.35rem)] font-extrabold leading-[1.24] tracking-[-0.04em]",
        last ? "text-brand-light" : "text-white",
      )}
    >
      {text}
    </p>
  );
}

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden bg-ink py-[clamp(58px,7.6vw,112px)] text-white"
    >
      <div className="bg-dots bg-dots-light opacity-55" />
      <div className="glow glow-brand absolute -bottom-80 left-1/2 h-[620px] w-[820px] -translate-x-1/2 opacity-30" />

      {/* ---- the manifesto, with the owner beside it ----
           The photograph bleeds off the right edge and dissolves into the ink
           on its left, so the lines read over flat colour while the room stays
           crisp — the same treatment the fold uses over canvas. */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: EASE }}
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block xl:w-[66%]"
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.2) 22%, rgba(0,0,0,.72) 42%, #000 60%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,.2) 22%, rgba(0,0,0,.72) 42%, #000 60%)",
            }}
          >
            <Image
              src="/owner-guests.webp"
              alt="A restaurant owner standing in the doorway of their own room, talking to two guests on their way in"
              fill
              // display:none below lg, where the framed copy below carries the
              // photograph instead — so no phone ever pays for this one
              sizes="(min-width: 1280px) 66vw, (min-width: 1024px) 62vw, 5vw"
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoQAAgABABsJZQAAujdUFftwAD+8yBBN+ZFOJMBRGXv+ciUoPJV9JxtCsGs35RAAAA="
              // pinned to the right edge on purpose: the guests run to the very
              // edge of the frame, so any crop has to come off the left — and
              // the left of this photograph is the dark cladding, which is
              // exactly what the gradient was going to swallow anyway
              className="object-cover object-[100%_42%]"
            />
            {/* three ink washes: the seam, the top of the block, and the floor */}
            <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-ink via-ink/55 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-[26%] bg-gradient-to-b from-ink to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-ink to-transparent" />
          </div>
        </motion.div>

        <div className="wrap relative">
          {/* the photograph reaches further in now, so the column tightens to
              stay clear of it until there is room again at xl */}
          <div className="max-w-[900px] lg:max-w-[500px] xl:max-w-[600px]">
            <Reveal>
              <Eyebrow onDark>10 — Why you started</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h1 mt-[1.2rem] text-white">
                You didn&apos;t build a restaurant to manage a POS.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="lead mt-[1.4rem] text-white/60">
                You built it to create something people love.
              </p>
            </Reveal>

            <div className="mt-[2.4rem] grid gap-[0.1rem]">
              {MANIFESTO_LINES.map((l, i) => (
                <Line key={l} text={l} last={i === MANIFESTO_LINES.length - 1} />
              ))}
            </div>

            <div className="my-[clamp(40px,5vw,60px)] h-px bg-white/[0.12]" />

            <Reveal>
              <p className="max-w-[24ch] text-[clamp(1.1rem,2.2vw,1.75rem)] font-bold leading-[1.35] tracking-[-0.03em] text-brand-light">
                Nova-Restro gives you the visibility to step back —{" "}
                <span className="text-white">without losing control.</span>
              </p>
            </Reveal>

            {/* below lg the photograph can't sit beside the copy, so it takes
                its own frame underneath and fades into the floor instead */}
            <Reveal delay={0.06}>
              <figure className="relative mt-[clamp(36px,5vw,56px)] overflow-hidden border border-white/10 lg:hidden">
                <div className="relative aspect-[16/10] w-full sm:aspect-[2/1]">
                  <Image
                    src="/owner-guests.webp"
                    alt="A restaurant owner standing in the doorway of their own room, talking to two guests on their way in"
                    fill
                    sizes="92vw"
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoQAAgABABsJZQAAujdUFftwAD+8yBBN+ZFOJMBRGXv+ciUoPJV9JxtCsGs35RAAAA="
                    // same reasoning as the desktop frame — hold the right edge
                    className="object-cover object-[88%_45%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-ink to-transparent" />
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="wrap relative">
        <div className="relative mt-[clamp(48px,7vw,96px)] text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,6.5vw,5.5rem)] font-black leading-[0.98] tracking-[-0.05em] text-white">
              Run Your Restaurant.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2rem,6.5vw,5.5rem)] font-black leading-[0.98] tracking-[-0.05em] text-brand-light">
              Don&apos;t Let Your Restaurant Run You.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-[2.6rem]">
              <Button href="#action" variant="primary" size="lg">
                See Nova-Restro in Action
                <Icon
                  name="arrowRight"
                  size={17}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
                />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Manifesto;
