"use client";

import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import Icon from "@/components/ui/Icon";

/* ---------------------------------------------------------------- data ---
   A fictional guest, as the brief for this screen asks — nothing here is a
   real person's record. */

const GUEST = {
  initials: "AR",
  name: "Anaya Raman",
  since: "Regular · first visit March 2024",
  tags: ["Top 10% by spend", "Prefers table 12", "No shellfish"],
};

const STATS = [
  { k: "Visits", v: "34", s: "lifetime" },
  { k: "Lifetime value", v: "£1,284", s: "projected" },
  { k: "Average spend", v: "£41.70", s: "per cover" },
  { k: "Last seen", v: "4 days", s: "ago · Sat dinner" },
];

const DISHES = [
  { n: "Truffle arancini", c: 12, pct: 100 },
  { n: "Sea bass, brown butter", c: 9, pct: 76 },
  { n: "Negroni", c: 7, pct: 58 },
  { n: "Basque cheesecake", c: 5, pct: 42 },
];

/**
 * Share of covers taken by returning guests, month by month. The last column
 * is 64% on purpose — it is the same number the Repeat Customers tile above
 * reports, so the chart reads as where that figure came from.
 */
const COHORT = [
  { m: "Jan", pct: 48 },
  { m: "Feb", pct: 51 },
  { m: "Mar", pct: 53 },
  { m: "Apr", pct: 56 },
  { m: "May", pct: 57 },
  { m: "Jun", pct: 60 },
  { m: "Jul", pct: 62 },
  { m: "Aug", pct: 64 },
];

/* ------------------------------------------------------------- helpers --- */

const PANEL = "relative border border-edge bg-surface";

function PanelTitle({ children, meta }: { children: React.ReactNode; meta?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-2.5">
      <h5 className="min-w-0 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-muted sm:text-[0.72rem] sm:tracking-[0.12em]">
        {children}
      </h5>
      {/* the meta is the first thing to go when there is no room for it */}
      {meta && (
        <span className="hidden flex-none font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted/70 sm:inline">
          {meta}
        </span>
      )}
    </div>
  );
}

