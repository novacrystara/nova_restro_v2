import { cn } from "@/lib/cn";

export function Chip({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "brand" | "ghost";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-none border px-[0.85rem] py-[0.4rem] text-[0.78rem] font-semibold",
        variant === "default" && "border-edge bg-surface text-ink-3 shadow-xs",
        variant === "brand" && "border-brand-deep bg-brand text-white",
        variant === "ghost" && "border-edge bg-transparent text-ink-3",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Chip;
