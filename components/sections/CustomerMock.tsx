"use client";

import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Icon from "@/components/ui/Icon";

/* ---------------------------------------------------------------- data ---
   A fictional customer base, as the brief for this screen asks — nothing here
   is a real person's record. This is the manager's view: the whole base at a
   glance, not one guest's profile. */

const SUMMARY = [
  { k: "Active customers", v: "1,284", s: "last 90 days" },
  { k: "Loyalty members", v: "862", s: "67% of the base" },
  { k: "New this month", v: "186", s: "46 already back" },
  { k: "Going quiet", v: "74", s: "no visit in 30 days" },
];

type Tag = "vip" | "regular" | "new" | "risk";

const TAG: Record<Tag, { label: string; cls: string }> = {
  vip: { label: "VIP", cls: "border-brand-deep/25 bg-brand-wash text-brand-deep" },
  regular: { label: "Regular", cls: "border-edge bg-canvas text-body" },
  new: { label: "New", cls: "border-success-deep/25 bg-success-wash text-success-deep" },
  risk: { label: "Going quiet", cls: "border-gold/40 bg-gold-wash text-gold-deep" },
};

const CUSTOMERS: {
  i: string;
  n: string;
  tag: Tag;
  visits: number;
  last: string;
  ltv: string;
}[] = [
  { i: "AR", n: "Anaya Raman", tag: "vip", visits: 34, last: "4 days ago", ltv: "£1,284" },
  { i: "JO", n: "James Okafor", tag: "vip", visits: 28, last: "6 days ago", ltv: "£1,052" },
  { i: "PN", n: "Priya Nair", tag: "regular", visits: 21, last: "2 days ago", ltv: "£864" },
  { i: "TW", n: "Tom Whitfield", tag: "regular", visits: 17, last: "9 days ago", ltv: "£702" },
  { i: "SM", n: "Sofia Marchetti", tag: "regular", visits: 14, last: "3 days ago", ltv: "£596" },
  { i: "DC", n: "Daniel Cole", tag: "risk", visits: 11, last: "38 days ago", ltv: "£441" },
  { i: "HB", n: "Hannah Beckett", tag: "new", visits: 3, last: "yesterday", ltv: "£128" },
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

/** The loyalty / CRM view as the manager gets it — the whole base, ranked. */
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
          Loyalty · Customer base
        </span>
        <span className="ml-auto inline-flex flex-none items-center gap-1.5 border border-edge px-[0.5rem] py-[0.2rem] font-mono text-[0.55rem] uppercase tracking-[0.1em] text-body sm:px-[0.55rem] sm:text-[0.58rem]">
          <i className="h-1.5 w-1.5 rounded-full bg-brand" />
          Live
        </span>
      </div>

      <div className="grid min-w-0 gap-2 p-2 sm:gap-3.5 sm:p-4">
        {/* ---- the base in four numbers ---- */}
        <div className="grid min-w-0 grid-cols-2 gap-px border border-edge bg-edge lg:grid-cols-4">
          {SUMMARY.map((s) => (
            <div key={s.k} className="min-w-0 bg-surface p-[0.6rem_0.65rem] sm:p-[0.85rem_1rem]">
              <span className="block text-[0.5rem] font-extrabold uppercase leading-[1.3] tracking-[0.06em] text-muted sm:text-[0.58rem] sm:tracking-[0.1em]">
                {s.k}
              </span>
              <b className="mt-[0.2rem] block text-[1.05rem] font-extrabold tabular-nums tracking-[-0.035em] text-ink sm:text-[1.3rem]">
                {s.v}
              </b>
              <span className="block text-[0.58rem] leading-[1.35] text-muted sm:text-[0.66rem]">
                {s.s}
              </span>
            </div>
          ))}
        </div>

        <div className="grid min-w-0 gap-2 sm:gap-3.5 lg:grid-cols-[1.12fr_0.88fr]">
          {/* ---- the list itself ---- */}
          <div className={`${PANEL} flex min-w-0 flex-col p-2.5 sm:p-4`}>
            <PanelTitle meta="ranked by visits">Active customers</PanelTitle>

            <div className="grid min-w-0 gap-px border border-edge bg-edge">
              {CUSTOMERS.map((c, i) => (
                <motion.div
                  key={c.n}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.06 + i * 0.05 }}
                  className="flex min-w-0 items-center gap-2 bg-surface p-[0.5rem_0.55rem] sm:gap-3 sm:p-[0.7rem_0.85rem]"
                >
                  <span className="grid h-[26px] w-[26px] flex-none place-items-center rounded-ico-sm bg-ink text-[0.56rem] font-extrabold tracking-[-0.01em] text-white sm:h-[34px] sm:w-[34px] sm:text-[0.68rem]">
                    {c.i}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <b className="min-w-0 truncate text-[0.74rem] font-bold tracking-[-0.02em] text-ink sm:text-[0.86rem]">
                        {c.n}
                      </b>
                      <span
                        className={cn(
                          "hidden flex-none border px-[0.35rem] py-[0.08rem] text-[0.52rem] font-extrabold uppercase tracking-[0.08em] sm:inline-block sm:text-[0.55rem]",
                          TAG[c.tag].cls,
                        )}
                      >
                        {TAG[c.tag].label}
                      </span>
                    </span>
                    {/* the phone gets the short form of the same line */}
                    <span className="mt-[0.1rem] block truncate text-[0.6rem] text-muted sm:text-[0.68rem]">
                      <b className="font-bold tabular-nums text-body">{c.visits}</b> visits ·{" "}
                      <span className="hidden sm:inline">last seen </span>
                      {c.last}
                    </span>
                  </span>

                  <span className="flex-none text-right">
                    <b className="block text-[0.74rem] font-extrabold tabular-nums tracking-[-0.02em] text-ink sm:text-[0.92rem]">
                      {c.ltv}
                    </b>
                    <span className="hidden text-[0.6rem] text-muted sm:block">lifetime</span>
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-edge pt-2.5 sm:mt-3 sm:pt-3">
              <span className="min-w-0 text-[0.62rem] text-muted sm:text-[0.7rem]">
                Showing 7 of <b className="font-bold tabular-nums text-body">1,284</b> active
                customers
              </span>
              <span className="inline-flex flex-none items-center gap-1.5 border border-edge bg-canvas px-[0.5rem] py-[0.22rem] text-[0.6rem] font-bold text-body sm:px-[0.55rem] sm:py-[0.25rem] sm:text-[0.66rem]">
                Every outlet
                <Icon name="chevronRight" size={11} strokeWidth={2.6} />
              </span>
            </div>
          </div>

          {/* ---- how the base is moving ---- */}
          <div className="flex min-w-0 flex-col gap-2 sm:gap-3.5">
            <div className={`${PANEL} min-w-0 p-2.5 sm:p-4`}>
              <PanelTitle meta="8 months">Share of covers from returning guests</PanelTitle>
              <CohortChart />
            </div>

            <div
              className={`${PANEL} flex min-w-0 flex-1 flex-wrap content-center items-center gap-3 p-2.5 sm:gap-4 sm:p-4`}
            >
              <div className="min-w-0">
                <span className="block text-[0.52rem] font-extrabold uppercase tracking-[0.08em] text-muted sm:text-[0.56rem] sm:tracking-[0.1em]">
                  This base is worth
                </span>
                <b className="mt-[0.2rem] block text-[clamp(1.5rem,2.6vw,2rem)] font-black leading-[1] tracking-[-0.045em] text-ink">
                  £1.65M
                </b>
                <span className="block text-[0.64rem] leading-[1.4] text-muted sm:text-[0.66rem]">
                  over a year — 1,284 guests × £1,284 each
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
                  A regular returns every 11 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerMock;
