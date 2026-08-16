"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ROI_DEFAULTS, ROI_MODEL } from "@/lib/data";
import { EASE } from "@/lib/motion";
import Icon, { type IconName } from "@/components/ui/Icon";

/* -------------------------------------------------------------- helpers --- */

const money = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const num = (n: number) => Math.round(n).toLocaleString("en-GB");

/* --------------------------------------------------------------- inputs --- */

type Key = keyof typeof ROI_DEFAULTS;

interface Field {
  key: Key;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  print: (v: number) => string;
}

const FIELDS: Field[] = [
  {
    key: "orders",
    label: "Orders a day",
    hint: "across the business",
    min: 10,
    max: 600,
    step: 5,
    print: (v) => num(v),
  },
  {
    key: "aov",
    label: "Average order size",
    hint: "what one order is worth",
    min: 5,
    max: 200,
    step: 1,
    print: (v) => `£${v}`,
  },
  {
    key: "lossPct",
    label: "Revenue lost to wrong orders",
    hint: "refunds, remakes, comps",
    min: 0,
    max: 10,
    step: 0.5,
    print: (v) => `${v}%`,
  },
  {
    key: "aiPct",
    label: "AI Waiter uplift",
    hint: "optional layer · the 2–5% band",
    min: 2,
    max: 5,
    step: 0.5,
    print: (v) => `${v}%`,
  },
  {
    key: "outlets",
    label: "Outlets",
    hint: "what you are billed for",
    min: 1,
    max: 20,
    step: 1,
    print: (v) => num(v),
  },
];

/* --------------------------------------------------------------- pieces --- */

/** Dark panel chrome, shared by every box inside the calculator. */
const PANEL = "border border-night-line bg-[linear-gradient(180deg,#111D2D,#0C1523)]";

function StepLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-[22px] w-[22px] flex-none place-items-center bg-brand font-mono text-[0.7rem] font-bold text-white">
        {n}
      </span>
      <span className="text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-white/85">
        {children}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------------- view --- */

