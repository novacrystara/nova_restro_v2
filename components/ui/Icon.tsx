import type { SVGProps } from "react";

/**
 * Every icon used across the site, lifted 1:1 from the source design.
 * Stroke-based (currentColor) unless listed in FILLED.
 */
const PATHS = {
  logo: <><path d="M3 11h18" /><path d="M5 11a7 7 0 0 1 14 0" /><path d="M4 15h16" /><path d="M7 19h10" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  check: <path d="M20 6 9 17l-5-5" />,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  monitor: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  kds: <><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 22h8M12 18v4" /></>,
  kdsLines: <><rect x="2" y="4" width="20" height="14" rx="2" /><path d="M8 22h8M12 18v4" /><path d="M7 9h6" /></>,
  trendUp: <><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7h-5v5" /></>,
  alert: <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  xCircle: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z" />,
  barChart: <><path d="M3 3v18h18" /><path d="M18 17V9M13 17V5M8 17v-3" /></>,
  building: <><path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22V12h6v10" /></>,
  phone: <><rect x="5" y="2" width="14" height="20" rx="3" /><path d="M11 18h2" /></>,
  tablet: <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  drink: <><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" /><path d="M6 1v3M10 1v3M14 1v3" /></>,
  receipt: <><path d="M2 9h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" /><path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" /><path d="M6 15h4" /></>,
  dome: <><path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M12 11V7a3 3 0 0 1 6 0" /><path d="M6 11V7a3 3 0 0 1 6 0" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></>,
  table: <><path d="M3 10h18" /><path d="M12 10v10" /><path d="M7 20h10" /><path d="M5 10a7 7 0 0 1 14 0" /></>,
  tableAlt: <><path d="M3 10h18" /><path d="M12 10v10M7 20h10" /><path d="M5 10a7 7 0 0 1 14 0" /></>,
  utensils: <><path d="M12 2v8M8 4v6M16 4v6" /><path d="M5 14h14a7 7 0 0 1-7 7 7 7 0 0 1-7-7Z" /></>,
  serving: <><path d="M4 18h16" /><path d="M5 14a7 7 0 0 1 14 0Z" /><path d="M12 7V5" /></>,
  grid4: <><rect x="2" y="3" width="9" height="8" rx="1.5" /><rect x="13" y="3" width="9" height="8" rx="1.5" /><rect x="2" y="13" width="9" height="8" rx="1.5" /><rect x="13" y="13" width="9" height="8" rx="1.5" /></>,
  floorplan: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><circle cx="17.5" cy="17.5" r="3.5" /></>,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /></>,
  currency: <><path d="M12 2v20" /><path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h4" /></>,
  pie: <><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2a10 10 0 0 1 10 10h-10Z" /></>,
  star: <path d="m12 2 2.9 6.3 6.8.8-5 4.6 1.3 6.8L12 17.2 6 20.5l1.3-6.8-5-4.6 6.8-.8Z" />,
  refresh: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>,
  zap: <path d="m13 2-9 12h7l-1 8 9-12h-7Z" />,
  link: <><circle cx="6" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M6 9v6a3 3 0 0 0 3 3h6" /></>,
  menuCard: <><rect x="4" y="2" width="16" height="20" rx="3" /><path d="M9 6h6M9 10h6M9 14h3" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 9h6v6H9z" /></>,
  chefHat: <><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" /><path d="M5 12h14v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3Z" /><path d="M8 17h8" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></>,
  shield: <><path d="M12 2.5 4.5 5.6v6c0 4.4 3.1 8.5 7.5 9.9 4.4-1.4 7.5-5.5 7.5-9.9v-6Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  award: <><circle cx="12" cy="9" r="5.5" /><path d="m8.4 13.6-1.6 7 5.2-2.6 5.2 2.6-1.6-7" /></>,
  x: <path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h7l4.8 6.3ZM17.7 20.1h1.7L7.4 3.8H5.6Z" />,
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C20.4 8.75 21 11 21 14v7h-4v-6.2c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21H9z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
} as const;

export type IconName = keyof typeof PATHS;

/** Icons drawn with fill instead of stroke. */
const FILLED = new Set<IconName>(["x", "linkedin"]);

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number | string;
}

export function Icon({ name, size = 20, strokeWidth = 2, ...rest }: IconProps) {
  const filled = FILLED.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? undefined : "currentColor"}
      strokeWidth={filled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

export default Icon;
