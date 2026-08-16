"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ROI_MODEL } from "@/lib/data";
import { EASE } from "@/lib/motion";
import Icon, { type IconName } from "@/components/ui/Icon";

/* --------------------------------------------------------------- inputs --- */

interface Field {
  key: "outlets" | "orders" | "aov" | "wage";
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  /** how the current value prints beside the label */
  format: (v: number) => string;
}

const FIELDS: Field[] = [
  {
    key: "outlets",
    label: "Outlets",
    hint: "sites on the account",
    min: 1,
    max: 20,
    step: 1,
    format: (v) => String(v),
  },
  {
    key: "orders",
    label: "Orders a day",
    hint: "per outlet",
    min: 20,
    max: 400,
    step: 5,
    format: (v) => v.toLocaleString("en-GB"),
  },
  {
    key: "aov",
    label: "Average order value",
    hint: "what a table spends",
    min: 5,
    max: 150,
    step: 1,
    format: (v) => `£${v}`,
  },
  {
    key: "wage",
    label: "Floor staff cost",
    hint: "per hour, all-in",
    min: 8,
    max: 30,
    step: 0.5,
    format: (v) => `£${v.toFixed(2)}`,
  },
];

const DEFAULTS = { outlets: 2, orders: 90, aov: 38, wage: 12.5 };

/* -------------------------------------------------------------- helpers --- */

const money = (n: number) =>
  `£${Math.round(n).toLocaleString("en-GB")}`;

const hours = (n: number) =>
  `${Math.round(n).toLocaleString("en-GB")} h`;

/* ----------------------------------------------------------------- view --- */

