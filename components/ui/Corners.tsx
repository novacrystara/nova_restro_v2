import { cn } from "@/lib/cn";

/**
 * Four brand corner brackets that draw themselves in on hover — the tile's
 * only hover state, so a grid of them stays calm until you point at one.
 *
 * Drop inside any `relative` element that also carries the `group` class.
 * Pass `active` to hold them open regardless of the pointer (the scroll-driven
 * story steps mark the step you are reading this way).
 */
export function Corners({ className, active = false }: { className?: string; active?: boolean }) {
  const base =
    "pointer-events-none absolute h-[11px] w-[11px] border-brand " +
    "transition-all duration-300 ease-smooth " +
    (active ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 group-hover:opacity-100");

  // the idle nudge only exists while the brackets are hidden — once they are
  // held open there is nothing left to travel
  const idle = (offset: string) =>
    active ? "" : `${offset} group-hover:translate-x-0 group-hover:translate-y-0`;

  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "left-[7px] top-[7px] border-l-2 border-t-2", idle("translate-x-1 translate-y-1"))} />
      <span className={cn(base, "right-[7px] top-[7px] border-r-2 border-t-2", idle("-translate-x-1 translate-y-1"))} />
      <span className={cn(base, "bottom-[7px] left-[7px] border-b-2 border-l-2", idle("translate-x-1 -translate-y-1"))} />
      <span className={cn(base, "bottom-[7px] right-[7px] border-b-2 border-r-2", idle("-translate-x-1 -translate-y-1"))} />
    </span>
  );
}

export default Corners;
