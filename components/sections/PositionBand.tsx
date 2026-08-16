"use client";

import Reveal from "@/components/ui/Reveal";
import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * The argument, drawn: every module of the system, with the one everybody
 * calls "the product" sitting as a single line among them. Static by design —
 * it is a diagram, not a demo.
 */
const MODULES: { icon: IconName; label: string; pos?: boolean }[] = [
  { icon: "serving", label: "AI waiter" },
  { icon: "table", label: "Table ordering" },
  { icon: "kds", label: "Kitchen display" },
  { icon: "floorplan", label: "Floor & tables" },
  { icon: "card", label: "Payments · POS", pos: true },
  { icon: "heart", label: "Loyalty & CRM" },
  { icon: "barChart", label: "Analytics" },
];

export function PositionBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-[clamp(46px,5.8vw,84px)] text-white">
      <div className="glow glow-brand absolute left-[-10%] top-[-200px] h-[440px] w-[720px] opacity-[0.22]" />

      <div className="wrap relative grid items-center gap-[clamp(36px,5vw,72px)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---- the claim ---- */}
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="mb-[1.4rem] inline-flex items-center gap-[0.8rem] text-base font-semibold text-white/50">
              Not{" "}
              <s className="decoration-destructive decoration-2">
                &ldquo;another Restaurant POS&rdquo;
              </s>
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="t-h1 text-white">
              &ldquo;The operating system for your{" "}
              <span className="text-brand-light">restaurant.</span>&rdquo;
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="lead mx-auto mt-[1.6rem] max-w-[44ch] text-white/60 lg:mx-0">
              The POS is merely one part of it.
            </p>
          </Reveal>
        </div>

        {/* ---- the system, as a panel ---- */}
        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-[460px] border border-white/12 bg-[linear-gradient(180deg,#111D2D,#0C1523)] shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="flex gap-[5px]">
                <i className="h-[7px] w-[7px] rounded-full bg-white/20" />
                <i className="h-[7px] w-[7px] rounded-full bg-white/20" />
                <i className="h-[7px] w-[7px] rounded-full bg-brand/70" />
              </span>
              <span className="ml-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white/45">
                Nova-Restro
              </span>
              <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/30">
                {MODULES.length} modules
              </span>
            </div>

            <ul className="divide-y divide-white/[0.07]">
              {MODULES.map((m) => (
                <li
                  key={m.label}
                  className={`flex items-center gap-3 px-4 py-[0.85rem] ${
                    m.pos ? "bg-brand/[0.09]" : ""
                  }`}
                >
                  {/* the POS row is marked, not enlarged — the point is that it
                      is one line of six */}
                  <span
                    className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-ico-sm border ${
                      m.pos
                        ? "border-brand/50 bg-brand/20 text-brand-light"
                        : "border-white/10 bg-white/[0.04] text-white/55"
                    }`}
                  >
                    <Icon name={m.icon} size={15} strokeWidth={1.9} />
                  </span>
                  <span
                    className={`text-[0.86rem] font-semibold tracking-[-0.01em] ${
                      m.pos ? "text-white" : "text-white/70"
                    }`}
                  >
                    {m.label}
                  </span>
                  {m.pos && (
                    <span className="ml-auto flex-none border border-brand/40 px-[0.5rem] py-[0.15rem] font-mono text-[0.58rem] uppercase tracking-[0.1em] text-brand-light">
                      1 of {MODULES.length}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5 border-t border-white/10 px-4 py-[0.9rem]">
              <span aria-hidden className="h-px w-6 flex-none bg-brand/60" />
              <span className="text-[0.72rem] font-semibold text-white/45">
                One system. Every part of the day.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PositionBand;