export function RoiCalculator() {
  const [v, setV] = useState(DEFAULTS);

  const r = useMemo(() => {
    const { minutesPerOrder, timeRealised, turnUplift, repeatUplift, pricePerOutletPerDay, daysPerMonth } =
      ROI_MODEL;

    const ordersMonth = v.orders * v.outlets * daysPerMonth;
    const revenueMonth = ordersMonth * v.aov;

    // 1 — the floor time a hand-taken order costs, counted at a third
    const hoursSaved = (ordersMonth * minutesPerOrder) / 60;
    const timeValue = hoursSaved * timeRealised * v.wage;

    // 2 — tables that turn faster serve more covers on the same floor
    const turnValue = revenueMonth * turnUplift;

    // 3 — guests who come back because somebody remembered them
    const repeatValue = revenueMonth * repeatUplift;

    const gain = timeValue + turnValue + repeatValue;
    const cost = pricePerOutletPerDay * v.outlets * daysPerMonth;
    const net = gain - cost;

    // how far into the month it has already paid for itself
    const perDay = gain / daysPerMonth;
    const paybackHours = perDay > 0 ? (cost / perDay) * 24 : 0;

    return {
      hoursSaved: hoursSaved * timeRealised,
      timeValue,
      turnValue,
      repeatValue,
      gain,
      cost,
      net,
      multiple: cost > 0 ? gain / cost : 0,
      paybackHours,
      revenueMonth,
    };
  }, [v]);

  const LINES: { icon: IconName; k: string; sub: string; value: number; meta?: string }[] = [
    {
      icon: "clock",
      k: "Floor time recovered",
      sub: `${ROI_MODEL.minutesPerOrder} min an order, a third of it counted`,
      value: r.timeValue,
      meta: hours(r.hoursSaved),
    },
    {
      icon: "refresh",
      k: "Faster table turns",
      sub: `+${(ROI_MODEL.turnUplift * 100).toFixed(0)}% covers on the same floor`,
      value: r.turnValue,
    },
    {
      icon: "heart",
      k: "Guests who come back",
      sub: `+${(ROI_MODEL.repeatUplift * 100).toFixed(1)}% revenue from regulars`,
      value: r.repeatValue,
    },
  ];

  return (
    // w-full + min-w-0: the section drops this into a flex cell, where a
    // content-sized child would push the whole card past a phone's viewport
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden border border-edge bg-surface shadow-md">
      {/* ---- head ---- */}
      <div className="flex flex-wrap items-center gap-3 border-b border-edge bg-surface-2 p-[0.95rem] sm:p-[1.3rem_1.6rem]">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-ico border border-brand-deep/25 bg-brand-wash text-brand-deep">
          <Icon name="barChart" size={17} strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <div className="text-[0.95rem] font-extrabold tracking-[-0.03em] sm:text-[1rem]">
            ROI calculator
          </div>
          <div className="text-[0.72rem] text-muted sm:text-[0.76rem]">
            Move the numbers to match your restaurant
          </div>
        </div>
      </div>

      {/* ---- inputs ---- */}
      <div className="grid gap-[1rem] p-[0.95rem] sm:gap-[1.25rem] sm:p-[1.5rem_1.6rem]">
        {FIELDS.map((f) => {
          const value = v[f.key];
          const fill = ((value - f.min) / (f.max - f.min)) * 100;

          return (
            <label key={f.key} className="block min-w-0">
              <span className="flex items-baseline justify-between gap-2.5">
                <span className="min-w-0 text-[0.75rem] font-bold tracking-[-0.01em] text-ink sm:text-[0.78rem]">
                  {f.label}
                  {/* the hint is the first thing to go when the row is tight */}
                  <span className="ml-1.5 hidden font-normal text-muted sm:inline">{f.hint}</span>
                </span>
                <span className="flex-none font-mono text-[0.88rem] font-bold tabular-nums text-brand-deep sm:text-[0.9rem]">
                  {f.format(value)}
                </span>
              </span>
              <input
                type="range"
                className="rng mt-1"
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

      {/* ---- the answer ---- */}
      <div className="mt-auto border-t border-edge bg-surface-2 p-[0.95rem] sm:p-[1.5rem_1.6rem]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <span className="text-[0.6rem] font-extrabold uppercase tracking-[0.1em] text-muted sm:text-[0.62rem] sm:tracking-[0.12em]">
            What it gives back, a month
          </span>
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted/70 sm:text-[0.6rem]">
            on {money(r.revenueMonth)} revenue
          </span>
        </div>

        <div className="mt-3 grid gap-px bg-edge">
          {LINES.map((l) => (
            <div
              key={l.k}
              className="flex items-center gap-2.5 bg-surface p-[0.6rem_0.65rem] sm:gap-3 sm:p-[0.7rem_0.8rem]"
            >
              <span className="grid h-7 w-7 flex-none place-items-center rounded-ico-sm border border-edge bg-canvas text-brand-deep">
                <Icon name={l.icon} size={13} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.76rem] font-bold tracking-[-0.02em] text-ink sm:text-[0.8rem]">
                  {l.k}
                </span>
                <span className="block truncate text-[0.62rem] text-muted sm:text-[0.66rem]">
                  {l.sub}
                </span>
              </span>
              <span className="flex-none text-right">
                <span className="block font-mono text-[0.84rem] font-bold tabular-nums text-ink sm:text-[0.9rem]">
                  {money(l.value)}
                </span>
                {l.meta && (
                  <span className="block font-mono text-[0.58rem] tabular-nums text-muted sm:text-[0.6rem]">
                    {l.meta}
                  </span>
                )}
              </span>
            </div>
          ))}

          <div className="flex items-center gap-2.5 bg-surface p-[0.6rem_0.65rem] sm:gap-3 sm:p-[0.7rem_0.8rem]">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-ico-sm border border-edge bg-canvas text-muted">
              <Icon name="card" size={13} strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.76rem] font-bold tracking-[-0.02em] text-ink sm:text-[0.8rem]">
                What Nova-Restro costs
              </span>
              <span className="block truncate text-[0.62rem] text-muted sm:text-[0.66rem]">
                £{ROI_MODEL.pricePerOutletPerDay} a day × {v.outlets}{" "}
                {v.outlets === 1 ? "outlet" : "outlets"} × 30
              </span>
            </span>
            <span className="flex-none font-mono text-[0.84rem] font-bold tabular-nums text-muted sm:text-[0.9rem]">
              −{money(r.cost)}
            </span>
          </div>
        </div>

        {/* the number the whole thing is for */}
        <div className="mt-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 bg-ink p-[0.9rem_0.95rem] text-white sm:p-[1.15rem_1.3rem]">
          <div className="min-w-0">
            <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.12em] text-white/45">
              Net, every month
            </span>
            <motion.b
              key={Math.round(r.net)}
              initial={{ opacity: 0.35, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-[0.25rem] block text-[clamp(1.7rem,4vw,2.5rem)] font-black leading-[1] tracking-[-0.045em] text-white"
            >
              {money(r.net)}
            </motion.b>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 border border-brand/45 bg-brand/[0.14] px-[0.6rem] py-[0.3rem] font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-brand-light">
              <Icon name="trendUp" size={11} strokeWidth={3} />
              {Math.round(r.multiple)}× return
            </span>
            <span className="inline-flex items-center gap-1.5 border border-white/15 px-[0.6rem] py-[0.3rem] font-mono text-[0.62rem] font-bold uppercase tracking-[0.08em] text-white/60">
              <Icon name="clock" size={11} strokeWidth={2.6} />
              {r.paybackHours < 24
                ? `pays back in ${Math.max(1, Math.round(r.paybackHours))} h`
                : `pays back in ${Math.round(r.paybackHours / 24)} days`}
            </span>
          </div>
        </div>

        <p className="mt-3 text-[0.66rem] leading-[1.5] text-muted">
          An estimate, from the assumptions printed on each line — the ten minutes a hand-taken
          order costs is the same arithmetic as the section above. Your mileage is your own.
        </p>
      </div>
    </div>
  );
}

export default RoiCalculator;
