import { type ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PhoneFrame } from "../components/layout/PhoneFrame";
import { FilmDetailScreen } from "../screens/app/FilmDetailScreen";
import { FilmDetailSocialScreen } from "../screens/app/FilmDetailSocialScreen";
import { FriendsSessionsScreen } from "../screens/app/FriendsSessionsScreen";
import { BookingScreen } from "../screens/app/BookingScreen";
import { InviteFriendsScreen } from "../screens/app/InviteFriendsScreen";
import { WhosInTrackerScreen } from "../screens/app/WhosInTrackerScreen";
import { DiaryScreen } from "../screens/app/DiaryScreen";
import { NotificationPreview } from "../screens/app/NotificationPreview";

// ============================================================================
// SCREEN REGISTRY — each concept has a unique ID, label, and component
// ============================================================================

interface ScreenEntry {
  id: string;
  label: string;
  description: string;
  render: () => ReactNode;
}

const SCREENS: ScreenEntry[] = [
  {
    id: "1a",
    label: "1A — Showtimes",
    description: "Showtimes with friend interest signals overlaid on session pills",
    render: () => <FilmDetailScreen />,
  },
  {
    id: "1b",
    label: "1B — Film Detail",
    description: "Film detail page with social proof and friend interest",
    render: () => <FilmDetailSocialScreen />,
  },
  {
    id: "1c",
    label: "1C — Friends' Sessions",
    description: "Stacked list of all sessions friends are attending this week",
    render: () => <FriendsSessionsScreen />,
  },
  {
    id: "2a",
    label: "2A — Booking",
    description: "Seat selection with friend proximity highlighting",
    render: () => <BookingScreen />,
  },
  {
    id: "2b",
    label: "2B — Invite Friends",
    description: "Invite contacts to join a solo session",
    render: () => <InviteFriendsScreen />,
  },
  {
    id: "2c",
    label: "2C — RSVP Tracking",
    description: "Live RSVP status tracker with inline invite",
    render: () => <WhosInTrackerScreen />,
  },
  {
    id: "3a",
    label: "3A — Notification",
    description: "iOS lock screen notification prompting a post-film review",
    render: () => <NotificationPreview />,
  },
  {
    id: "3b",
    label: "3B — Emoji Reaction",
    description: "Emoji-first reaction flow with star rating and quick note",
    render: () => <NotificationPreview initialSheet />,
  },
  {
    id: "3c",
    label: "3C — Viewing Diary",
    description: "Personal viewing diary with stats, diary cards, and Letterboxd export",
    render: () => <DiaryScreen />,
  },
];

const SCREEN_INDEX = new Map(SCREENS.map((s, i) => [s.id, i]));

// ============================================================================
// SCREEN VIEWER LAYOUT
// ============================================================================

export function ScreenViewerLayout() {
  const { screenId } = useParams<{ screenId: string }>();
  const navigate = useNavigate();

  const currentIndex = SCREEN_INDEX.get(screenId ?? "") ?? 0;
  const screen = SCREENS[currentIndex];
  const prev = currentIndex > 0 ? SCREENS[currentIndex - 1] : undefined;
  const next = currentIndex < SCREENS.length - 1 ? SCREENS[currentIndex + 1] : undefined;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Top nav */}
      <div className="flex items-center justify-between px-8 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[15px] font-medium"
          style={{
            color: "rgba(255,255,255,0.6)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All screens
        </button>

        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#F23953" }}
          />
          <span className="text-[14px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {screen.label}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {prev ? (
            <button
              onClick={() => navigate(`/app/${prev.id}`, { replace: true })}
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M7 1L1 7l6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div style={{ width: "36px" }} />
          )}
          {next ? (
            <button
              onClick={() => navigate(`/app/${next.id}`, { replace: true })}
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div style={{ width: "36px" }} />
          )}
        </div>
      </div>

      {/* Phone frame centred */}
      <div className="flex-1 flex items-center justify-center py-8">
        <PhoneFrame>
          <div key={screen.id} style={{ width: "100%", height: "100%" }}>
            {screen.render()}
          </div>
        </PhoneFrame>
      </div>

      {/* Description */}
      <div className="text-center pb-8 px-8">
        <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
          {screen.description}
        </p>
      </div>
    </div>
  );
}
