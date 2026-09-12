import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEDEF AKVARYUM — Kendi Su Altı Dünyanı Oluştur",
  description:
    "Tetra sürülerinden karideslere, aquascaping taşlarından özel bitkilere kadar kendi su altı dünyanızı kurun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-bg text-ink min-h-screen antialiased selection:bg-accent/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
