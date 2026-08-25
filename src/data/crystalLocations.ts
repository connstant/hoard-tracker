// Data ported verbatim from the "Elder Crystal Atlas" artifact.
// Coordinates are in-game N/E offsets from map center; art/grid are
// percentage [x, y] positions for placing markers on each background image.

export interface CrystalLocation {
  id: number;
  group: string;
  name: string;
  alias: string | null;
  n: number;
  e: number;
  art: [number, number];
  grid: [number, number];
}

export const GROUPS = [
  "Big Rock",
  "Ramp",
  "Twin Peaks",
  "Lime",
  "Arch",
  "River",
  "Ravine",
  "Swamp",
  "Elder Forest"
] as const;

export const GROUP_COLORS: Record<string, string> = {
  "Big Rock": "#e6194B",
  "Ramp": "#3cb44b",
  "Twin Peaks": "#4363d8",
  "Lime": "#42d4f4",
  "Arch": "#f58231",
  "River": "#911eb4",
  "Ravine": "#f032e6",
  "Swamp": "#9A6324",
  "Elder Forest": "#ffe119"
};

export const LOCATIONS: CrystalLocation[] = [
  {
    "id": 0,
    "group": "Big Rock",
    "name": "Upper Falls",
    "alias": "Falls",
    "n": -133,
    "e": -165,
    "art": [
      39.989,
      57.419
    ],
    "grid": [
      39.989,
      57.419
    ]
  },
  {
    "id": 1,
    "group": "Big Rock",
    "name": "Lower Falls",
    "alias": "Falls",
    "n": -161,
    "e": -144,
    "art": [
      41.294,
      59.166
    ],
    "grid": [
      41.294,
      59.166
    ]
  },
  {
    "id": 2,
    "group": "Big Rock",
    "name": "World Tree / Crystal Cave",
    "alias": "WT / CC",
    "n": -114,
    "e": -97,
    "art": [
      44.212,
      56.233
    ],
    "grid": [
      44.212,
      56.233
    ]
  },
  {
    "id": 3,
    "group": "Big Rock",
    "name": "Flower Pond",
    "alias": "FP",
    "n": -35,
    "e": -80,
    "art": [
      45.268,
      51.303
    ],
    "grid": [
      45.268,
      51.303
    ]
  },
  {
    "id": 4,
    "group": "Big Rock",
    "name": "Middle BR",
    "alias": "Br Pond",
    "n": -60,
    "e": 0,
    "art": [
      50.236,
      52.863
    ],
    "grid": [
      50.236,
      52.863
    ]
  },
  {
    "id": 5,
    "group": "Big Rock",
    "name": "Open Cave",
    "alias": null,
    "n": -52,
    "e": -10,
    "art": [
      49.615,
      52.364
    ],
    "grid": [
      49.615,
      52.364
    ]
  },
  {
    "id": 6,
    "group": "Big Rock",
    "name": "Dark Cave",
    "alias": null,
    "n": -75,
    "e": 4,
    "art": [
      50.484,
      53.799
    ],
    "grid": [
      50.484,
      53.799
    ]
  },
  {
    "id": 7,
    "group": "Big Rock",
    "name": "BR Bio Cave",
    "alias": null,
    "n": -47,
    "e": 13,
    "art": [
      51.043,
      52.052
    ],
    "grid": [
      51.043,
      52.052
    ]
  },
  {
    "id": 8,
    "group": "Big Rock",
    "name": "BR Ledge / BR Top",
    "alias": null,
    "n": -50,
    "e": 13,
    "art": [
      51.043,
      52.239
    ],
    "grid": [
      51.043,
      52.239
    ]
  },
  {
    "id": 9,
    "group": "Big Rock",
    "name": "South East",
    "alias": "SE",
    "n": -97,
    "e": 75,
    "art": [
      54.893,
      55.172
    ],
    "grid": [
      54.893,
      55.172
    ]
  },
  {
    "id": 10,
    "group": "Big Rock",
    "name": "Bio Island",
    "alias": "Bio",
    "n": -27,
    "e": 136,
    "art": [
      58.682,
      50.804
    ],
    "grid": [
      58.682,
      50.804
    ]
  },
  {
    "id": 11,
    "group": "Ramp",
    "name": "Ramp",
    "alias": null,
    "n": 147,
    "e": 475,
    "art": [
      79.733,
      39.946
    ],
    "grid": [
      79.733,
      39.946
    ]
  },
  {
    "id": 12,
    "group": "Ramp",
    "name": "Ramp Cave",
    "alias": null,
    "n": 131,
    "e": 451,
    "art": [
      78.243,
      40.945
    ],
    "grid": [
      78.243,
      40.945
    ]
  },
  {
    "id": 13,
    "group": "Ramp",
    "name": "Redwoods Pond",
    "alias": null,
    "n": 214,
    "e": 392,
    "art": [
      74.579,
      35.765
    ],
    "grid": [
      74.579,
      35.765
    ]
  },
  {
    "id": 14,
    "group": "Ramp",
    "name": "Deep Redwoods Pond",
    "alias": null,
    "n": 234,
    "e": 519,
    "art": [
      82.466,
      34.517
    ],
    "grid": [
      82.466,
      34.517
    ]
  },
  {
    "id": 15,
    "group": "Twin Peaks",
    "name": "Peak",
    "alias": "Big Snowy",
    "n": 517,
    "e": 247,
    "art": [
      65.575,
      16.858
    ],
    "grid": [
      65.575,
      16.858
    ]
  },
  {
    "id": 16,
    "group": "Twin Peaks",
    "name": "Bacon",
    "alias": null,
    "n": 654,
    "e": 496,
    "art": [
      81.038,
      8.309
    ],
    "grid": [
      81.038,
      8.309
    ]
  },
  {
    "id": 17,
    "group": "Lime",
    "name": "Misty",
    "alias": null,
    "n": 696,
    "e": -684,
    "art": [
      7.759,
      5.688
    ],
    "grid": [
      7.759,
      5.688
    ]
  },
  {
    "id": 18,
    "group": "Lime",
    "name": "Lime",
    "alias": null,
    "n": 361,
    "e": -563,
    "art": [
      15.274,
      26.593
    ],
    "grid": [
      15.274,
      26.593
    ]
  },
  {
    "id": 19,
    "group": "Lime",
    "name": "Little Snowy",
    "alias": "Lil Snow",
    "n": 162,
    "e": -375,
    "art": [
      26.948,
      39.01
    ],
    "grid": [
      26.948,
      39.01
    ]
  },
  {
    "id": 20,
    "group": "Lime",
    "name": "Paradise",
    "alias": "Para",
    "n": 156,
    "e": -143,
    "art": [
      41.356,
      39.385
    ],
    "grid": [
      41.356,
      39.385
    ]
  },
  {
    "id": 21,
    "group": "Arch",
    "name": "Lower Arch",
    "alias": null,
    "n": 233,
    "e": 15,
    "art": [
      51.167,
      34.58
    ],
    "grid": [
      51.167,
      34.58
    ]
  },
  {
    "id": 22,
    "group": "Arch",
    "name": "Upper Arch",
    "alias": null,
    "n": 245,
    "e": 70,
    "art": [
      54.583,
      33.831
    ],
    "grid": [
      54.583,
      33.831
    ]
  },
  {
    "id": 23,
    "group": "Arch",
    "name": "Arch Cave",
    "alias": null,
    "n": 253,
    "e": 85,
    "art": [
      55.514,
      33.332
    ],
    "grid": [
      55.514,
      33.332
    ]
  },
  {
    "id": 24,
    "group": "Arch",
    "name": "Arch Pond",
    "alias": null,
    "n": 6,
    "e": 132,
    "art": [
      58.433,
      48.745
    ],
    "grid": [
      58.433,
      48.745
    ]
  },
  {
    "id": 25,
    "group": "River",
    "name": "Lotus",
    "alias": null,
    "n": -318,
    "e": -14,
    "art": [
      49.367,
      68.963
    ],
    "grid": [
      49.367,
      68.963
    ]
  },
  {
    "id": 26,
    "group": "River",
    "name": "River Falls",
    "alias": null,
    "n": -323,
    "e": -40,
    "art": [
      47.752,
      69.275
    ],
    "grid": [
      47.752,
      69.275
    ]
  },
  {
    "id": 27,
    "group": "River",
    "name": "River Wall",
    "alias": null,
    "n": -417,
    "e": -94,
    "art": [
      44.399,
      75.14
    ],
    "grid": [
      44.399,
      75.14
    ]
  },
  {
    "id": 28,
    "group": "River",
    "name": "River Cliffs",
    "alias": null,
    "n": -460,
    "e": -142,
    "art": [
      41.418,
      77.824
    ],
    "grid": [
      41.418,
      77.824
    ]
  },
  {
    "id": 29,
    "group": "River",
    "name": "River SW",
    "alias": null,
    "n": -368,
    "e": -242,
    "art": [
      35.208,
      72.083
    ],
    "grid": [
      35.208,
      72.083
    ]
  },
  {
    "id": 30,
    "group": "River",
    "name": "River Rock",
    "alias": null,
    "n": -367,
    "e": -140,
    "art": [
      41.542,
      72.02
    ],
    "grid": [
      41.542,
      72.02
    ]
  },
  {
    "id": 31,
    "group": "River",
    "name": "River Pillar",
    "alias": null,
    "n": -327,
    "e": -110,
    "art": [
      43.405,
      69.524
    ],
    "grid": [
      43.405,
      69.524
    ]
  },
  {
    "id": 32,
    "group": "River",
    "name": "4 Ponds",
    "alias": null,
    "n": -298,
    "e": -246,
    "art": [
      34.959,
      67.715
    ],
    "grid": [
      34.959,
      67.715
    ]
  },
  {
    "id": 33,
    "group": "Ravine",
    "name": "Ravine",
    "alias": "Rav",
    "n": -480,
    "e": 350,
    "art": [
      71.971,
      79.072
    ],
    "grid": [
      71.971,
      79.072
    ]
  },
  {
    "id": 34,
    "group": "Ravine",
    "name": "Throne",
    "alias": null,
    "n": -323,
    "e": 385,
    "art": [
      74.144,
      69.275
    ],
    "grid": [
      74.144,
      69.275
    ]
  },
  {
    "id": 35,
    "group": "Ravine",
    "name": "Pride Rock",
    "alias": "PR",
    "n": -231,
    "e": 161,
    "art": [
      60.234,
      63.534
    ],
    "grid": [
      60.234,
      63.534
    ]
  },
  {
    "id": 36,
    "group": "Swamp",
    "name": "East Swamp",
    "alias": null,
    "n": -751,
    "e": 200,
    "art": [
      62.656,
      95.982
    ],
    "grid": [
      62.656,
      95.982
    ]
  },
  {
    "id": 37,
    "group": "Swamp",
    "name": "Center Swamp",
    "alias": null,
    "n": -772,
    "e": 11,
    "art": [
      50.919,
      97.293
    ],
    "grid": [
      50.919,
      97.293
    ]
  },
  {
    "id": 38,
    "group": "Swamp",
    "name": "West Swamp",
    "alias": null,
    "n": -759,
    "e": -176,
    "art": [
      39.306,
      96.482
    ],
    "grid": [
      39.306,
      96.482
    ]
  },
  {
    "id": 39,
    "group": "Swamp",
    "name": "Brood Quest NPC",
    "alias": null,
    "n": -728,
    "e": 409,
    "art": [
      75.635,
      94.547
    ],
    "grid": [
      75.635,
      94.547
    ]
  },
  {
    "id": 40,
    "group": "Elder Forest",
    "name": "Crescent Moon Lake",
    "alias": null,
    "n": -708,
    "e": -564,
    "art": [
      15.211,
      93.299
    ],
    "grid": [
      15.211,
      93.299
    ]
  },
  {
    "id": 41,
    "group": "Elder Forest",
    "name": "Edge",
    "alias": "77",
    "n": -730,
    "e": -730,
    "art": [
      4.903,
      94.672
    ],
    "grid": [
      4.903,
      94.672
    ]
  },
  {
    "id": 42,
    "group": "Elder Forest",
    "name": "Elder Tree",
    "alias": "ET",
    "n": -494,
    "e": -624,
    "art": [
      11.485,
      79.945
    ],
    "grid": [
      11.485,
      79.945
    ]
  },
  {
    "id": 43,
    "group": "Elder Forest",
    "name": "Rockies",
    "alias": null,
    "n": -255,
    "e": -638,
    "art": [
      10.616,
      65.032
    ],
    "grid": [
      10.616,
      65.032
    ]
  },
  {
    "id": 44,
    "group": "Elder Forest",
    "name": "Bunker",
    "alias": null,
    "n": -269,
    "e": -612,
    "art": [
      12.231,
      65.905
    ],
    "grid": [
      12.231,
      65.905
    ]
  },
  {
    "id": 45,
    "group": "Elder Forest",
    "name": "Stupid Rock",
    "alias": "SR",
    "n": -147,
    "e": -616,
    "art": [
      11.982,
      58.292
    ],
    "grid": [
      11.982,
      58.292
    ]
  },
  {
    "id": 46,
    "group": "Elder Forest",
    "name": "Cliffs 1",
    "alias": "First Cliffs",
    "n": -12,
    "e": -550,
    "art": [
      16.081,
      49.868
    ],
    "grid": [
      16.081,
      49.868
    ]
  },
  {
    "id": 47,
    "group": "Elder Forest",
    "name": "Cliffs 2",
    "alias": "Second Cliffs",
    "n": -17,
    "e": -596,
    "art": [
      13.224,
      50.18
    ],
    "grid": [
      13.224,
      50.18
    ]
  },
  {
    "id": 48,
    "group": "Elder Forest",
    "name": "Cliffs 3",
    "alias": "Last Cliffs",
    "n": -13,
    "e": -752,
    "art": [
      3.537,
      49.93
    ],
    "grid": [
      3.537,
      49.93
    ]
  }
];
