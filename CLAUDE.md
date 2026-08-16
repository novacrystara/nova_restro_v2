# CLAUDE.md — Nova-Restro

Guidance for Claude Code (and any developer) working in this repository. Read this
before touching anything; it explains not just *what* the code is, but *why* it is
shaped the way it is. Most of the surprising decisions here are deliberate.

---

## 1. What this project is

**Nova-Restro** is a marketing website — a single, long, scroll-driven landing page
for a (fictional-data) restaurant operating system. It is *not* the product itself.
There is no backend, no database, no authentication, no API routes, no CMS. Every
number, chart, table and customer name you see on the page is **static copy defined
in TypeScript**, designed to *look* like a live product.

The page sells one idea: a restaurant owner should not have to phone the manager to
find out how the business is doing. The product claims to give live visibility across
every outlet — sales, tables, orders, customers, kitchen, performance — and the site
demonstrates that claim with mock dashboards, a live floor map, a five-step service
story and an ROI calculator.

| | |
|---|---|
| Type | Static marketing site (single page, anchor-navigated) |
| Routes | Exactly one: `/` |
| Data source | `lib/data.ts` + a few section-local constants |
| Backend | None. The only form (Book a Demo) fakes its submit. |
| Deploy target | Vercel (a `.vercelignore` exists; `Images/` and `docs/` are excluded) |
| Git remote | `https://github.com/novacrystara/nova_restro_v2.git` |
| Design origin | `docs/nova-restro.html` — a handmade HTML reference the React build was ported from |
| Copy origin | `docs/Nova-Restro Webpage Content.md` — the client's written content brief |

---

## 2. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16**, App Router | Turbopack in dev |
| React | **19** | |
| Language | **TypeScript**, `strict: true` | Path alias `@/*` → repo root |
| Styling | **Tailwind CSS 3.4** + a hand-written `@layer components` block | No CSS modules, no styled-components |
| Motion | **Framer Motion 11** | One easing curve for the whole site |
| Scroll | **Lenis 1.1** | Inertial smooth scrolling, feeds Framer's `useScroll` |
| Font | **Poppins** via `next/font/google` | Self-hosted at build, `--font-poppins` CSS variable |
| Icons | Hand-rolled inline SVG set | `components/ui/Icon.tsx`, no icon package |
| Class merging | `lib/cn.ts` | 16-line local joiner; **`clsx`/`tailwind-merge` are not installed** |
| Node | v22 (developed on 22.14) | |

Total runtime dependencies: `framer-motion`, `lenis`, `next`, `react`, `react-dom`.
Keep it that way unless there is a real reason — the small dependency surface is
part of why this builds and deploys fast.

---

## 3. Commands

```bash
npm install

npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit  ← the real gate
npm run lint       # next lint
```

**Before declaring any change done, run `npm run typecheck`.** It is the only
automated check in this repo.

⚠️ `npm run lint` is defined in `package.json` but **ESLint is not installed and
there is no ESLint config**. Running it will prompt to set ESLint up rather than
lint anything. Do not treat `npm run lint` as a passing/failing gate, and do not
silently install ESLint to make it work unless the user asks for it.

There are **no tests** — no test runner, no test files, no CI config. "Verified"
here means: typecheck passes, and the page was looked at in a browser at phone,
tablet and desktop widths.

---

## 4. Directory map

```
app/
  layout.tsx        root layout: Poppins, metadata/SEO, SmoothScroll, DemoModalProvider
  page.tsx          the entire site — sections composed in scroll order
  globals.css       CSS variables, base styles, .wrap/.sec/type scale, decorative classes
  icon.svg          favicon (orange square + the Nova-Restro "table" mark)

components/
  sections/         one file per page section, plus three mock "product screens"
  ui/               reusable primitives (Button, Icon, Reveal, SpotlightCard, …)
  demo/             the Book-a-Demo dialog and its triggers
  providers/        SmoothScroll (Lenis)

lib/
  data.ts           ALL page copy, metrics, outlet figures, ROI constants
  motion.ts         EASE curve + shared Framer variants
  cn.ts             className joiner
  spline.ts         Catmull-Rom → cubic bézier, for the SVG chart curves
  useViewportWidth.ts  scrollbar-excluded viewport width (full-bleed math)

public/             the shipped artwork — tuned .webp only
Images/             SOURCE artwork — full-resolution .png/.jpg, never served
docs/               the original handmade HTML design + the client copy brief

tailwind.config.ts  the design system (palette, radius rule, shadows, keyframes)
next.config.mjs     image optimizer settings + one security header
.vercelignore       keeps Images/ and docs/ out of the deployment
```

