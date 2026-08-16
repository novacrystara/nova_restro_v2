"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FLOOR_TABLES, NOTIFICATIONS, type TableState } from "@/lib/data";
import { EASE, riseIn, viewportOnce } from "@/lib/motion";
import useViewportWidth from "@/lib/useViewportWidth";
import { cn } from "@/lib/cn";
import Reveal, { RevealGroup } from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import DemoButton from "@/components/demo/DemoButton";

/* One hue per state, from the `live` palette — see tailwind.config.ts.
   The lit states also carry a soft outer glow, so the eye finds them across
   the whole grid without having to read a single number. */
const TABLE_STYLE: Record<TableState, string> = {
  free: "border-white/[0.08] bg-white/[0.025] text-white/30",
  seat: "border-live-seated/30 bg-live-seated/[0.10] text-live-seated",
  alert:
    "border-live-attention/55 bg-live-attention/[0.14] text-live-attention shadow-[0_0_22px_-6px_rgba(251,191,36,.55)]",
  ready:
    "border-live-ready/60 bg-live-ready/[0.14] text-live-ready shadow-[0_0_22px_-6px_rgba(52,211,153,.55)]",
  bill: "border-live-bill/55 bg-live-bill/[0.14] text-live-bill shadow-[0_0_22px_-6px_rgba(56,189,248,.55)]",
};

const PULSING: TableState[] = ["alert", "ready", "bill"];

/** Alert-card accents: the icon tile, the hairline rule and the hover edge. */
const NOTIF_TONE: Record<string, { tile: string; bar: string; edge: string }> = {
  attention: {
    tile: "bg-live-attention/[0.16] text-live-attention ring-1 ring-live-attention/30",
    bar: "bg-live-attention",
    edge: "hover:border-live-attention/45",
  },
  ready: {
    tile: "bg-live-ready/[0.16] text-live-ready ring-1 ring-live-ready/30",
    bar: "bg-live-ready",
    edge: "hover:border-live-ready/45",
  },
  bill: {
    tile: "bg-live-bill/[0.16] text-live-bill ring-1 ring-live-bill/30",
    bar: "bg-live-bill",
    edge: "hover:border-live-bill/45",
  },
  pass: {
    tile: "bg-live-pass/[0.16] text-live-pass ring-1 ring-live-pass/30",
    bar: "bg-live-pass",
    edge: "hover:border-live-pass/45",
  },
};

const LEGEND = [
  { color: "rgba(255,255,255,.28)", label: "Free" },
  { color: "#9CBE8E", label: "Seated" },
  { color: "#FBBF24", label: "Needs attention" },
  { color: "#34D399", label: "Food ready" },
  { color: "#38BDF8", label: "Waiting for bill" },
];

/* How the room is doing right now. Counted off the map itself, so the readout
   can never drift away from the tiles underneath it. */
const OCCUPIED = FLOOR_TABLES.filter((t) => t !== "free").length;
const NEEDS_ACTION = FLOOR_TABLES.filter((t) => PULSING.includes(t)).length;

const FLOOR_STATS = [
  { k: "Seated", v: `${OCCUPIED} / ${FLOOR_TABLES.length}` },
  { k: "Needs action", v: String(NEEDS_ACTION) },
  { k: "Avg. response", v: "42s" },
];

