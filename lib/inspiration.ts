export type BranchId = "people" | "craft" | "works" | "ideas";

export type InfluenceEntry = {
  id: string;
  name: string;
  role: string;
  /** One or two sentences on why this matters. Never an endorsement claim. */
  note: string;
  link?: string;
  /** Legitimate image only. Omit rather than substituting a stock portrait. */
  image?: string;
};

export type Branch = {
  id: BranchId;
  label: string;
  /** Short line describing what this branch collects. */
  description: string;
  entries: InfluenceEntry[];
};

/**
 * The inspiration map's data source. Entries are intentionally empty until real
 * ones are supplied. Nothing here is invented. Adding an influence is a data
 * edit: the map, the mobile rail and the detail panel all read from this array.
 */
export const branches: Branch[] = [
  {
    id: "people",
    label: "People",
    description:
      "Developers, designers and builders whose craft or conduct changed how I work.",
    entries: [],
  },
  {
    id: "craft",
    label: "Craft",
    description:
      "Practices I keep returning to: typography, editing, restraint, revision.",
    entries: [],
  },
  {
    id: "works",
    label: "Works",
    description:
      "Sites, products and objects that set a standard I aim at.",
    entries: [],
  },
  {
    id: "ideas",
    label: "Ideas",
    description:
      "Principles rather than people: the arguments that shaped my defaults.",
    entries: [],
  },
];

export const totalEntries = branches.reduce(
  (count, branch) => count + branch.entries.length,
  0,
);
