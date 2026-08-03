export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

// Newest entry first. Add a new entry here whenever a notable feature or
// fix ships — it renders automatically in the Footer.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.3.1",
    date: "2026-08-03",
    changes: [
      "Fixed the crystal legend's spacing on mobile, where it was stretching entries out with an awkward gap in the middle",
    ],
  },
  {
    version: "1.3.0",
    date: "2026-08-03",
    changes: [
      "Estimated ticks until elder now shows underneath the eldering slider, based on each species' average tick pace",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-08-03",
    changes: [
      "Deleting an account now asks for confirmation first, so a stray click on the × can't wipe it out",
      "Removed the \"Owned\" checkbox and stat — everyone owns every dragon, so it was just an extra click",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-07-02",
    changes: [
      "Light mode toggle in the header, alongside the original dark theme",
      "Changelog is now collapsed by default; click \"View Changelog\" to expand it",
      "Eldering percent field is wider and no longer shows a stuck leading zero while typing",
    ],
  },
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
