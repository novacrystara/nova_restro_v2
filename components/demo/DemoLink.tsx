"use client";

import { cn } from "@/lib/cn";
import { useDemoModal } from "./DemoModalProvider";

/** Text-link styled trigger for the Book-a-Demo dialog (footer, inline copy). */
export function DemoLink({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { openModal } = useDemoModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openModal();
      }}
      className={cn("block text-left", className)}
    >
      {children}
    </button>
  );
}

export default DemoLink;
