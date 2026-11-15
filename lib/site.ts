export const site = {
  brand: "AYODEX Labs",
  brandFull: "AYODEX Labs.",
  name: "Elasoru Solomon Ayodeji",
  shortName: "Ayodeji",
  tagline: "I build. I design. I experiment.",
  role: "Independent developer & creative technologist",
  location: "Nigeria",
  email: "elasoruayodeji@gmail.com",
  github: "https://github.com/elasoruayodeji",
  githubHandle: "elasoruayodeji",
  whatsapp: {
    primaryNumber: "08142485613",
    primaryIntl: "2348142485613",
    primaryUrl: "https://wa.me/2348142485613",
    altNumber: "08075690088",
    altIntl: "2348075690088",
    altUrl: "https://wa.me/2348075690088",
  },
  bank: {
    name: "Moniepoint",
    accountName: "ELASORU SOLOMON AYODEJI",
    accountNumber: "8075690088",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ayodex-portfolio.vercel.app",
  footer: "Powered by AYODEX Labs.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/inspiration", label: "Inspiration" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
] as const;

/** Builds a WhatsApp click-to-chat URL with a prefilled, URL-encoded message. */
export function whatsappLink(message: string, number = site.whatsapp.primaryIntl) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
