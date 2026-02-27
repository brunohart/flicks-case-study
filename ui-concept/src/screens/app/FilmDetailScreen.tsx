import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBar } from "../../components/layout/StatusBar";
import { FilmDetailHeader } from "../../components/flicks/FilmDetailHeader";
import { DualTab } from "../../components/flicks/DualTab";
import { DatePicker, buildDateOptions } from "../../components/flicks/DatePicker";
import { NearYouDropdown } from "../../components/flicks/NearYouDropdown";
import { CinemaListing } from "../../components/flicks/CinemaListing";
import { SocialSignalBadge } from "../../components/cinema-together/SocialSignalBadge";
import { BottomSheet } from "../../components/cinema-together/BottomSheet";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { SecondaryButton } from "../../components/cinema-together/SecondaryButton";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { MOCK_FILM, MOCK_SOCIAL, MOCK_SESSIONS } from "../../data/mockData";
import { CINEMAS } from "../../data";
import type { Cinema, Session } from "../../types";

const DATES = buildDateOptions(new Date("2026-02-18"));

export function FilmDetailScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"times" | "streaming">("times");
  const [selectedDateId, setSelectedDateId] = useState(DATES[0].id);
  const [selectedSession, setSelectedSession] = useState<{
    cinema: Cinema;
    session: Session;
  } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const currentCinemas = MOCK_SESSIONS[selectedDateId] ?? CINEMAS;

  const handleSessionClick = (cinema: Cinema, session: Session) => {
    if (session.friendsAttending.length > 0) {
      navigate("/app/1c");
      return;
    }
    setSelectedSession({ cinema, session });
    setSheetOpen(true);
  };

  const handleBuyTickets = () => {
    setSheetOpen(false);
    navigate("/app/2a");
  };

  const handleWhosGoing = () => {
    setSheetOpen(false);
    navigate("/app/1c");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Status bar over dark header */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <StatusBar light />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <FilmDetailHeader film={MOCK_FILM} />

        <DualTab activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "times" ? (
          <>
            <SocialSignalBadge
              friends={MOCK_SOCIAL.watchlistFriends}
              message={`${MOCK_SOCIAL.watchlistFriends.length} friends want to see this`}
              secondaryMessage="Sarah & Tom are going · 1:15PM Wed · HOYTS"
              hasCommittedSession
              onJoin={() => navigate("/app/1c")}
            />

            <DatePicker
              dates={DATES}
              selectedId={selectedDateId}
              onSelect={setSelectedDateId}
            />

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

            {currentCinemas.map((cinema) => (
              <CinemaListing
                key={cinema.id}
                cinema={cinema}
                onSessionClick={handleSessionClick}
                selectedSessionId={selectedSession?.session.id}
              />
            ))}
            <div style={{ height: "32px" }} />
          </>
        ) : (
          <div style={{ padding: "40px 16px", textAlign: "center" }}>
            <p
              style={{
                font: "400 15px/1.5 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#8E8E93",
              }}
            >
              Not yet available for streaming.
            </p>
          </div>
        )}
      </div>

      {/* Booking bottom sheet */}
      {selectedSession && (
        <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
          <div style={{ padding: "8px 16px 0" }}>
            {/* Session context card */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 0", borderBottom: "1px solid #E8E8E8" }}>
              <img
                src={MOCK_FILM.posterUrl}
                alt={MOCK_FILM.title}
                style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
              />
              <div>
                <p style={{ font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                  {MOCK_FILM.title}
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
              <GoldButton fullWidth onClick={handleBuyTickets}>
                🎟 Buy tickets
              </GoldButton>
              <SecondaryButton fullWidth onClick={handleWhosGoing}>
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
