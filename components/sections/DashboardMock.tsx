"use client";

import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { FLOOR_TABLES, type TableState } from "@/lib/data";
import { spline } from "@/lib/spline";
import CountUp from "@/components/ui/CountUp";
import Icon from "@/components/ui/Icon";

/* ---------------------------------------------------------------- data --- */

const KPIS = [
  { label: "Revenue Today", to: 184250, prefix: "£", suffix: "", delta: "12.4%", spark: [24, 32, 28, 44, 40, 58, 54, 72, 88] },
  { label: "Orders", to: 1482, prefix: "", suffix: "", delta: "8.1%", spark: [40, 38, 52, 48, 62, 58, 70, 66, 80] },
  { label: "AOV", to: 41, prefix: "£", suffix: ".70", delta: "3.9%", spark: [50, 54, 48, 58, 56, 62, 60, 68, 72] },
  { label: "Customers", to: 964, prefix: "", suffix: "", delta: "6.2%", spark: [30, 44, 40, 52, 62, 58, 70, 76, 84] },
];

/** hourly revenue curve — 13 points, midnight to midnight */
const TREND = [18, 12, 9, 14, 34, 52, 46, 68, 61, 84, 96, 74, 58];
const TREND_LABELS = ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "12 AM"];

const OUTLET_RANK = [
  { name: "Outlet 03", value: "£46,910", pct: 100 },
  { name: "Outlet 01", value: "£38,420", pct: 82 },
  { name: "Outlet 04", value: "£31,640", pct: 67 },
  { name: "Outlet 02", value: "£29,180", pct: 62 },
  { name: "Outlet 05", value: "£24,830", pct: 53 },
];

const FEED = [
  { dot: "gold", b: "Table 12", t: "waiting", time: "4m" },
  { dot: "brand", b: "Table 18", t: "food ready", time: "now" },
  { dot: "danger", b: "Table 24", t: "waiting bill", time: "7m" },
  { dot: "brand", b: "Order #184", t: "ready", time: "now" },
  { dot: "success", b: "Outlet 03", t: "peak hour", time: "2m" },
] as const;

const DOT: Record<string, string> = {
  brand: "bg-brand-light",
  success: "bg-success-light",
  gold: "bg-gold",
  danger: "bg-destructive-light",
};

const TILE: Record<TableState, string> = {
  free: "border-night-line bg-night text-night-faint",
  seat: "border-success/45 bg-success/[0.18] text-success-light",
  alert: "border-gold/55 bg-gold/[0.18] text-gold-light",
  ready: "border-brand/60 bg-brand/[0.22] text-brand-light",
  bill: "border-destructive-light/50 bg-destructive-light/[0.16] text-destructive-light",
};

const LEGEND: { state: TableState; label: string }[] = [
  { state: "seat", label: "Seated" },
  { state: "ready", label: "Food ready" },
  { state: "alert", label: "Needs attention" },
  { state: "bill", label: "Bill requested" },
];

/* ------------------------------------------------------------- helpers --- */

/** Shared panel chrome: hairline, gradient face, inner top highlight. */
const PANEL =
  "relative rounded-none border border-night-line bg-[linear-gradient(180deg,#111D2D,#0C1523)] " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]";

function PanelTitle({ children, meta }: { children: React.ReactNode; meta?: string }) {
  return (
    <div className="mb-3.5 flex items-baseline justify-between gap-3">
      <h5 className="text-[0.78rem] font-bold tracking-[-0.01em] text-white">{children}</h5>
      {meta && (
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-night-faint">
          {meta}
        </span>
      )}
    </div>
  );
}

/** Tiny KPI bar sparkline — reads at any size, unlike a hairline. */
function Spark({ points, delay = 0 }: { points: number[]; delay?: number }) {
  const max = Math.max(...points);

  return (
    <div className="mt-2.5 flex h-[24px] items-end gap-[3px]">
      {points.map((p, i) => (
        <motion.i
          key={i}
          initial={{ height: "8%" }}
          whileInView={{ height: `${Math.max(14, (p / max) * 100)}%` }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: delay + i * 0.045 }}
          className={`block flex-1 ${
            i === points.length - 1
              ? "bg-[linear-gradient(180deg,#FB923C,#EA580C)]"
              : "bg-night-line"
          }`}
        />
      ))}
    </div>
  );
}

const GRID = [0.16, 0.42, 0.68];
const Y_LABELS = ["£9K", "£6K", "£3K"];

