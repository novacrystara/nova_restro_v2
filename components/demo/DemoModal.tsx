"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent";

interface Fields {
  name: string;
  email: string;
  phone: string;
  restaurant: string;
  outlets: string;
  message: string;
}

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  restaurant: "",
  outlets: "1",
  message: "",
};

const OUTLET_OPTIONS = ["1", "2–5", "6–15", "16–50", "50+"];

const inputBase =
  "w-full rounded-none border border-edge bg-surface px-[0.9rem] py-[0.8rem] text-[0.9rem] text-ink " +
  "placeholder:text-muted/80 outline-none transition-[border-color,box-shadow] duration-200 " +
  "focus:border-brand focus:shadow-[0_0_0_3px_var(--brand-wash)]";

function Field({
  label,
  children,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-[0.45rem] block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink-3">
        {label}
        {required && <span className="ml-1 text-brand-deep">*</span>}
      </span>
      {children}
    </label>
  );
}

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const set = useCallback(
    <K extends keyof Fields>(key: K, value: Fields[K]) =>
      setFields((f) => ({ ...f, [key]: value })),
    [],
  );

  /* Esc to close + scroll lock (also pauses Lenis) */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;

      // simple focus trap
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    window.dispatchEvent(new Event("nova:lock-scroll"));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 320);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.dispatchEvent(new Event("nova:unlock-scroll"));
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  /* reset a little after closing so the exit animation stays clean */
  useEffect(() => {
    if (open) return;
    const t = window.setTimeout(() => {
      setStatus("idle");
      setFields(EMPTY);
    }, 400);
    return () => window.clearTimeout(t);
  }, [open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    // No backend yet — wire this to your CRM / API route when it exists.
    window.setTimeout(() => setStatus("sent"), 900);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        // data-lenis-prevent: without it Lenis swallows the wheel/touch events
        // over the dialog and nothing inside it scrolls
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6"
        >
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink/60 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            // the dialog never grows past the window: the form scrolls inside
            // it and the action bar stays pinned, so the submit is always there
            style={{ maxHeight: "calc(100dvh - 2rem)" }}
            className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[880px] flex-col overflow-hidden rounded-none border border-edge bg-surface shadow-lg"
            initial={{ opacity: 0, y: 34, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.985 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-none border border-edge bg-surface text-ink-3 transition-colors duration-200 hover:border-ink hover:text-ink sm:right-4 sm:top-4"
            >
              <Icon name="close" size={17} strokeWidth={2.2} />
            </button>

            <div className="grid min-h-0 flex-1 md:grid-cols-[0.85fr_1.15fr]">
              {/* left rail */}
              <div className="relative hidden overflow-y-auto bg-ink p-8 text-white md:block">
                <div className="bg-dots bg-dots-brand absolute inset-0 opacity-30" />
                <div className="glow glow-brand -left-24 -top-32 h-[320px] w-[320px] opacity-40" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 border border-brand-light/30 bg-brand-light/10 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
                    Book a demo
                  </span>
                  <h3 className="mt-6 text-[1.55rem] font-extrabold leading-[1.1] tracking-[-0.04em] text-white">
                    See your restaurant, live.
                  </h3>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-white/55">
                    Thirty minutes, your outlets on screen, no slide deck. We&apos;ll show you exactly
                    what Nova-Restro would tell you about a day you already know.
                  </p>

                  <ul className="mt-8 space-y-3">
                    {[
                      "Walkthrough on your own numbers",
                      "Every feature — nothing gated",
                      "Hardware & rollout answered",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-3 text-[0.85rem] text-white/75">
                        <span className="mt-[3px] grid h-[18px] w-[18px] flex-none place-items-center rounded-full bg-brand-light text-ink">
                          <Icon name="check" size={11} strokeWidth={3.4} />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 border-t border-white/10 pt-5 text-[0.75rem] text-white/40">
                    Typical reply time — under 4 working hours.
                  </div>
                </div>
              </div>

              {/* form / success */}
              <div className="flex min-h-0 flex-col">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="flex min-h-[380px] flex-1 flex-col items-center justify-center overflow-y-auto p-6 text-center sm:p-8"
                    >
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
                        className="grid h-16 w-16 place-items-center rounded-full bg-success text-white shadow-[0_16px_40px_-14px_rgba(107,143,94,.6)]"
                      >
                        <Icon name="check" size={28} strokeWidth={3} />
                      </motion.span>
                      <h3 className="mt-6 text-[1.6rem] font-extrabold tracking-[-0.04em]">
                        Request received.
                      </h3>
                      <p className="mt-3 max-w-[38ch] text-[0.9rem] text-body">
                        Thanks{fields.name ? `, ${fields.name.split(" ")[0]}` : ""} — we&apos;ll be in
                        touch at <strong className="font-semibold text-ink">{fields.email}</strong> to
                        lock in a time.
                      </p>
                      <Button variant="dark" size="md" className="mt-8" onClick={onClose}>
                        Back to the site
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      {/* header / body / action bar: only the body scrolls, so
                          the title and the submit are always on screen */}
                      <div className="flex flex-none items-start justify-between gap-4 border-b border-edge p-6 pb-5 sm:p-8 sm:pb-6">
                        <div>
                          <h3
                            id="demo-modal-title"
                            className="text-[1.4rem] font-extrabold tracking-[-0.04em] sm:text-[1.6rem]"
                          >
                            Book a demo
                          </h3>
                          <p className="mt-2 text-[0.875rem] text-body">
                            Tell us where you run, and we&apos;ll bring the rest.
                          </p>
                        </div>
                        {/* keeps the copy clear of the close button */}
                        <span aria-hidden className="h-10 w-10 flex-none" />
                      </div>

                      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Full name" required>
                            <input
                              ref={firstFieldRef}
                              required
                              type="text"
                              name="name"
                              autoComplete="name"
                              placeholder="Aarav Mehta"
                              value={fields.name}
                              onChange={(e) => set("name", e.target.value)}
                              className={inputBase}
                            />
                          </Field>

                          <Field label="Work email" required>
                            <input
                              required
                              type="email"
                              name="email"
                              autoComplete="email"
                              placeholder="you@restaurant.com"
                              value={fields.email}
                              onChange={(e) => set("email", e.target.value)}
                              className={inputBase}
                            />
                          </Field>

                          <Field label="Phone">
                            <input
                              type="tel"
                              name="phone"
                              autoComplete="tel"
                              placeholder="+44 7700 900123"
                              value={fields.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              className={inputBase}
                            />
                          </Field>

                          <Field label="Restaurant / group" required>
                            <input
                              required
                              type="text"
                              name="restaurant"
                              autoComplete="organization"
                              placeholder="Nova Kitchen Group"
                              value={fields.restaurant}
                              onChange={(e) => set("restaurant", e.target.value)}
                              className={inputBase}
                            />
                          </Field>

                          <Field label="Number of outlets" className="sm:col-span-2">
                            <div className="flex flex-wrap gap-2">
                              {OUTLET_OPTIONS.map((o) => (
                                <button
                                  key={o}
                                  type="button"
                                  onClick={() => set("outlets", o)}
                                  className={cn(
                                    "rounded-none border px-[0.95rem] py-[0.55rem] text-[0.82rem] font-semibold transition-colors duration-200",
                                    fields.outlets === o
                                      ? "border-brand-deep bg-brand text-white"
                                      : "border-edge bg-surface text-ink-3 hover:border-edge-2 hover:bg-brand-mist",
                                  )}
                                >
                                  {o}
                                </button>
                              ))}
                            </div>
                          </Field>

                          <Field label="Anything we should know?" className="sm:col-span-2">
                            <textarea
                              name="message"
                              rows={3}
                              placeholder="Current POS, rollout timing, what's hurting most…"
                              value={fields.message}
                              onChange={(e) => set("message", e.target.value)}
                              className={cn(inputBase, "resize-none")}
                            />
                          </Field>
                        </div>
                      </div>

                      <div className="flex flex-none flex-wrap items-center gap-x-4 gap-y-2 border-t border-edge bg-surface p-4 sm:px-8 sm:py-5">
                        <Button
                          type="submit"
                          size="md"
                          variant="primary"
                          disabled={status === "sending"}
                          className="w-full sm:w-auto"
                        >
                          {status === "sending" ? "Sending…" : "Request my demo"}
                          {status === "idle" && <Icon name="arrowRight" size={16} strokeWidth={2.4} />}
                        </Button>
                        <span className="text-[0.75rem] text-muted">
                          No spam. No sales sequence. One human reply.
                        </span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default DemoModal;
