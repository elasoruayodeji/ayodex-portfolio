export type BranchId = "people" | "craft" | "works" | "ideas";

export type InfluenceEntry = {
  id: string;
  name: string;
  /** The theme this person stands for on the tree. */
  role: string;
  /** One or two sentences on why this matters. Never an endorsement claim. */
  note: string;
  link?: string;
  /** Short display form of the link, used next to the button. */
  linkLabel?: string;
  /** Legitimate image only. Omit rather than substituting a stock portrait. */
  image?: string;
  /** Where the portrait came from, and under what terms. Shown as a caption. */
  imageCredit?: string;
  /** Alt text for the portrait. */
  imageAlt?: string;
};

export type Branch = {
  id: BranchId;
  label: string;
  /** Short line describing what this branch collects. */
  description: string;
  /** Which side of the trunk this branch attaches to. */
  side: "left" | "centre" | "right";
  entries: InfluenceEntry[];
};

/**
 * The three primary inspirations, each hanging off one branch of the tree.
 *
 * Wording is deliberately about the work and the standard it sets. None of
 * these people knows me, and nothing here claims a relationship, endorsement
 * or collaboration.
 */
export const branches: Branch[] = [
  {
    id: "people",
    label: "Craft, creativity and design",
    description:
      "His work is the reason I treat a website as something to be designed, not only built.",
    side: "left",
    entries: [
      {
        id: "mr-bayo",
        name: "Mr Bayo",
        role: "Craft, creativity and design",
        note: "Adebayo Musturpha builds and teaches with a level of finish that is obvious from a single screen. His work is why I keep improving my craft and try to make digital experiences feel considered rather than assembled.",
        link: "https://mrbayo.dev/",
        linkLabel: "mrbayo.dev",
        image: "/images/inspiration/mr-bayo.jpg",
        imageAlt: "Portrait of Adebayo Musturpha, known as Mr Bayo",
        imageCredit: "Portrait from mrbayo.dev",
      },
    ],
  },
  {
    id: "ideas",
    label: "Ambition and innovation",
    description:
      "A reminder that ambitious ideas are worth attempting, and that convention is a starting point rather than a rule.",
    side: "right",
    entries: [
      {
        id: "elon-musk",
        name: "Elon Musk",
        role: "Ambition and innovation",
        note: "His approach to ambitious ideas, and to building things that challenge conventional thinking, is what I return to when a problem looks too large to start. It changed how I judge what is actually worth attempting.",
        link: "https://www.tesla.com/elon-musk",
        linkLabel: "tesla.com/elon-musk",
        image: "/images/inspiration/elon-musk.jpg",
        imageAlt: "Portrait of Elon Musk",
        imageCredit: "U.S. Air Force photo, public domain, via Wikimedia Commons",
      },
    ],
  },
  {
    id: "craft",
    label: "Engineering excellence",
    description:
      "Performance, developer experience and the craft of explaining code well. The standard I measure my own engineering against.",
    side: "centre",
    entries: [
      {
        id: "addy-osmani",
        name: "Addy Osmani",
        role: "Engineering excellence",
        note: "His work in web engineering, performance, developer experience and JavaScript education is the clearest example I know of caring about both the code and the person who has to read it. It is why I want to become a better engineer, not just a faster one.",
        link: "https://addyosmani.com/",
        linkLabel: "addyosmani.com",
        image: "/images/inspiration/addy-osmani.jpg",
        imageAlt: "Portrait of Addy Osmani",
        imageCredit: "Portrait from github.com/addyosmani",
      },
    ],
  },
];

export const totalEntries = branches.reduce(
  (count, branch) => count + branch.entries.length,
  0,
);
