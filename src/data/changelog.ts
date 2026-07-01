export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

// Newest entry first. Add a new entry here whenever a notable feature or
// fix ships — it renders automatically in the Footer.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "2026-07-01",
    changes: [
      "Track eldering %, purity status, gender, and skin for every Day of Dragons species",
      "Crystal legend mapping eldering percent to night crystal color",
      "Family tree covering mother, father, and all four grandparents per dragon",
      "Rich text notes editor with bold, italic, underline, and font size",
      "Multiple accounts, each with its own hoard — add, rename, and delete freely",
      "Stats bar summarizing owned, fully eldered, pure, and ultra pure counts",
      "Import and export your hoard as a JSON file; everything else autosaves locally",
    ],
  },
];
