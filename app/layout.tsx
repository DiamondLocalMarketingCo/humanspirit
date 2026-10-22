import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Liorvel | Business Data Partnerships", template: "%s | Liorvel" },
  description: "Liorvel independently screens companies for possible operational data licensing opportunities, including referrals to micro1. No acceptance or compensation is guaranteed.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geist.variable + " " + outfit.variable}><body>{children}</body></html>;
}
