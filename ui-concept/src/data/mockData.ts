import type { Friend, Film, Cinema, Session, DiaryEntry, EmojiOption } from "../types";
import { CONCLAVE, FRIENDS, CINEMAS, SESSIONS_BY_DATE, DIARY_ENTRIES } from "../data";

// ============================================================================
// MOCK FILM — extends CONCLAVE with extra social/detail fields
// ============================================================================

export interface MockFilm extends Film {
  reviews: { source: string; score: string }[];
  inWatchlist: boolean;
  boxOfficeRank: number;
}

export const MOCK_FILM: MockFilm = {
  ...CONCLAVE,
  reviews: [
    { source: "Rotten Tomatoes", score: "89%" },
    { source: "IMDb", score: "7.6" },
  ],
  inWatchlist: true,
  boxOfficeRank: 2,
};

// ============================================================================
// MOCK SESSIONS — date-keyed sessions (re-export existing data)
// ============================================================================

export const MOCK_SESSIONS = SESSIONS_BY_DATE;

// ============================================================================
// MOCK SOCIAL — friend interest + committed session
// ============================================================================

export const MOCK_SOCIAL = {
  watchlistFriends: FRIENDS.filter((f) => f.rsvpStatus === "going" || f.rsvpStatus === "maybe"),
  committedSession: {
    cinema: CINEMAS[0],
    session: CINEMAS[0].sessions[1], // 1:15PM — Sarah & Tom
  },
};

// ============================================================================
// MOCK FRIENDS — extended with hasWatchlisted for friend selection
// ============================================================================

export interface MockFriend extends Friend {
  hasWatchlisted: boolean;
}

export const MOCK_FRIENDS: MockFriend[] = [
  { ...FRIENDS[0], hasWatchlisted: true },  // Sarah — going
  { ...FRIENDS[1], hasWatchlisted: true },  // Marcus — maybe
  { ...FRIENDS[3], hasWatchlisted: true },  // Tom — going
  { ...FRIENDS[2], hasWatchlisted: false }, // Priya — invited
  { ...FRIENDS[4], hasWatchlisted: false }, // Lily — invited
];

// ============================================================================
// MOCK RSVP — RSVP state for Who's In tracker
// ============================================================================

export const MOCK_RSVP: Friend[] = [
  { ...FRIENDS[0], rsvpStatus: "going" },   // Sarah
  { ...FRIENDS[3], rsvpStatus: "going" },   // Tom
  { ...FRIENDS[1], rsvpStatus: "maybe" },   // Marcus
  { ...FRIENDS[2], rsvpStatus: "invited" }, // Priya
];

// ============================================================================
// MOCK DIARY — re-export existing diary entries
// ============================================================================

export const MOCK_DIARY: DiaryEntry[] = DIARY_ENTRIES;

// ============================================================================
// EMOJI OPTIONS — for quick capture flow
// ============================================================================

export const EMOJI_OPTIONS: (EmojiOption & { stars: number })[] = [
  { emoji: "😍", label: "Loved it", stars: 5 },
  { emoji: "😀", label: "Liked it", stars: 4 },
  { emoji: "🤔", label: "It was ok", stars: 3 },
  { emoji: "😴", label: "Boring", stars: 2 },
  { emoji: "😤", label: "Hated it", stars: 1 },
];

// ============================================================================
// MOCK FRIEND SESSIONS — all sessions friends are attending, grouped by date
// ============================================================================

export interface FriendSession {
  date: string;
  dateLabel: string;
  cinemaName: string;
  cinemaSuburb: string;
  time: string;
  format?: string;
  friends: Friend[];
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

export const MOCK_FRIEND_SESSIONS: FriendSession[] = Object.entries(SESSIONS_BY_DATE)
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([date, cinemas]) =>
    cinemas.flatMap((cinema) =>
      cinema.sessions
        .filter((s) => s.friendsAttending.length > 0)
        .map((s) => ({
          date,
          dateLabel: formatDateLabel(date),
          cinemaName: cinema.name,
          cinemaSuburb: cinema.suburb,
          time: s.time,
          format: s.format,
          friends: s.friendsAttending,
        }))
    )
  );

// ============================================================================
// MOCK CONTACTS — contacts for the invite flow (people not yet on the app)
// ============================================================================

export interface Contact {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  phone: string;
}

export const MOCK_CONTACTS: Contact[] = [
  { id: "c1", name: "Alex Chen", initials: "AC", avatarColor: "#5B6ABF", phone: "+64 21 555 0101" },
  { id: "c2", name: "Jordan Park", initials: "JP", avatarColor: "#3D8B6E", phone: "+64 22 555 0202" },
  { id: "c3", name: "Mia Santos", initials: "MS", avatarColor: "#C75B39", phone: "+64 21 555 0303" },
  { id: "c4", name: "Kai Williams", initials: "KW", avatarColor: "#7B5EA7", phone: "+64 27 555 0404" },
  { id: "c5", name: "Emma Liu", initials: "EL", avatarColor: "#D4A853", phone: "+64 22 555 0505" },
  { id: "c6", name: "Noah Brown", initials: "NB", avatarColor: "#4A90D9", phone: "+64 21 555 0606" },
  { id: "c7", name: "Aroha Te Reo", initials: "AT", avatarColor: "#E8547A", phone: "+64 27 555 0707" },
];

// ============================================================================
// MOCK SEAT MAP — cinema auditorium layout for booking concept
// ============================================================================

export type SeatStatus = "available" | "occupied" | "friend" | "suggested" | "selected";

export interface Seat {
  row: string;
  col: number;
  status: SeatStatus;
  friendInitials?: string;
}

function buildSeatMap(): Seat[] {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = 12;
  const seats: Seat[] = [];

  for (const row of rows) {
    for (let col = 1; col <= cols; col++) {
      // Aisle gaps
      if ((col === 3 || col === 10) && (row === "A" || row === "B")) continue;

      let status: SeatStatus = "available";

      // Occupied seats (scattered)
      if (
        (row === "B" && [4, 5, 6].includes(col)) ||
        (row === "C" && [1, 2, 8, 9].includes(col)) ||
        (row === "D" && [11, 12].includes(col)) ||
        (row === "F" && [1, 2, 3].includes(col)) ||
        (row === "G" && [9, 10, 11, 12].includes(col)) ||
        (row === "H" && [1, 2, 3, 4, 5, 10, 11, 12].includes(col))
      ) {
        status = "occupied";
      }

      let friendInitials: string | undefined;

      // Sarah in E7, Tom in E8
      if (row === "E" && col === 7) {
        status = "friend";
        friendInitials = "SC";
      }
      if (row === "E" && col === 8) {
        status = "friend";
        friendInitials = "TH";
      }

      // Suggested seats next to friends
      if (row === "E" && (col === 5 || col === 6)) {
        status = "suggested";
      }

      seats.push({ row, col, status, friendInitials });
    }
  }

  return seats;
}

export const MOCK_SEAT_MAP: Seat[] = buildSeatMap();
export const SEAT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const SEAT_COLS = 12;

// Re-export commonly used data
export { CINEMAS, FRIENDS, SESSIONS_BY_DATE } from "../data";
export type { Cinema, Session, Friend, Film, DiaryEntry } from "../types";