export function RoiCalculator() {
  const [v, setV] = useState<Record<Key, number>>({ ...ROI_DEFAULTS });

  const r = useMemo(() => {
    const M = ROI_MODEL;
    const ordersMonth = v.orders * M.daysPerMonth;
    const revenueMonth = ordersMonth * v.aov;

    // 1 — the floor time a hand-taken order costs, at the all-in hourly rate
    const hoursSaved = (ordersMonth * M.minutesPerOrder) / 60;
    const timeValue = hoursSaved * M.waiterHourlyRate;

    // 2 — the money currently walking out as refunds and remakes
    const lossToday = revenueMonth * (v.lossPct / 100);
    const refundValue = lossToday * M.refundRecovery;

    // 3 — the optional AI layer, on top of the same revenue
    const aiValue = revenueMonth * (v.aiPct / 100);

    // 4 — loyalty: new guests in, a tenth of them turned into regulars
    const newGuests = ordersMonth * M.newCustomerShare;
    const newRegulars = newGuests * M.repeatConversion;
    const loyaltyValue = newRegulars * v.aov * M.extraVisitsPerRegular;

    const gain = timeValue + refundValue + aiValue + loyaltyValue;
    const cost = M.pricePerOutletPerDay * v.outlets * M.daysPerMonth;
    const net = gain - cost;

    const perDay = gain / M.daysPerMonth;
    const paybackHours = perDay > 0 ? (cost / perDay) * 24 : 0;

    return {
      ordersMonth,
      revenueMonth,
      hoursSaved,
      timeValue,
      lossToday,
      refundValue,
      aiValue,
      newGuests,
      newRegulars,
      loyaltyValue,
      gain,
      cost,
      net,
      multiple: cost > 0 ? gain / cost : 0,
      paybackHours,
    };
  }, [v]);

  /** Every gain line prints the sum it came from, with the live numbers in it. */
  const LINES: { icon: IconName; k: string; working: string; value: number }[] = [
    {
      icon: "clock",
      k: "Waiter time you get back",
      working: `${num(r.ordersMonth)} orders × ${ROI_MODEL.minutesPerOrder} min = ${num(
        r.hoursSaved,
      )} h × £${ROI_MODEL.waiterHourlyRate}/h`,
      value: r.timeValue,
    },
    {
      icon: "xCircle",
      k: "Wrong orders you stop paying for",
      working: `${ROI_MODEL.refundRecovery * 100}% of the ${money(r.lossToday)} you lose today`,
      value: r.refundValue,
    },
    {
      icon: "zap",
      k: "AI Waiter uplift",
      working: `${v.aiPct}% more on ${money(r.revenueMonth)} of revenue`,
      value: r.aiValue,
    },
    {
      icon: "heart",
      k: "Guests who start coming back",
      working: `${num(r.newGuests)} new guests → ${
        ROI_MODEL.repeatConversion * 100
      }% return = ${num(r.newRegulars)} × £${v.aov}`,
      value: r.loyaltyValue,
    },
  ];

  return (
    <div className="relative overflow-hidden border border-ink-2 bg-ink text-white shadow-lg">
      <div className="glow glow-brand absolute -right-32 -top-40 h-[420px] w-[520px] opacity-[0.16]" />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand via-brand/50 to-transparent"
      />

      {/* ---- head ---- */}
      <div className="relative flex flex-wrap items-center gap-3.5 border-b border-white/10 p-[1.1rem] sm:p-[1.4rem_1.8rem]">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-ico border border-brand/40 bg-brand/[0.14] text-brand-light">
          <Icon name="barChart" size={20} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="text-[1.2rem] font-extrabold tracking-[-0.03em] text-white sm:text-[1.35rem]">
            ROI calculator
          </div>
          {/* the framing line lives on the orange block now, where the answer
              actually lands */}
          <div className="text-[0.88rem] text-white/85">Your own numbers, live</div>
        </div>
        <span className="ml-auto hidden items-center gap-2 border border-white/25 px-[0.8rem] py-[0.4rem] font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/75 sm:inline-flex">
          <i className="h-1.5 w-1.5 rounded-full bg-brand" />
          Live estimate
        </span>
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* ---- 01 · the inputs ---- */}
        <div className="border-b border-white/10 p-[1.1rem] sm:p-[1.6rem_1.8rem] lg:border-b-0 lg:border-r">
          <StepLabel n="1">Tell it about your restaurant</StepLabel>

          <div className="mt-5 grid gap-[1.35rem]">
            {FIELDS.map((f) => {
              const value = v[f.key];
              const fill = ((value - f.min) / (f.max - f.min)) * 100;

              return (
                <label key={f.key} className="block min-w-0">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="min-w-0 text-[0.95rem] font-bold tracking-[-0.02em] text-white">
                      {f.label}
                    </span>
                    <span className="flex-none font-mono text-[1.15rem] font-extrabold tabular-nums text-brand-light">
                      {f.print(value)}
                    </span>
                    <span className="w-full text-[0.82rem] text-white/85">{f.hint}</span>
                  </span>
                  <input
                    type="range"
                    className="rng rng-dark mt-1.5"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={value}
                    style={{ ["--fill" as string]: `${fill}%` }}
                    onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
                    aria-label={`${f.label} — ${f.hint}`}
                  />
                </label>
              );
            })}
          </div>

          {/* the one line that makes every number on the right legible */}
          <div className={`${PANEL} mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-[0.85rem_1rem]`}>
            <span className="text-[0.88rem] font-bold text-white/85">That is a month of</span>
            <span className="font-mono text-[1rem] font-bold tabular-nums text-white">
              {num(r.ordersMonth)} orders · {money(r.revenueMonth)}
            </span>
          </div>
        </div>

        {/* ---- 02 / 03 · the answer ---- */}
        <div className="p-[1.1rem] sm:p-[1.6rem_1.8rem]">
          <StepLabel n="2">What Nova-Restro gives back, every month</StepLabel>

          <div className="mt-4 grid gap-px bg-white/10">
            {LINES.map((l) => (
              <div
                key={l.k}
                className="flex items-center gap-3 bg-[#0C1523] p-[0.8rem_0.85rem] sm:gap-3.5 sm:p-[0.9rem_1rem]"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-ico-sm border border-white/10 bg-white/[0.05] text-brand-light">
                  <Icon name={l.icon} size={16} strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  {/* the label carries the brand, the arithmetic under it is
                      pure white — on navy that is the pair that stays legible */}
                  <span className="block text-[0.92rem] font-bold leading-[1.3] tracking-[-0.02em] text-brand-light">
                    {l.k}
                  </span>
                  <span className="mt-[0.2rem] block font-mono text-[0.78rem] leading-[1.45] text-white">
                    {l.working}
                  </span>
                </span>
                <span className="flex-none font-mono text-[1.05rem] font-bold tabular-nums text-white">
                  {money(l.value)}
                </span>
              </div>
            ))}

            <div className="flex items-center gap-3 bg-brand/[0.12] p-[0.8rem_0.85rem] sm:gap-3.5 sm:p-[0.9rem_1rem]">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-ico-sm border border-brand/45 bg-brand/20 text-brand-light">
                <Icon name="check" size={16} strokeWidth={3} />
              </span>
              <span className="min-w-0 flex-1 text-[0.98rem] font-extrabold tracking-[-0.025em] text-white">
                Total back
              </span>
              <span className="flex-none font-mono text-[1.15rem] font-extrabold tabular-nums text-brand-light">
                {money(r.gain)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <StepLabel n="3">What it costs you</StepLabel>
            <div className={`${PANEL} mt-4 flex items-center gap-3 p-[0.8rem_0.85rem] sm:gap-3.5 sm:p-[0.9rem_1rem]`}>
              <span className="grid h-9 w-9 flex-none place-items-center rounded-ico-sm border border-white/15 bg-white/[0.07] text-white/75">
                <Icon name="card" size={16} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.92rem] font-bold tracking-[-0.02em] text-brand-light">
                  Nova-Restro
                </span>
                <span className="mt-[0.2rem] block font-mono text-[0.78rem] text-white">
                  £{ROI_MODEL.pricePerOutletPerDay} × {v.outlets}{" "}
                  {v.outlets === 1 ? "outlet" : "outlets"} × {ROI_MODEL.daysPerMonth} days
                </span>
              </span>
              <span className="flex-none font-mono text-[1.05rem] font-bold tabular-nums text-white">
                −{money(r.cost)}
              </span>
            </div>
          </div>

          {/* ---- the number the whole thing is for ---- */}
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-5 gap-y-4 bg-[linear-gradient(135deg,#EA580C,#B93C08)] p-[1.1rem_1.15rem] shadow-[0_18px_44px_-18px_rgba(234,88,12,.7)] sm:p-[1.35rem_1.5rem]">
            {/* what the whole calculator is answering, sitting on the answer */}
            <div className="w-full border-b border-white/25 pb-[0.85rem]">
              <span className="block text-[0.95rem] font-bold leading-[1.4] tracking-[-0.02em] text-white sm:text-[1.02rem]">
                What £2 a day gives back, in your own numbers
              </span>
            </div>

            <div className="min-w-0">
              <span className="block text-[0.74rem] font-extrabold uppercase tracking-[0.14em] text-white/85">
                You keep, every month
              </span>
              <motion.b
                key={Math.round(r.net)}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-[0.3rem] block text-[clamp(2.3rem,5vw,3.3rem)] font-black leading-[0.95] tracking-[-0.05em] text-white"
              >
                {money(r.net)}
              </motion.b>
              <span className="mt-[0.35rem] block font-mono text-[0.82rem] font-semibold text-white/90">
                {money(r.gain)} back − {money(r.cost)} paid
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 border border-white/35 bg-white/[0.14] px-[0.75rem] py-[0.4rem] font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white">
                <Icon name="trendUp" size={12} strokeWidth={3} />£{Math.round(r.multiple)} back per
                £1
              </span>
              <span className="inline-flex items-center gap-2 border border-white/35 bg-white/[0.14] px-[0.75rem] py-[0.4rem] font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em] text-white">
                <Icon name="clock" size={12} strokeWidth={2.6} />
                {r.paybackHours < 24
                  ? `pays for itself in ${Math.max(1, Math.round(r.paybackHours))} h`
                  : `pays for itself in ${Math.round(r.paybackHours / 24)} days`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---- the part that isn't money ---- */}
      <div className="relative flex flex-col gap-3 border-t border-white/10 p-[1.1rem] sm:flex-row sm:items-center sm:gap-5 sm:p-[1.2rem_1.8rem]">
        <span className="flex items-start gap-3 sm:items-center">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-ico-sm border border-white/15 bg-white/[0.07] text-brand-light">
            <Icon name="serving" size={16} strokeWidth={2.2} />
          </span>
          <span className="text-[0.92rem] leading-[1.55] text-white/85">
            <b className="text-white">Not counted above:</b> those {num(r.hoursSaved)} hours stop
            being spent walking to the kitchen and start being spent with guests — the part that
            shows up in your reviews, not your ledger.
          </span>
        </span>
        <span className="flex-none text-[0.8rem] leading-[1.5] text-white/70 sm:ml-auto sm:max-w-[22ch] sm:text-right">
          An estimate. Every line shows the sum it came from.
        </span>
      </div>
    </div>
  );
}

export default RoiCalculator;
