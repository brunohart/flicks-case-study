import type { Friend, Cinema, Film, DiaryEntry } from "./types";

// ============================================================================
// FRIENDS
// ============================================================================

export const FRIENDS: Friend[] = [
  {
    id: "sarah",
    name: "Sarah",
    initials: "SC",
    avatarColor: "#E8547A",
    rsvpStatus: "going",
  },
  {
    id: "marcus",
    name: "Marcus",
    initials: "MW",
    avatarColor: "#4A7FC1",
    rsvpStatus: "maybe",
  },
  {
    id: "priya",
    name: "Priya",
    initials: "PK",
    avatarColor: "#48A87C",
    rsvpStatus: "invited",
  },
  {
    id: "tom",
    name: "Tom",
    initials: "TH",
    avatarColor: "#E8913A",
    rsvpStatus: "going",
  },
  {
    id: "lily",
    name: "Lily",
    initials: "LN",
    avatarColor: "#9B59B6",
    rsvpStatus: "invited",
  },
];

// ============================================================================
// FILMS
// ============================================================================

export const CONCLAVE: Film = {
  id: "conclave",
  title: "Conclave",
  year: 2024,
  runtime: 120,
  rating: "M",
  genres: ["Thriller", "Drama"],
  rtScore: 89,
  audienceScore: 76,
  posterUrl:
    "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/1f/38893fa176549ee5f3c1df1c6dae0c00_500x735.jpg",
  backdropUrl:
    "https://d32qys9a6wm9no.cloudfront.net/images/movies/backdrop/1f/29bed6d9f979c4bed537497c610fb095_1280x720.jpg?t=1736369135",
  synopsis:
    "After the sudden death of the beloved Pope, Cardinal Lawrence is tasked with running the conclave — the secretive process of choosing a new leader for the Catholic Church. As the selection process moves forward, he discovers a trail of secrets that could shake the foundations of the Church.",
  director: "Edward Berger",
  cast: ["Ralph Fiennes", "Stanley Tucci", "John Lithgow", "Isabella Rossellini"],
};

export const DUNE2: Film = {
  id: "dune2",
  title: "Dune: Part Two",
  year: 2024,
  runtime: 166,
  rating: "M",
  genres: ["Sci-Fi", "Adventure", "Action"],
  rtScore: 93,
  audienceScore: 89,
  posterUrl:
    "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/7f/881f33bcc012f0960b20ff7e3b559833_1000x1470.jpg?t=1693349861",
  backdropUrl:
    "https://d32qys9a6wm9no.cloudfront.net/images/movies/backdrop/7f/952eeaab1ddc8ffcf7b1983b13665d10_1280x720.jpg?t=1688073308",
  synopsis:
    "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  director: "Denis Villeneuve",
  cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
};

export const BRUTALIST: Film = {
  id: "brutalist",
  title: "The Brutalist",
  year: 2024,
  runtime: 215,
  rating: "R18",
  genres: ["Drama", "History"],
  rtScore: 88,
  audienceScore: 72,
  posterUrl:
    "https://d32qys9a6wm9no.cloudfront.net/images/movies/poster/16/c39784cc4e70d6cc04a1b2bb3c567179_original.jpg?t=1730150563",
  backdropUrl:
    "https://d32qys9a6wm9no.cloudfront.net/images/movies/backdrop/16/89014a6d128083061c23faccdee86dc2_1280x720.jpg?t=1732872670",
  synopsis:
    "An epic tale of visionary architect László Tóth who flees post-war Europe to start over in America, only to struggle with his past, addiction, and the pursuit of artistic integrity.",
  director: "Brady Corbet",
  cast: ["Adrien Brody", "Felicity Jones", "Guy Pearce", "Joe Alwyn"],
};

export const ALL_FILMS = [CONCLAVE, DUNE2, BRUTALIST];

// ============================================================================
// CINEMAS
// ============================================================================

