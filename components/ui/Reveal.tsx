"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Build a "rise into place" variant with the delay baked into the variant's
 * own transition. Framer Motion gives a variant's `transition` precedence over
 * the component's `transition` prop, so the delay has to live in here.
 */
export function rise(delay = 0, y = 26, duration = 0.85): Variants {
  return {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
  };
}

interface RevealProps {
  children: ReactNode;
  /** seconds */
  delay?: number;
  className?: string;
  as?: ElementType;
  variants?: Variants;
  /** how much of the element must be visible before it plays */
  amount?: number;
  y?: number;
  id?: string;
}

/** Scroll-triggered entrance. The site's default. Plays once. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  variants,
  amount,
  y = 26,
  id,
}: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={amount !== undefined ? { ...viewportOnce, amount } : viewportOnce}
      variants={variants ?? rise(delay, y)}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its motion children (they only need `variants`). */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0,
  amount = 0.15,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  as?: ElementType;
  id?: string;
}) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
