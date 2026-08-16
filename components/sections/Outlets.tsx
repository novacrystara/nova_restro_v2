"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { OUTLETS } from "@/lib/data";
import { EASE, riseIn, springSoft, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Corners from "@/components/ui/Corners";
import Icon, { type IconName } from "@/components/ui/Icon";

/** Circular icon tiles — the only curved things in this section, by design. */
const TILE: Record<string, string> = {
  brand: "bg-brand-wash text-brand-deep",
  success: "bg-success-wash text-success-deep",
  gold: "bg-gold-wash text-gold-deep",
};

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * The peak-hours delta chip. Rendered twice — beside the label on the floating
 * card, and closing the single-line bar on a phone — so it keeps its own
 * component rather than being copied.
 */
function PeakBadge({
  ok,
  className,
  children,
}: {
  ok: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex-none whitespace-nowrap rounded-none px-[0.35rem] py-[0.1rem] text-[0.58rem] font-bold leading-[1.4] sm:px-[0.4rem] sm:text-[0.6rem]",
        ok ? "bg-success/25 text-success-light" : "bg-destructive/25 text-destructive-light",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
  delta,
  down,
  icon,
  tone,
  outletKey,
}: {
  label: string;
  value: string;
  delta: string;
  down: boolean;
  icon: IconName;
  tone: keyof typeof TILE;
  outletKey: number;
}) {
  // "▲ 12.4% vs last week" → "▲ 12.4%": the tiles are six across, so the
  // comparison window lives in the panel header instead of wrapping in here
  const short = delta.split(" vs ")[0];

  return (
    <div className="group relative flex items-start gap-2.5 bg-surface p-[0.9rem] transition-colors duration-300 hover:bg-brand-mist sm:gap-3 sm:p-[1.2rem]">
      <Corners />
      {/* the icon tiles are dead weight on a phone — the label carries it */}
      <span
        className={cn(
          "hidden h-[40px] w-[40px] flex-none place-items-center rounded-full sm:grid",
          TILE[tone],
        )}
      >
        <Icon name={icon} size={17} strokeWidth={2} />
      </span>

      <div className="min-w-0">
        <div className="text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted sm:text-[0.6rem]">
          {label}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${outletKey}-${label}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            <div className="mt-[0.3rem] text-[clamp(1rem,1.6vw,1.45rem)] font-extrabold tracking-[-0.035em] text-ink">
              {value}
            </div>
            <div
              className={cn(
                "mt-[0.15rem] whitespace-nowrap text-[0.66rem] font-bold",
                down ? "text-destructive" : "text-success-deep",
              )}
            >
              {short}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Weekly revenue — area + line + point markers, redrawn per outlet. */
function WeekChart({ data, ok, outletKey }: { data: number[]; ok: boolean; outletKey: number }) {
  const w = 320;
  const h = 150;
  const padL = 4;
  const padB = 4;
  // round, human ticks — 0/10k/20k… rather than whatever a quartile lands on
  const top = Math.ceil(Math.max(...data) / 10) * 10;
  const step = top > 80 ? 20 : 10;
  const ticks = Array.from({ length: top / step + 1 }, (_, i) => i * step).reverse();

  const pts = data.map((v, i) => ({
    x: padL + (i / (data.length - 1)) * (w - padL * 2),
    y: h - padB - (v / top) * (h - padB - 8),
  }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const stroke = ok ? "var(--brand)" : "var(--destructive)";

  return (
    <div className="mt-4 flex gap-3">
      {/* y axis (HTML — the viewBox is stretched, so text can't live inside it) */}
      <div className="flex w-[34px] flex-none flex-col justify-between py-[2px] text-right font-mono text-[0.6rem] text-muted">
        {ticks.map((t) => (
          <span key={t}>{t ? `${t}k` : "0"}</span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="relative">
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-[150px] w-full">
            <defs>
              <linearGradient id="weekFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity="0.30" />
                <stop offset="60%" stopColor={stroke} stopOpacity="0.09" />
                <stop offset="100%" stopColor={stroke} stopOpacity="0" />
              </linearGradient>
            </defs>

            {ticks.map((t, i) => (
              <line
                key={t}
                x1={0}
                x2={w}
                y1={8 + (i / (ticks.length - 1)) * (h - padB - 8)}
                y2={8 + (i / (ticks.length - 1)) * (h - padB - 8)}
                stroke="#EDEDED"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <motion.path
              key={`fill-${outletKey}`}
              d={`${line} L${pts[pts.length - 1].x},${h} L${pts[0].x},${h} Z`}
              fill="url(#weekFill)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
            {/* a wipe, not a dash-based draw: dasharray is measured in the
                un-stretched space here and leaves gaps in the line */}
            <clipPath id="weekWipe">
              <motion.rect
                key={`wipe-${outletKey}`}
                x={0}
                y={-4}
                height={h + 8}
                initial={{ width: 0 }}
                animate={{ width: w }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </clipPath>
            <path
              d={line}
              clipPath="url(#weekWipe)"
              fill="none"
              stroke={stroke}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* point markers in % so they track the stretched svg */}
          {pts.map((p, i) => (
            <motion.span
              key={`${outletKey}-${i}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.25 + i * 0.06 }}
              style={{ left: `${(p.x / w) * 100}%`, top: `${(p.y / h) * 100}%` }}
              className={cn(
                "absolute -ml-[4px] -mt-[4px] h-[8px] w-[8px] rounded-full border-2 bg-surface",
                ok ? "border-brand" : "border-destructive",
              )}
            />
          ))}
        </div>

        <div className="mt-2 flex justify-between font-mono text-[0.6rem] text-muted">
          {WEEK.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Outlets() {
  const [active, setActive] = useState(0);
  const o = OUTLETS[active];

  return (
    <section id="outlets" className="sec relative overflow-hidden scroll-mt-24">
      <div className="glow glow-brand absolute -right-40 -top-32 h-[500px] w-[600px] opacity-35" />

      <div className="wrap">
        <div className="mb-[clamp(36px,5vw,64px)] max-w-[780px]">
          <Reveal>
            <Eyebrow>03 — Multi-outlet command</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="t-h1 mt-[1.1rem]">
              Use your valuable time to <span className="hl">grow your business</span>
            </h2>
          </Reveal>
        </div>

        {/* Outlet switcher */}
        <Reveal>
          <div className="no-bar relative flex max-w-full gap-1 overflow-x-auto rounded-none border border-edge bg-surface p-1.5 shadow-sm [mask-image:linear-gradient(90deg,#000_86%,transparent)] sm:w-max sm:[mask-image:none]">
            {OUTLETS.map((out, i) => (
              <button
                key={out.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative z-[1] flex-none whitespace-nowrap rounded-none px-[1rem] py-[0.62rem] text-[0.82rem] font-semibold tracking-[-0.01em] transition-colors duration-300 sm:px-[1.35rem] sm:py-[0.72rem] sm:text-[0.875rem]",
                  active === i ? "text-white" : "text-body hover:text-ink",
                )}
              >
                {active === i && (
                  <motion.span
                    layoutId="outlet-tab"
                    transition={springSoft}
                    className="absolute inset-0 -z-[1] rounded-none bg-brand shadow-[0_6px_18px_-8px_rgba(234,88,12,.85)]"
                  />
                )}
                {out.name}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={riseIn}
          className="mt-8 overflow-hidden rounded-none border border-edge bg-surface shadow-md"
        >
          <div className="flex flex-wrap items-center gap-4 border-b border-edge bg-surface-2 p-[1.4rem_1.25rem] sm:p-[1.4rem_1.8rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={o.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="text-[1.15rem] font-extrabold tracking-[-0.03em]">{o.name}</div>
                <div className="text-[0.8rem] text-muted">{o.loc}</div>
              </motion.div>
            </AnimatePresence>

            <span
              className={cn(
                "ml-auto inline-flex items-center gap-[0.45rem] rounded-none border px-[0.8rem] py-[0.35rem] text-[0.75rem] font-bold transition-colors duration-300",
                o.ok
                  ? "border-success/35 bg-success-wash text-success-deep"
                  : "border-gold/40 bg-gold-wash text-gold-deep",
              )}
            >
              <i className="h-[7px] w-[7px] rounded-full bg-current" />
              {o.ok ? "Performing" : "Needs attention"}
            </span>
          </div>

          {/* Metrics */}
          {/* gap-px over an edge-coloured bed gives perfect 1px separators
              at every column count — no nth-child border juggling */}
          <div className="grid grid-cols-2 gap-px border-b border-edge bg-edge md:grid-cols-3 xl:grid-cols-6">
            <Metric outletKey={active} icon="currency" tone="success" label="Revenue" value={o.rev} delta={o.revd} down={!o.ok} />
            <Metric outletKey={active} icon="receipt" tone="brand" label="Orders" value={o.ord} delta={o.ordd} down={!o.ok} />
            <Metric outletKey={active} icon="barChart" tone="gold" label="AOV" value={o.aov} delta={o.aovd} down={!o.ok} />
            <Metric outletKey={active} icon="users" tone="brand" label="Customers" value={o.cus} delta={o.cusd} down={!o.ok} />
            <Metric outletKey={active} icon="clock" tone="success" label="Table Perf." value={o.tbl} delta={o.tbld} down={!o.ok} />

            {/* Trends — sparkline */}
            <div className="group relative flex items-start gap-2.5 bg-surface p-[0.9rem] transition-colors duration-300 hover:bg-brand-mist sm:gap-3 sm:p-[1.2rem]">
              <Corners />
              <span className={cn("hidden h-[40px] w-[40px] flex-none place-items-center rounded-full sm:grid", TILE.gold)}>
                <Icon name="trendUp" size={17} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[0.56rem] font-extrabold uppercase tracking-[0.12em] text-muted sm:text-[0.6rem]">
                  Trends
                </div>
                <div className="mt-[0.5rem] flex h-[24px] items-end gap-[3px]">
                  {o.spark.map((h, i) => (
                    <motion.i
                      key={i}
                      className={cn("flex-1 rounded-none opacity-85", o.ok ? "bg-brand" : "bg-destructive")}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.55, ease: EASE, delay: i * 0.03 }}
                    />
                  ))}
                </div>
                <div
                  className={cn(
                    "mt-[0.3rem] whitespace-nowrap text-[0.62rem] font-bold sm:text-[0.66rem]",
                    o.ok ? "text-success-deep" : "text-destructive",
                  )}
                >
                  {o.trnd}
                </div>
              </div>
            </div>
          </div>

          {/* ---- the room + the week ---- */}
          <div className="grid gap-4 p-4 lg:grid-cols-2 lg:p-[1.5rem]">
            {/* the room */}
            <div className="relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-2">
                {/* every room is mounted and cross-faded rather than swapped:
                    the browser fetches all five while the section scrolls in,
                    so changing outlet is instant instead of a fresh download */}
                {OUTLETS.map((out, i) => (
                  <motion.div
                    key={out.photo}
                    aria-hidden={i !== active}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.02 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={out.photo}
                      alt={`${out.name} dining room during service`}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      placeholder="blur"
                      blurDataURL={out.blur}
                      unoptimized
                      className="object-cover"
                    />
                  </motion.div>
                ))}
                <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-transparent to-transparent sm:block" />
              </div>

              {/* peak-hours readout: one tight line under the photograph on a
                  phone, the fuller card floating on it from sm up */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${o.name}-peak`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative flex items-center gap-2.5 border border-white/10 bg-ink px-[0.7rem] py-[0.55rem] sm:absolute sm:bottom-4 sm:left-4 sm:items-start sm:gap-3 sm:bg-ink/85 sm:p-[0.9rem_1.1rem] sm:backdrop-blur-[10px]"
                >
                  <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-white/10 text-brand-light sm:h-[36px] sm:w-[36px]">
                    <Icon name="trendUp" strokeWidth={2.2} className="h-[14px] w-[14px] sm:h-[17px] sm:w-[17px]" />
                  </span>

                  <div className="flex min-w-0 flex-1 items-center gap-2 sm:block">
                    <span className="flex-none text-[0.55rem] font-bold uppercase tracking-[0.1em] text-white/50 sm:text-[0.6rem] sm:tracking-[0.14em]">
                      Peak hours
                    </span>
                    {/* sm+: the badge belongs beside the label */}
                    <PeakBadge ok={o.ok} className="hidden sm:ml-2 sm:inline-block">
                      {o.peakDelta}
                    </PeakBadge>
                    <span className="min-w-0 truncate text-[0.85rem] font-extrabold tracking-[-0.03em] text-white sm:mt-[0.15rem] sm:block sm:text-[1rem]">
                      {o.peak}
                    </span>
                    <span className="hidden text-[0.66rem] text-white/45 sm:block">
                      Highest revenue window
                    </span>
                    {/* phone: the badge closes the line */}
                    <PeakBadge ok={o.ok} className="ml-auto sm:hidden">
                      {o.peakDelta}
                    </PeakBadge>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* the week */}
            <div className="flex flex-col border border-edge bg-surface-2 p-4 sm:p-[1.4rem]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                    Revenue overview
                  </div>
                  <div className="mt-[0.45rem] flex items-baseline gap-2">
                    <span className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.04em] text-ink">
                      {o.rev}
                    </span>
                    <span
                      className={cn(
                        "text-[0.8rem] font-bold",
                        o.ok ? "text-success-deep" : "text-destructive",
                      )}
                    >
                      {o.revd.split(" vs")[0]}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 border border-edge bg-surface px-[0.7rem] py-[0.4rem] text-[0.72rem] font-semibold text-body">
                  Last 7 days
                  <Icon name="chevronRight" size={12} strokeWidth={2.6} className="rotate-90" />
                </span>
              </div>

              <WeekChart data={o.week} ok={o.ok} outletKey={active} />
            </div>
          </div>

          {/* ---- the four things an owner asks next ---- */}
          <div className="grid grid-cols-1 gap-px border-t border-edge bg-edge sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: "star" as IconName, tone: "success", k: "Top Day", v: o.topDay, s: "Highest revenue" },
              { icon: "users" as IconName, tone: "brand", k: "Busiest Time", v: o.busiest, s: "Most orders" },
              { icon: "clock" as IconName, tone: "gold", k: "Avg. Turn Time", v: o.turn, s: o.turnDelta },
              { icon: "heart" as IconName, tone: "brand", k: "Customer Rating", v: o.rating, s: o.ratingDelta },
            ].map((s) => (
              <div
                key={s.k}
                className="group relative flex items-center gap-3 bg-surface p-[0.9rem] transition-colors duration-300 hover:bg-brand-mist sm:p-[1.25rem]"
              >
                <Corners />
                {/* these four keep their tiles on a phone — one row each, so
                    there is room for the icon to carry the meaning */}
                <span
                  className={cn(
                    "grid h-[34px] w-[34px] flex-none place-items-center rounded-full sm:h-[40px] sm:w-[40px]",
                    TILE[s.tone],
                  )}
                >
                  <Icon name={s.icon} strokeWidth={2} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </span>
                <div className="min-w-0">
                  <div className="text-[0.62rem] font-semibold text-muted sm:text-[0.68rem]">{s.k}</div>
                  <div className="text-[1rem] font-extrabold tracking-[-0.03em] text-ink sm:text-[1.05rem]">
                    {s.v}
                  </div>
                  <div className="truncate text-[0.64rem] text-muted sm:text-[0.68rem]">{s.s}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---- the closing statement ---- */}
        <Reveal>
          <div className="relative mt-[clamp(48px,6vw,84px)] overflow-hidden border border-edge bg-surface shadow-md">
            {/* a brand hairline draws the eye across the top of the panel */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-brand/45 to-transparent"
            />
            <div className="glow glow-brand absolute -right-28 -top-32 h-[320px] w-[420px] opacity-[0.18]" />

            <div className="relative grid gap-[clamp(26px,3.4vw,48px)] p-[clamp(26px,3.8vw,58px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-0">
              <div className="lg:pr-[clamp(28px,3.4vw,56px)]">
                <Eyebrow>One place</Eyebrow>
                <h3 className="t-h2 mt-[1.1rem] max-w-[15ch]">
                  See your entire restaurant business from{" "}
                  {/* the marker must never break across two lines */}
                  <span className="hl whitespace-nowrap">one place.</span>
                </h3>
              </div>

              <div className="relative border-t border-edge pt-[clamp(24px,2.6vw,36px)] lg:border-l lg:border-t-0 lg:pl-[clamp(30px,3.6vw,56px)] lg:pt-0">
                <span
                  aria-hidden
                  className="block font-serif text-[clamp(3.2rem,4.6vw,4.6rem)] font-black leading-[0.52] text-brand"
                >
                  &ldquo;
                </span>
                <p className="mt-[clamp(8px,1.2vw,16px)] text-[clamp(1.15rem,2.1vw,1.75rem)] font-bold leading-[1.3] tracking-[-0.03em] text-ink">
                  Instead of spending your day finding out what happened, spend it deciding{" "}
                  <span className="text-brand-deep">what to do next.</span>
                </p>
                <div className="mt-[clamp(20px,2.4vw,32px)] flex items-center gap-3">
                  <span aria-hidden className="h-px w-10 flex-none bg-edge-2" />
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                    What Nova-Restro is for
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Outlets;