export const CINEMAS: Cinema[] = [
  {
    id: "hoyts-sylvia-park",
    name: "HOYTS Sylvia Park",
    suburb: "Mt Wellington",
    distance: "1.8km",
    sessions: [
      {
        id: "s1",
        time: "10:20AM",
        friendsAttending: [],
      },
      {
        id: "s2",
        time: "1:15PM",
        friendsAttending: [FRIENDS[0], FRIENDS[3]],
      },
      {
        id: "s3",
        time: "4:40PM",
        friendsAttending: [],
      },
      {
        id: "s4",
        time: "7:30PM",
        friendsAttending: [],
      },
      {
        id: "s5",
        time: "10:15PM",
        friendsAttending: [],
      },
    ],
  },
  {
    id: "event-queen-st",
    name: "Event Cinemas Queen St",
    suburb: "Auckland CBD",
    distance: "3.2km",
    sessions: [
      {
        id: "s6",
        time: "11:00AM",
        friendsAttending: [],
      },
      {
        id: "s7",
        time: "2:00PM",
        friendsAttending: [],
      },
      {
        id: "s8",
        time: "5:20PM",
        format: "VMAX",
        friendsAttending: [FRIENDS[1], FRIENDS[2]],
      },
      {
        id: "s9",
        time: "8:45PM",
        format: "VMAX",
        friendsAttending: [],
      },
    ],
  },
  {
    id: "reading-courtenay",
    name: "Reading Courtenay",
    suburb: "Te Aro",
    distance: "5.4km",
    sessions: [
      {
        id: "s10",
        time: "12:30PM",
        friendsAttending: [],
      },
      {
        id: "s11",
        time: "3:45PM",
        friendsAttending: [],
      },
      {
        id: "s12",
        time: "7:00PM",
        format: "Gold Class",
        friendsAttending: [],
      },
    ],
  },
];

// ============================================================================
// DIARY ENTRIES
// ============================================================================

// ============================================================================
// SESSIONS BY DATE — varied session times for each of the 7 date-picker days
// ============================================================================

