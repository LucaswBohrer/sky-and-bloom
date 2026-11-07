import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SKY & BLOOM — A world of creativity",
  description:
    "An immersive creative web experience exploring motion, interaction, color and digital experimentation. Where imagination meets interaction.",
  keywords: ["creative web", "interactive design", "motion", "three.js", "portfolio", "sky and bloom"],
  authors: [{ name: "SKY & BLOOM" }],
  openGraph: {
    title: "SKY & BLOOM — A world of creativity",
    description: "Where imagination meets interaction. An immersive creative web experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKY & BLOOM — A world of creativity",
    description: "Where imagination meets interaction.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white font-body text-ink">{children}</body>
    </html>
  );
}