---

## 5. The page, section by section

`app/page.tsx` renders, in this exact order. The numbers in the eyebrow labels
("03 — Multi-outlet command") are part of the copy and match this order.

| # | Component | `id` | What it is |
|---|---|---|---|
| — | `ScrollProgress` | — | 2px brand reading-progress bar pinned to the very top |
| — | `Navbar` | — | Fixed header. Square and transparent at the top; past 24px of scroll it eases into a rounded glass pane (`rounded-ico-sm`, heavy blur + saturation). Mobile menu is a full-screen panel. |
| 01 | `Hero` | `#top`, `#action` | Two-part. **Fold:** headline left, a photograph bleeding off the right (desktop) or a straight-on tablet product shot (tablet). Scroll-linked parallax on both. **Below fold** (`#action`): a full-bleed navy band holding `DashboardMock` in a fake browser chrome. Ends with `Marquee`. |
| 02 | `Talk` | `#talk` | "Your restaurant can too talk." Four question cards (`SpotlightCard`) that flip to an answer panel on hover, plus a fifth tile listing more questions. |
| 03 | `Outlets` | `#outlets` | Multi-outlet command. A tab switcher (`layoutId` sliding brand pill) over five outlets; each shows six metrics, a weekly revenue chart, a photo of the room and peak/turn/rating detail. |
| 04 | `Floor` | `#floor` | Dark section. Live floor map (24 tables, colour-coded by state) + an alert feed. The one place the site leaves the brand palette on purpose — see §7. |
| 05 | `Waiters` | `#waiters` | The five-step service journey as five photographed columns on a numbered rail. |
| 06 | `System` | `#system` | "One connected system" — six circular nodes on a hairline rail with a brand pulse travelling it. The only fully-round chain on the page. Contains the last remaining `Placeholder`. |
| 06.5 | `Story` | `#story` | The product in five moves. On desktop the photograph is a **sticky stage** beside scrolling copy; all five frames are mounted and cross-faded so stepping never waits. Below `lg` each step carries its own inline photo. Two steps show a blinking `AlarmChip` (escalation rules). |
| 07 | `PositionBand` | — | Dark band. "Not another Restaurant POS" — a diagram showing POS as *one line* among seven modules. Static by design. |
| 08 | `Customers` | `#customers` | Customer intelligence: five stat tiles + `CustomerMock` (a manager's view of a fictional customer base). |
| 09 | `Features` | `#features` | The 13-feature bento grid. Spans are hand-planned in `Features.tsx` so every `lg` row sums to 6 columns and the dashed rules stay continuous. |
| 10 | `Ways` | `#ways` | "Ten steps, or three." Old way vs new way, closing with `ThreeMoves` — a 12-week revenue spline where point 5 is the decision and everything after climbs. |
| 11 | `Manifesto` | `#manifesto` | Dark section. Five manifesto lines with the owner photographed beside them. |
| 12 | `Pricing` | `#pricing`, `#roi` | One plan, one price (£2/day/outlet, was £5), everything included, plus two paid extras. Contains `RoiCalculator` at `#roi`. |
| — | `Footer` | `#demo` | Final CTA, two link columns, socials, year auto-computed. |

### The three "product screens"

These live in `components/sections/` but are not page sections — they are fake
product UI rendered inside real sections:

- **`DashboardMock`** (in `Hero`) — the owner dashboard: 4 KPI tiles with `CountUp`
  tickers and sparklines, an hourly revenue curve, an outlet ranking, a live feed
  and a mini floor grid.
- **`CustomerMock`** (in `Customers`) — the customer base: summary tiles, a tagged
  customer table (VIP / Regular / New / Going quiet), segment bars.
- **`ThreeMoves`** (in `Ways`) — the Analyze → Act → Grow curve.

All three hold their data in module-level constants **inside their own file**, not in
`lib/data.ts`. That is intentional: those numbers only exist to make one screen look
alive, and nothing else on the page reads them.

### Anchor targets

`#top #action #talk #outlets #floor #waiters #system #story #customers #features
#ways #manifesto #pricing #roi #demo`

Navbar links point at `#roi`, `#features`, `#pricing`. Footer links reuse the rest.
Sections that are anchor targets carry `scroll-mt-24` (or `scroll-mt-28`) so the
fixed navbar does not cover the heading.

---

## 6. The data layer

**`lib/data.ts` is the content file. Edit copy there, not in the components.**

It exports, in page order: `NAV_LINKS`, `HERO_META`, `MARQUEE_ITEMS`,
`TALK_QUESTIONS`, `TALK_MORE`, `OUTLETS`, `FLOOR_TABLES`, `NOTIFICATIONS`,
`FLOW_STEPS`, `CHAIN_NODES`, `STORY_STEPS`, `CUSTOMER_STATS`, `FEATURES`,
`OLD_WAY`, `NEW_WAY`, `MANIFESTO_LINES`, `PLAN_INCLUDES`, `PLAN_EXTRAS`,
`PLAN_PRICE`, `ROI_MODEL`, `ROI_DEFAULTS`, `FOOTER_COLUMNS`.

Things to know:

- Entries that render an icon are typed against `IconName` from
  `components/ui/Icon.tsx`, so an invalid icon name is a **compile error**. Add the
  path to `Icon.tsx` first, then reference it.
- Every image entry carries `photo`, `blur` (a base64 LQIP data URI) and `alt`.
  Keep all three in sync when swapping artwork.
- `FEATURES` order is load-bearing: the bento span plan (`PLAN` in `Features.tsx`)
  is index-aligned to it. **Reorder `FEATURES` and you must reorder `PLAN` too**,
  keeping each `lg` row summing to 6.
- The currency throughout is **GBP** and numbers are formatted with `en-GB`
  (`toLocaleString("en-GB")`). Do not mix in `$`/`en-US`.
- `OUTLETS[4]` ("Outlet 05") is the deliberate underperformer — `ok: false`, all
  deltas negative. Several components branch on `ok`, so it exists to prove the
  "needs attention" states render.

### The ROI calculator model

`ROI_MODEL` / `ROI_DEFAULTS` in `lib/data.ts` drive `RoiCalculator.tsx`. Five
sliders (orders/day, average order size, % lost to wrong orders, AI uplift %,
outlets) feed four gain lines:

1. **Waiter time** — `orders × 30 days × 10 min ÷ 60 × £18/h`
2. **Wrong orders** — `80%` of what refunds/remakes cost today
3. **AI Waiter uplift** — the chosen `%` of monthly revenue
4. **Loyalty** — `50%` of orders are new guests, `10%` convert to regulars,
   each returning `1` extra time a month at the average order size

Cost is `£2 × outlets × 30`. The panel prints the arithmetic for every line
("1,350 orders × 10 min = 225 h × £18/h") on purpose — the model is meant to be
auditable by the reader, not taken on trust. **If you change a constant in
`ROI_MODEL`, the printed working updates itself; don't hard-code a number into the
copy.**

---

## 7. Design system

Defined twice, on purpose: **`tailwind.config.ts`** for utility classes, and
**`app/globals.css`** `:root` for the same values as CSS custom properties (the
gradient, glow and mask layers need `var()`). **Change a colour in one place and you
must change it in the other**, or the decorative layers drift out of sync.

### Palette roles

| Token | Hex | Meaning |
|---|---|---|
| `brand` | `#EA580C` | the primary — CTAs, the highlighter marker, glows, timeline nodes |
| `gold` | `#E8A33D` | warn / "needs attention" **only**. Never a CTA. |
| `ink` | `#0B1420` | text, and every dark block (`ink-2`, `ink-3` are lifts) |
| `body` / `muted` | `#55627A` / `#79839A` | body copy, secondary copy |
| `canvas` / `surface` | `#FAFAFA` / `#FFFFFF` | the page, and the cards on it |
| `edge` / `edge-2` | `#E6E6E6` / `#D4D4D4` | hairlines |
| `success` | `#6B8F5E` | positive deltas, healthy outlets |
| `destructive` | `#A3321F` | late, failing, negative |

**The `-deep` / `-light` rule (this is the part people get wrong):**

- **`-deep`** = the hue darkened for *small text on white*. `text-brand` on white is
  only 3.4:1; `text-brand-deep` is 4.8:1.
- **`-light`** = the hue lightened for *text on ink*. `text-brand` on navy is 3.7:1;
  `text-brand-light` is 8.2:1.

So: **`text-brand-deep` on light sections, `text-brand-light` on dark ones, plain
`brand` for solid fills.** Solid `bg-brand` always takes **white** text.

**Two palettes that are not the brand palette:**

- **`live-*`** (`seated` sage, `attention` amber, `ready` mint, `bill` sky,
  `pass` orange) — the live floor map and alert feed only. A manager reads the room
  by colour, so these four states must be four *unmistakably different* hues, not
  four shades of warm. This is the one deliberate departure from the brand palette.
- **`night-*`** — dark chrome for the mock product screens (KDS, dashboard, floor).

### The radius rule

**Everything is sharp.** Every card, panel, box, input and button is square. To make
that impossible to break by accident, `tailwind.config.ts` **pins the entire
`rounded-{sm,md,lg,xl,2xl,3xl}` scale to `0`**. Only two radii exist:

- `rounded-ico` / `rounded-ico-sm` / `rounded-ico-lg` — icon tiles **inside** boxes
- `rounded-full` — true circles: status dots, check badges, the `System` timeline nodes

One deliberate exception: the navbar eases from square to `rounded-ico-sm` as it
detaches on scroll.

Because the scale is pinned, writing `rounded-lg` does nothing. If you want a corner,
use `rounded-ico*` or `rounded-full` — and think hard about whether you should.

### Typography

Poppins, a geometric face, so display tracking is looser than a grotesque would need.
Type is a set of `@layer components` classes in `globals.css`, all `clamp()`-based —
**there are no `text-4xl md:text-6xl` ladders on headings**:

`.display` · `.t-h1` · `.t-h2` · `.t-h3` · `.lead`

Layout helpers: `.wrap` (1240px + gutters), `.wrap-wide` (1420px), `.sec` (the
vertical rhythm between sections, `clamp(54px, 7vw, 104px)`).

Decorative helpers: `.hl` (the orange highlighter marker behind text), `.bg-dots` /
`.bg-dots-light` / `.bg-dots-brand`, `.glow` + `.glow-brand` / `.glow-gold`,
`.spot` (cursor spotlight), `.beam` (animated conic border on the hero frame),
`.plan-border`, `.dash-cell` (the bento outline — gradient-drawn so the dash length
is ours to control and can transition to brand on hover), `.rng` / `.rng-dark`
(the brand range slider), `.no-bar` (scrollbar-free horizontal scrollers).

Two registered `@property` custom properties (`--beam`, `--dash-color`) exist so
those values can *animate*; an unregistered custom property would snap.

---

## 8. Motion

**One easing curve drives everything:** `cubic-bezier(.22, 1, .36, 1)` — exported as
`EASE` from `lib/motion.ts`, available as `ease-smooth` in Tailwind and `var(--ease)`
in CSS. Do not introduce a second curve.

`lib/motion.ts` exports the shared variants: `riseIn`, `riseInSm`, `fadeIn`,
`scaleIn`, `slideInLeft/Right`, `stagger()`, `springSoft`, and `viewportOnce`
(`{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }` — the site's standard
scroll trigger).

### The Reveal gotcha (read this)

In Framer Motion, **a variant's own `transition` beats the component's `transition`
prop**. So entrance delays must be baked into the variant. Use:

```tsx
<Reveal delay={0.08}>…</Reveal>          // ✅ delay lives inside rise(delay)
<Reveal variants={rise(0.16, 40)}>…</Reveal>
```

and **not** `transition={{ delay }}` on a `motion` element that also has variants.
`rise(delay, y, duration)` from `components/ui/Reveal.tsx` is the helper that does
this correctly. `RevealGroup` staggers children that only declare `variants`.

### Lenis

`components/providers/SmoothScroll.tsx` mounts Lenis in the root layout. It:

- runs the rAF loop and gives Framer's `useScroll` a smoothed input, so parallax
  never judders;
- intercepts every `a[href^="#"]` click so in-page jumps use the same easing
  (`offset: -88` clears the navbar);
- listens for the custom events **`nova:lock-scroll`** / **`nova:unlock-scroll`** so
  the demo modal can freeze the page behind it. If you build another overlay, dispatch
  those same two events rather than only setting `body { overflow: hidden }`.
- **disables itself entirely** when `prefers-reduced-motion: reduce`.

### Reduced motion

Three layers of respect, all already in place:

1. Lenis does not initialise at all.
2. `globals.css` collapses every animation and transition to `0.001ms`.
3. Components call `useReducedMotion()` — `CountUp` snaps to its final value, `Hero`
   drops the parallax, `Story` falls back to the non-sticky layout.

Keep all three in mind when adding motion.

---

## 9. Images

### Two folders, one direction

- **`Images/`** — the source artwork: full-resolution PNG/JPG, ~45 MB. **Never
  served.** Excluded from deploys by `.vercelignore`. Keep the originals here.
- **`public/`** — the shipped artwork: tuned `.webp` only. This is what `<Image>`
  points at.

The `.webp` files in `public/` are hand-exported from the `Images/` originals; there
is **no build script for this**. When you add artwork: export a `.webp` into
`public/`, generate a tiny (≈16px) base64 LQIP, and add both to the matching entry
in `lib/data.ts` (`photo` + `blur` + `alt`).

### The `<Image>` conventions used here

- Every photo uses `placeholder="blur"` with an inline `blurDataURL` from
  `lib/data.ts`, so tiles never flash empty.
- `sizes` is always explicit and tuned per breakpoint. Where an image is
  `display: none` at some widths, the `sizes` entry for that range is set tiny
  (e.g. `5vw`) so the browser downloads a ~2 KB variant instead of a full-width
  photograph nobody sees. See `Hero.tsx` — it does this for both fold images.
- Only genuine LCP candidates get `priority` (the two hero images).
- `next.config.mjs` serves **AVIF first, WebP behind it**, with a trimmed
  `deviceSizes`/`imageSizes` list — every extra width is another variant to build.

### ⚠️ Cache-busting artwork

`minimumCacheTTL` is a year, and Next serves `/public` images through the optimizer
with a fixed `max-age=31536000` regardless of that setting. A `?v=2` on the `src` is
**rejected by the optimizer's URL validation**. So:

> **To replace artwork, give the file a NEW NAME.**

That is exactly why `public/` contains `flow-2-print.webp`, `story-2-kds.webp` and
`story-5-owner.webp` rather than overwritten `flow-2.webp` / `story-2.webp` /
`story-5.webp`. New visitors always see new artwork either way; the stale copy only
survives in the browser of someone who already loaded that exact filename.

---

## 10. Components reference

### `components/ui/`

| Component | Purpose |
|---|---|
| `Button` | Sharp CTA. Variants `primary \| dark \| outline \| ghost \| light`, sizes `sm \| md \| lg`. Lifts 2px on hover; `primary` gets a light sweep. Renders `<a>` when given `href`, else `<button>`. |
| `Icon` | The whole icon set as inline SVG paths, keyed by `IconName`. Stroke-based via `currentColor` unless listed in `FILLED`. `aria-hidden` by default. |
| `Reveal` / `RevealGroup` / `rise()` | The site's standard scroll-triggered entrance. See §8. |
| `SpotlightCard` | Sharp surface with a cursor-following brand spotlight (sets `--mx`/`--my`) and a hover lift. The default card for every grid. |
| `Corners` | Four brand corner brackets that draw in on hover. Drop inside a `relative group` element; pass `active` to hold them open. |
| `CountUp` | Eased number ticker, fires once in view, snaps under reduced motion, formats `en-GB`. |
| `Eyebrow` | Small uppercase section label with a brand dot. `onDark` for ink sections. |
| `ScrollProgress` | The 2px top progress bar. |
| `Placeholder` | An image slot to be filled later: flat tint + hairline dashed edge, carrying its brief and recommended dimensions. **Only one is left, in `System.tsx`.** To fill it, replace the `<Placeholder …/>` call with an `<Image />`. |
| `Chip` | Small pill. **Currently unused** — safe to reuse, safe to delete. |

### `components/demo/`

The Book-a-Demo dialog: `DemoModalProvider` (context, mounted once in
`app/layout.tsx`) + `DemoModal` (the dialog) + `DemoButton` / `DemoLink` (triggers).

Open it from anywhere with `<DemoButton>` or `<DemoLink>` — never re-implement the
dialog. It is a **React portal** with a focus trap, Esc-to-close, first-field
autofocus, scroll lock (which also pauses Lenis via the custom events), a form reset
400ms after close so the exit animation stays clean, and a success state.

> ⚠️ **The form has no backend.** `onSubmit` in `DemoModal.tsx` fakes a 900ms send
> and flips to "sent". Wire it to an API route or a CRM when one exists. Fields
> collected: name, email, phone, restaurant, outlets (`1 / 2–5 / 6–15 / 16–50 / 50+`),
> message.

---

## 11. Conventions and house style

- **`"use client"` is the norm here.** 30 of the 35 components are client components
  (they use Framer Motion, state or effects). The server components are `Icon`,
  `Eyebrow`, `Chip`, `Placeholder`, `Corners`, `app/layout.tsx` and `app/page.tsx`.
  Don't add `"use client"` to a component that genuinely doesn't need it, but don't
  contort a component to avoid it either.
- **Named export + default export** on nearly every component
  (`export function Button…` then `export default Button`). Follow the pattern.
- **Tailwind class strings must be literal.** Tone/variant maps in several sections
  (`TONE` in `Talk.tsx`, `TABLE_STYLE` in `Floor.tsx`, `TAG` in `CustomerMock.tsx`)
  hold *complete* class strings for exactly this reason — Tailwind's scanner cannot
  see `text-${tone}-deep`. Never build a class name by interpolation.
- **Arbitrary values are normal here** (`text-[0.82rem]`, `p-[1.4rem_1.8rem]`,
  `clamp()` inside brackets). The design was ported from handmade HTML and matching
  it exactly matters more than staying on the default scale.
- **`clamp()` over breakpoint ladders** for spacing and type wherever it reads well.
- Comments in this codebase explain **why**, not what — often with the measurement or
  contrast ratio that drove the decision. Match that tone; don't add "// map over the
  array" noise.
- Use `cn()` from `lib/cn.ts` for conditional classes. It is a plain joiner — it does
  **not** de-duplicate conflicting Tailwind classes the way `tailwind-merge` does, so
  order your own overrides carefully.
- Currency `£`, locale `en-GB`, spelling British ("colour" in comments, "Analyse"
  never — the copy uses "Analyze"; follow the existing copy, not your instinct).
- Typographic characters in copy: real em-dashes `—`, curly quotes, `×` not `x`.
  In JSX, apostrophes are escaped (`&apos;`) and quotes use `&ldquo;`/`&rdquo;`.

---

## 12. Accessibility

Already handled — don't regress it:

- Contrast is engineered through the `-deep` / `-light` steps; the ratios are written
  into the comments. Check before introducing a new colour pairing.
- Focus ring: `:focus-visible` → 2px solid brand, 2px offset, defined once in
  `globals.css`.
- All decorative SVG/`Icon` output is `aria-hidden` + `focusable="false"`.
- Decorative layers (glows, dot grids, corner brackets, the progress bar) are
  `aria-hidden` and `pointer-events-none`.
- The modal traps focus, returns on Esc, and locks the page behind it.
- Interactive dots/rails carry `aria-label` (e.g. `Step 03 — Waiter alert`).
- `prefers-reduced-motion` is respected in three layers (§8).
- Sections use real landmarks: `<main>`, `<footer>`, `<section>`, `<ol>` for ordered
  journeys, `<figure>`/`<figcaption>` for photographed steps.

---

## 13. Common tasks

**Change wording, a metric, or a price** → `lib/data.ts`. Not the component.

**Change a mock dashboard number** → the constants at the top of `DashboardMock.tsx`,
`CustomerMock.tsx` or `ThreeMoves.tsx`.

**Add a feature to the bento** → append to `FEATURES` in `lib/data.ts` **and** add a
matching span entry to `PLAN` in `Features.tsx`, keeping each `lg` row summing to 6.

**Swap a photograph** → export a new `.webp` into `public/` **under a new filename**
(§9), regenerate the `blur` LQIP, update `photo` + `blur` + `alt` in `lib/data.ts`.

**Add an icon** → add the path(s) to `PATHS` in `components/ui/Icon.tsx`. It becomes
part of the `IconName` union automatically. Add it to `FILLED` only if it is a fill
icon rather than a stroke icon.

**Add a new section** → create `components/sections/YourSection.tsx`, wrap content in
`<section id="…" className="sec …">` + `<div className="wrap">`, use `Reveal`/`Eyebrow`
for the entrance and label, then insert it in `app/page.tsx` at the right scroll
position. If it should be linkable, add `scroll-mt-24` and consider `NAV_LINKS` /
`FOOTER_COLUMNS`.

**Add a colour** → add it to `tailwind.config.ts` **and** to `:root` in
`app/globals.css` if any gradient/glow/mask needs it as `var()`.

**Wire up the demo form** → `onSubmit` in `components/demo/DemoModal.tsx`. Add an
API route under `app/api/…` or post to a CRM endpoint; keep the `sending` → `sent`
state machine.

**Open the demo dialog from a new place** → `<DemoButton>` / `<DemoLink>`. Never a
second modal.

---

## 14. Known gaps and deliberate non-features

Do not "fix" these without being asked — several are choices, not oversights:

- **No backend.** The demo form fakes its submit. There are no API routes.
- **No tests, no CI, no ESLint config** (`npm run lint` is a stub script).
- **All figures are fictional.** Outlets, customers, revenue, ratings and the
  customer names in `CustomerMock` are invented for the demo, and the code says so.
- **One route.** There is no `/pricing`, `/about` or blog. Everything is anchors.
- **`metadataBase` is `https://nova-restro.com`** in `app/layout.tsx` — update it if
  the real domain differs.
- **No OG image file.** The metadata declares `summary_large_image` but no image is
  supplied; add one to `public/` and reference it in `openGraph.images` when there is
  artwork for it.
- **No sitemap or robots** route.
- **`Chip` is unused**; `Placeholder` survives in exactly one spot (`System.tsx`).
- **`docs/`** holds the original handmade HTML and the client copy brief. They are
  reference material — the React build is the source of truth now, and `docs/` is
  excluded from deploys.
- **`Images/`** is source artwork only and must stay out of the deployment.

---

## 15. Working agreement for this repo

1. **Read the comment above the code before changing it.** The unusual decisions in
   this codebase (pinned radius scale, duplicated colour tokens, delays baked into
   variants, renamed image files, the four-hue live palette) are all documented at the
   point of use, with the reason.
2. **Content changes go in `lib/data.ts`.**
3. **Run `npm run typecheck`** before saying a change is complete. Say plainly if it
   fails.
4. **Don't add dependencies** for things the repo already solves locally (`cn`,
   icons, the spline helper).
5. **Don't introduce a second easing curve, a second radius, or an undocumented
   colour.**
6. **Keep `tailwind.config.ts` and `globals.css` in sync** on any token change.
7. **Respect reduced motion** in anything new that moves.
