"use client";

import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { spline } from "@/lib/spline";
import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * Twelve weeks of revenue, told as one line.
 *
 * The first five points drift — that is the restaurant reading itself. Point
 * five is where a decision gets made, and everything after it climbs. Same
 * line, same restaurant: Analyze, Act, Grow are three moments on it rather
 * than three unrelated pictures.
 */
const WEEKS = [46, 41, 49, 43, 45, 44, 52, 58, 63, 72, 79, 92];
/** index of the decision — where the curve turns */
const ACT = 5;

const MOVES: { n: string; label: string; note: string; icon: IconName }[] = [
  { n: "01", label: "Analyze", note: "See what the day actually did.", icon: "barChart" },
  { n: "02", label: "Act", note: "Change the one thing that matters.", icon: "zap" },
  { n: "03", label: "Grow", note: "Watch the line answer.", icon: "trendUp" },
];

const W = 400;
const H = 132;
const TOP = 14;
const BOTTOM = 116;

const PTS = WEEKS.map((v, i) => ({
  x: (i / (WEEKS.length - 1)) * W,
  y: BOTTOM - (v / 100) * (BOTTOM - TOP),
}));

const LINE = spline(PTS);
const ACT_X = (PTS[ACT].x / W) * 100;

export function ThreeMoves() {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#111D2D,#0C1523)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
          Same restaurant · twelve weeks
        </span>
        <span className="inline-flex items-center gap-1.5 border border-brand/35 bg-brand/[0.12] px-[0.5rem] py-[0.16rem] font-mono text-[0.58rem] font-bold uppercase tracking-[0.1em] text-brand-light">
          <Icon name="trendUp" size={10} strokeWidth={3} />
          +48%
        </span>
      </div>

      {/* the plot lives in its own box so every marker can be placed as a
          plain % of the chart, not of the padded panel around it */}
      <div className="px-4 pt-4">
        <div className="relative">
          {/* the decision, marked on the plot itself */}
          <span
            aria-hidden
            style={{
              left: `${ACT_X}%`,
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(251,146,60,.6) 0 4px, transparent 4px 9px)",
            }}
            className="absolute inset-y-0 w-px"
          />

          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="block h-[124px] w-full sm:h-[150px]"
          >
            <defs>
              <linearGradient id="movesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.38" />
                <stop offset="60%" stopColor="var(--brand)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
              </linearGradient>
              {/* a left-to-right wipe — a dash-based draw breaks up under the
                  non-uniform viewBox scaling, this never does */}
              <clipPath id="movesWipe">
                <motion.rect
                  x={0}
                  y={-6}
                  height={H + 12}
                  initial={{ width: 0 }}
                  whileInView={{ width: W }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
                />
              </clipPath>
            </defs>

            {[0.25, 0.55, 0.85].map((g) => (
              <line
                key={g}
                x1={0}
                x2={W}
                y1={H * g}
                y2={H * g}
                stroke="#1C2A3D"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            <g clipPath="url(#movesWipe)">
              <path d={`${LINE} L${W},${H} L0,${H} Z`} fill="url(#movesFill)" />
              {/* a soft bloom under the stroke, so the climb glows */}
              <path
                d={LINE}
                fill="none"
                stroke="var(--brand)"
                strokeWidth={7}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.15}
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={LINE}
                fill="none"
                stroke="var(--brand-hi)"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>

          {/* the two moments worth pointing at — the turn, and where it got to */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, ease: EASE, delay: 0.85 }}
            style={{ left: `${ACT_X}%`, top: `${(PTS[ACT].y / H) * 100}%` }}
            className="absolute -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full border-2 border-brand-light bg-ink shadow-[0_0_0_4px_rgba(234,88,12,.2)]"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, ease: EASE, delay: 1.6 }}
            style={{ left: "100%", top: `${(PTS[PTS.length - 1].y / H) * 100}%` }}
            className="absolute -ml-[6px] -mt-[6px] h-[12px] w-[12px] rounded-full border-2 border-brand-light bg-brand shadow-[0_0_0_5px_rgba(234,88,12,.22)]"
          />
        </div>
      </div>

      {/* the three moves, sitting under the stretch of line each one owns */}
      <div className="grid grid-cols-3 gap-px border-t border-white/[0.07] bg-white/[0.07]">
        {MOVES.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: EASE, delay: 0.3 + i * 0.14 }}
            className="bg-[#0C1523] p-[0.9rem_0.75rem] sm:p-[1.05rem_1.1rem]"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.6rem] font-bold text-white/30">{m.n}</span>
              <Icon name={m.icon} size={13} strokeWidth={2.2} className="text-brand-light" />
            </div>
            <b className="mt-[0.5rem] block text-[0.92rem] font-extrabold tracking-[-0.03em] text-white sm:text-[1rem]">
              {m.label}
            </b>
            <p className="mt-[0.25rem] text-[0.68rem] leading-[1.45] text-white/45 sm:text-[0.72rem]">
              {m.note}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ThreeMoves;
