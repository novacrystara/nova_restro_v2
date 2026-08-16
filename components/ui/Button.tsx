"use client";

import { motion } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost" | "light";
export type ButtonSize = "sm" | "md" | "lg";

const SIZES: Record<ButtonSize, string> = {
  sm: "h-[42px] px-[1.1rem] text-[0.85rem]",
  md: "h-[52px] px-6 text-[0.95rem]",
  lg: "h-[54px] px-7 text-[0.98rem] sm:h-[60px] sm:px-8 sm:text-[1.03rem]",
};

const VARIANTS: Record<ButtonVariant, string> = {
  // white on terracotta is 4.7:1 — dark text on it would only be 3.3:1
  primary: "bg-brand text-white shadow-brand hover:bg-brand-hi hover:shadow-brand-hi",
  dark: "bg-ink text-white shadow-md hover:bg-ink-2",
  outline: "bg-surface border border-edge-2 text-ink hover:border-ink",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  light: "bg-white/10 text-white border border-white/15 hover:bg-white/[0.16]",
};

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
}

/**
 * Sharp-cornered CTA. Lifts 2px on hover, primary gets a light sweep.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "group/btn relative inline-flex select-none items-center justify-center gap-[0.6rem]",
    "font-semibold tracking-[-0.01em] whitespace-nowrap overflow-hidden cursor-pointer rounded-none",
    "transition-[background-color,color,border-color,box-shadow] duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    SIZES[size],
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(100deg,transparent_20%,rgba(255,255,255,.75)_50%,transparent_80%)] group-hover/btn:animate-shimmer"
        />
      )}
      <span className="relative z-[1] inline-flex items-center gap-[0.55rem]">{children}</span>
    </>
  );

  const motionProps = {
    whileHover: disabled ? undefined : { y: -2 },
    whileTap: disabled ? undefined : { y: 0, scale: 0.985 },
    transition: { duration: 0.25, ease: EASE },
  } as const;

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} className={classes} {...motionProps} {...rest}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}

export default Button;
