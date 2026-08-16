import type { Config } from "tailwindcss";

/**
 * NOVA-RESTRO — design system
 * Theme: white + deep navy, orange brand. Light mode. Font: Poppins.
 *
 * PALETTE ROLES
 *   brand   #EA580C orange     — the primary. CTAs, highlighter, glows, nodes.
 *   gold    #E8A33D amber      — warn / "needs attention" only. Never a CTA.
 *   ink     #0B1420 deep navy  — text and every dark block.
 *   canvas  #FAFAFA white      — the page.
 *   success #6B8F5E sage       — positive deltas, healthy outlets, confirmations.
 *   destructive #A3321F        — late, failing, negative.
 *
 * Each hue carries a `deep` (small text on white, AA-contrast) and a `light`
 * (the same role on ink surfaces, where the base tone is too dark to read).
 *
 * RADIUS RULE (product decision):
 * every card / box / panel / button is SHARP. The only curved things are
 * icon tiles inside boxes (`rounded-ico*`) and true circles (`rounded-full`)
 * — e.g. the "One connected system" timeline nodes. To make that impossible
 * to get wrong, the whole `rounded-{sm,md,lg,xl,2xl,3xl}` scale is pinned to 0.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#EA580C",
          hi: "#F97316", // hover
          deep: "#C2410C", // small text on white — 4.8:1
          light: "#FB923C", // brand on navy — 8.2:1
          wash: "#FFEDD5",
          mist: "#FFF7ED",
        },
        gold: {
          DEFAULT: "#E8A33D",
          deep: "#8A5D0C", // small text on white — 5.4:1
          light: "#F0B968",
          wash: "#FCF0DC",
        },
        ink: {
          DEFAULT: "#0B1420",
          2: "#16233A",
          3: "#2A3950",
        },
        body: "#55627A",
        muted: "#79839A",
        canvas: {
          DEFAULT: "#FAFAFA",
          2: "#F2F2F2",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          2: "#FAFAFA",
        },
        edge: {
          DEFAULT: "#E6E6E6",
          2: "#D4D4D4",
        },
        success: {
          DEFAULT: "#6B8F5E",
          deep: "#4E6B42",
          light: "#9CBE8E",
          wash: "#EAF0E6",
        },
        destructive: {
          DEFAULT: "#A3321F",
          deep: "#8A2917",
          // clearly red on navy, so "waiting for bill" never reads as brand orange
          light: "#F87171",
          wash: "#FBEAEA",
        },
        /**
         * Live floor status — dark surfaces only (floor map, alert feed).
         * These are the one place the site leaves the brand palette on purpose:
         * a manager reads the room by colour, so the four states have to be
         * four unmistakably different hues, not four shades of warm.
         */
        live: {
          seated: "#9CBE8E", // sage — normal service, deliberately calm
          attention: "#FBBF24", // amber — a guest is waiting for a person
          ready: "#34D399", // mint — food is up
          bill: "#38BDF8", // sky — money on the table
          pass: "#FB923C", // brand — the kitchen pass
        },

        /** Dark chrome for the product mock-ups (KDS, dashboard, floor map). */
        night: {
          DEFAULT: "#0A121D", // deepest — screen background
          panel: "#101B2A",
          line: "#1C2A3D",
          dim: "#6B7A93",
          bright: "#9AA8BE",
          faint: "#5B6A80",
        },
      },
      borderRadius: {
        none: "0",
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        // the *only* curved things on the page
        ico: "0.75rem",
        "ico-sm": "0.5rem",
        "ico-lg": "1rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "JetBrains Mono", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        xs: "0 1px 2px rgba(11,20,32,.05)",
        sm: "0 2px 8px rgba(11,20,32,.05), 0 1px 2px rgba(11,20,32,.04)",
        md: "0 10px 30px -12px rgba(11,20,32,.16), 0 2px 8px rgba(11,20,32,.04)",
        lg: "0 30px 70px -24px rgba(11,20,32,.24), 0 8px 24px -12px rgba(11,20,32,.10)",
        brand: "0 16px 40px -14px rgba(234,88,12,.50)",
        "brand-hi": "0 22px 48px -14px rgba(234,88,12,.65)",
      },
      maxWidth: {
        wrap: "1240px",
        "wrap-wide": "1420px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,1,.36,1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        ping2: {
          "0%": { transform: "scale(.6)", opacity: "1" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        flow: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(320%)" },
        },
        flowY: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(320%)" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(255,255,255,.5)" },
          "70%": { boxShadow: "0 0 0 9px rgba(255,255,255,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
        },
        shimmer: {
          to: { transform: "translateX(120%)" },
        },
        /** an alarm blinking on a chip — the bell, not the whole label */
        beep: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".3", transform: "scale(.9)" },
        },
      },
      animation: {
        marquee: "marquee 34s linear infinite",
        ping2: "ping2 1.8s cubic-bezier(.22,1,.36,1) infinite",
        /** the slow version, for background radar rings */
        radar: "ping2 5.2s cubic-bezier(.22,1,.36,1) infinite",
        flow: "flow 2.6s linear infinite",
        flowY: "flowY 2.6s linear infinite",
        pulseRing: "pulseRing 2s infinite",
        shimmer: "shimmer 1.1s cubic-bezier(.22,1,.36,1)",
        beep: "beep 1.15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