/** 100%-stacked columns: returning below the line, new above it. */
function CohortChart() {
  return (
    <div>
      <div className="flex h-[120px] items-end gap-[4px] sm:h-[152px] sm:gap-[9px]">
        {COHORT.map((c, i) => (
          <div key={c.m} className="flex h-full min-w-0 flex-1 flex-col justify-end bg-brand-wash/55">
            <motion.span
              initial={{ height: "0%" }}
              whileInView={{ height: `${c.pct}%` }}
              viewport={viewportOnce}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 + i * 0.06 }}
              className={
                i === COHORT.length - 1
                  ? "block bg-[linear-gradient(180deg,#F97316,#EA580C)]"
                  : "block bg-brand/75"
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex gap-[4px] sm:gap-[9px]">
        {COHORT.map((c, i) => (
          <span
            key={c.m}
            className={`min-w-0 flex-1 truncate text-center font-mono text-[0.5rem] sm:text-[0.58rem] ${
              i === COHORT.length - 1 ? "font-bold text-brand-deep" : "text-muted"
            }`}
          >
            {c.m}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-2 border-t border-edge pt-3">
        <span className="inline-flex items-center gap-1.5 text-[0.64rem] font-semibold text-body sm:text-[0.68rem]">
          <i className="h-2.5 w-2.5 flex-none bg-brand" />
          Returning
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.64rem] font-semibold text-body sm:text-[0.68rem]">
          <i className="h-2.5 w-2.5 flex-none bg-brand-wash" />
          First visit
        </span>
        {/* on a phone this claims its own line rather than being squeezed */}
        <span className="inline-flex w-full items-center gap-1.5 text-[0.66rem] font-bold text-success-deep sm:ml-auto sm:w-auto sm:text-[0.7rem]">
          <Icon name="trendUp" size={12} strokeWidth={2.6} className="flex-none" />
          +16 pts since January
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- mock --- */

/** The loyalty / CRM view, shown as a screen rather than described. */
export function CustomerMock() {
  return (
    <div className="overflow-hidden border border-edge bg-canvas shadow-sm">
      {/* ---- window chrome ---- */}
      <div className="flex items-center gap-2 border-b border-edge bg-surface px-3 py-2.5 sm:gap-2.5 sm:px-4 sm:py-3">
        <span className="hidden gap-[5px] sm:flex">
          <i className="h-[7px] w-[7px] rounded-full bg-edge-2" />
          <i className="h-[7px] w-[7px] rounded-full bg-edge-2" />
          <i className="h-[7px] w-[7px] rounded-full bg-brand/60" />
        </span>
        <span className="min-w-0 truncate font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted sm:ml-1 sm:text-[0.64rem] sm:tracking-[0.14em]">
          Loyalty · Guest profile
        </span>
        <span className="ml-auto inline-flex flex-none items-center gap-1.5 border border-edge px-[0.5rem] py-[0.2rem] font-mono text-[0.55rem] uppercase tracking-[0.1em] text-body sm:px-[0.55rem] sm:text-[0.58rem]">
          <i className="h-1.5 w-1.5 rounded-full bg-brand" />
          Live
        </span>
      </div>

      <div className="grid gap-2.5 p-2.5 sm:gap-3.5 sm:p-4 lg:grid-cols-[1fr_1.08fr]">
        {/* ---- the guest ---- */}
        <div className="grid gap-2.5 sm:gap-3.5">
          <div className={`${PANEL} p-3 sm:p-4`}>
            <div className="flex items-center gap-3 sm:gap-3.5">
              <span className="grid h-[44px] w-[44px] flex-none place-items-center rounded-ico bg-ink text-[0.95rem] font-extrabold tracking-[-0.02em] text-white sm:h-[52px] sm:w-[52px] sm:text-[1.02rem]">
                {GUEST.initials}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <b className="text-[0.95rem] font-extrabold tracking-[-0.03em] sm:text-[1.02rem]">
                    {GUEST.name}
                  </b>
                  <span className="inline-flex flex-none items-center gap-1 border border-brand-deep/25 bg-brand-wash px-[0.4rem] py-[0.1rem] text-[0.55rem] font-extrabold uppercase tracking-[0.1em] text-brand-deep sm:text-[0.58rem]">
                    <Icon name="star" size={9} strokeWidth={2.6} />
                    VIP
                  </span>
                </div>
                <div className="mt-[0.15rem] text-[0.7rem] leading-[1.4] text-muted sm:truncate sm:text-[0.75rem]">
                  {GUEST.since}
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {GUEST.tags.map((t) => (
                <span
                  key={t}
                  className="border border-edge bg-canvas px-[0.45rem] py-[0.2rem] text-[0.62rem] font-semibold text-body sm:px-[0.5rem] sm:py-[0.22rem] sm:text-[0.66rem]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* gap-px over an edge bed — the same separator trick the panel
                above this mock uses */}
            <div className="mt-3 grid grid-cols-2 gap-px border border-edge bg-edge">
              {STATS.map((s) => (
                <div key={s.k} className="min-w-0 bg-surface p-[0.6rem_0.65rem] sm:p-[0.7rem_0.8rem]">
                  <span className="block text-[0.52rem] font-extrabold uppercase tracking-[0.08em] text-muted sm:text-[0.56rem] sm:tracking-[0.1em]">
                    {s.k}
                  </span>
                  <b className="mt-[0.2rem] block text-[0.95rem] font-extrabold tabular-nums tracking-[-0.03em] text-ink sm:text-[1.02rem]">
                    {s.v}
                  </b>
                  <span className="block truncate text-[0.6rem] text-muted sm:text-[0.62rem]">
                    {s.s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${PANEL} p-3 sm:p-4`}>
            <PanelTitle meta="34 visits">Orders most often</PanelTitle>
            <div className="grid gap-[0.65rem] sm:gap-[0.7rem]">
              {DISHES.map((d, i) => (
                <div key={d.n} className="grid grid-cols-[1fr_auto] items-center gap-2.5 sm:gap-3">
                  <div className="min-w-0">
                    <div className="mb-[0.32rem] truncate text-[0.72rem] font-semibold text-ink sm:text-[0.76rem]">
                      {d.n}
                    </div>
                    <div className="h-[5px] w-full bg-canvas-2">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${d.pct}%` }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.08 }}
                        style={{ opacity: 1 - i * 0.13 }}
                        className="block h-full bg-[linear-gradient(90deg,#F97316,#EA580C)]"
                      />
                    </div>
                  </div>
                  <span className="flex-none font-mono text-[0.66rem] font-bold tabular-nums text-ink-3 sm:text-[0.7rem]">
                    {d.c}×
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---- the cohort ---- */}
        <div className="grid gap-2.5 sm:gap-3.5">
          <div className={`${PANEL} p-3 sm:p-4`}>
            <PanelTitle meta="8 months">Share of covers from returning guests</PanelTitle>
            <CohortChart />
          </div>

          <div className={`${PANEL} flex flex-wrap items-center gap-3 p-3 sm:gap-4 sm:p-4`}>
            <div className="min-w-0">
              <span className="block text-[0.52rem] font-extrabold uppercase tracking-[0.08em] text-muted sm:text-[0.56rem] sm:tracking-[0.1em]">
                This guest is worth
              </span>
              <b className="mt-[0.2rem] block text-[clamp(1.5rem,2.6vw,2rem)] font-black leading-[1] tracking-[-0.045em] text-ink">
                £1,284
              </b>
              <span className="block text-[0.64rem] leading-[1.4] text-muted sm:text-[0.66rem]">
                over a year — 31× a single £41.70 cover
              </span>
            </div>

            {/* the chip drops onto its own line rather than shrinking the
                number beside it */}
            <div className="flex w-full items-center gap-2 border border-brand-deep/25 bg-brand-mist px-[0.7rem] py-[0.45rem] sm:ml-auto sm:w-auto sm:px-[0.75rem] sm:py-[0.5rem]">
              <Icon
                name="refresh"
                size={15}
                strokeWidth={2.2}
                className="flex-none text-brand-deep"
              />
              <span className="text-[0.68rem] font-bold leading-[1.3] text-brand-deep sm:text-[0.7rem]">
                Books again every 11 days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerMock;
