import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Liorvel | Business Data Partnerships", template: "%s | Liorvel" },
  description: "Liorvel screens company data opportunities and connects suitable businesses with independent licensing partners. Initial screening does not guarantee an offer or compensation.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geist.variable + " " + outfit.variable}><body>{children}</body></html>;
}
