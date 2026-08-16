import type { IconName } from "@/components/ui/Icon";

/** The bar carries three destinations; the two CTAs beside it are the rest. */
export const NAV_LINKS = [
  { href: "#roi", label: "ROI Calculator" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
] as const;

/* ---------- 01 · Hero ---------- */
/** The three promises under the hero CTAs — icon tile + two-line label. */
export const HERO_META: { icon: IconName; title: string; sub?: string }[] = [
  { icon: "check", title: "One plan", sub: "every feature included" },
  { icon: "clock", title: "Works 24×7", sub: "on your behalf" },
  { icon: "building", title: "Unlimited", sub: "outlets" },
];

export const MARQUEE_ITEMS = [
  "Smart Table Ordering",
  "Multiple Kitchen Displays",
  "Real-Time Order Tracking",
  "Intelligent Notifications",
  "Table & Floor Management",
  "Loyalty & Customer Intelligence",
  "Tips & Tronc",
  "Multi-Outlet Analytics",
] as const;

/* ---------- 02 · Your restaurant can too talk ---------- */
export interface TalkQuestion {
  n: string;
  q: string;
  answer: string;
  answerBold: string;
  icon: IconName;
  tone: "brand" | "gold" | "danger" | "success";
}

export const TALK_QUESTIONS: TalkQuestion[] = [
  { n: "01", q: "Which outlet is performing?", icon: "trendUp", tone: "success", answerBold: "Outlet 03", answer: "+18.2%" },
  { n: "02", q: "Which outlet needs attention?", icon: "alert", tone: "gold", answerBold: "Outlet 05", answer: "slow service" },
  { n: "03", q: "Average table service time per outlet", icon: "clock", tone: "brand", answerBold: "Outlet 01", answer: "38 min avg" },
  { n: "04", q: "Number of customers keep coming back per outlet.", icon: "heart", tone: "success", answerBold: "Outlet 03", answer: "318 regulars" },
];

/** The fifth tile is not a question — it closes the row. See Talk.tsx. */
export const TALK_MORE = [
  "Menu performance",
  "Peak hours",
  "Staff & tips",
  "Wastage & refunds",
  "Repeat visits",
] as const;

/* ---------- 03 · Multi-outlet ---------- */
export interface Outlet {
  name: string;
  loc: string;
  ok: boolean;
  rev: string;
  revd: string;
  ord: string;
  ordd: string;
  aov: string;
  aovd: string;
  cus: string;
  cusd: string;
  tbl: string;
  tbld: string;
  trnd: string;
  spark: number[];
  /** the room itself, one photograph per outlet */
  photo: string;
  /** 16px LQIP of the same frame — paints instantly, so the tile never flashes empty */
  blur: string;
  /** revenue Mon–Sun, in £k — drives the weekly overview chart */
  week: number[];
  peak: string;
  peakDelta: string;
  topDay: string;
  busiest: string;
  turn: string;
  turnDelta: string;
  rating: string;
  ratingDelta: string;
}

export const OUTLETS: Outlet[] = [
  {
    name: "Outlet 01", loc: "High Street · Open now · 86 covers seated", ok: true,
    rev: "£38,420", revd: "▲ 12.4% vs last week", ord: "312", ordd: "▲ 8.1% vs last week",
    aov: "£41.70", aovd: "▲ 3.9% vs last week", cus: "241", cusd: "▲ 6.2% vs last week",
    tbl: "92%", tbld: "▲ turn time 38 min", trnd: "▲ 7-day upward",
    spark: [40, 58, 48, 72, 64, 88, 100],
    photo: "/outlet-1.webp",
    blur: "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADwAQCdASoQAAsAA4BaJQBOgBwyXF3C7AAA+Wi8lGa4xhv/BfOR2W42HAXbjCAlN+gTpLd4sAA=",
    week: [22, 30, 41, 36, 37, 50, 43],
    peak: "7PM – 9PM", peakDelta: "▲ 18%",
    topDay: "Saturday", busiest: "8:00 PM",
    turn: "38 min", turnDelta: "▼ 5 min vs last week",
    rating: "4.6 / 5", ratingDelta: "▲ 0.3 vs last week",
  },
  {
    name: "Outlet 02", loc: "Riverside · Open now · 64 covers seated", ok: true,
    rev: "£29,180", revd: "▲ 5.7% vs last week", ord: "248", ordd: "▲ 2.4% vs last week",
    aov: "£38.20", aovd: "▲ 1.8% vs last week", cus: "196", cusd: "▲ 3.1% vs last week",
    tbl: "87%", tbld: "▲ turn time 42 min", trnd: "▲ 7-day steady",
    spark: [52, 44, 60, 55, 68, 62, 78],
    photo: "/outlet-2.webp",
    blur: "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAAAwAgCdASoQAAkAA4BaJQBOj+ADMl+turfYAAD+9J+U2nnweDU+tJN+X4LOD9YCmDGYh02p95DUxwgA",
    week: [19, 17, 24, 22, 27, 25, 31],
    peak: "6PM – 8PM", peakDelta: "▲ 11%",
    topDay: "Sunday", busiest: "7:30 PM",
    turn: "42 min", turnDelta: "▼ 2 min vs last week",
    rating: "4.4 / 5", ratingDelta: "▲ 0.1 vs last week",
  },
  {
    name: "Outlet 03", loc: "Old Town · Open now · 112 covers seated", ok: true,
    rev: "£46,910", revd: "▲ 18.2% vs last week", ord: "401", ordd: "▲ 14.6% vs last week",
    aov: "£44.90", aovd: "▲ 5.2% vs last week", cus: "318", cusd: "▲ 11.4% vs last week",
    tbl: "96%", tbld: "▲ turn time 34 min", trnd: "▲ best in group",
    spark: [46, 62, 58, 78, 84, 92, 100],
    photo: "/outlet-3.webp",
    blur: "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAAAQAgCdASoQAAsAA4BaJYwCdAEfww59+4sAAM4+78ynnVhHC8OtNOu4pDVWh/qgAAA=",
    week: [27, 36, 33, 45, 48, 58, 52],
    peak: "7PM – 10PM", peakDelta: "▲ 24%",
    topDay: "Saturday", busiest: "8:30 PM",
    turn: "34 min", turnDelta: "▼ 7 min vs last week",
    rating: "4.8 / 5", ratingDelta: "▲ 0.2 vs last week",
  },
  {
    name: "Outlet 04", loc: "Airport Road · Open now · 58 covers seated", ok: true,
    rev: "£31,640", revd: "▲ 4.1% vs last week", ord: "286", ordd: "▲ 1.2% vs last week",
    aov: "£36.40", aovd: "▲ 2.6% vs last week", cus: "214", cusd: "▲ 2.9% vs last week",
    tbl: "84%", tbld: "▲ turn time 45 min", trnd: "▲ 7-day flat",
    spark: [60, 54, 58, 52, 64, 58, 66],
    photo: "/outlet-4.webp",
    blur: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoQAAsAA4BaJQBOgBnlHr994AAA/P158CnUrskc3B37D/8IXLvSwrf3Cq99CVLusxMb1k5sjmgAAA==",
    week: [24, 21, 23, 20, 26, 23, 27],
    peak: "12PM – 2PM", peakDelta: "▲ 9%",
    topDay: "Friday", busiest: "1:00 PM",
    turn: "45 min", turnDelta: "▲ 3 min vs last week",
    rating: "4.2 / 5", ratingDelta: "▲ 0.1 vs last week",
  },
  {
    name: "Outlet 05", loc: "Market Square · Open now · 71 covers seated", ok: false,
    rev: "£24,830", revd: "▼ 6.8% vs last week", ord: "221", ordd: "▼ 4.3% vs last week",
    aov: "£33.90", aovd: "▼ 2.1% vs last week", cus: "178", cusd: "▼ 5.6% vs last week",
    tbl: "74%", tbld: "▼ turn time 58 min", trnd: "▼ needs attention",
    spark: [72, 66, 58, 54, 46, 40, 34],
    photo: "/outlet-5.webp",
    blur: "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoQAAkAA4BaJQBOgB43MtoAAP7xF08ceHRW/61Yv6e4+JNLTOKr/sSBEQu7DLVAAAA=",
    week: [29, 27, 24, 22, 19, 17, 15],
    peak: "8PM – 9PM", peakDelta: "▼ 6%",
    topDay: "Monday", busiest: "8:00 PM",
    turn: "58 min", turnDelta: "▲ 11 min vs last week",
    rating: "3.9 / 5", ratingDelta: "▼ 0.4 vs last week",
  },
];

/* ---------- 04 · Floor ---------- */
export type TableState = "free" | "seat" | "alert" | "ready" | "bill";

export const FLOOR_TABLES: TableState[] = [
  "free", "seat", "seat", "free", "seat", "free",
  "seat", "free", "seat", "seat", "free", "alert",
  "seat", "free", "seat", "seat", "free", "ready",
  "seat", "free", "seat", "free", "seat", "bill",
];

/** `tone` keys the live-floor palette — one hue per state, never repeated. */
export const NOTIFICATIONS = [
  { icon: "bell" as IconName, tone: "attention" as const, title: "Table 12", sub: "Waiting for attention", ago: "4m" },
  { icon: "drink" as IconName, tone: "ready" as const, title: "Table 18", sub: "Food ready", ago: "now" },
  { icon: "receipt" as IconName, tone: "bill" as const, title: "Table 24", sub: "Waiting for bill", ago: "7m" },
  { icon: "dome" as IconName, tone: "pass" as const, title: "Kitchen", sub: "Order #184 ready", ago: "now" },
];

/* ---------- 05 · Flow ---------- */
export interface FlowStep {
  icon: IconName;
  label: string;
  /** one line under the label — what actually happens, not what it's called */
  note: string;
  photo: string;
  /** object-position for the wide phone/tablet crop — the tall lg frame is
      close enough to the original to stay centred */
  crop: string;
  blur: string;
  alt: string;
}

export const FLOW_STEPS: FlowStep[] = [
  {
    icon: "user",
    label: "Customer orders",
    note: "Scans the code and orders from the table — no waiting to be noticed.",
    photo: "/flow-1.webp",
    crop: "50% 50%",
    blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAABwBACdASoMABYAPu1iqU2ppaOiMAgBMB2JaACdMoR3ACW6vod1OOO7msCwAAD+rKyeyvW6lP31G8HVYqm0N/iUCxnjE9vfh/2kI8g5x9jg82tBWL145Z5ScpCkh3ojR7RAAAAA",
    alt: "A guest scanning the Nova-Restro table code on their phone to order",
  },
  {
    icon: "monitor",
    label: "Kitchen receives order",
    note: "It lands on the kitchen screen the second it is placed.",
    photo: "/flow-2-print.webp",
    crop: "50% 55%",
    blur: "data:image/webp;base64,UklGRpYAAABXRUJQVlA4IIoAAAAwBACdASoMABIAPu1iqU2ppaOiMAgBMB2JQBOmUAS1ImedWrZbZIDa6QAA/tGwfLpkGdFoNVp8d3ktCDNzIAvRj7l6pLb1HWwSutoa9+tmWn0+dL5W9slVVSPhw649mW7Rt8WKBVVk6JLnkuPAovf5TAncf9h02NK06jLHharvqTjOZhd05YIPAAA=",
    alt: "The Nova-Restro kitchen display and ticket printer on the pass, printing a new order",
  },
  {
    icon: "utensils",
    label: "Kitchen prepares",
    note: "Timed from the moment it arrives, so nothing sits waiting.",
    photo: "/flow-3.webp",
    crop: "50% 42%",
    blur: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwBACdASoMABYAPu1kqU2ppaQiMAgBMB2JQBOmUABwca8V0oQv5FTc2wAA/sBPotNxM1u4Hyfg3iMohFRTI36dpxvZVw/tUiluySBvXu+v3h5Rlg9xo1vbNnXNIYH3b6mcoTXESqtOAAAA",
    alt: "A chef plating a finished dish in the kitchen",
  },
  {
    icon: "bell",
    label: "Waiter notified",
    note: "The pass tells the floor — not the other way round.",
    photo: "/flow-4.webp",
    crop: "50% 25%",
    blur: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADwAwCdASoMABYAPu1iqU2ppaOiMAgBMB2JQBOmUABWVkFy2hUKS9oAAP7s2HxBypwq/Kiqnnwq9Wrzuz+IBNear8Kri94qLuLlWcrdNjmYacnvkXD8+L3GFgAAAA==",
    alt: "A waiter receiving a food-ready alert on their phone during service",
  },
  {
    icon: "serving",
    label: "Food served",
    note: "Hot, on time, at the right table — every time.",
    photo: "/flow-5.webp",
    crop: "50% 60%",
    blur: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAwCdASoMABYAPu1kqU2ppaQiMAgBMB2JQBOmUABpiB9TVWtWb7QA/vEfSoJ6ujrfr14m1XVNAMpThHX8NvPvdSRV9nT18/jL2a+1BhDshdgAAAA=",
    alt: "A waiter serving a plated dish to a guest at their table",
  },
];

/* ---------- 06 · The chain ---------- */
/** `note` is the verb — what that link in the chain does with the order. */
export const CHAIN_NODES: { icon: IconName; label: string; note: string }[] = [
  { icon: "user", label: "Customer", note: "orders" },
  { icon: "tableAlt", label: "Table", note: "sends" },
  { icon: "kdsLines", label: "Kitchen", note: "cooks" },
  { icon: "serving", label: "Waiter", note: "serves" },
  { icon: "trendUp", label: "Manager", note: "watches" },
  { icon: "card", label: "Payment", note: "settles" },
];

/* ---------- 06.5 · Story ---------- */
export interface StoryStep {
  n: string;
  title: string;
  copy: string;
  /** the Nova-Restro screen at that moment, photographed in a real room */
  photo: string;
  blur: string;
  alt: string;
  /** the caption that rides on the frame */
  tag: string;
  icon: IconName;
  /** the escalation rule this step enforces — rendered as a blinking alarm chip */
  alert?: string;
}

export const STORY_STEPS: StoryStep[] = [
  {
    n: "01",
    title: "Your tables take the order.",
    copy: "The guest orders from the table. No queue at the till, no ticket written twice, no order lost between people.",
    photo: "/story-1.webp",
    blur: "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoOAAsAA4BaJZgCdADdI7p6vQAA/tKPecpuVDE+Yu0ZWzVTnM9lMPRpeOoJqNWOqfLUsgspnkZ3mWg15JgAAA==",
    alt: "A guest ordering from the Nova-Restro menu on their phone at the table",
    tag: "Table ordering",
    icon: "menuCard",
  },
  {
    n: "02",
    title: "Your kitchen knows instantly.",
    copy: "The ticket lands on the Kitchen Display the moment it's placed — routed to the right station, timed from second one.",
    photo: "/story-2-kds.webp",
    blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQAgCdASoOAA4AA4BaJZACdAEe14m4VJBQAP7w5pfpDrtKUEE4te/RgzgKA/gevBrtXV+hL2bbBdtNejqxiUKSWkZpAbQKS+zrPD2GVBYERonI6IMuPK9bB9gdNJW2gOdDwAAA",
    alt: "The Nova-Restro Kitchen Display and ticket printer on the pass, tickets colour-coded by elapsed time",
    tag: "Kitchen display",
    icon: "kds",
  },
  {
    n: "03",
    title: "Your waiter knows when food is ready.",
    copy: "No shouting across the pass. No walking to check. The waiter is told, and walks once.",
    photo: "/story-3.webp",
    blur: "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoOAAsAA4BaJYwCdAEO4dH6HoAA+x82fVBeQOeFj5bQT28WMzbGcV+zNviERZccYFDzon46jAA=",
    alt: "A waiter reading a food-ready alert for Table 18 on their handheld during service",
    tag: "Waiter alert",
    icon: "bell",
    alert: "Beeps if not attended in 1 min",
  },
  {
    n: "04",
    title: "Your manager knows where attention is needed.",
    copy: "The floor is watched continuously. Attention goes to the table that needs it, not the table that shouts loudest.",
    photo: "/story-4.webp",
    blur: "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAQAgCdASoOAAsAA4BaJZwCdAEf2eroGrgAAP6quCWdj6OVPI95HGk+EiFu4BbasB8Fn5h0wtAAAA==",
    alt: "A manager watching the live floor map on a tablet from the restaurant floor",
    tag: "Floor view",
    icon: "building",
    alert: "Beeps if the waiter has not attended in 5 min",
  },
  {
    n: "05",
    title: "And you know how every outlet is performing.",
    copy: "Every outlet, every metric, live — from wherever you are.",
    photo: "/story-5-owner.webp",
    blur: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADQAQCdASoOAAsAA4BaJQAAU7bgJqzR4AD+6ePj9bRjXDqg0puYvCtNlvv4FivBRsHbE6cdDJsppwYF0FQ2omHFWxoABTwxo9GXoOzjFSdgCCMoiMgG7UWbqVZrPP4AAAA=",
    alt: "The Nova-Restro multi-outlet dashboard open on a laptop away from the restaurant",
    tag: "Owner dashboard",
    icon: "barChart",
  },
];

/* ---------- 07 · Customers ---------- */
export const CUSTOMER_STATS: { icon: IconName; k: string; v: string; s: string }[] = [
  { icon: "refresh", k: "Repeat Customers", v: "64%", s: "of covers this month" },
  { icon: "star", k: "High-Value Customers", v: "312", s: "top 10% by spend" },
  { icon: "calendar", k: "Visit Frequency", v: "2.8×", s: "per month, average" },
  { icon: "currency", k: "Average Spend", v: "£41.70", s: "per cover" },
  { icon: "heart", k: "Customer Lifetime Value", v: "£1,284", s: "projected, per guest" },
];

/* ---------- 08 · Features ---------- */
export const FEATURES: { icon: IconName; title: string; copy: string }[] = [
  { icon: "table", title: "Smart Table Ordering", copy: "Guests order from the table. Straight into the system, first time, every time." },
  { icon: "serving", title: "AI Waiter", copy: "An optional layer that talks to guests about the menu, allergies and pairings — and takes the order." },
  { icon: "grid4", title: "Multiple Kitchen Displays", copy: "Route tickets by station — grill, cold, pass, bar — each screen sees only its own work." },
  { icon: "clock", title: "Real-Time Order Tracking", copy: "Every order timed from placed to served. Late tickets surface themselves." },
  { icon: "bell", title: "Intelligent Notifications", copy: "The right person is told the right thing at the right moment. Nobody chases." },
  { icon: "floorplan", title: "Table & Floor Management", copy: "Live floor plan, covers, turn times and waitlist — all on one screen." },
  { icon: "heart", title: "Loyalty & Customer Intelligence", copy: "Know who came back, what they love and what they're worth over a lifetime." },
  { icon: "card", title: "Card / Tap / Cash Payments", copy: "Take payment any way the guest wants — at the table or at the counter." },
  { icon: "currency", title: "Tips & Tronc", copy: "Collect, pool and distribute tips fairly — with a record everyone can trust." },
  { icon: "file", title: "Tax & Billing", copy: "Correct tax, clean bills, split any way — and books that reconcile themselves." },
  { icon: "barChart", title: "Outlet KPIs", copy: "The numbers that decide the day — per outlet, live, with no report to run." },
  { icon: "pie", title: "Multi-Outlet Analytics", copy: "Compare every outlet on one screen. Rank, spot, act — in minutes." },
  { icon: "trendUp", title: "Sales Intelligence", copy: "What sells, when, with what — and what to put in front of guests next." },
];

/* ---------- 09 · Ways ---------- */
export const OLD_WAY = [
  "Call.", "Wait.", "Ask.", "Follow up.", "Check.",
  "Recheck.", "Collect reports.", "Compare.", "Discover the problem.", "React.",
];

export const NEW_WAY = ["Analyze.", "Act.", "Grow."];

/* ---------- 10 · Manifesto ---------- */
export const MANIFESTO_LINES = [
  "A great restaurant.",
  "A great team.",
  "A loyal customer base.",
  "A brand.",
  "A Business That Grows",
];

/* ---------- 11 · Pricing ---------- */
export const PLAN_INCLUDES = [
  "POS.", "Table ordering.", "KDS.", "Kitchen management.", "Loyalty.",
  "Customer insights.", "Payments.", "Tips & Tronc.", "Analytics.", "Multi-outlet management.",
];

export const PLAN_EXTRAS: { icon: IconName; title: string; copy: string }[] = [
  {
    icon: "serving",
    title: "AI Waiter.",
    copy: "Optional intelligence layer — to interact with the customers about menu, allergies etc.",
  },
  {
    icon: "monitor",
    title: "Hardware.",
    copy: "Terminals, table devices, kitchen screens and printers. Buy from us or bring your own.",
  },
];

/** The one price. `was` is struck through beside it. */
export const PLAN_PRICE = {
  was: "£5",
  now: "£2",
  unit: "per day, per outlet",
  billing: "Billed monthly · every feature included",
} as const;

/* ---------- 11.5 · ROI calculator ----------
   Every constant here is printed back to the reader on the line it drives, so
   the calculator can be read as arithmetic rather than taken on trust. */
export const ROI_MODEL = {
  daysPerMonth: 30,

  /** 1 — waiter time: minutes a hand-taken order costs (6 walking, 4 chasing) */
  minutesPerOrder: 10,
  /** …valued at the all-in floor rate */
  waiterHourlyRate: 18,

  /** 2 — wrong orders: the share of the leak the system closes */
  refundRecovery: 0.8,

  /** 3 — loyalty: new guests arriving each month, as a share of orders */
  newCustomerShare: 0.5,
  /** …and how many of them the loyalty layer turns into regulars */
  repeatConversion: 0.1,
  /** each new regular comes back this many extra times a month */
  extraVisitsPerRegular: 1,

  /** what the whole thing costs, per outlet, per day */
  pricePerOutletPerDay: 2,
} as const;

/** The five things the reader sets. `step` also decides how the value prints. */
export const ROI_DEFAULTS = {
  orders: 90,
  aov: 38,
  /** % of revenue lost to wrong / refunded orders today */
  lossPct: 2,
  /** % revenue uplift from the optional AI layer — the 2–5% band */
  aiPct: 3,
  outlets: 1,
} as const;

/* ---------- Footer ---------- */
export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Smart Table Ordering", href: "#features" },
      { label: "Kitchen Displays", href: "#features" },
      { label: "Table & Floor Management", href: "#floor" },
      { label: "Loyalty & Insights", href: "#customers" },
      { label: "Payments & Tronc", href: "#features" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Multi-Outlet Analytics", href: "#outlets" },
      { label: "Sales Intelligence", href: "#features" },
      { label: "Outlet KPIs", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "ROI Calculator", href: "#roi" },
      { label: "AI Waiter", href: "#pricing" },
    ],
  },
] as const;
