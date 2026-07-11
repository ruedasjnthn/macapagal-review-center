import { Geist, Inter } from "next/font/google";

export const headingFont = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const bodyFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;
