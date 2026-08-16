"use client";

import { FOOTER_COLUMNS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import DemoLink from "@/components/demo/DemoLink";
import Icon, { type IconName } from "@/components/ui/Icon";

const SOCIALS: { name: IconName; label: string; href: string }[] = [
  { name: "x", label: "X", href: "#top" },
  { name: "linkedin", label: "LinkedIn", href: "#top" },
  { name: "instagram", label: "Instagram", href: "#top" },
];

const footerLink =
  "block w-full py-[0.35rem] text-[0.88rem] text-white/70 transition-colors duration-200 hover:text-brand-light";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="demo"
      className="relative overflow-hidden bg-ink px-0 pb-8 pt-[clamp(56px,7vw,90px)] text-white"
    >
      <div className="glow glow-brand absolute -left-40 -top-56 h-[400px] w-[700px] opacity-[0.16]" />

      <div className="wrap relative">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-[clamp(24px,4vw,48px)]">
            <div>
              <a
                href="#top"
                className="flex items-center gap-[0.65rem] text-[1.2rem] font-extrabold tracking-[-0.03em] text-white"
              >
                <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-ico bg-brand">
                  <Icon name="logo" size={18} strokeWidth={2.4} className="text-white" />
                </span>
                Nova-Restro
              </a>
              <p className="mt-4 max-w-[34ch] text-[0.88rem] leading-relaxed text-white/50">
                The operating system for your restaurant. Live visibility across every outlet — sales,
                tables, orders, customers, kitchen and performance.
              </p>
              <div className="mt-[1.6rem] flex flex-wrap gap-[0.6rem]">
                <Button href="#action" variant="primary" size="sm">
                  See Nova-Restro in Action
                </Button>
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h5 className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white/40">
                  {col.title}
                </h5>
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="block py-[0.35rem] text-[0.88rem] text-white/70 transition-colors duration-200 hover:text-brand-light"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}

            <div>
              <h5 className="mb-4 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white/40">
                Company
              </h5>
              <a
                href="#top"
                className="block py-[0.35rem] text-[0.88rem] text-white/70 transition-colors duration-200 hover:text-brand-light"
              >
                About
              </a>
              <DemoLink className={footerLink}>Book a Demo</DemoLink>
              <DemoLink className={footerLink}>Contact</DemoLink>
              <a
                href="#top"
                className="block py-[0.35rem] text-[0.88rem] text-white/70 transition-colors duration-200 hover:text-brand-light"
              >
                Privacy
              </a>
              <a
                href="#top"
                className="block py-[0.35rem] text-[0.88rem] text-white/70 transition-colors duration-200 hover:text-brand-light"
              >
                Terms
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-[clamp(36px,5vw,60px)] flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[0.78rem] text-white/40">
          <span>
            © {year} Nova-Restro. Run your restaurant. Don&apos;t let your restaurant run you.
          </span>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-[34px] w-[34px] place-items-center rounded-none border border-white/[0.12] text-white/60 transition-colors duration-200 hover:border-brand-light hover:bg-brand-light hover:text-ink"
              >
                <Icon name={s.name} size={15} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
