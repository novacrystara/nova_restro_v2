import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface PlaceholderProps {
  icon?: IconName;
  tag: string;
  text: string;
  dim: string;
  /** dark surfaces (ink sections, hero frame) */
  dark?: boolean;
  /** omit and use `className` (e.g. `min-h-[240px] sm:min-h-[380px]`) for responsive heights */
  minHeight?: number;
  className?: string;
}

/**
 * Image / video slot the client fills in later.
 * Deliberately clean: flat tint + hairline dashed edge, sharp corners,
 * no patterned fill. Only the icon tile is rounded.
 */
export function Placeholder({
  icon = "image",
  tag,
  text,
  dim,
  dark = false,
  minHeight,
  className,
}: PlaceholderProps) {
  return (
    <div
      style={minHeight ? { minHeight } : undefined}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 px-6 py-8 text-center rounded-none border border-dashed",
        dark
          ? "border-brand-light/25 bg-white/[0.035]"
          : "border-edge-2 bg-canvas",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-[42px] w-[42px] flex-none place-items-center rounded-ico border",
          dark
            ? "border-brand-light/30 bg-white/[0.07] text-brand-light"
            : "border-edge-2 bg-surface text-brand-deep shadow-xs",
        )}
      >
        <Icon name={icon} size={20} strokeWidth={1.9} />
      </span>

      <span
        className={cn(
          "text-[0.625rem] font-extrabold uppercase tracking-[0.18em]",
          dark ? "text-brand-light" : "text-brand-deep",
        )}
      >
        {tag}
      </span>

      <span
        className={cn(
          "max-w-[46ch] text-[0.8125rem] font-medium leading-[1.5]",
          dark ? "text-white/70" : "text-ink-3",
        )}
      >
        {text}
      </span>

      <span
        className={cn(
          "font-mono text-[0.6875rem]",
          dark ? "text-white/40" : "text-muted",
        )}
      >
        {dim}
      </span>
    </div>
  );
}

export default Placeholder;
