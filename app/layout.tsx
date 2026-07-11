import type { Metadata } from "next";
import { fontVariables } from "./font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Macapagal Review Center",
  description:
    "Structured board-exam review for future licensed professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
