export type Project = {
  slug: string;
  title: string;
  short: string;
  role: string;
  stack: string[];
  status: "live" | "system-design" | "promo" | "parked";
  statusLabel: string;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "iceeit",
    title: "ICEEIT — clothing brand & storefront",
    short:
      "A dark, editorial storefront for a clothing brand — branding, product pages, cart, and a Paystack test-mode checkout.",
    role: "Design + Frontend + Branding",
    stack: ["React", "Vite", "Paystack (test)", "Cloudflare Workers"],
    status: "live",
    statusLabel: "Live prototype",
    year: "2025",
  },
  {
    slug: "ftc-ikoyi",
    title: "FTC Ikoyi — student feedback portal",
    short:
      "A working web app that replaces paper suggestion boxes — custom frontend, Google Apps Script backend, submissions stored in a Sheet. Built as my final-year school project.",
    role: "Solo build",
    stack: ["HTML", "CSS", "JavaScript", "Apps Script", "Google Sheets"],
    status: "live",
    statusLabel: "Functional prototype",
    year: "2025",
  },
  {
    slug: "hmd-gadgets",
    title: "HMD Gadgets — promo campaign",
    short:
      "Promotional visuals and a 10-second AI-assisted video for a gadget buy/sell/swap business in Ikeja Computer Village, Lagos.",
    role: "Content + AI-assisted video",
    stack: ["Gemini", "Canva", "Promo copy"],
    status: "promo",
    statusLabel: "Promo content",
    year: "2025",
  },
  {
    slug: "dex",
    title: "DEX — desktop AI assistant",
    short:
      "A voice-activated desktop assistant with a floating orb UI. Wake word → Vosk recognition → command routing → LLM reply. Parked after the LLM model it relied on was deprecated.",
    role: "Solo build",
    stack: ["Python", "PySide6", "Vosk", "Groq"],
    status: "parked",
    statusLabel: "Parked",
    year: "2025",
  },
];