export function Floor() {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const vw = useViewportWidth();

  /* ---- the ink panel arrives inset and opens to the full window ----
     The mirror of the hero frame, which starts edge-to-edge and narrows.
     Progress runs while the panel's top travels from 90% to 32% of the
     viewport; the copy inside is pinned to a fixed width, so only the dark
     block grows — nothing on it reflows or moves. */
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start 0.9", "start 0.32"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.45 });

  const wide = vw >= 640;
  // phones and reduced-motion hold both ends at full bleed — the panel simply
  // never narrows there, so no stale inline width can outlive a resize
  const narrow = wide && !reduced ? Math.min(vw - 48, Math.round(vw * 0.78)) : vw;
  const width = useTransform(p, [0, 1], [narrow, vw]);
  // content width is a constant, derived from the *narrow* end: it fits inside
  // the panel at every point of the animation and is centred either way
  const contentMax = Math.min(1240, narrow - (wide ? 40 : 0));

  return (
    <section id="floor" className="relative scroll-mt-24">
      <motion.div
        ref={panelRef}
        style={vw > 0 ? { width } : undefined}
        className="sec relative mx-auto overflow-hidden bg-ink text-white [will-change:width]"
      >
        <div className="bg-dots bg-dots-light opacity-50" />
        <div className="glow glow-brand absolute -bottom-60 -left-44 h-[520px] w-[640px] opacity-[0.22]" />

        <div
          className="wrap relative"
          style={vw > 0 ? { maxWidth: contentMax } : undefined}
        >
          <div className="mb-[clamp(36px,5vw,64px)] max-w-[860px]">
            <Reveal>
              <Eyebrow onDark>04 — Intelligent notifications</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="t-h1 mt-[1.1rem] text-white">
                Your manager shouldn&apos;t be a <span className="text-brand-light">human notification system.</span>
              </h2>
            </Reveal>
          </div>

          {/* the columns stretch to a common height — the manager photograph
              takes up whatever the alert feed leaves, so both sides land flush */}
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[clamp(24px,3vw,44px)]">
            {/* Floor map */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={riseIn}
                className="relative overflow-hidden rounded-none border border-white/[0.12] bg-white/[0.035] shadow-[0_30px_70px_-40px_rgba(0,0,0,.9)]"
              >
                {/* a soft top light, so the panel reads as a lit screen */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-white/[0.05] to-transparent"
                />

                <div className="relative flex items-center justify-between border-b border-white/[0.08] px-[1.4rem] py-[1.05rem]">
                  <b className="inline-flex items-center gap-[0.55rem] text-[0.85rem] font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping2 rounded-full bg-live-ready" />
                      <span className="relative h-2 w-2 rounded-full bg-live-ready" />
                    </span>
                    Ground Floor · Live
                  </b>
                  <span className="rounded-none border border-white/[0.1] bg-white/[0.04] px-[0.55rem] py-[0.22rem] font-mono text-[0.68rem] text-white/55">
                    18:42
                  </span>
                </div>

                {/* the room in three numbers, before the map itself */}
                <div className="relative grid grid-cols-3 divide-x divide-white/[0.08] border-b border-white/[0.08]">
                  {FLOOR_STATS.map((s) => (
                    <div key={s.k} className="px-[0.85rem] py-[0.8rem] sm:px-[1.4rem] sm:py-[0.9rem]">
                      {/* one line at every width — a wrapped label would drop
                          this cell's number below its neighbours' */}
                      <div className="whitespace-nowrap text-[0.5rem] font-bold uppercase tracking-[0.08em] text-white/40 sm:text-[0.58rem] sm:tracking-[0.14em]">
                        {s.k}
                      </div>
                      <div className="mt-[0.2rem] text-[0.95rem] font-extrabold tracking-[-0.03em] sm:text-[1.05rem]">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative p-[1.4rem]">
                  <div className="mb-[1.1rem] flex flex-wrap gap-x-4 gap-y-2 text-[0.68rem] text-white/55">
                    {LEGEND.map((l) => (
                      <span key={l.label} className="inline-flex items-center gap-[0.35rem]">
                        <i
                          className="h-2 w-2 rounded-full"
                          style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }}
                        />
                        {l.label}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6">
                    {FLOOR_TABLES.map((state, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.45, ease: EASE, delay: i * 0.018 }}
                        whileHover={{ scale: 1.07 }}
                        className={cn(
                          "relative grid aspect-square place-items-center rounded-none border font-mono text-[0.7rem] font-bold",
                          TABLE_STYLE[state],
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                        {PULSING.includes(state) && (
                          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulseRing rounded-full bg-current" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* the same room, for real — the map above is describing this */}
              <Reveal delay={0.1}>
                <figure className="relative mt-3.5 overflow-hidden border border-white/[0.12]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src="/restro_top_angle.webp"
                      alt="A full dining room mid-service, seen from above"
                      fill
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoQAAkAA4BaJQBOgCHw9XCl82AA/kVX6f1dbVhIT39jki8SatdaBYHjbVdqHOqAAAA="
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-[0.55rem] p-[1rem_1.15rem] text-[0.72rem] font-semibold text-white/75">
                    <Icon name="building" size={14} strokeWidth={2.2} className="text-brand-light" />
                    24 tables · one screen · updated every second
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            {/* Alerts */}
            <div className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/45">
                  Live alerts
                </span>
                <span className="font-mono text-[0.65rem] text-white/35">
                  {NOTIFICATIONS.length} open
                </span>
              </div>

              <RevealGroup className="grid gap-3">
                {NOTIFICATIONS.map((n) => {
                  const tone = NOTIF_TONE[n.tone];
                  return (
                    <motion.div
                      key={n.title + n.sub}
                      variants={riseIn}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className={cn(
                        "relative flex items-center gap-[0.95rem] overflow-hidden rounded-none border border-white/10 bg-white/5 p-[1.05rem_1.15rem] pl-[1.35rem] backdrop-blur-[8px] transition-colors duration-300 hover:bg-white/[0.07]",
                        tone.edge,
                      )}
                    >
                      {/* the state, readable before a single word is */}
                      <span
                        aria-hidden
                        className={cn("absolute inset-y-0 left-0 w-[3px]", tone.bar)}
                      />
                      <span
                        className={cn(
                          "grid h-[42px] w-[42px] flex-none place-items-center rounded-ico",
                          tone.tile,
                        )}
                      >
                        <Icon name={n.icon} size={20} />
                      </span>
                      <div className="min-w-0">
                        <b className="block text-[0.95rem] font-bold tracking-[-0.02em]">{n.title}</b>
                        <span className="mt-[0.15rem] block text-[0.8rem] text-white/55">{n.sub}</span>
                      </div>
                      <span className="ml-auto flex-none rounded-none border border-white/[0.1] px-[0.45rem] py-[0.15rem] font-mono text-[0.66rem] text-white/45">
                        {n.ago}
                      </span>
                    </motion.div>
                  );
                })}
              </RevealGroup>

              {/* the alert as the manager actually receives it */}
              <Reveal delay={0.12} className="mt-3 flex flex-1 flex-col">
                <figure className="relative flex flex-1 overflow-hidden border border-white/[0.12]">
                  <div className="relative min-h-[240px] w-full sm:min-h-[300px] lg:min-h-0">
                    <Image
                      src="/manager_table_12.webp"
                      alt="A floor manager reading a Nova-Restro alert — Table 12, waiting for attention — on a tablet during service"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoQAAsAA4BaJYwCdADw3LiTgAD8eSH0gtkyi056LB01x9inobjNf035QUiiuxnYAAA="
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-[0.55rem] p-[1rem_1.15rem] text-[0.72rem] font-semibold text-white/75">
                    <span className="h-[6px] w-[6px] flex-none rounded-full bg-live-attention shadow-[0_0_8px_#FBBF24]" />
                    Told, not asked — the floor comes to the manager
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <div className="mt-[clamp(40px,5vw,64px)] grid items-center gap-8 border-t border-white/10 pt-[clamp(32px,4vw,48px)] md:grid-cols-[1fr_auto]">
              <h3 className="t-h3 max-w-[26ch] text-white">
                Let Nova-Restro monitor the floor. And, let your manager focus on{" "}
                <span className="text-brand-light">improved customer satisfaction and Revenue.</span>
              </h3>
              <DemoButton variant="primary" size="md">
                Book a Demo
                <Icon
                  name="arrowRight"
                  size={17}
                  strokeWidth={2.4}
                  className="transition-transform duration-300 ease-smooth group-hover/btn:translate-x-1"
                />
              </DemoButton>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

export default Floor;
