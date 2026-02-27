import { useState } from "react";
import { StatusBar } from "../../components/layout/StatusBar";
import { FlicksTabBar } from "../../components/layout/FlicksTabBar";
import { DatePicker, buildDateOptions } from "../../components/flicks/DatePicker";
import { NearYouDropdown } from "../../components/flicks/NearYouDropdown";
import { CinemaListing } from "../../components/flicks/CinemaListing";
import { BottomSheet } from "../../components/cinema-together/BottomSheet";
import { GoldButton } from "../../components/cinema-together/GoldButton";
import { SecondaryButton } from "../../components/cinema-together/SecondaryButton";
import { FriendAvatarStack } from "../../components/cinema-together/FriendAvatarStack";
import { CINEMAS, FRIENDS, CONCLAVE } from "../../data";
import type { Cinema, Session } from "../../types";

const DATES = buildDateOptions(new Date("2026-02-18"));
const DEFAULT_CINEMA = CINEMAS[0];
const DEFAULT_SESSION = CINEMAS[0].sessions[1];

export function Screen1C() {
  const [selectedDateId] = useState(DATES[0].id);
  const [selectedSession] = useState<{ cinema: Cinema; session: Session }>({
    cinema: DEFAULT_CINEMA,
    session: DEFAULT_SESSION,
  });
  const [sheetOpen, setSheetOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const attendingFriends = FRIENDS.filter((f) => f.rsvpStatus === "going");

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => setSheetOpen(false), 800);
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
          src={CONCLAVE.posterUrl}
          alt="Conclave"
          style={{ width: "52px", height: "78px", borderRadius: "4px", objectFit: "cover", flexShrink: 0 }}
        />
        <div>
          <h1
            style={{
              font: "700 20px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#000000",
              margin: 0,
            }}
          >
            Conclave
          </h1>
          <p
            style={{
              font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
              color: "#8E8E93",
              margin: "2px 0 0",
            }}
          >
            M · 2h 0m · Thriller
          </p>
        </div>
      </div>

      {/* Date picker */}
      <DatePicker dates={DATES} selectedId={selectedDateId} onSelect={() => {}} />

      {/* Filter row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px 8px" }}>
        <NearYouDropdown />
      </div>

      {/* Cinema listings (dimmed behind sheet) */}
      <div className="flex-1 overflow-y-auto" style={{ opacity: sheetOpen ? 0.4 : 1 }}>
        {CINEMAS.map((cinema) => (
          <CinemaListing
            key={cinema.id}
            cinema={cinema}
            selectedSessionId={selectedSession.session.id}
          />
        ))}
      </div>

      <FlicksTabBar activeTab="cinemas" />

      {/* Join Confirmation Bottom Sheet */}
      <BottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div style={{ padding: "8px 16px 0" }}>
          {confirmed ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0", gap: "12px" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "40px" }}>🎬</span>
              </div>
              <p style={{ font: "700 22px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", textAlign: "center", margin: 0 }}>
                You're in!
              </p>
              <p style={{ font: "400 15px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", textAlign: "center", margin: 0 }}>
                Your friends have been notified.
              </p>
            </div>
          ) : (
            <>
              {/* Session context card */}
              <div style={{ padding: "16px 0", borderBottom: "1px solid #E8E8E8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={CONCLAVE.posterUrl}
                    alt="Conclave"
                    style={{ width: "48px", height: "68px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div>
                    <p style={{ font: "600 15px/1.2 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                      Conclave
                    </p>
                    <p style={{ font: "400 13px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "4px 0 0" }}>
                      {DEFAULT_SESSION.time} · Wednesday 18 Feb · {DEFAULT_CINEMA.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Friends going banner */}
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
                <FriendAvatarStack friends={attendingFriends} size={24} maxVisible={4} borderColor="#FFF8F8" />
                <div>
                  <p style={{ font: "400 14px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#000000", margin: 0 }}>
                    {attendingFriends.map((f) => f.name).join(" & ")} {attendingFriends.length === 1 ? "is" : "are"} going
                  </p>
                  <p style={{ font: "400 12px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif", color: "#8E8E93", margin: "2px 0 0" }}>
                    Tap to join them
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
                <GoldButton fullWidth onClick={handleConfirm}>
                  🎟 Buy tickets
                </GoldButton>
                <SecondaryButton fullWidth onClick={() => setSheetOpen(false)}>
                  Buy tickets separately
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
            </>
          )}
        </div>
      </BottomSheet>
    </div>
  );
}
