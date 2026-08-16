import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import DemoModalProvider from "@/components/demo/DemoModalProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nova-restro.com"),
  title: "Nova-Restro — The Operating System For Your Restaurant",
  description:
    "Nova-Restro gives restaurant owners live visibility across every outlet — sales, tables, orders, customers, kitchen and performance.",
  keywords: [
    "restaurant operating system",
    "restaurant POS",
    "kitchen display system",
    "multi-outlet analytics",
    "table ordering",
    "restaurant management software",
  ],
  openGraph: {
    title: "Nova-Restro — The Operating System For Your Restaurant",
    description:
      "Live visibility across every outlet — sales, tables, orders, customers, kitchen and performance.",
    type: "website",
    siteName: "Nova-Restro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova-Restro — The Operating System For Your Restaurant",
    description:
      "Live visibility across every outlet — sales, tables, orders, customers, kitchen and performance.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F8F7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans text-base antialiased">
        <SmoothScroll />
        <DemoModalProvider>{children}</DemoModalProvider>
      </body>
    </html>
  );
}
