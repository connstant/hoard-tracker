# Dragon Hoard Tracker

A personal hoard tracker for [Day of Dragons](https://www.dayofdragons.com/) — keeps tabs on eldering progress, breeding lines, and collection stats across multiple accounts. Everything is stored locally in your browser; there's no server or account system.

## Features

- **Species roster** — every trackable Day of Dragons species preloaded, grouped by type (Dragon, Drake, Wyvern, Amphithere, Elemental)
- **Eldering tracker** — 0–100% slider per dragon with a live night crystal color preview, plus a legend showing each crystal color's percent range
- **Ownership & purity** — mark a dragon owned, dom-spec, its gender, and purity status (None / Pure / Ultra)
- **Family tree** — record mother, father, and all four grandparents per dragon for breeding line planning
- **Notes** — rich text notes per dragon (bold, italic, underline, font size) for breeding plans, skin combos, reminders, etc.
- **Skins** — free-text field for tracking which skin a dragon is wearing
- **Multiple accounts** — add, rename, and delete accounts, each with its own independent hoard
- **Stats bar** — live counts of owned, fully eldered, pure, and ultra pure dragons
- **Import / export** — back up or transfer a hoard as a JSON file
- **Local persistence** — autosaves to the browser's local storage on every change
- **Changelog** — version history shown at the bottom of the app

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Tiptap (rich text notes editor)
- Oxlint

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to use the tracker.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run lint` — run Oxlint
- `npm run preview` — preview the production build locally

## Data

Hoard data lives in the browser's `localStorage` under the `dod-hoard-tracker` key. Use **Export** in the header to download a JSON backup, and **Import** to restore it or move it to another browser.

## Changelog

See the Changelog section at the bottom of the app, or [`src/data/changelog.ts`](src/data/changelog.ts).
