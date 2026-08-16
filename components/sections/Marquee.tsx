"use client";

import { MARQUEE_ITEMS } from "@/lib/data";
import Icon from "@/components/ui/Icon";

/**
 * Seamless feature ticker. The track holds the list twice and shifts exactly
 * -50%, so the loop has no seam. A pinned ink label anchors it on the left,
 * the rail itself fades out at both ends, and hovering pauses the travel.
 */
export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="group relative mt-[clamp(48px,6vw,72px)] border-y border-edge bg-surface">
      <div className="flex items-stretch">
        {/* pinned label */}
        <div className="relative hidden flex-none items-center gap-[0.6rem] bg-ink px-[clamp(18px,2.2vw,30px)] text-white sm:flex">
          <Icon name="zap" size={14} strokeWidth={2.2} className="text-brand-light" />
          <span className="whitespace-nowrap text-[0.66rem] font-bold uppercase tracking-[0.18em]">
            Included in one plan
          </span>
          {/* the ink block bleeds into the rail with a soft edge */}
          <span className="absolute -right-px top-0 h-full w-px bg-edge" />
        </div>

        {/* rail */}
        <div
          className="relative flex-1 overflow-hidden py-[24px]"
          style={{
            WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 92%,transparent)",
            maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 92%,transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
            {items.map((label, i) => (
              <span key={`${label}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap px-[clamp(20px,2.4vw,34px)] text-[0.84rem] font-semibold tracking-[-0.012em] text-ink-3 transition-colors duration-300 hover:text-ink">
                  {label}
                </span>
                {/* separator: a small brand lozenge on its corner */}
                <i className="block h-[5px] w-[5px] flex-none rotate-45 bg-brand/45" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marquee;
