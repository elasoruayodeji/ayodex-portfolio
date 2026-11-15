import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import { site } from "@/lib/site";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AYODEX Labs. — Independent developer & creative technologist",
    template: "%s — AYODEX Labs.",
  },
  description:
    "Elasoru Solomon Ayodeji, building as AYODEX Labs. Websites, storefronts, web applications and digital experiments — designed carefully and shipped.",
  applicationName: "AYODEX Labs",
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "AYODEX Labs",
    "Elasoru Solomon Ayodeji",
    "independent developer Nigeria",
    "web developer Lagos",
    "frontend engineer",
    "portfolio",
    "Next.js developer",
    "e-commerce development",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AYODEX Labs.",
    locale: "en_NG",
    url: "/",
    title: "AYODEX Labs. — I build. I design. I experiment.",
    description:
      "Independent developer and creative technologist in Nigeria. Websites, storefronts, web applications and digital experiments.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AYODEX Labs. — I build. I design. I experiment.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AYODEX Labs. — I build. I design. I experiment.",
    description:
      "Independent developer and creative technologist in Nigeria. Websites, storefronts, web applications and digital experiments.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <StructuredData />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
