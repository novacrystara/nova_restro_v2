# Nova-Restro

Marketing site for Nova-Restro — the operating system for restaurants.
Built from `docs/nova-restro.html` (the handmade reference design).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Motion | Framer Motion 11 |
| Scrolling | Lenis (inertial smooth scroll) |
| Font | Inter via `next/font` (self-hosted, no layout shift) |

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start
npm run typecheck
```

## Palette

| Role | Hex | Used for |
|---|---|---|
| `brand` | `#EA580C` | the primary — CTAs, highlighter marker, glows, timeline nodes |
| `ink` | `#0B1420` | text, and every dark block |
| `canvas` / `surface` | `#F8F8F7` / `#FFFFFF` | the page and the cards on it |
| `gold` | `#E8A33D` | warn / "needs attention" only — never a CTA |
| `success` | `#6B8F5E` | positive deltas, healthy outlets, confirmations |
| `destructive` | `#A3321F` | late, failing, negative |

Every hue carries two extra steps, and picking the right one is the whole game:

- **`-deep`** — the same colour darkened for *small text on white*. `text-brand`
  on white is only 3.4:1; `text-brand-deep` is 4.8:1.
- **`-light`** — the same colour lightened for *use on ink*. `text-brand` on navy
  is 3.7:1; `text-brand-light` is 8.2:1.

So: `text-brand-deep` on light sections, `text-brand-light` on dark ones, and
plain `brand` for solid fills. Solid `bg-brand` always takes **white** text —
that pairing is 3.6:1, which clears the large-text bar for button labels and the
non-text bar for icons, and it is the treatment the brand colour ships with.

Colours are defined once in `tailwind.config.ts` (for utilities) and mirrored as
CSS custom properties in `app/globals.css` (for the gradient/glow layers that
need `var()`). Change both, or the decorative layers drift.

## Design rules baked into the code

**Sharp corners everywhere.** Every card, panel, box, input and button is
square. To make that impossible to get wrong by accident, `tailwind.config.ts`
pins the whole `rounded-{sm,md,lg,xl,2xl,3xl}` scale to `0`. Only two radii
exist:

- `rounded-ico` / `rounded-ico-sm` / `rounded-ico-lg` — icon tiles **inside** boxes
- `rounded-full` — true circles: status dots, check badges, and the
  **"One connected system"** timeline nodes in `components/sections/System.tsx`

One deliberate exception: the floating navbar eases from square to
`rounded-ico-sm` (8px) as it detaches on scroll — see `components/sections/Navbar.tsx`.

**Clean image placeholders.** The reference design used a diagonal-stripe fill;
these are flat tint + hairline dashed edge instead — see
`components/ui/Placeholder.tsx`. Every slot keeps its brief and its recommended
dimensions so images can be dropped in later. To fill one, replace the
`<Placeholder … />` call with an `<Image />`.

## Motion

One easing curve (`cubic-bezier(.22,1,.36,1)`) drives everything — see
`lib/motion.ts`. Lenis feeds a smoothed scroll position to Framer Motion's
`useScroll`, so hero parallax and scroll-linked motion never judder.

Note: a variant's own `transition` beats the `transition` prop in Framer
Motion, so entrance delays are baked into the variant — use `rise(delay)` from
`components/ui/Reveal.tsx` rather than passing `transition={{ delay }}`.

`prefers-reduced-motion` disables Lenis, the count-up tickers and all
transitions.

## Book a Demo

`components/demo/` — a portal dialog with focus trap, Esc-to-close, scroll lock
(which also pauses Lenis), and a success state. Open it from anywhere with
`<DemoButton>` or `<DemoLink>`.

**The form has no backend.** `onSubmit` in `DemoModal.tsx` fakes a 900 ms send.
Point it at an API route or your CRM when one exists.

## Layout

```
app/          layout, page, globals.css, icon.svg
components/
  sections/   one file per page section, in page order
  ui/         Button, Icon, Placeholder, Reveal, SpotlightCard, CountUp, …
  demo/       Book-a-Demo dialog + triggers
  providers/  SmoothScroll (Lenis)
lib/          data.ts (all page copy/figures), motion.ts, cn.ts
docs/         the original handmade HTML design
```

All copy, metrics and outlet figures live in `lib/data.ts` — edit content there,
not in the section components.
