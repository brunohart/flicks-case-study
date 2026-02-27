import { useState } from "react";
import { StatusBar } from "../../components/layout/StatusBar";
import { FlicksTabBar } from "../../components/layout/FlicksTabBar";
import { DualTab } from "../../components/flicks/DualTab";
import { DatePicker, buildDateOptions } from "../../components/flicks/DatePicker";
import { NearYouDropdown } from "../../components/flicks/NearYouDropdown";
import { CinemaListing } from "../../components/flicks/CinemaListing";
import { SocialSignalBadge } from "../../components/cinema-together/SocialSignalBadge";
import { BottomSheet } from "../../components/cinema-together/BottomSheet";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { SecondaryButton } from "../../components/cinema-together/SecondaryButton";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { CINEMAS, FRIENDS, CONCLAVE } from "../../data";
import type { Cinema, Session } from "../../types";

const DATES = buildDateOptions(new Date("2026-02-18"));
const FILM = CONCLAVE;

export function Screen1A() {
  const [selectedDateId, setSelectedDateId] = useState(DATES[0].id);
  const [activeTab, setActiveTab] = useState<"times" | "streaming">("times");
  const [selectedSession, setSelectedSession] = useState<{
    cinema: Cinema;
    session: Session;
  } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const goingFriends = FRIENDS.filter((f) => f.rsvpStatus === "going");

  const handleSessionClick = (cinema: Cinema, session: Session) => {
    setSelectedSession({ cinema, session });
    setSheetOpen(true);
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: "852px", backgroundColor: "#FFFFFF", position: "relative" }}
    >
      <StatusBar />

      {/* Film header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px 12px" }}>
        <img
          src={FILM.posterUrl}
          alt={FILM.title}
          style={{
            width: "52px",
            height: "78px",
            borderRadius: "4px",
            objectFit: "cover",
            flexShrink: 0,
            backgroundColor: "#EBEBEB",
          }}
        />
        <div style={{ flex: 1 }}>
          <h1
            style={{
              font: "700 20px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#000000",
              margin: 0,
            }}
          >
            {FILM.title}
          </h1>
          <p
            style={{
              font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#8E8E93",
              margin: "2px 0 0",
            }}
          >
            {FILM.rating} · 2h 46m · Sci-Fi, Adventure
          </p>
          <div className="flex items-center gap-1" style={{ marginTop: "4px" }}>
            <span style={{ fontSize: "12px" }}>🍅</span>
            <span
              style={{
                font: "500 12px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#000000",
              }}
            >
              {FILM.rtScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Segment control */}
      <DualTab activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Social signal banner */}
      <SocialSignalBadge
        friends={goingFriends}
        message={`${goingFriends.length} friends want to see this`}
        secondaryMessage="Sarah & Tom are going · 1:15PM Sat · HOYTS"
        hasCommittedSession
        onJoin={() => {
          setSelectedSession({ cinema: CINEMAS[0], session: CINEMAS[0].sessions[1] });
          setSheetOpen(true);
        }}
      />

      {/* Date picker */}
      <DatePicker dates={DATES} selectedId={selectedDateId} onSelect={setSelectedDateId} />

      {/* Near you filter */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px 8px" }}>
        <NearYouDropdown />
        <button
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            backgroundColor: "#EBEBEB",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <line x1="0" y1="3" x2="16" y2="3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="3" y1="7" x2="13" y2="7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="11" x2="10" y2="11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Cinema listings */}
      <div className="flex-1 overflow-y-auto">
        {CINEMAS.map((cinema) => (
          <CinemaListing
            key={cinema.id}
            cinema={cinema}
            onSessionClick={handleSessionClick}
            selectedSessionId={selectedSession?.session.id}
          />
        ))}
        <div style={{ height: "16px" }} />
      </div>

      <FlicksTabBar activeTab="cinemas" />

      {/* Booking action sheet */}
      {selectedSession && (
        <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
          <div style={{ padding: "8px 16px 0" }}>
            {/* Session context card */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 0", borderBottom: "1px solid #E8E8E8" }}>
              <img
                src={FILM.posterUrl}
                alt={FILM.title}
                style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <p style={{ font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                  {FILM.title}
                </p>
                <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "4px 0 0" }}>
                  {selectedSession.session.time}
                  {selectedSession.session.format && ` · ${selectedSession.session.format}`}
                  {` · ${selectedSession.cinema.name}`}
                </p>
              </div>
            </div>

            {/* Friends attending banner */}
            {selectedSession.session.friendsAttending.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#FFF8F8",
                  borderRadius: "10px",
                  margin: "16px 0 0",
                  padding: "12px",
                }}
              >
                <FriendAvatarStack friends={selectedSession.session.friendsAttending} size={24} maxVisible={4} borderColor="#FFF8F8" />
                <p style={{ font: "400 14px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                  {selectedSession.session.friendsAttending.map((f) => f.name).join(" & ")}{" "}
                  {selectedSession.session.friendsAttending.length === 1 ? "is" : "are"} going — tap to join them
                </p>
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
              <GoldButton fullWidth onClick={() => setSheetOpen(false)}>
                🎟 Buy tickets
              </GoldButton>
              <SecondaryButton fullWidth onClick={() => setSheetOpen(false)}>
                👥 Who else is going?
              </SecondaryButton>
              <button
                onClick={() => setSheetOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  font: "400 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#8E8E93",
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "16px 0",
                }}
              >
                Maybe later
              </button>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