/** Smooth revenue curve with a gradient area under it. */
function TrendChart() {
  const w = 320;
  const h = 118;
  const max = Math.max(...TREND);
  const pts = TREND.map((v, i) => ({
    x: (i / (TREND.length - 1)) * w,
    y: h - 10 - (v / max) * (h - 26),
  }));

  const line = spline(pts);
  const peak = pts[TREND.indexOf(max)];

  return (
    <div className="relative pl-[34px]">
      {/* y axis — HTML, because text inside a stretched viewBox would distort */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[30px]">
        {GRID.map((g, i) => (
          <span
            key={g}
            style={{ top: `${g * 100}%` }}
            className="absolute right-0 -translate-y-1/2 font-mono text-[0.55rem] text-night-faint"
          >
            {Y_LABELS[i]}
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-[104px] w-full sm:h-[136px]"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.42" />
            <stop offset="55%" stopColor="var(--brand)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </linearGradient>
          {/* a left-to-right wipe: a dash-based draw breaks up under the
              non-uniform viewBox scaling, this never does */}
          <clipPath id="trendWipe">
            <motion.rect
              x={0}
              y={-4}
              height={h + 8}
              initial={{ width: 0 }}
              whileInView={{ width: w }}
              viewport={viewportOnce}
              transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}
            />
          </clipPath>
        </defs>

        {GRID.map((g) => (
          <line
            key={g}
            x1={0}
            x2={w}
            y1={h * g}
            y2={h * g}
            stroke="#1C2A3D"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <g clipPath="url(#trendWipe)">
          <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#trendFill)" />
          {/* soft bloom under the stroke */}
          <path
            d={line}
            fill="none"
            stroke="var(--brand)"
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.16}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={line}
            fill="none"
            stroke="var(--brand-hi)"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      {/* peak marker, positioned in % so it tracks the responsive svg */}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, ease: EASE, delay: 1.5 }}
        style={{ left: `calc(34px + ${(peak.x / w) * 100}% - 34px * ${peak.x / w})`, top: `${(peak.y / h) * 100}%` }}
        className="absolute -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full border-2 border-brand-hi bg-night shadow-[0_0_0_4px_rgba(234,88,12,0.22)]"
      />

      {/* every other label is dropped on phones so they never collide */}
      <div className="mt-1.5 flex justify-between font-mono text-[0.55rem] text-night-faint sm:text-[0.58rem]">
        {TREND_LABELS.map((l, i) => (
          <span key={l} className={i % 2 === 1 ? "hidden sm:inline" : undefined}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- mock --- */

/** The product UI, shown in its native dark theme inside the hero frame. */
export function DashboardMock() {
  return (
    <div className="grid gap-3 p-3 sm:gap-3.5 sm:p-[18px]">
      {/* ---- title bar ---- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[0.92rem] font-bold tracking-[-0.02em] text-white sm:text-base">
            Group Overview · All Outlets
          </div>
          <div className="text-[0.72rem] text-night-dim">Live · updated a moment ago</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-none border border-night-line bg-night-panel p-[3px] sm:flex">
            {["Today", "7 days", "30 days"].map((t, i) => (
              <span
                key={t}
                className={
                  i === 0
                    ? "rounded-none bg-night-line px-2.5 py-[3px] text-[0.62rem] font-bold text-white"
                    : "px-2.5 py-[3px] text-[0.62rem] font-semibold text-night-dim"
                }
              >
                {t}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 rounded-none bg-brand px-2.5 py-1 text-[0.66rem] font-bold text-white shadow-[0_8px_20px_-10px_rgba(234,88,12,0.9)]">
            <span className="relative h-1.5 w-1.5 rounded-full bg-white">
              <span className="absolute -inset-1 animate-ping2 rounded-full border border-white/70" />
            </span>
            LIVE
          </span>
        </div>
      </div>

      {/* ---- KPIs ---- */}
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 + i * 0.07 }}
            className={`${PANEL} group/kpi overflow-hidden p-2.5 transition-colors duration-300 hover:border-night-dim/40 sm:p-3`}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent opacity-0 transition-opacity duration-300 group-hover/kpi:opacity-100" />
            <span className="block text-[0.55rem] font-bold uppercase tracking-[0.1em] text-night-dim sm:text-[0.6rem] sm:tracking-[0.12em]">
              {k.label}
            </span>
            <b className="mt-[5px] block text-[0.95rem] font-extrabold tabular-nums tracking-[-0.025em] text-white sm:mt-[6px] sm:text-[1.2rem]">
              <CountUp to={k.to} prefix={k.prefix} suffix={k.suffix} />
            </b>
            <em className="mt-[3px] inline-flex items-center gap-1 rounded-none bg-success/15 px-1.5 py-[1px] text-[0.62rem] font-bold not-italic text-success-light">
              <Icon name="trendUp" size={10} strokeWidth={3} />
              {k.delta}
            </em>
            <Spark points={k.spark} delay={0.25 + i * 0.06} />
          </motion.div>
        ))}
      </div>

      {/* ---- trend + live feed ---- */}
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <div className={`${PANEL} p-3.5`}>
          <PanelTitle meta="last 24 h">Revenue trend · all outlets</PanelTitle>
          <TrendChart />
        </div>

        <div className={`${PANEL} p-3.5`}>
          <PanelTitle meta="live">Floor feed</PanelTitle>
          <div className="grid gap-[9px]">
            {FEED.map((f, i) => (
              <motion.div
                key={f.b}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                className={`items-center gap-2 border-b border-night-line/70 pb-[9px] text-[0.7rem] text-night-bright last:border-b-0 last:pb-0 ${
                  i > 2 ? "hidden sm:flex" : "flex"
                }`}
              >
                <span className={`h-1.5 w-1.5 flex-none rounded-full ${DOT[f.dot]}`} />
                <b className="font-semibold text-white">{f.b}</b> {f.t}
                <span className="ml-auto font-mono text-[0.6rem] text-night-faint">{f.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- ranking + floor ---- */}
      <div className="grid gap-3 lg:grid-cols-[1fr_1.15fr]">
        <div className={`${PANEL} p-3.5`}>
          <PanelTitle meta="this week">Top outlets by revenue</PanelTitle>
          <div className="grid gap-[11px]">
            {OUTLET_RANK.map((o, i) => (
              <div
                key={o.name}
                className={`grid-cols-[auto_1fr_auto] items-center gap-2.5 ${
                  i > 2 ? "hidden sm:grid" : "grid"
                }`}
              >
                <span className="font-mono text-[0.58rem] text-night-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-[5px] flex items-baseline justify-between">
                    <span className="text-[0.7rem] font-semibold text-night-bright">{o.name}</span>
                  </div>
                  {/* the track is lifted off the panel so every bar reads, and
                      the fill fades down the ranking instead of going dark */}
                  <div className="h-[6px] w-full bg-white/[0.07]">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${o.pct}%` }}
                      viewport={viewportOnce}
                      transition={{ duration: 1, ease: EASE, delay: 0.25 + i * 0.09 }}
                      style={{ opacity: 1 - i * 0.16 }}
                      className="block h-full bg-[linear-gradient(90deg,#FB923C,#EA580C)]"
                    />
                  </div>
                </div>
                <span className="font-mono text-[0.66rem] tabular-nums text-white">{o.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${PANEL} flex flex-col p-3.5`}>
          <PanelTitle meta="24 tables">Floor status · Outlet 01</PanelTitle>
          <div className="grid grid-cols-8 gap-[4px] sm:gap-[5px]">
            {FLOOR_TABLES.map((s, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.82 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.018 }}
                className={`grid h-[22px] place-items-center border font-mono text-[0.5rem] font-bold sm:h-[26px] sm:text-[0.55rem] ${TILE[s]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>
            ))}
          </div>
          <div className="mt-3 hidden flex-wrap gap-x-3.5 gap-y-1.5 border-t border-night-line pt-3 sm:flex">
            {LEGEND.map((l) => (
              <span
                key={l.label}
                className="inline-flex items-center gap-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-night-dim"
              >
                <i className={`block h-2 w-2 border ${TILE[l.state]}`} />
                {l.label}
              </span>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-night-line pt-3 sm:gap-2.5">
            {[
              { k: "Occupancy", v: "92%" },
              { k: "Covers seated", v: "86" },
              { k: "Avg. turn time", v: "38 min" },
            ].map((s) => (
              <div key={s.k}>
                <span className="block text-[0.55rem] font-bold uppercase tracking-[0.1em] text-night-faint">
                  {s.k}
                </span>
                <b className="mt-[3px] block text-[0.86rem] font-extrabold tabular-nums tracking-[-0.02em] text-white">
                  {s.v}
                </b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMock;
