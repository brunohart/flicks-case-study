import { useState } from "react";
import { StatusBar } from "../../components/layout/StatusBar";
import { FlicksTabBar } from "../../components/layout/FlicksTabBar";
import { FilmDetailHeader } from "../../components/flicks/FilmDetailHeader";
import { DualTab } from "../../components/flicks/DualTab";
import { RTScoreBadge } from "../../components/flicks/RTScoreBadge";
import { SocialSignalBadge } from "../../components/cinema-together/SocialSignalBadge";
import { CinemaPersonalityPage } from "../../components/flicks/CinemaPersonalityPage";
import { CONCLAVE, FRIENDS } from "../../data";

type DualTabId = "times" | "streaming";

export function Screen1B() {
  const [activeTab, setActiveTab] = useState<DualTabId>("times");
  const [showPersonality, setShowPersonality] = useState(false);
  const interestedFriends = FRIENDS.slice(0, 3);
  const goingFriends = FRIENDS.filter((f) => f.rsvpStatus === "going");

  return (
    <div
      className="flex flex-col"
      style={{ height: "852px", backgroundColor: "#FFFFFF", overflow: "hidden", position: "relative" }}
    >
      <StatusBar light />

      {/* Film detail header */}
      <FilmDetailHeader film={CONCLAVE} />

      {/* Segment control */}
      <DualTab activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "times" ? (
          <div>
            {/* Social signal banner */}
            <SocialSignalBadge
              friends={interestedFriends}
              message={`${interestedFriends.length} friends want to see this`}
              secondaryMessage={goingFriends.length > 0 ? "Sarah & Tom are going · 1:15PM Sat · HOYTS" : undefined}
              hasCommittedSession={goingFriends.length > 0}
              onJoin={() => setShowPersonality(true)}
            />

            {/* Synopsis */}
            <div style={{ padding: "16px 16px 0" }}>
              <p
                style={{
                  font: "400 15px/1.5 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                  color: "#000000",
                  margin: 0,
                }}
              >
                {CONCLAVE.synopsis.slice(0, 160)}…
              </p>

              {/* Director */}
              <div style={{ marginTop: "16px" }}>
                <p
                  style={{
                    font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#8E8E93",
                    margin: "0 0 8px",
                  }}
                >
                  Director
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px",
                    backgroundColor: "#F5F5F5",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#8E8E93",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      font: "700 14px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    EB
                  </div>
                  <span
                    style={{
                      font: "500 15px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                      color: "#000000",
                    }}
                  >
                    {CONCLAVE.director}
                  </span>
                </div>
              </div>

              {/* Ratings */}
              <div style={{ marginTop: "16px" }}>
                <p
                  style={{
                    font: "600 11px/1 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#8E8E93",
                    margin: "0 0 8px",
                  }}
                >
                  Ratings & Reviews
                </p>
                <RTScoreBadge score={CONCLAVE.rtScore} audienceScore={CONCLAVE.audienceScore} size="lg" />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "16px" }}>
            <p
              style={{
                font: "400 15px/1.3 -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
                color: "#8E8E93",
              }}
            >
              Not yet available on streaming.
            </p>
          </div>
        )}
      </div>

      <FlicksTabBar activeTab="cinemas" />

      {/* Cinema personality page — slides in from right on Join */}
      <CinemaPersonalityPage
        isOpen={showPersonality}
        onClose={() => setShowPersonality(false)}
        onJoin={() => setShowPersonality(false)}
      />
    </div>
  );
}
