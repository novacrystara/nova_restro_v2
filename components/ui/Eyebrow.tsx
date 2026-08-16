import { cn } from "@/lib/cn";

/** Small uppercase section label with a brand dot. */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em]",
        onDark ? "text-white/60" : "text-ink-3",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          onDark
            ? "bg-brand-light shadow-[0_0_0_4px_rgba(251,146,60,.18)]"
            : "bg-brand shadow-[0_0_0_4px_var(--brand-wash)]",
        )}
      />
      {children}
    </span>
  );
}

export default Eyebrow;