export const SESSIONS_BY_DATE: Record<string, Cinema[]> = {
  "2026-02-18": CINEMAS, // Wed — default day uses base CINEMAS
  "2026-02-19": [
    {
      ...CINEMAS[0],
      sessions: [
        { id: "d2s1", time: "11:00AM", friendsAttending: [] },
        { id: "d2s2", time: "2:30PM", friendsAttending: [FRIENDS[0], FRIENDS[3]] },
        { id: "d2s3", time: "5:45PM", friendsAttending: [] },
        { id: "d2s4", time: "9:00PM", friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[1],
      sessions: [
        { id: "d2s5", time: "10:30AM", friendsAttending: [] },
        { id: "d2s6", time: "1:15PM", friendsAttending: [] },
        { id: "d2s7", time: "4:00PM", format: "VMAX" as const, friendsAttending: [FRIENDS[1]] },
        { id: "d2s8", time: "7:30PM", format: "VMAX" as const, friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[2],
      sessions: [
        { id: "d2s9", time: "1:00PM", friendsAttending: [] },
        { id: "d2s10", time: "4:15PM", friendsAttending: [] },
        { id: "d2s11", time: "7:45PM", format: "Gold Class" as const, friendsAttending: [] },
      ],
    },
  ],
  "2026-02-20": [
    {
      ...CINEMAS[0],
      sessions: [
        { id: "d3s1", time: "10:00AM", friendsAttending: [] },
        { id: "d3s2", time: "12:45PM", friendsAttending: [] },
        { id: "d3s3", time: "3:30PM", friendsAttending: [FRIENDS[3]] },
        { id: "d3s4", time: "6:15PM", friendsAttending: [] },
        { id: "d3s5", time: "9:30PM", friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[1],
      sessions: [
        { id: "d3s6", time: "11:30AM", friendsAttending: [] },
        { id: "d3s7", time: "2:45PM", format: "VMAX" as const, friendsAttending: [] },
        { id: "d3s8", time: "6:00PM", friendsAttending: [] },
        { id: "d3s9", time: "9:15PM", format: "VMAX" as const, friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[2],
      sessions: [
        { id: "d3s10", time: "12:00PM", friendsAttending: [] },
        { id: "d3s11", time: "3:15PM", friendsAttending: [] },
        { id: "d3s12", time: "6:30PM", format: "Gold Class" as const, friendsAttending: [] },
      ],
    },
  ],
  "2026-02-21": [
    {
      ...CINEMAS[0],
      sessions: [
        { id: "d4s1", time: "9:45AM", friendsAttending: [] },
        { id: "d4s2", time: "12:30PM", friendsAttending: [FRIENDS[0]] },
        { id: "d4s3", time: "3:15PM", friendsAttending: [] },
        { id: "d4s4", time: "6:00PM", friendsAttending: [] },
        { id: "d4s5", time: "8:45PM", friendsAttending: [FRIENDS[3]] },
      ],
    },
    {
      ...CINEMAS[1],
      sessions: [
        { id: "d4s6", time: "10:15AM", friendsAttending: [] },
        { id: "d4s7", time: "1:30PM", friendsAttending: [] },
        { id: "d4s8", time: "4:45PM", format: "VMAX" as const, friendsAttending: [FRIENDS[1], FRIENDS[2]] },
        { id: "d4s9", time: "8:00PM", format: "VMAX" as const, friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[2],
      sessions: [
        { id: "d4s10", time: "11:00AM", friendsAttending: [] },
        { id: "d4s11", time: "2:30PM", friendsAttending: [] },
        { id: "d4s12", time: "5:45PM", format: "Gold Class" as const, friendsAttending: [] },
      ],
    },
  ],
  "2026-02-22": [
    {
      ...CINEMAS[0],
      sessions: [
        { id: "d5s1", time: "10:00AM", friendsAttending: [] },
        { id: "d5s2", time: "1:00PM", friendsAttending: [] },
        { id: "d5s3", time: "4:00PM", friendsAttending: [FRIENDS[0], FRIENDS[3]] },
        { id: "d5s4", time: "7:00PM", friendsAttending: [] },
        { id: "d5s5", time: "10:00PM", friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[1],
      sessions: [
        { id: "d5s6", time: "11:15AM", friendsAttending: [] },
        { id: "d5s7", time: "2:15PM", friendsAttending: [] },
        { id: "d5s8", time: "5:30PM", format: "VMAX" as const, friendsAttending: [] },
        { id: "d5s9", time: "8:30PM", format: "VMAX" as const, friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[2],
      sessions: [
        { id: "d5s10", time: "12:15PM", friendsAttending: [] },
        { id: "d5s11", time: "3:30PM", friendsAttending: [] },
        { id: "d5s12", time: "7:15PM", format: "Gold Class" as const, friendsAttending: [] },
      ],
    },
  ],
  "2026-02-23": [
    {
      ...CINEMAS[0],
      sessions: [
        { id: "d6s1", time: "10:30AM", friendsAttending: [] },
        { id: "d6s2", time: "1:30PM", friendsAttending: [] },
        { id: "d6s3", time: "4:30PM", friendsAttending: [] },
        { id: "d6s4", time: "7:30PM", friendsAttending: [FRIENDS[0]] },
        { id: "d6s5", time: "10:30PM", friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[1],
      sessions: [
        { id: "d6s6", time: "11:00AM", friendsAttending: [] },
        { id: "d6s7", time: "2:00PM", format: "VMAX" as const, friendsAttending: [] },
        { id: "d6s8", time: "5:00PM", friendsAttending: [] },
        { id: "d6s9", time: "8:00PM", format: "VMAX" as const, friendsAttending: [FRIENDS[1]] },
      ],
    },
    {
      ...CINEMAS[2],
      sessions: [
        { id: "d6s10", time: "12:00PM", friendsAttending: [] },
        { id: "d6s11", time: "3:00PM", friendsAttending: [] },
        { id: "d6s12", time: "6:00PM", format: "Gold Class" as const, friendsAttending: [] },
      ],
    },
  ],
  "2026-02-24": [
    {
      ...CINEMAS[0],
      sessions: [
        { id: "d7s1", time: "11:00AM", friendsAttending: [] },
        { id: "d7s2", time: "2:00PM", friendsAttending: [] },
        { id: "d7s3", time: "5:00PM", friendsAttending: [] },
        { id: "d7s4", time: "8:00PM", friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[1],
      sessions: [
        { id: "d7s5", time: "10:45AM", friendsAttending: [] },
        { id: "d7s6", time: "1:45PM", format: "VMAX" as const, friendsAttending: [] },
        { id: "d7s7", time: "4:45PM", friendsAttending: [] },
        { id: "d7s8", time: "7:45PM", format: "VMAX" as const, friendsAttending: [] },
      ],
    },
    {
      ...CINEMAS[2],
      sessions: [
        { id: "d7s9", time: "12:30PM", friendsAttending: [] },
        { id: "d7s10", time: "3:45PM", friendsAttending: [] },
        { id: "d7s11", time: "7:00PM", format: "Gold Class" as const, friendsAttending: [] },
      ],
    },
  ],
};

// ============================================================================
// DIARY ENTRIES
// ============================================================================

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: "d1",
    film: CONCLAVE,
    watchedAt: "2025-02-14",
    watchedWith: [FRIENDS[0], FRIENDS[3]],
    emoji: "🤩",
    starRating: 4.5,
    note: "Absolutely gripping from start to finish. Ralph Fiennes is extraordinary.",
    cinemaName: "HOYTS Sylvia Park",
  },
  {
    id: "d2",
    film: DUNE2,
    watchedAt: "2024-03-01",
    watchedWith: [FRIENDS[1]],
    emoji: "😮",
    starRating: 4,
    note: "Visually stunning. The sand sequences are breathtaking.",
    cinemaName: "Event Cinemas Queen St",
  },
  {
    id: "d3",
    film: BRUTALIST,
    watchedAt: "2025-01-20",
    watchedWith: [],
    emoji: "😌",
    starRating: 3.5,
    cinemaName: "Rialto Cinemas Newmarket",
  },
];
