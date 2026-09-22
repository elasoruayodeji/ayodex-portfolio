import type { Metadata } from "next";
import { Space_Grotesk, Sora, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const section = Sora({
  variable: "--font-section",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AYODEX Labs. — Tech. Design. Digital Creativity.",
  description:
    "I build websites, digital experiences and visual content. Computer Science student. Real projects, honestly presented.",
  metadataBase: new URL("https://ayodex-portfolio.vercel.app"),
  openGraph: {
    title: "AYODEX Labs. — Tech. Design. Digital Creativity.",
    description:
      "I build websites, digital experiences and visual content. Real projects, honestly presented.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${section.variable} ${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}