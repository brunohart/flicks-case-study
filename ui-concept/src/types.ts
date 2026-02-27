// ============================================================================
// SHARED TYPES
// ============================================================================

export interface Friend {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rsvpStatus?: "going" | "maybe" | "invited" | "declined";
}

export interface Session {
  id: string;
  time: string;
  format?: "VMAX" | "Gold Class" | "Dolby" | "4DX";
  friendsAttending: Friend[];
}

export interface Cinema {
  id: string;
  name: string;
  suburb: string;
  distance: string;
  sessions: Session[];
}

export interface Film {
  id: string;
  title: string;
  year: number;
  runtime: number;
  rating: string;
  genres: string[];
  rtScore: number;
  audienceScore: number;
  posterUrl: string;
  backdropUrl: string;
  synopsis: string;
  director: string;
  cast: string[];
}

export interface DiaryEntry {
  id: string;
  film: Film;
  watchedAt: string;
  watchedWith: Friend[];
  emoji: string;
  starRating: number;
  note?: string;
  cinemaName?: string;
}

export type EmojiOption = {
  emoji: string;
  label: string;
};
